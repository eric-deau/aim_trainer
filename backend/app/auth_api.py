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
    remember = bool(data.get("remember", False))

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

    session.permanent = remember

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
    
@auth_bp.post("/change-password")
def change_password():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(silent=True) or {}
    current_password = data.get("current_password") or ""
    new_password = data.get("new_password") or ""

    if not current_password:
        return jsonify({"error": "Current password is required"}), 400

    err = validate_password(new_password)
    if err:
        return jsonify({"error": err}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    if not check_password_hash(user.password_hash, current_password):
        return jsonify({"error": "Current password is incorrect"}), 400

    if check_password_hash(user.password_hash, new_password):
        return jsonify({"error": "New password must be different"}), 400

    try:
        user.password_hash = generate_password_hash(new_password)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Failed to change password"}), 500

    return jsonify({"ok": True}), 200

