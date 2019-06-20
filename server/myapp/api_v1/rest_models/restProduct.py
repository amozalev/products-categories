import json
from flask import request, url_for
from flask_restful import reqparse
from marshmallow import Schema, fields, post_dump

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from myapp.db_models import Product


class ProductSchema(Schema):
    id = fields.Str()
    title = fields.Str()
    price = fields.Float()
    description = fields.Str()
    picture = fields.Str()
    categoryId = fields.Str(attribute='category_id')
    volume = fields.Float()
    units = fields.Str()
    producer = fields.Str()

    @post_dump
    def add_link(self, in_data):
        for k, v in in_data.items():
            if not v:
                in_data[k] = ''

        if not request.base_url.endswith(in_data['id']):
            in_data['_links'] = {
                'self': {
                    'href': f'{request.host_url.rstrip("/")}{url_for("api_v1.products")}' + in_data['id']
                }
            }
        else:
            in_data['_links'] = {
                'self': {
                    'href': f'{request.host_url.rstrip("/")}{url_for("api_v1.products")}'
                }
            }
        return in_data


class RestProduct(RestBaseClass):
    title = 'products'
    schema = ProductSchema()

    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str, required=True)
        self.reqparse.add_argument('title', type=str, required=True)
        self.reqparse.add_argument('price', type=float, required=True)
        self.reqparse.add_argument('description', type=str, required=True)
        self.reqparse.add_argument('picture', type=str, required=True)
        self.reqparse.add_argument('category_id', type=str, required=True)
        self.reqparse.add_argument('volume', type=str, required=True)
        self.reqparse.add_argument('units', type=str, required=True)
        self.reqparse.add_argument('producer', type=str, required=True)

        super(RestProduct, self).__init__(getattr(Product, 'Product'), self.title, self.schema)

    def get(self, prod_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.replace_argument('_id', type=str)
        self.reqparse.replace_argument('title', type=str)
        self.reqparse.replace_argument('price', type=float)
        self.reqparse.replace_argument('description', type=str)
        self.reqparse.replace_argument('picture', type=str)
        self.reqparse.replace_argument('category_id', type=str)
        self.reqparse.replace_argument('volume', type=float)
        self.reqparse.replace_argument('units', type=str)
        self.reqparse.replace_argument('producer', type=str)
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

        return super(RestProduct, self).get(item_id=prod_id, offset=offset, limit=limit)

    def put(self, prod_id: str = None) -> json:
        self.reqparse.remove_argument('_id')

        return super(RestProduct, self).put(prod_id)

    def post(self) -> json:
        self.reqparse.replace_argument('_id', type=str)

        return super(RestProduct, self).post()

    def delete(self, prod_id: str = None) -> json:
        self.reqparse.replace_argument('_id', type=str)
        self.reqparse.replace_argument('title', type=str)
        self.reqparse.replace_argument('price', type=float)
        self.reqparse.replace_argument('description', type=str)
        self.reqparse.replace_argument('picture', type=str)
        self.reqparse.replace_argument('category_id', type=str)
        self.reqparse.replace_argument('volume', type=str)
        self.reqparse.replace_argument('units', type=str)
        self.reqparse.replace_argument('producer', type=str)
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

        return super(RestProduct, self).delete(prod_id)
