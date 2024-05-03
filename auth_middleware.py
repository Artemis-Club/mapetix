import os
import jwt

from flask import request

from exceptions import APIException


class AuthMiddleware:

    @staticmethod
    def is_valid_token(token):
        secret = os.getenv('SUPABASE_JWT')
        try:
            return jwt.decode(token, secret, algorithms=["HS256"],options={"verify_aud": False ,"verify_iat":False})
        except Exception as e:
            print(str(e))

    def authenticate(self):
        auth_token = request.headers.get('Authorization')
        print(auth_token)
        if not auth_token or not self.is_valid_token(auth_token):
            raise APIException('Unauthorized', 401)


def require_authentication(func):
    def wrapper(*args, **kwargs):
        AuthMiddleware().authenticate()
        return func(*args, **kwargs)

    return wrapper