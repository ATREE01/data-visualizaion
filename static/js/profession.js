const professionChart1 = document.getElementById('professionChart1');
const professionChart2 = document.getElementById('professionChart2');
const professionChart3 = document.getElementById('professionChart3');
const professionChart4 = document.getElementById('professionChart4');

const professionData = JSON.parse(document.getElementById('professionData').value);

function unpack(rows, key) {
    return rows.map(function (row){
        return row[key];
    });
}
const infor = [unpack(professionData, '所得收入總計'),unpack(professionData, '非消費支出'),unpack(professionData, '消費支出'),unpack(professionData, '儲蓄')];
const pN = ['民代和經理主管', '專業人員', '技術員及助理', '事務支援', '服務及銷售','農林漁牧', '技藝工作', '機械操作組裝', '基層技術與勞力', '其他'];
const data1=[], data2=[], data3=[], data4 = [];

for (let i = 10; i > 0; i--) {
    data1.push({
        type: "histogram",
        y: [infor[0][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data2.push({
        type: "histogram",
        y: [infor[1][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data3.push({
        type: "histogram",
        y: [infor[2][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data4.push({
        type: "histogram",
        y: [infor[3][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

const layout1 = {
    title: {
        text: '各職業類別的"所得收入總計"',
        font: {
            size: 30,
            family: 'Arial, sans-serif',
            color: 'black'
        }
    },
    xaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
    yaxis: {
        title: '所得收入總計',
    },
    width: 1000,
    height: 400,
    barmode: "stack",//"stack", "group", "overlay"
};

const layout2 = {
    title: {
        text: '各職業類別的"非消費支出"金額',
        font: {
            size: 30,
            family: 'Arial, sans-serif',
            color: 'black'
        }
    },
    xaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
    yaxis: {
        title: '非消費支出'
    },
    width: 1000,
    height: 400,
    barmode: "stack",//"stack", "group", "overlay"
};

const layout3 = {
    title: {
        text: '各職業類別的"消費支出"金額',
        font: {
            size: 30,
            family: 'Arial, sans-serif',
            color: 'black'
        }
    },
    xaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
    yaxis: {
        title: '消費支出'
    },
    width: 1000,
    height: 400,
    barmode: "stack",//"stack", "group", "overlay"
};

const layout4 = {
    title: {
        text: '各職業類別的"儲蓄金額"',
        font: {
            size: 30,
            family: 'Arial, sans-serif',
            color: 'black'
        }
    },
    xaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
    yaxis: {
        title: '儲蓄金額'
    },
    width: 1000,
    height: 400,
    barmode: "stack",//"stack", "group", "overlay"
};

Plotly.newPlot(professionChart1, data1, layout1);
Plotly.newPlot(professionChart2, data2, layout2);
Plotly.newPlot(professionChart3, data3, layout3);
Plotly.newPlot(professionChart4, data4, layout4);