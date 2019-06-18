import json
from flask_restful import reqparse, fields

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from myapp.db_models import Product


class RestProduct(RestBaseClass):
    final_item = {
        'id': fields.String,
        'title': fields.String,
        'price': fields.Float,
        'description': fields.String,
        'picture': fields.String,
        'category': fields.String,
        'volume': fields.Float,
        'units': fields.String,
        'producer': fields.String
    }

    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str, required=True)
        self.reqparse.add_argument('title', type=str, required=True)
        self.reqparse.add_argument('price', type=float, required=True)
        self.reqparse.add_argument('description', type=str, required=True)
        self.reqparse.add_argument('picture', type=str, required=True)
        self.reqparse.add_argument('category', type=str, required=True)
        self.reqparse.add_argument('volume', type=str, required=True)
        self.reqparse.add_argument('units', type=str)
        self.reqparse.add_argument('producer', type=str)
        super(RestProduct, self).__init__(getattr(Product, 'Product'))

    def get(self, product_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.replace_argument('_id', type=str)
        self.reqparse.replace_argument('title', type=str)
        self.reqparse.replace_argument('price', type=float)
        self.reqparse.replace_argument('description', type=str)
        self.reqparse.replace_argument('picture', type=str)
        self.reqparse.replace_argument('category', type=str)
        self.reqparse.replace_argument('volume', type=str)
        self.reqparse.replace_argument('units', type=str)
        self.reqparse.replace_argument('producer', type=str)
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)
        return super(RestProduct, self).get(item_id=product_id, offset=offset, limit=limit)

    def put(self, product_id: str = None) -> json:
        return super(RestProduct, self).put(product_id)

    def post(self) -> json:
        return super(RestProduct, self).post()

    def delete(self, product_id: str = None) -> json:
        return super(RestProduct, self).delete(product_id)
