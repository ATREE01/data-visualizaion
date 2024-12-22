const expenseHistogramChart = document.getElementById('expense-histogram-chart');
const expenseData = JSON.parse(document.getElementById('expenseData').value);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

const data = [];
const categories = [
    "食品及非酒精飲料", '菸酒及檳榔', '衣著鞋襪及服飾用品', '住宅服務、水電瓦斯及其他燃料',
    '家具設備及家務維護', '醫療保健', '交通', '通訊', '休閒與文化',
    '教育', '餐廳及旅館', '什項消費'
];

categories.forEach(category => {
    data.push({
        x: unpack(expenseData, '地區'),
        y: unpack(expenseData, category),
        name: category,
        type: 'bar'
    });
});

const layout = {
    barmode: 'stack',
    title:{
        text: '各地區消費支出',
        font: {
            family: 'Arial, sans-serif',
            size: 24,
            color: '#000'
        }
    },
    xaxis: { title: '地區' },
    yaxis: { title: '消費金額' }
};

Plotly.newPlot(expenseHistogramChart, data, layout);

const treemap = document.getElementById('treemap');
Object.values(expenseData).forEach(regionData => {
    
    const regionDiv = document.createElement('div');
    regionDiv.id = `treemap-${regionData['地區']}`;
    regionDiv.style.width = '45%';
    regionDiv.style.height = '500px';
    treemap.appendChild(regionDiv);

    const treemapData = [{
        type: "treemap",
        labels: categories,
        parents: Array(categories.length).fill(regionData['地區']),
        values: categories.map(category => regionData[category]),
        textinfo: "label+value+percent parent"
    }];

    const treemapLayout = {
        title: {
            text: `${regionData['地區']} 消費支出分佈`,
            font: {
                family: 'Arial, sans-serif',
                size: 24,
                color: '#000'
            }
        }
    };

    Plotly.newPlot(regionDiv.id, treemapData, treemapLayout);
});