import json
import bson
from flask_restful import Resource
from server.myapp.db_models.Category import Category as _Category


class Category(Resource):
    def get(self, category_id=None):
        if category_id is not None:
            categories = _Category.objects(_id=bson.ObjectId(category_id))
        else:
            categories = _Category.objects
        data = json.loads(categories.to_json())
        return {'data': data}

    def post(self):
        pass
