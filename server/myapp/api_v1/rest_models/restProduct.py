from flask_restful import Resource
from server.myapp.database import db
from flask import jsonify
from bson import ObjectId
from server.myapp.utils import bson_to_json
from bson.json_util import dumps
import json
from bson import json_util


class Product(Resource):
    def get(self, product_id=None):
        query = {}
        if product_id is not None:
            query = {'_id': ObjectId(product_id)}

        # json.dumps(item, default=json_util.default)
        result = [bson_to_json(item) for item in db.product.find(query)]
        return jsonify({'data': result})

    def post(self):
        pass
