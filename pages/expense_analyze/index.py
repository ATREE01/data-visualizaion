from flask import render_template, Blueprint
import pandas as pd


expense_analyze_blueprint = Blueprint('expense_analyze', __name__)

@expense_analyze_blueprint.route('/')
def index():
    df = pd.read_csv("data/112家庭支出.csv")
    df = df.loc[:, ['地區', '食品及非酒精飲料', '菸酒及檳榔', '衣著鞋襪及服飾用品', '住宅服務、水電瓦斯及其他燃料',
                    '家具設備及家務維護', '醫療保健', '交通', '通訊', '休閒與文化', '教育', '餐廳及旅館', '什項消費']]
    
    expenseData = df.to_json(orient='records')
    return render_template(
        'expense-analyze.html',
        expenseData=expenseData
    )


