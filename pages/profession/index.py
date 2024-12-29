from flask import render_template, Blueprint
import pandas as pd

profession_blueprint = Blueprint('profession', __name__)

@profession_blueprint.route('/')
def profession():
    df = pd.read_csv("data/112收支按經濟戶之職業區分.csv")
    df1 = pd.read_csv("data/112收支按農與非農家區分.csv")
    df = df.loc[:, ['職業', '家庭戶數', '所得收入總計', '非消費支出', '消費支出', '儲蓄']]
    df1 = df1.loc[:, ['類型', '家庭戶數', '所得收入總計', '非消費支出', '消費支出', '儲蓄']]
    
    professionData = df.to_json(orient='records')
    professionData1 = df1.to_json(orient='records')
    return render_template(
        'profession.html',
        professionData=professionData,
        professionData1=professionData1
    )
