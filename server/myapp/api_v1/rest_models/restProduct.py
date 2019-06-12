import json
import bson
from flask_restful import Resource, reqparse
from server.myapp.db_models.Product import Product as _Product


class Product(Resource):
    def get(self, product_id=None, skip: int = 0, limit: int = 10) -> json:
        parser = reqparse.RequestParser()
        parser.add_argument('skip', type=int)
        parser.add_argument('limit', type=int)
        args = parser.parse_args()
        if args['skip'] is not None:
            skip = args['skip']
        if args['limit'] is not None:
            limit = args['limit']

        if product_id is not None:
            products = _Product.objects(_id=bson.ObjectId(product_id))
        else:
            products = _Product.objects
        data = json.loads(products.skip(skip).limit(limit).to_json())
        return {'data': data}

    def post(self):
        pass
