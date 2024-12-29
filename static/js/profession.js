const professionChart1 = document.getElementById('professionChart1');
const professionChart2 = document.getElementById('professionChart2');
const professionChart3 = document.getElementById('professionChart3');
const professionChart4 = document.getElementById('professionChart4');
const professionChart5 = document.getElementById('professionChart5');

const professionData = JSON.parse(document.getElementById('professionData').value);
const professionData1 = JSON.parse(document.getElementById('professionData1').value);

function unpack(rows, key) {
    return rows.map(function (row){
        return row[key];
    });
}
const infor = [unpack(professionData, '所得收入總計'),unpack(professionData, '非消費支出'),unpack(professionData, '消費支出'),unpack(professionData, '儲蓄')];
const infor1 = [unpack(professionData1, '所得收入總計'),unpack(professionData1, '非消費支出'),unpack(professionData1, '消費支出'),unpack(professionData1, '儲蓄')]
const pN = ['民代和經理主管', '專業人員', '技術員及助理', '事務支援', '服務及銷售','農林漁牧', '技藝工作', '機械操作組裝', '基層技術與勞力', '其他'];
const data1=[], data2=[], data3=[], data4 = [];

for (let i = 10; i > 0; i--) {
    data1.push({
        type: "histogram",
        x: [infor[0][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data2.push({
        type: "histogram",
        x: [infor[1][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data3.push({
        type: "histogram",
        x: [infor[2][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

for (let i = 10; i > 0; i--) {
    data4.push({
        type: "histogram",
        x: [infor[3][i]],
        opacity: 0.9,
        name: pN[i-1]
    });
}

const data5 = [
    {
        type: 'table',
        header: {
            values: ["","非農家","農家"],
            font: {
                family: "Arial",
                size: 18
            },
            height: 30,
        },
        cells: {
            values: [
                ['所得收入總計','非消費支出','消費支出','儲蓄'],
                [infor1[0][1],infor1[1][1],infor1[2][1],infor1[3][1]],
                [infor1[0][2],infor1[1][2],infor1[2][2],infor1[3][2]]
            ],
            font: {
                family: "Arial",
                size: 18
            },
            height: 35,
        },
    }
]

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
        title: '所得收入總計',
    },
    yaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
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
        title: '非消費支出',
    },
    yaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
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
        title: '消費支出',
    },
    yaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
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
        title: '儲蓄金額',
    },
    yaxis: {
        title: '職業數量累計',
        tickvals:[0,1,2,3,4,5,6,7],
        ticktext: ["0","1","2","3","4","5","6","7"],
    },
    height: 400,
    barmode: "stack",//"stack", "group", "overlay"
};

const layout5 = {
    title: {
        text: '農與非農家的各項收支差異表',
        font: {
            size: 30,
            family: 'Arial, sans-serif',
            color: 'black'
        }
    },
    width: 600,
    height: 350,
}

Plotly.newPlot(professionChart1, data1, layout1);
Plotly.newPlot(professionChart2, data2, layout2);
Plotly.newPlot(professionChart3, data3, layout3);
Plotly.newPlot(professionChart4, data4, layout4);
Plotly.newPlot(professionChart5, data5, layout5);