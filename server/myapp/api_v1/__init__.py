from flask import Blueprint
from flask_restful import Api
from .rest_models import restCategory, restProduct


api_v1_bp = Blueprint('api_v1', __name__, url_prefix='/api/v1')
api = Api(api_v1_bp)

api.add_resource(restCategory.Category, '/categories/', endpoint='categories')
api.add_resource(restCategory.Category, '/categories/<string:category_id>')
api.add_resource(restProduct.Product, '/products/', endpoint='products')
api.add_resource(restProduct.Product, '/products/<string:product_id>')
