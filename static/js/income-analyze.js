const incomeBarChart = document.getElementById('incomeBarChart');
const incomeData = JSON.parse(document.getElementById('incomeData').value);
const regionList = incomeData.map(item => item['地區']);
const compareSelect1 = document.getElementById('compareSelect1');
const compareSelect2 = document.getElementById('compareSelect2');
function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

const data = [];
const categories = ['受僱人員報酬', '產業主所得', '財產所得收入', '自用住宅設算租金收入', '經常移轉收入'];

categories.forEach((category) => {
    const trace = {
        x: unpack(incomeData, '地區'),
        y: unpack(incomeData, category),
        name: category,
        type: 'bar'
    }
    data.push(trace);
});

// 動態產生 <option> 標籤，放入 compareSelect1 和 compareSelect2
regionList.forEach(region => {
    const option1 = document.createElement('option');
    option1.value = region;
    option1.text = region;
    compareSelect1.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = region;
    option2.text = region;
    compareSelect2.appendChild(option2);
});

// 預設先選第一個、第二個
compareSelect1.selectedIndex = 1;
compareSelect2.selectedIndex = 0;

// 一開始頁面載入時，就先繪製一次
drawCompareChart(compareSelect1.value, compareSelect2.value);

// 當使用者改變下拉選單選擇時，呼叫 drawCompareChart
compareSelect1.addEventListener('change', () => {
    drawCompareChart(compareSelect1.value, compareSelect2.value);
});
compareSelect2.addEventListener('change', () => {
    drawCompareChart(compareSelect1.value, compareSelect2.value);
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
        labels: categories,
        values: categories.map(category => regionData[category]),
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


function drawCompareChart(regionA, regionB) {
    // 從 incomeData 中找出符合的資料
    const dataA = incomeData.find(d => d['地區'] === regionA);
    const dataB = incomeData.find(d => d['地區'] === regionB);

    if (!dataA || !dataB) {
        console.log('找不到地區資料，無法繪圖');
        return;
    }
	
    // 左邊 (A 縣市) 的圖表
    const traceA = {
        x: categories,
        y: categories.map(c => dataA[c]),
        name: regionA,
        type: 'bar'
    };

    // 右邊 (B 縣市) 的圖表
    const traceB = {
        x: categories,
        y: categories.map(c => dataB[c]),
        name: regionB,
        type: 'bar'
    };

    const layout = {
        title: {
            text: `「${regionA}」 與 「${regionB}」 收入組成比較`,
            font: {
                family: 'Arial, sans-serif',
                size: 24,
                color: '#000'
            }
        },
		barmode: 'group',
        xaxis: {
            title: '收入種類',
            tickangle: 0, // X 軸文字水平顯示
			automargin: true
        },
        yaxis: {
            title: 'NTD',
            automargin: true // 自動調整邊距
        },
        width: 800, // 整個圖表寬度
        height: 600 // 整個圖表高度
    };

    Plotly.newPlot('compare-chart', [traceA, traceB], layout);
}