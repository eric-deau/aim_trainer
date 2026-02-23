from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from .extensions import db, sess
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-change-me")

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "db connection string here",
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["SESSION_TYPE"] = os.environ.get("SESSION_TYPE", "filesystem")
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

    # for production for HTTPS
    #app.config["SESSION_COOKIE_SECURE"] = True

    db.init_app(app)
    sess.init_app(app)

    from . import models
    with app.app_content():
        db.create_all()
    
    from .auth_api import auth_bp
    from .gridshot_api import gridshot_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(gridshot_bp, url_prefix="/api")

    @app.get("/")
    def home():
        return "Flask backend is live"
    
    return app