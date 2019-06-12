import json
import bson
from flask_restful import Resource
from server.myapp.db_models.Product import Product as _Product


class Product(Resource):
    def get(self, product_id=None):
        if product_id is not None:
            products = _Product.objects(_id=bson.ObjectId(product_id))
        else:
            products = _Product.objects
        data = json.loads(products.to_json())
        return {'data': data}

    def post(self):
        pass
