from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from .extensions import db
from .models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/signup")
def signup():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if len(username) < 1:
        return jsonify({"error": "Please enter a username"}), 400
    if len(password) < 8:
        return jsonify({"error": "Password too short"}), 400
    
    # if User.query.filter_by(username=username).first():
    #     return jsonify({"error": "Username is taken, please choose another"}), 409
    
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

    return jsonify({
        "ok": True,
        "user": {"id": user.id, "username": user.username}
    }), 201
