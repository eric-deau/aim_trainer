from flask import Blueprint, request, jsonify, session
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from .extensions import db
from .models import User
from .validators import validate_username, validate_password

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    err = validate_username(username)
    if err:
        return jsonify({"error": err}), 400
    
    err = validate_password(password)
    if err:
        return jsonify({"error": err}), 400
    


    # if len(username) < 1:
    #     return jsonify({"error": "Please enter a username"}), 400
    # if len(password) < 8:
    #     return jsonify({"error": "Password too short"}), 400
    
    try:
        user = User(username=username, password_hash=generate_password_hash(password))
        db.session.add(user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Username already taken"}), 409
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": "Error signing up an account"}), 500
    
    session.clear()
    session["user_id"] = user.id
    session["username"] = user.username
    
    session.permanent = True

    return jsonify({
        "ok": True,
        "user": {"id": user.id, "username": user.username}
    }), 201

@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True) or {}

    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400
    
    try:
        user = User.query.filter_by(username=username).first()
    except Exception as e:
        return jsonify({"error": "Login error"}), 401
    
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Incorrect credentials"}), 401
    
    session.clear()
    session["user_id"] = user.id
    session["username"] = user.username

    session.permanent = True

    return jsonify({
        "ok": True,
        "user": {"id": user.id, "username": user.username}
    })

@auth_bp.post("/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})

@auth_bp.get("/validSession")
def valid_session():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({
                "ok": True,
                "user": None
            }), 200
        
        user = db.session.get(User, user_id)

        if not user:
            session.clear()
            return jsonify({
                "ok": True,
                "user": None
            }), 200
        
        return jsonify({
            "ok": True,
            "user": {
                "id": user.id,
                "username": user.username
            }
        }), 200
    except Exception as err:
        return jsonify({
            "ok": False,
            "error": "Session validation failed."
        }), 500

