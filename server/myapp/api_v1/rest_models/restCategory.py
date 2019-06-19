import json
from flask_restful import reqparse, fields

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from myapp.db_models import Category


class RestCategory(RestBaseClass):
    title = 'categories'
    final_item = {
        'id': fields.String,
        'name': fields.String,
        'normal_name': fields.String,
        'parent': fields.String
    }

    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str)
        self.reqparse.add_argument('name', type=str)
        self.reqparse.add_argument('normal_name', type=str)
        self.reqparse.add_argument('parent', type=str)

        super(RestCategory, self).__init__(getattr(Category, 'Category'), self.title)

    def get(self, category_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

        return super(RestCategory, self).get(item_id=category_id, offset=offset, limit=limit)

    def put(self, category_id: str = None) -> json:
        self.reqparse.remove_argument('_id')
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('normal_name', type=str, required=True)
        self.reqparse.add_argument('parent', type=str)

        return super(RestCategory, self).put(category_id)

    def post(self) -> json:
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('normal_name', type=str, required=True)
        self.reqparse.add_argument('parent', type=str)

        return super(RestCategory, self).post()

    def delete(self, category_id: str = None) -> json:
        return super(RestCategory, self).delete(category_id)
