import bson
import math
from typing import Any, Dict
from flask import jsonify, make_response, request
from flask_restful import Resource, abort, reqparse
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
                self.result.update({
                    'pages': {
                        'from': offset + 1,
                        'to': offset + limit,
                        'offset': offset,
                        'limit': limit,
                        'next': f'{request.base_url}',
                        'current_page': math.ceil((offset + limit) / limit),
                        'pages_count': math.ceil(total / limit),
                        'items_count': total
                    }
                })
                if offset - limit > 0:
                    self.result['pages']['prev'] = f'{request.base_url}'
        else:
            abort(404, error=404, message='Category id is absent')

        # return jsonify(self.result)
        response = make_response(jsonify(self.result), 200)
        response.mimetype = "application/json"
        response.headers.extend({'Access-Control-Allow-Origin': 'http://localhost:4200'})
        return response
