const incomeAnalyzeChart = document.getElementById('income-histogram-chart');
const incomeData = JSON.parse(document.getElementById('incomeData').value);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

const employeeCompensationTrace = {
    x: unpack(incomeData, '地區'),
    y: unpack(incomeData, '受僱人員報酬'),
    name: '受僱人員報酬',
    type: 'bar'
};

const businessOwnerIncomeTrace = {
    x: unpack(incomeData, '地區'),
    y: unpack(incomeData, '產業主所得'),
    name: '產業主所得',
    type: 'bar'
};

const propertyIncomeTrace = {
    x: unpack(incomeData, '地區'),
    y: unpack(incomeData, '財產所得收入'),
    name: '財產所得收入',
    type: 'bar'
};

const imputedRentIncomeTrace = {
    x: unpack(incomeData, '地區'),
    y: unpack(incomeData, '自用住宅設算租金收入'),
    name: '自用住宅設算租金收入',
    type: 'bar'
};

const transferIncomeTrace = {
    x: unpack(incomeData, '地區'),
    y: unpack(incomeData, '經常移轉收入'),
    name: '經常移轉收入',
    type: 'bar'
};

const data = [employeeCompensationTrace, businessOwnerIncomeTrace, propertyIncomeTrace, imputedRentIncomeTrace, transferIncomeTrace];

const layout = {
    barmode: 'stack',
    title: {
        text: '各地區收入組成',
        font: {
            family: 'Arial, sans-serif',
            size: 24,
            color: '#000'
        }
    },
    xaxis: {
        title: '地區'
    },
    yaxis: {
        title: '收入'
    }
};

Plotly.newPlot(incomeAnalyzeChart, data, layout);