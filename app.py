from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret!"
socketio = SocketIO(app)

DATA_FILE = "data.json"

courses = []

if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

def load_courses():
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_courses(courses):
    with open(DATA_FILE, "w") as f:
        json.dump(courses, f, indent=2, ensure_ascii=False)

def add_item(item):
    if item and item not in courses:
        courses.append(item)
        save_courses(courses)
        return True
    return False

def remove_item(item):
    if item and item in courses:
        courses.remove(item)
        save_courses(courses)
        return True
    return False

courses = load_courses()

@app.route("/")
def index():
    return render_template("index.html", articles = courses)

@socketio.on("connect")
def handle_connect():
    emit("update_list", courses)

@socketio.on("add_article")
def handle_add_article(data):
    print("add_article")
    article = data.get("article")
    if add_item(article):
        emit("update_list", courses, broadcast=True)

@socketio.on("remove_article")
def handle_remove_article(data):
    article = data.get("article")
    if remove_item(article):
        emit("update_list", courses, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8080, debug=True)