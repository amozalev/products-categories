import json
import bson
import math
from flask import jsonify, request, make_response, current_app
from flask_restful import Resource, abort
from flask_jwt_extended import fresh_jwt_required, jwt_required
from mongoengine import DoesNotExist, ValidationError

from config import Config
from myapp.utils import api_key_required


class RestBaseClass(Resource):
    method_decorators = {'post': [api_key_required],
                         'put': [api_key_required],
                         'delete': [api_key_required]}
    saved_item = None

    def __init__(self, classname, obj_title, schema):
        self.result = {
            'version': '1.0'
        }
        self.schema = schema
        self.cls = classname
        self.obj_title = obj_title
        super(RestBaseClass, self).__init__()

    @staticmethod
    def add_pages_to_result(result: dict, items_count: int, offset: int, limit: int) -> json:
        result.update({
            'pages': {
                'from': offset + 1,
                'to': offset + limit,
                'offset': offset,
                'limit': limit,
                'next': f'{request.base_url}',
                'current_page': math.ceil((offset + limit) / limit),
                'pages_count': math.ceil(items_count / limit),
                'items_count': items_count
            }
        })
        if offset - limit > 0:
            result['pages']['prev'] = f'{request.base_url}'
        return result

    @staticmethod
    def create_response(result: dict, status_code: int = 200, mimetype: str = "application/json",
                        headers: [list, dict] = None):
        response = make_response(jsonify(result), status_code)
        response.mimetype = mimetype
        response.headers.extend(
            {'Access-Control-Allow-Origin': Config.CLIENT_HOST,
             'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE'],
             'Access-Control-Allow-Headers': 'Content-Type'}
        )
        if headers is not None:
            response.headers.extend(headers)
        return response

    def get(self, item_id: str = None, offset: int = 0, limit: int = 6) -> json:
        args = self.reqparse.parse_args()
        if args['offset'] is not None:
            offset = args['offset']
        if args['limit'] is not None:
            limit = args['limit']

        if item_id is not None:
            try:
                item = self.cls.objects.get(pk=bson.ObjectId(item_id))
            except DoesNotExist as err:
                abort(404, error=404, message=f'{err}. {self.cls.__name__} {item_id} doesn\'t exist.')

            self.result.update({
                'data': self.schema.dump(item).data,
                'links': {
                    f'{self.obj_title}': {'href': f'{request.base_url}'.strip(item_id)}
                }
            })
        else:
            items = self.cls.objects.order_by('id').skip(offset).limit(limit)
            total = items.count()
            self.result.update({
                'data': [self.schema.dump(item).data for item in items],
                'links': {
                    f'{self.obj_title}': {'href': f'{request.base_url}'}
                }
            })
            if total:
                print('total', total)
                self.result = self.add_pages_to_result(self.result, total, offset, limit)

            response = self.create_response(self.result)
            return response

    @fresh_jwt_required
    def put(self, item_id: str = None) -> json:
        if item_id is None:
            abort(404, error=404, message=f'{self.cls.__name__} id is not set.')

        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            tmp_dict[k] = v
            if k == 'parentId' and v == '':
                tmp_dict[k] = None

        try:
            item = self.cls.objects.get(pk=bson.ObjectId(item_id))
        except DoesNotExist as err:
            abort(404, error=404, message=f'{err}. {self.cls.__name__} {item_id} doesn\'t exist.')
        try:
            item.update(**tmp_dict)
        except ValidationError as err:
            abort(400, error=400, message=err)

        item = self.cls.objects.get(pk=bson.ObjectId(item_id))
        self.result.update({
            'data': self.schema.dump(item).data,
            'links': {
                'self': {'href': f'{self.obj_title}/{item_id}'},
                f'{self.obj_title}': {'href': f'/{self.obj_title}/'}
            }
        })
        response = self.create_response(self.result)
        return response

    @fresh_jwt_required
    def post(self) -> json:
        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            if k != '_id':
                tmp_dict[k] = v
            if k == 'parentId' and v == '':
                tmp_dict[k] = None

        item = self.cls(**tmp_dict)
        try:
            self.saved_item = item.save()
        except ValidationError as err:
            abort(400, error=400, message=err)
            # return {'error': 400, 'message': err}

        self.result.update({
            'data': self.schema.dump(self.saved_item).data,
            'links': {
                'self': {'href': f'{request.base_url}{self.obj_title}/{self.saved_item.id}'},
                f'{self.obj_title}': {'href': f'/{self.obj_title}/'}
            }
        })
        response = self.create_response(self.result,
                                        status_code=201,
                                        headers={"Location": f'{request.url}{self.saved_item.id}'})
        return response

    @fresh_jwt_required
    def delete(self, item_id: str = None) -> json:
        if item_id is None:
            abort(404, error=404, message=f'{self.cls.__name__} id is not set.')

        try:
            item = self.cls.objects.get(pk=bson.ObjectId(item_id))
        except DoesNotExist as err:
            abort(404, error=404, message=f'{err}. {self.cls.__name__} {item_id} doesn\'t exist.')

        item.delete()

        self.result.update({
            'status': 'accepted',
            'links': {
                f'{self.obj_title}': {'href': f'/{self.obj_title}/'}
            }
        })
        response = self.create_response(self.result)
        return response

    def options(self, **kwargs):
        response = self.create_response({})
        return response
