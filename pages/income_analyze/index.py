from flask import render_template, Blueprint, jsonify
import pandas as pd


income_analyze_blueprint = Blueprint('income_analyze', __name__)

@income_analyze_blueprint.route('/')
def index():
    df = pd.read_csv("data/112家庭收入.csv")
    df = df.drop(df.columns[1:6], axis=1)
    df = df.loc[:, ['地區', '受僱人員報酬', '所得收入總計', '產業主所得', '財產所得收入', '自用住宅設算租金收入', '經常移轉收入']]
    
    incomeData = df.to_json(orient='records')
    return render_template(
        'income-analyze.html',
        incomeData=incomeData
    )


