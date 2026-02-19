from flask import Flask, jsonify, request

app = Flask(__name__)

RUNS = []

@app.route("/")
def home():
    return "Flask backend is live"

@app.route("/api/leaderboard")
def leaderboard():
    top = sorted(RUNS, key=lambda r: r["score"], reverse=True)[:10]
    return jsonify({"ok": True, "rows": top})

@app.route("/api/runs", methods=["POST"])
def submit_runs():
    data = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip()
    score = int(data.get("score", -1))

    if not username or score < 0:
        return jsonify({"ok": False, "error": "Invalid Payload"}), 400
    
    RUNS.append({"username": username, "score": score})
    return jsonify({"ok": True}), 200

if __name__ == "__main__":
    app.run(debug=True)