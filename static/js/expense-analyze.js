const expenseHistogramChart = document.getElementById('expense-histogram-chart');
const expenseData = JSON.parse(document.getElementById('expenseData').value);
const regionList = expenseData.map(item => item['地區']);
const compareSelect1 = document.getElementById('compareSelect1');
const compareSelect2 = document.getElementById('compareSelect2');
const categories = [
    "食品及非酒精飲料", '菸酒及檳榔', '衣著鞋襪及服飾用品', '住宅服務、水電瓦斯及其他燃料',
    '家具設備及家務維護', '醫療保健', '交通', '通訊', '休閒與文化',
    '教育', '餐廳及旅館', '什項消費'
];
const data = [];

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

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

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

function drawCompareChart(regionA, regionB) {
    // 從 expenseData 中找出符合的資料
    const dataA = expenseData.find(d => d['地區'] === regionA);
    const dataB = expenseData.find(d => d['地區'] === regionB);

    if (!dataA || !dataB) {
        console.log('找不到地區資料，無法繪圖');
        return;
    }

	const categoriesWithLineBreaks = categories.map(c => c.replace(/(.{6})/g, '$1<br>'));
	
    // 左邊 (A 縣市) 的圖表
    const traceA = {
        x: categoriesWithLineBreaks,
        y: categories.map(c => dataA[c]),
        name: regionA,
        type: 'bar'
    };

    // 右邊 (B 縣市) 的圖表
    const traceB = {
        x: categoriesWithLineBreaks,
        y: categories.map(c => dataB[c]),
        name: regionB,
        type: 'bar'
    };

    const layout = {
        title: {
            text: `「${regionA}」 與 「${regionB}」 消費支出比較`,
            font: {
                family: 'Arial, sans-serif',
                size: 24,
                color: '#000'
            }
        },
		barmode: 'group',
        xaxis: {
            title: '消費種類',
            tickangle: 0, // X 軸文字水平顯示
			automargin: true
        },
        yaxis: {
            title: '消費金額',
            automargin: true // 自動調整邊距
        },
        width: 1200, // 整個圖表寬度
        height: 600 // 整個圖表高度
    };

    Plotly.newPlot('compare-chart', [traceA, traceB], layout);
}