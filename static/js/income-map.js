const incomeBarChart = document.getElementById('mapChart');
const incomeData = JSON.parse(document.getElementById('incomeData').value);
const geo = document.getElementById('geo_data')
const geo_Data = JSON.parse(document.getElementById('geo_data').value);


function unpack(rows, key) {
    return rows.map(function(row){ 
        return row[key]; });
}

function draw_map(incomeData, geo_data) {

    let all_cities = [];
    for(let i=0; i<geo_data.features.length; i++) {
        all_cities.push(geo_data.features[i].properties.COUNTYNAME);
    }
    console.log(all_cities.sort())
    let trace1 = {
        type:"choropleth",
        locationmode: "geojson-id",
        featureidkey: "properties.COUNTYNAME",
        locations: unpack(incomeData, "地區"),
        geojson:geo_data,
        z: unpack(incomeData, "所得收入總計"),
        colorscale: [
            [0, 'lightyellow'],
            [1, 'brown']
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
    // console.log(trace1.z)
    // console.log(trace1.geojson)
    console.log(trace1.locations.sort())

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

    Plotly.newPlot("mapChart", data, layout);
}
draw_map(incomeData, geo_Data)
