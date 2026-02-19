from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask backend is live"

@app.route("/leaderboard")
def leaderboard():
    return jsonify({
        "ok":True,
        "rows": [
            {
                "username": "test_user",
                "score": 3 
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)