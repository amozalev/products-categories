import datetime

from flask_bcrypt import check_password_hash
from flask_restful import Resource, reqparse
from myapp.db_models.User import User
from myapp.api_v1.rest_models.restBaseClass import RestBaseClass
from config import Config


class RestLogin(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('email', type=str, required=True)
        self.reqparse.add_argument('password', type=str, required=True)

    def post(self):
        args = self.reqparse.parse_args()
        epoch = datetime.datetime(1970, 1, 1, 0, 0, 0)

        try:
            user = User.objects.get(email=args.get('email'))
            if user and check_password_hash(user.password, args.get('password')):
                auth_token = User.encode_auth_token(str(user.id))
                if auth_token:
                    result = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token,
                        'expires': ((datetime.datetime.utcnow() - epoch) + Config.JWT_ACCESS_TOKEN_EXPIRES).total_seconds()
                    }
                    return RestBaseClass.create_response(result, status_code=200)
            else:
                result = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return RestBaseClass.create_response(result, status_code=404)
        except Exception as e:
            print('restLogin err:', e)
            result = {
                'status': 'fail',
                'message': 'Try again'
            }
            return RestBaseClass.create_response(result, status_code=500)

    def options(self, **kwargs):
        response = RestBaseClass.create_response({})
        return response
