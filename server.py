from flask import Flask
from errorhandler import ErrorHandler
from router import Router

app = Flask(__name__)
Router(app)
ErrorHandler(app)

if __name__ == '__main__':
    app.run(port=5000, debug=True)