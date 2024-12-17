from flask import render_template, Blueprint, jsonify

example_blueprint = Blueprint('example', __name__)

@example_blueprint.route('/')
def example():
    return render_template('example.html')


