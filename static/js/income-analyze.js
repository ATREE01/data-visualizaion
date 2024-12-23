const incomeBarChart = document.getElementById('incomeBarChart');

const incomeData = JSON.parse(document.getElementById('incomeData').value);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

const data = [];
const cateogries = ['受僱人員報酬', '產業主所得', '財產所得收入', '自用住宅設算租金收入', '經常移轉收入'];

cateogries.forEach((category) => {
    const trace = {
        x: unpack(incomeData, '地區'),
        y: unpack(incomeData, category),
        name: category,
        type: 'bar'
    }
    data.push(trace);
});

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

Plotly.newPlot(incomeBarChart, data, layout);

const pieChart = document.getElementById('pieChart');
Object.values(incomeData).forEach(regionData => {
    const regionDiv = document.createElement('div');
    regionDiv.id = `treemap-${regionData['地區']}`;
    regionDiv.style.width = '50%';
    regionDiv.style.height = '500px';
    pieChart.appendChild(regionDiv);

    const data = [{
        type: 'pie',
        labels: cateogries,
        values: cateogries.map(category => regionData[category]),
        textinfo: 'label+value+percent'
    }]

    const layout = {
        title: {
            text: `${regionData['地區']} 收入組成`,
            font: {
                family: 'Arial, sans-serif',
                size: 24,
                color: '#000'
            }
        }
    }

    Plotly.newPlot(regionDiv, data, layout);
});