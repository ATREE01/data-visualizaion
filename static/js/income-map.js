const income_map = document.getElementById('income_map');
const expense_map = document.getElementById('expense_map');

const incomeData = JSON.parse(document.getElementById('incomeData').value);
const expenseData = JSON.parse(document.getElementById('expenseData').value);

const geo = document.getElementById('geo_data')
const geo_Data = JSON.parse(document.getElementById('geo_data').value);


function unpack(rows, key) {
    return rows.map(function(row){ 
        return row[key]; });
}

function draw_map() {

    let trace1 = {
        type:"choropleth",
        locationmode: "geojson-id",
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(incomeData, "地區"),
        geojson:geo_Data,
        z: unpack(incomeData, "所得收入總計"),
        colorscale: [
            [0, 'lightyellow'],
            [0.5, 'brown'],
            [1, 'red'],
        ],
        hovertemplate: "%{location}:"+"%{z:,}元",
        hoverlabel: {
            bgcolor: "white",
            bordercolor: "black",
            font: {
                family: "Arial",
                size: 30,
                color: "black"
            }
        },
        
    };
    
    trace1.locations.shift()
    trace1.z.shift()
    
    let trace2 = {
        type:"choropleth",
        locationmode: "geojson-id",
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(expenseData, "地區"),
        geojson:geo_Data,
        z: unpack(expenseData, "總額"),
        colorscale: [
            [0, 'lightblue'],
            [0.5, 'blue'],
            [1, 'Darkblue'],
        ],
        hovertemplate: "%{location}:"+"%{z:,}元",
        hoverlabel: {
            bgcolor: "white",
            bordercolor: "black",
            font: {
                family: "Arial",
                size: 30,
                color: "black"
            }
        },
        
    };
    trace2.z.shift()
    trace2.locations.shift()

    let data2 = [trace2]
    let data = [trace1];
    let layout = {
        title: {
            text: "112年各縣市所得收入總計",
            font: {
                size: 40,
                color: "black"
            },
            x: 0.5,
            y: 0.98,
        },
        geo:{
            center: {
                lon: 120.32,
                lat: 23.84
            },
            fitbounds: "locations",
            projection:{
                type: "mercator"
            },
            resolution: 50,
        },
        margin:{
            l:10,
            r:10,
            t:60,
            b:10,
        }
    };
    let layout2 = {
        title: {
            text: "112年各縣市支出總計",
            font: {
                size: 40,
                color: "black"
            },
            x: 0.5,
            y: 0.98,
        },
        geo:{
            center: {
                lon: 120.32,
                lat: 23.84
            },
            fitbounds: "locations",
            projection:{
                type: "mercator"
            },
            resolution: 50,
        },
        margin:{
            l:10,
            r:10,
            t:60,
            b:10,
        }
    };
    Plotly.newPlot("income_map", data, layout);
    Plotly.newPlot("expense_map", data2, layout2);
}
draw_map()
