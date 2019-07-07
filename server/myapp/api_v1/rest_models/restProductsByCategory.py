import bson
from typing import Any, Dict
from flask_restful import Resource, abort, reqparse
from mongoengine import DoesNotExist

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
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
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

    def get(self, cat_id, offset: int = 0, limit: int = 6):
        args = self.reqparse.parse_args()
        if args['offset'] is not None:
            offset = args['offset']
        if args['limit'] is not None:
            limit = args['limit']
        if cat_id is not None:
            try:
                category = Category.objects(pk=bson.ObjectId(cat_id)).get()
                items = Product.objects(categoryId=category['id']).skip(offset).limit(limit)
            except DoesNotExist as err:
                abort(404, error=404, message=err)

            total = items.count()
            self.result.update({
                'data': [self.product_schema.dump(item).data for item in items],
                'category': self.category_schema.dump(category).data,
            })
            if total:
                print('total2', total)
                self.result = RestBaseClass.add_pages_to_result(self.result, total, offset, limit)
        else:
            abort(404, error=404, message='Category id is absent')

        response = RestBaseClass.create_response(self.result)
        return response

    def options(self, **kwargs):
        response = RestBaseClass.create_response({})
        return response

