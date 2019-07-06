from flask import Flask

import config
from .api_v1 import api_v1_bp, api
from .database import Mongo, mongodb_uri
from .jwt import jwt


def init_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)
    api.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(api_v1_bp)

    return app
