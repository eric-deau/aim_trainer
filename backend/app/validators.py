import re

USERNAME_RE = re.compile(r"^[A-Za-z0-9_]{2,24}$")
SPECIAL_RE = re.compile(r"[^A-Za-z0-9]")

def validate_username(username: str) -> str | None:
    if not isinstance(username, str):
        return "Username must be a string"
    username = username.strip()
    if not USERNAME_RE.match(username):
        return "Username must be 2-24 chars (letters, numbers, underscore)"
    return None

def validate_password(password: str) -> str | None:
    if not isinstance(password, str):
        return "Password must be a string"
    if len(password) < 5:
        return "Password must be at least 5 characters"
    if not any(c.isupper() for c in password):
        return "Password must contain at least one uppercase letter"
    if not SPECIAL_RE.search(password):
        return "Password must contain at least one special character"
    return None

def validate_run_payload(data: dict) -> tuple[dict | None, str | None]:
    required = ["mode", "score", "hits", "shots", "duration"]
    for k in required:
        if k not in data:
            return None, f"Missing field: {k}"

    mode = data.get("mode")
    if not isinstance(mode, str) or not (1 <= len(mode) <= 32):
        return None, "Invalid mode"

    def int_in_range(key, lo, hi):
        v = data.get(key)
        if not isinstance(v, int):
            return None, f"{key} must be an integer"
        if v < lo or v > hi:
            return None, f"{key} out of range"
        return v, None

    score, err = int_in_range("score", 0, 1_000_000)
    if err: return None, err
    hits, err = int_in_range("hits", 0, 100_000)
    if err: return None, err
    shots, err = int_in_range("shots", 0, 100_000)
    if err: return None, err
    duration_ms, err = int_in_range("duration", 1, 600_000)
    if err: return None, err

    if hits > shots:
        return None, "hits cannot exceed shots how did you do that lol"

    cleaned = {
        "mode": mode,
        "score": score,
        "hits": hits,
        "shots": shots,
        "duration_ms": duration_ms,
    }
    return cleaned, None