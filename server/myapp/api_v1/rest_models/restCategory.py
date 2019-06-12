from flask_restful import Resource
from server.myapp.database import db
from server.myapp.utils import bson_to_json


class Category(Resource):
    def get(self, category_id):
        print('get categories')
        data = [bson_to_json(item) for item in db.product.find({})]
        return {'data': data}

    def post(self):
        pass
