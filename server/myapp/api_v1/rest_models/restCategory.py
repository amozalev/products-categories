import json
import bson
from flask_restful import Resource, reqparse, abort
from mongoengine import DoesNotExist

from server.myapp.db_models.Category import Category


class RestCategory(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('_id', required=True, type=str)
        self.reqparse.add_argument('name', required=True, type=str)
        self.reqparse.add_argument('normal_name', required=True, type=str)
        self.reqparse.add_argument('parent', required=True, type=str)
        super(RestCategory, self).__init__()

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
        return {'data': data}

    def put(self) -> json:
        args = self.reqparse.parse_args()
        tmp = {}
        for k, v in args.items():
            if v is not None:
                tmp[k] = v

        try:
            cat_id = Category.objects.get(_id=bson.ObjectId(args['_id']))
            if cat_id:
                print('cat_id: ', cat_id)
        except DoesNotExist:
            abort(404, message=f'Category {args["_id"]} doesn\'t exist.')

        category = Category(**tmp)
        result = category.save()
        data = json.loads(result.to_json())
        return {'data': data}

    def post(self):
        pass

    def delete(self):
        pass
