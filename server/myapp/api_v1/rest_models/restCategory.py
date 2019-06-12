import json
import bson
from flask_restful import Resource, reqparse
from server.myapp.db_models.Category import Category as _Category


class Category(Resource):
    def get(self, category_id=None, skip: int = 0, limit: int = 10) -> json:
        parser = reqparse.RequestParser()
        parser.add_argument('skip', type=int)
        parser.add_argument('limit', type=int)
        args = parser.parse_args()
        if args['skip'] is not None:
            skip = args['skip']
        if args['limit'] is not None:
            limit = args['limit']

        if category_id is not None:
            categories = _Category.objects(_id=bson.ObjectId(category_id))
        else:
            categories = _Category.objects
        data = json.loads(categories.skip(skip).limit(limit).to_json())
        return {'data': data}

    def post(self):
        pass
