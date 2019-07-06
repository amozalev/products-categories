from flask_bcrypt import check_password_hash
from flask_restful import Resource, reqparse
from myapp.db_models.User import User
from myapp.api_v1.rest_models.restBaseClass import RestBaseClass


class RestLogin(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser(bundle_errors=True)
        self.reqparse.add_argument('email', type=str, required=True)
        self.reqparse.add_argument('password', type=str, required=True)

    def post(self):
        args = self.reqparse.parse_args()

        try:
            user = User.objects.get(email=args.get('email'))
            if user and check_password_hash(user.password, args.get('password')):
                auth_token = User.encode_auth_token(str(user.id))
                if auth_token:
                    result = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token
                    }
                    return RestBaseClass.create_response(result, status_code=200)
            else:
                result = {
                    'status': 'fail',
                    'message': 'User does not exist.'
                }
                return RestBaseClass.create_response(result, status_code=404)
        except Exception as e:
            print(e)
            result = {
                'status': 'fail',
                'message': 'Try again'
            }
            return RestBaseClass.create_response(result, status_code=500)

    def options(self, **kwargs):
        response = RestBaseClass.create_response({})
        return response
