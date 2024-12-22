const disposableIncomeLineChart = document.getElementById('disposableIncomeLineChart');

const disposableIncomeData = JSON.parse(document.getElementById('disposableIncomeData').value);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

const disposableIncomeTrace = {
    x: unpack(disposableIncomeData, '地區'),
    y: unpack(disposableIncomeData, '可支配所得(中位數)'),
    mode: 'lines+markers',
    name: '可支配所得(中位數)'
};

const totalIncomeTrace = {
    x: unpack(disposableIncomeData, '地區'),
    y: unpack(disposableIncomeData, '所得總額'),
    mode: 'lines+markers',
    name: '所得總額'
};

const data = [disposableIncomeTrace, totalIncomeTrace];

const layout = {
    title: '不同地區所得總額與可支配所得(中位數)比較',
    xaxis: {
        title: 'Region'
    },
    yaxis: {
        title: 'Amount'
    }
};

Plotly.newPlot(disposableIncomeLineChart, data, layout);