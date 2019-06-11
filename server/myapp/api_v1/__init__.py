from flask import Blueprint
from flask_restful import Api
from .models import Category, Product


api_v1_bp = Blueprint('api_v1', __name__, url_prefix='/api/v1')
api = Api(api_v1_bp)

api.add_resource(Category.Category, '/categories/<string:category_id>')
api.add_resource(Product.Product, '/products', endpoint='products')
api.add_resource(Product.Product, '/products/<string:product_id>', endpoint='product')
