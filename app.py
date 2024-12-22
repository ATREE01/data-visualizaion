from flask import Flask, render_template

from pages.home.index import home_blueprint
from pages.example.index import example_blueprint
from pages.income_analyze.index import income_analyze_blueprint
from pages.disposable_income.index import disposable_income_blueprint
from pages.expense_analyze.index import expense_analyze_blueprint

app = Flask(__name__)

app.register_blueprint(home_blueprint, url_prefix='/')
app.register_blueprint(income_analyze_blueprint, url_prefix='/income-analyze')
app.register_blueprint(expense_analyze_blueprint, url_prefix='/expense-analyze')
app.register_blueprint(disposable_income_blueprint, url_prefix='/disposable-income')
app.register_blueprint(example_blueprint, url_prefix='/example')

if __name__ == '__main__':
    
    @app.route('/about')
    def about():
        return render_template('about.html')
    
    app.run(debug=True)