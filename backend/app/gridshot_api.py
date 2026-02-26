from flask import Blueprint, request, jsonify, session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import desc
from .extensions import db
from .models import User, Runs
from .validators import validate_run_payload

gridshot_bp = Blueprint("gridshot", __name__)

def login_required():
    uid = session.get("user_id")
    if not uid:
        return None, (jsonify({"ok": False, "error": "Not logged in"}), 401)
    return uid, None

def to_int(value, default=None):
    try:
        return int(value)
    except (TypeError, ValueError):
        return default

@gridshot_bp.get("/leaderboard")
def leaderboard():
    mode = (request.args.get("mode") or "").strip()
    limit = to_int(request.args.get("limit"), 10)
    limit = max(1, min(limit, 100))
    offset = to_int(request.args.get("offset"), 0)

    try:
        q = (
            db.session.query(
                Runs.id,
                Runs.mode,
                Runs.score,
                Runs.hits,
                Runs.shots,
                Runs.duration_ms,
                Runs.created_at,
                User.username.label("username"),
            )
            .join(User, User.id == Runs.user_id)
        )

        if mode:
            q = q.filter(Runs.mode == mode)

        rows = (
            q.order_by(desc(Runs.score), desc(Runs.created_at))
             .limit(limit)
             .offset(offset)
             .all()
        )

        result_rows = [
            {
                "run_id": r.id,
                "username": r.username,
                "mode": r.mode,
                "score": r.score,
                "hits": r.hits,
                "shots": r.shots,
                "duration_ms": r.duration_ms,
                "created_at": r.created_at.isoformat() if r.created_at else None,
            }
            for r in rows
        ]

    except SQLAlchemyError as err:
        return jsonify({"ok": False, "error": "Error retrieving leaderboard."}), 500

    return jsonify({"ok": True, "rows": result_rows}), 200


@gridshot_bp.get("/runs")
def runs():
    user_id, err = login_required()
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    mode = (request.args.get("mode") or "").strip()
    limit = request.args.get("limit", default=25, type=int)
    offset = request.args.get("offset", default=0, type=int)
    limit = max(1, min(limit, 100))
    offset = max(0, offset)

    try:
        q = (
            db.session.query(
                Runs.id,
                Runs.mode,
                Runs.score,
                Runs.hits,
                Runs.shots,
                Runs.duration_ms,
                Runs.created_at,
                User.username.label("username"),
            )
            .join(User, User.id == Runs.user_id)
            .filter(Runs.user_id == user_id)
        )

        if mode:
            q = q.filter(Runs.mode == mode)

        rows = (
            q.order_by(desc(Runs.score), desc(Runs.created_at))
             .limit(limit)
             .offset(offset)
             .all()
        )

        result_rows = [
            {
                "run_id": r.id,
                "username": r.username,
                "mode": r.mode,
                "score": r.score,
                "hits": r.hits,
                "shots": r.shots,
                "duration_ms": r.duration_ms,
                "created_at": r.created_at.isoformat() if r.created_at else None,
            }
            for r in rows
        ]
    except SQLAlchemyError as err:
        return jsonify({"ok": False, "error": "Error retrieving runs."}), 500

    return jsonify({"ok": True, "rows": result_rows}), 200


@gridshot_bp.post("/submit-run")
def submit_run():
    user_id, err = login_required()
    if err:
        return err
    
    data = request.get_json(silent=True) or {}

    cleaned, err = validate_run_payload(data)
    if err:
        return jsonify({"error": err}), 400
    
    try:
        run = Runs(user_id=user_id, **cleaned)
        db.session.add(run)
        db.session.commit()
    except SQLAlchemyError as err:
        db.session.rollback()
        return jsonify({"ok": False, "error": "Error submitting run"}), 500

    return jsonify({"ok": True, "run_id": run.id}), 201


