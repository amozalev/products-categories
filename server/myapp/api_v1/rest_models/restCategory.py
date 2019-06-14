import json
import bson
from flask import jsonify, request, make_response
from flask_restful import Resource, reqparse, abort, marshal, fields
from mongoengine import DoesNotExist, ValidationError

from server.myapp.db_models.Category import Category

final_category = {
    'id': fields.String,
    'name': fields.String,
    'normal_name': fields.String,
    'parent': fields.String
}


class RestCategory(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str, )
        self.reqparse.add_argument('name', type=str)
        self.reqparse.add_argument('normal_name', type=str)
        self.reqparse.add_argument('parent', type=str)
        super(RestCategory, self).__init__()

    def get(self, category_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)
        args = self.reqparse.parse_args()
        if args['offset'] is not None:
            offset = args['offset']
        if args['limit'] is not None:
            limit = args['limit']

        result = {}
        if category_id is not None:
            try:
                category = Category.objects.get(pk=bson.ObjectId(category_id))
            except DoesNotExist:
                abort(404, error=404, message=f'Category {category_id} doesn\'t exist.')
            result.update({
                'data': marshal(category, final_category)
            })
        else:
            categories = Category.objects.order_by('id').skip(offset).limit(limit)
            total = categories.count()
            result.update({
                'from': offset,
                'to': offset + limit,
                'next': f'{request.base_url}?offset={offset + limit}&limit={limit}',
                'total': total,
                'data': [marshal(item, final_category) for item in categories]
            })
            if offset - limit >= 0:
                result.update({'previous': f'{request.base_url}?offset={offset - limit}&limit={limit}', })

        return jsonify(result)

    def put(self, category_id: str = None) -> json:
        if category_id is None:
            abort(404, error=404, message=f'Category id is not set.')

        args = self.reqparse.parse_args()
        tmp_dict = {}
        for k, v in args.items():
            if v is not None:
                tmp_dict[k] = v

        try:
            category = Category.objects.get(pk=bson.ObjectId(category_id))
        except DoesNotExist:
            abort(404, error=404, message=f'Category {category_id} doesn\'t exist.')

        try:
            category.update(**tmp_dict)
        except ValidationError:
            result = {'error': 'Fields are required: _id, name, normal_name, parent'}
            return jsonify(result)

        category = Category.objects.get(pk=bson.ObjectId(category_id))

        result = marshal(category, final_category, envelope='data')
        return jsonify(result)

    def post(self) -> json:
        args = self.reqparse.parse_args()
        tmp = {}
        for k, v in args.items():
            if k != '_id' and v is not None:
                tmp[k] = v

        category = Category(**tmp)
        try:
            saved_cat = category.save()
        except ValidationError:
            abort(400, error=400, message='All fields are required: name, normal_name, parent')

        result = json.dumps(marshal(saved_cat, final_category, envelope='data'))
        response = make_response(result, 201)
        response.mimetype = "application/json"
        response.headers.extend({"Location": f'{request.url}/{saved_cat.id}'})
        return response

    def delete(self, category_id: str = None) -> json:
        if category_id is None:
            abort(404, error=404, message=f'Category id is not set.')

        try:
            category = Category.objects.get(pk=bson.ObjectId(category_id))
        except DoesNotExist:
            abort(404, error=404, message=f'Category {category_id} doesn\'t exist.')

        category.delete()

        return {'status': 'accepted'}, 204
