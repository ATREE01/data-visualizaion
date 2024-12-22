from flask import render_template, Blueprint
import pandas as pd

history_income_expense_blueprint = Blueprint('history_income_expense', __name__)

@history_income_expense_blueprint.route('/')
def index():
    df = pd.read_csv("data/歷年收支.csv")
    historyData = df.to_json(orient='records')
    return render_template(
        'history-income-expense.html',
        historyData=historyData
    )