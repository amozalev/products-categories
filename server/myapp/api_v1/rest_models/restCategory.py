import json
import bson
from flask_restful import Resource, reqparse, abort, marshal_with, fields
from mongoengine import DoesNotExist, ValidationError

from server.myapp.db_models.Category import Category

final_category = {
    '_id': fields.String,
    'name': fields.String,
    'normal_name': fields.String,
    'parent': fields.String
}


class RestCategory(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str,)
        self.reqparse.add_argument('name', type=str)
        self.reqparse.add_argument('normal_name', type=str)
        self.reqparse.add_argument('parent', type=str)
        super(RestCategory, self).__init__()

    @marshal_with(final_category, envelope='data')
    def get(self, category_id: str = None, skip: int = 0, limit: int = 10) -> json:
        self.reqparse.add_argument('skip', type=int)
        self.reqparse.add_argument('limit', type=int)
        args = self.reqparse.parse_args()
        if args['skip'] is not None:
            skip = args['skip']
        if args['limit'] is not None:
            limit = args['limit']

        if category_id is not None:
            categories = Category.objects(_id=bson.ObjectId(category_id))
        else:
            categories = Category.objects
        data = json.loads(categories.skip(skip).limit(limit).to_json())
        return data

    @marshal_with(final_category, envelope='data')
    def put(self, category_id: str = None) -> json:
        if category_id is None:
            abort(404, message=f'Category id is not set.')

        args = self.reqparse.parse_args()
        tmp = {}
        for k, v in args.items():
            if v is not None:
                tmp[k] = v

        try:
            Category.objects.get(_id=bson.ObjectId(category_id))
        except DoesNotExist:
            abort(404, message=f'Category {category_id} doesn\'t exist.')
        tmp['_id'] = bson.ObjectId(category_id)

        category = Category(**tmp)
        try:
            saved_cat = category.save()
        except ValidationError:
            result = {'error': 'Fields are required: _id, name, normal_name, parent'}
            return result
        result = json.loads(saved_cat.to_json())

        return result

    def post(self):
        pass

    def delete(self):
        pass
