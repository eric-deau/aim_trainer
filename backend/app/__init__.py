from dotenv import load_dotenv
load_dotenv()
from flask import Flask
from .extensions import db, sess
from .config import DevelopmentConfig, ProductionConfig
from datetime import timedelta
import os

def create_app():
    app = Flask(__name__)

    env = os.environ.get("FLASK_ENV", "development")

    if env == "production":
        app.config.from_object(ProductionConfig)
    else:
        app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    sess.init_app(app)

    with app.app_context():
        from . import models
        db.create_all()

    from .auth_api import auth_bp
    from .gridshot_api import gridshot_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(gridshot_bp, url_prefix="/api")
    
    return app