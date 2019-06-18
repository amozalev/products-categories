import json
import bson
from flask import jsonify, request, make_response
from flask_restful import Resource, abort, marshal
from mongoengine import DoesNotExist, ValidationError


class RestBaseClass(Resource):
    final_item = {}

    def __init__(self, classname):
        self.result = {
            'version': '1'
        }
        self.cls = classname
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
            except DoesNotExist:
                abort(404, error=404, message=f'self.cls {item_id} doesn\'t exist.')
            self.result.update({
                'data': marshal(item, self.final_item)
            })
        else:
            items = self.cls.objects.order_by('id').skip(offset).limit(limit)
            total = items.count()
            self.result.update({
                'from': offset,
                'to': offset + limit,
                'next': f'{request.base_url}?offset={offset + limit}&limit={limit}',
                'total': total,
                'data': [marshal(item, self.final_item) for item in items]
            })
            if offset - limit > 0:
                self.result.update({'previous': f'{request.base_url}?offset={offset - limit}&limit={limit}', })

        return jsonify(self.result)

    def put(self, item_id: str = None) -> json:
        if item_id is None:
            abort(404, error=404, message=f'self.cls id is not set.')

        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            tmp_dict[k] = v
            if k == 'parent' and v == '':
                tmp_dict[k] = None

        try:
            item = self.cls.objects.get(pk=bson.ObjectId(item_id))
        except DoesNotExist:
            abort(404, error=404, message=f'self.cls {item_id} doesn\'t exist.')
        try:
            item.update(**tmp_dict)
        except ValidationError:
            self.result.update({'error': 'Fields are required: name, normal_name'})
            abort(400, error=400, message=f'Fields are required: name, normal_name.')

        item = self.cls.objects.get(pk=bson.ObjectId(item_id))

        self.result.update(marshal(item, self.final_item, envelope='data'))
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
            saved_cat = item.save()
        except ValidationError:
            abort(400, error=400, message='Fields are required: name, normal_name')

        self.result.update({'data': marshal(saved_cat, self.final_item)})
        response = make_response(jsonify(self.result), 201)
        response.mimetype = "application/json"
        response.headers.extend({"Location": f'{request.url}/{saved_cat.id}'})
        # response = MyResponse(self.result, status=201)
        # response.headers.extend({"Location": f'{request.url}/{saved_cat.id}'})
        return response

    def delete(self, item_id: str = None) -> json:
        if item_id is None:
            abort(404, error=404, message=f'self.cls id is not set.')

        try:
            item = self.cls.objects.get(pk=bson.ObjectId(item_id))
        except DoesNotExist:
            abort(404, error=404, message=f'self.cls {item_id} doesn\'t exist.')

        item.delete()

        self.result.update({'status': 'accepted'})
        response = make_response(jsonify(self.result), 204)
        print('base resp: ', response)
        return response
