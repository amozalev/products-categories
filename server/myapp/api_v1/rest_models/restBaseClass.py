import json
import bson
from flask import jsonify, request, make_response
from flask_restful import Resource, abort, marshal
from mongoengine import DoesNotExist, ValidationError


class RestBaseClass(Resource):
    final_item = {}
    saved_item = None

    def __init__(self, classname, obj_title):
        self.result = {
            'version': '1.0'
        }
        self.cls = classname
        self.obj_title = obj_title
        super(RestBaseClass, self).__init__()

    def get(self, item_id: str = None, offset: int = 0, limit: int = 10) -> json:
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
                'data': marshal(item, self.final_item),
                '_links': {
                    'self': {'href': f'{request.base_url}{self.obj_title}/{item_id}'},
                    f'all_{self.obj_title}': {'href': f'{request.base_url}{self.obj_title}'}
                }
            })
        else:
            items = self.cls.objects.order_by('id').skip(offset).limit(limit)
            total = items.count()
            self.result.update({
                'from': offset,
                'to': offset + limit,
                'next': f'{request.base_url}?offset={offset + limit}&limit={limit}',
                'total': total,
                'data': [marshal(item, self.final_item) for item in items],
                '_links': {
                    f'all_{self.obj_title}': {'href': f'{request.base_url}{self.obj_title}'}
                }
            })
            if offset - limit > 0:
                self.result.update({'previous': f'{request.base_url}?offset={offset - limit}&limit={limit}', })

        return jsonify(self.result)

    def put(self, item_id: str = None) -> json:
        if item_id is None:
            abort(404, error=404, message=f'{self.cls.__name__} id is not set.')

        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            tmp_dict[k] = v
            if k == 'parent' and v == '':
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
            'data': marshal(item, self.final_item),
            '_links': {
                'self': {'href': f'{request.base_url}{self.obj_title}/{item_id}'},
                f'all_{self.obj_title}': {'href': f'{request.base_url}{self.obj_title}'}
            }
        })
        return jsonify(self.result)

    def post(self) -> json:
        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            if k != '_id':
                tmp_dict[k] = v
            if k == 'parent' and v == '':
                tmp_dict[k] = None

        item = self.cls(**tmp_dict)
        try:
            self.saved_item = item.save()
        except ValidationError as err:
            abort(400, error=400, message=err)
            # return {'error': 400, 'message': err}

        self.result.update({
            'data': marshal(self.saved_item, self.final_item),
            '_links': {
                'self': {'href': f'{request.base_url}{self.obj_title}/{self.saved_item.id}'},
                f'all_{self.obj_title}': {'href': f'{request.base_url}{self.obj_title}'}
            }
        })
        response = make_response(jsonify(self.result), 201)
        response.mimetype = "application/json"
        response.headers.extend({"Location": f'{request.url}/{self.saved_item.id}'})
        # response = MyResponse(self.result, status=201)
        # response.headers.extend({"Location": f'{request.url}/{self.saved_item.id}'})
        return response

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
            '_links': {
                f'all_{self.obj_title}': {'href': f'{request.base_url}{self.obj_title}'}
            }
        })
        response = make_response(jsonify(self.result), 200)
        response.mimetype = "application/json"
        return response