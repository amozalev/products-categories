import json
from flask import request
from flask_restful import reqparse
from marshmallow import Schema, fields, post_dump

from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from myapp.db_models import Category


class CategorySchema(Schema):
    id = fields.Str()
    name = fields.Str()
    normal_name = fields.Str()
    parent = fields.Str()

    @post_dump
    def add_link(self, in_data):
        if not request.base_url.endswith(in_data['id']):
            in_data['_links'] = {'self': {'href': f'{request.base_url}' + in_data['id']}}
        else:
            in_data['_links'] = {'self': {'href': f'{request.base_url}'}}
        return in_data


class RestCategory(RestBaseClass):
    title = 'categories'
    schema = CategorySchema()

    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('_id', type=str)
        self.reqparse.add_argument('name', type=str)
        self.reqparse.add_argument('normal_name', type=str)
        self.reqparse.add_argument('parent', type=str)

        super(RestCategory, self).__init__(getattr(Category, 'Category'), self.title, self.schema)

    def get(self, item_id: str = None, offset: int = 0, limit: int = 10) -> json:
        self.reqparse.add_argument('offset', type=int)
        self.reqparse.add_argument('limit', type=int)

        return super(RestCategory, self).get(item_id=item_id, offset=offset, limit=limit)

    def put(self, item_id: str = None) -> json:
        self.reqparse.remove_argument('_id')
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('normal_name', type=str, required=True)
        self.reqparse.add_argument('parent', type=str)

        return super(RestCategory, self).put(item_id)

    def post(self) -> json:
        self.reqparse.add_argument('name', type=str, required=True)
        self.reqparse.add_argument('normal_name', type=str, required=True)
        self.reqparse.add_argument('parent', type=str)

        return super(RestCategory, self).post()

    def delete(self, item_id: str = None) -> json:
        return super(RestCategory, self).delete(item_id)
