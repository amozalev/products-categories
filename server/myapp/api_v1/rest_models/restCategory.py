import json
from flask import request, url_for
from flask_restful import reqparse
from marshmallow import Schema, fields, post_dump

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from myapp.db_models import Category


class CategorySchema(Schema):
    id = fields.Str()
    name = fields.Str()
    displayName = fields.Str()
    parentId = fields.Str()

    @post_dump
    def add_link(self, in_data):
        for k, v in in_data.items():
            if not v:
                in_data[k] = ''

        if not request.base_url.endswith(in_data['id']):
            in_data['links'] = {
                'self': {
                    'href': f'{request.host_url.rstrip("/")}{url_for("api_v1.categories")}' + in_data['id']
                },
                'productsOfCategory': {
                    'href': f'{request.host_url.rstrip("/")}{url_for("api_v1.categories")}' +
                            in_data['id'] + '/products'
                }
            }
        else:
            in_data['links'] = {
                'self': {
                    'href': f'{request.host_url.rstrip("/")}{url_for("api_v1.categories")}'
                }
            }
        return in_data


class RestCategory(RestBaseClass):
    title = 'categories'
    schema = CategorySchema()

    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str)
        self.reqparse.add_argument('name', type=str)
        self.reqparse.add_argument('displayName', type=str)
        self.reqparse.add_argument('parentId', type=str)

        super(RestCategory, self).__init__(getattr(Category, 'Category'), self.title, self.schema)

    def get(self, cat_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

        return super(RestCategory, self).get(item_id=cat_id, offset=offset, limit=limit)

    def put(self, cat_id: str = None) -> json:
        self.reqparse.remove_argument('_id')
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('displayName', type=str, required=True)
        self.reqparse.add_argument('parentId', type=str)

        return super(RestCategory, self).put(cat_id)

    def post(self) -> json:
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('displayName', type=str, required=True)
        self.reqparse.add_argument('parentId', type=str)

        return super(RestCategory, self).post()

    def delete(self, cat_id: str = None) -> json:
        return super(RestCategory, self).delete(cat_id)
