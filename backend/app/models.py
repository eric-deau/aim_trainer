from sqlalchemy import func
from .extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)

    runs = db.relationship("Runs", back_populates="user", cascade="all, delete-orphan")

class Runs(db.Model):
    __tablename__ = "runs"

    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    mode = db.Column(db.String(32), nullable=False, index=True)
    score = db.Column(db.Integer, nullable=False, index=True)
    hits = db.Column(db.Integer, nullable=False)
    shots = db.Column(db.Integer, nullable=False)
    duration_ms = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)

    user = db.relationship("User", back_populates="runs")

    __table_args__ = (
        db.Index("ix_runs_user_created", "user_id", "created_at"),
        db.Index("ix_runs_mode_score_created", "mode", "score", "created_at")
    )
    