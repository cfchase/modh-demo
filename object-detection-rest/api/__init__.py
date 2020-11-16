from flask import Flask
from api.config import Config


def create_app(app_name):
    api = Flask(app_name)

    api.config.from_object(Config)

    from api.v1 import v1
    api.register_blueprint(v1, url_prefix='/api')

    return api
