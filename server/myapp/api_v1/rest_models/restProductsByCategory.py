import bson
from typing import Any, Dict
from flask import jsonify
from flask_restful import Resource, abort
from mongoengine import DoesNotExist

from myapp.db_models.Category import Category
from myapp.db_models.Product import Product
from .restProduct import ProductSchema
from .restCategory import CategorySchema


class RestProductsByCategory(Resource):
    product_schema = ProductSchema()
    category_schema = CategorySchema()
    result: Dict[str, Any] = {
        'version': 1.0
    }

    def __init__(self):
        pass

    def get(self, cat_id):
        if cat_id is not None:
            try:
                category = Category.objects(pk=bson.ObjectId(cat_id)).get()
                items = Product.objects(categoryId=category['id'])
            except DoesNotExist as err:
                abort(404, error=404, message=err)

            self.result.update({
                'data': [self.product_schema.dump(item).data for item in items],
                'category': self.category_schema.dump(category).data
            })
        else:
            abort(404, error=404, message='Category id is absent')

        return jsonify(self.result)
