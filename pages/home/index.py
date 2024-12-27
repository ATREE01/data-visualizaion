from flask import render_template, Blueprint, jsonify
import pandas as pd
import json

home_blueprint = Blueprint('home', __name__)

@home_blueprint.route('/')
def home():
    with open("data/taiwan_geo.json", "r", encoding="utf-8") as geo_file:
        geo_data = json.load(geo_file)
    geo_data = json.dumps(geo_data)
    df = pd.read_csv("data/112家庭收入.csv")
    incomeData = df.to_json(orient='records')
    df = pd.read_csv("data/112家庭支出.csv")
    expenseData = df.to_json(orient="records")
    return render_template('index.html', incomeData=incomeData, expenseData=expenseData, geo_data=geo_data)


