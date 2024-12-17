from flask import render_template, Blueprint, jsonify

home_blueprint = Blueprint('home', __name__)

@home_blueprint.route('/')
def home():
    return render_template('index.html')


