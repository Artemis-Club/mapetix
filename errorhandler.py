from flask import jsonify

from exceptions import APIException


class ErrorHandler:
    def __init__(self, app):
        app = app

        @app.errorhandler(APIException)
        def handle_exception(error):
            response = jsonify(error.to_dict())
            response.status_code = error.status_code
            return response