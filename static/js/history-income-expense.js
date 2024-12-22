const historyLineChart = document.getElementById('historyLineChart');
const historyData = JSON.parse(document.getElementById('historyData').value);

console.log(historyData);

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}
const years = ['2023', '2022', '2021', '2020'];
const regions = historyData.slice(1); // Exclude the first row which contains the year labels

regions.forEach((region, index) => {

    const incomeTrace = {
        x: years,
        y: [region['收入'], region['收入.1'], region['收入.2'], region['收入.3']],
        name: `${region['類別']} 收入`,
        type: 'scatter'
    };

    const expenseTrace = {
        x: years,
        y: [region['支出'], region['支出.1'], region['支出.2'], region['支出.3']],
        name: `${region['類別']} 支出`,
        type: 'scatter'
    };

    const layout = {
        title: `${region['類別']} Income and Expense History`,
        xaxis: {
            title: 'Year',
            tickmode: 'linear',
            dtick: 1
        },
        yaxis: {
            title: 'Amount',
            tickmode: 'linear',
            dtick: 200000, // 0.2M step
            range: [0, 2000000] // Adding bias
        }
    };

    const regionDiv = document.createElement('div');
    regionDiv.id = `chart-${index}`;
    regionDiv.style.width = '33%';
    regionDiv.style.height = '400px';
    historyLineChart.appendChild(regionDiv);

    Plotly.newPlot(regionDiv, [incomeTrace, expenseTrace], layout);
});