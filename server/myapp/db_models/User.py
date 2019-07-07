import jwt
from flask import current_app
from flask_jwt_extended import create_access_token, get_jwt_identity
from mongoengine import *


class User(Document):
    email = StringField(required=True)
    password = StringField(required=True)
    isAdmin = BooleanField(required=True)

    @staticmethod
    def encode_auth_token(user_id: str):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            user_id = str(user_id)
            token = create_access_token(identity=user_id)
            return token
        except Exception as e:
            print('User.encode_auth_token err:', e)
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
