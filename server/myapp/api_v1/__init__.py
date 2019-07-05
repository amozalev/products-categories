from flask import Blueprint
from flask_restful import Api
from .rest_models import restCategory, restProduct, restProductsByCategory, restLogin

api_v1_bp = Blueprint('api_v1', __name__, url_prefix='/api/v1')
api = Api(api_v1_bp)

api.add_resource(restCategory.RestCategory, '/categories/', endpoint='categories')
api.add_resource(restCategory.RestCategory, '/categories/<string:cat_id>', endpoint='category')
api.add_resource(restProductsByCategory.RestProductsByCategory, '/categories/<string:cat_id>/products/',
                 endpoint='productsByCategory')
api.add_resource(restProduct.RestProduct, '/products/', endpoint='products')
api.add_resource(restProduct.RestProduct, '/products/<string:prod_id>')
api.add_resource(restLogin.RestLogin, '/auth/login')
