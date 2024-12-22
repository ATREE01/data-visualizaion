from flask import render_template, Blueprint
import pandas as pd

disposable_income_blueprint = Blueprint('disposable_income', __name__)

@disposable_income_blueprint.route('/')
def disposable_income():
    df = pd.read_csv('data/112家庭支出.csv')
    df = df.loc[:, ['地區', '可支配所得(平均數)', '可支配所得(中位數)', '消費支出', '儲蓄', '所得總額', '樣本戶數', '可支配所得標準差']]
    disposableIncomeData = df.to_json(orient='records')
    
    return render_template(
        'disposable-income.html',
        disposableIncomeData=disposableIncomeData
    )