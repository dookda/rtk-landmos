
var map = L.map('map').setView([18.359549715002537, 99.69806926182481], 12);
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});
const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});

// const station = L.layerGroup();

var baseMaps = {
    "แผนที่ OSM": osm,
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb.addTo(map)
    // "Mapbox Streets": streets
};

var overlayMaps = {
    // "Cities": station.addTo(map)
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

map.pm.addControls({
    position: 'topleft',
    drawMarker: false,
    drawCircle: false,
    drawCircleMarker: false,
    drawPolyline: false,
    drawText: false,
    editMode: false,
    dragMode: false,
    cutPolygon: false,
    removalMode: false,
    rotateMode: false,
});

// get station
let removeLayer = () => {
    map.eachLayer(i => {
        if (i.options.name == "mk") {
            map.removeLayer(i)
        }
    })
}

var markers;
var redMarker = L.AwesomeMarkers.icon({
    icon: 'coffee',
    markerColor: 'red'
});

let showMarkerByList = (stations) => {
    removeLayer()
    markers.map(i => {
        let sta = (i.stat_code).split("rtk");
        let chk = stations.includes(sta[1]);
        if (chk) {
            L.marker([i.y_coor, i.x_coor], { icon: redMarker, name: 'mk' }).addTo(map);
        } else {
            L.marker([i.y_coor, i.x_coor], { name: 'mk' }).addTo(map);
        }
    });
}

let loadMarker = (stations) => {
    axios.get('/apiv2/basestation').then((r) => {
        markers = r.data;
        setTimeout(() => { showMarkerByList(stations) }, 1000)
    })
}

let showMarkerByMap = (mks, bnd) => {
    removeLayer();
    var polygon = turf.polygon([bnd.geometry.coordinates[0]]);
    var stat_code = [];
    mks.forEach((i) => {
        var point = turf.point([i.x_coor, i.y_coor]);
        var ptsWithin = turf.pointsWithinPolygon(point, polygon);
        if (ptsWithin.features.length > 0) {
            $('#st' + i.st_code).prop('checked', true);
            stat_code.push(i.st_code);
            L.marker([i.y_coor, i.x_coor], { icon: redMarker, name: 'mk' }).addTo(map);
        } else {
            $('#st' + i.st_code).prop('checked', false);
            L.marker([i.y_coor, i.x_coor], { name: 'mk' }).addTo(map);
        }
    });
    getData(stat_code);
}

// Initialize a global variable to store a reference to the previous feature
var previousFeature;

map.on('click', () => {
    if (previousFeature) {
        map.removeLayer(previousFeature);
    }
})

// Add a 'draw:created' event listener to the map
map.on('pm:create', function (e) {
    let mks = markers;
    let bnd = e.layer.toGeoJSON();
    showMarkerByMap(mks, bnd);
    var layer = e.layer;
    if (previousFeature) {
        map.removeLayer(previousFeature);
    }
    previousFeature = layer;
    layer.addTo(map);
});

const getStation = () => {
    return new Promise((resolve, reject) => {
        axios.get('/apiv2/basestation').then(r => {
            r.data.map(i => {
                document.getElementById("station_list").innerHTML += `<li > 
                    <div class="form-check form-check-flat">
                        <label class="form-check-label">
                          <input class="checkbox" type="checkbox" id="st${i.st_code}" value="${i.st_code}" >  ${i.stat_name}
                          <i class="input-helper"></i>
                        </label>
                    </div>
                </li>`
            })
            resolve();
        })
    })
}

// chart
var dom_e = document.getElementById('chart-e');
var chart_e = echarts.init(dom_e, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var dom_n = document.getElementById('chart-n');
var chart_n = echarts.init(dom_n, null, {
    renderer: 'canvas',
    useDirtyRect: false
});


var dom_h = document.getElementById('chart-h');
var chart_h = echarts.init(dom_h, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var option = {
    title: {
        // text: 'Fuel History',
        textStyle: {
            fontFamily: 'lato'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
            formatter: (function (value) {
                return moment(value).format(' DD-MM-YYYY HH:mm');
            })
        },
        splitLine: {
            show: true
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} cm'
        },
        // name: 'การเคลื่อนตัว',
        nameLocation: 'middle',
        nameGap: 30,
        splitLine: {
            show: true
        }
    },
    grid: {
        top: '10%',
        left: '8%',
        right: '4%',
        bottom: '25%'
    },
    toolbox: {
        itemSize: 15,
        right: 50,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {}
        }
    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none',
            top: 325,
            height: 20
            // start: 40,
            // end: 60
        }, {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none',
            width: 20
        }, {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
        }, {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none'
        }
    ],
    legend: {
        orient: 'horizontal',
        // right: 100,
        bottom: '1',
        // top: 'center'
    },
}

// option["xAxis"] = { type: 'time' };
let showChart = (series, type) => {
    option["series"] = series
    // console.log(series);
    if (type == "de") {
        if (option && typeof option === 'object') {
            chart_e.setOption(option, true);
        }
        window.addEventListener('resize', chart_e.resize);
    } else if (type == "dn") {
        if (option && typeof option === 'object') {
            chart_n.setOption(option, true);
        }
        window.addEventListener('resize', chart_n.resize);
    } else if (type == "dh") {
        if (option && typeof option === 'object') {
            chart_h.setOption(option, true);
        }
        window.addEventListener('resize', chart_h.resize);
    }
}

let color = [
    '#dd6b66',
    '#759aa0',
    '#e69d87',
    '#8dc1a9',
    '#ea7e53',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42',
    '#37A2DA',
    '#32C5E9',
    '#67E0E3',
    '#9FE6B8',
    '#FFDB5C',
    '#ff9f7f',
    '#fb7293',
    '#E062AE',
    '#E690D1',
    '#e7bcf3',
    '#9d96f5',
    '#8378EA',
    '#96BFFF'
]

let formatData = async (dat, st_code) => {
    let stat_code = JSON.parse(st_code);
    let series_de = [];
    let series_dn = [];
    let series_dh = [];
    _.forEach(stat_code, function (st, i) {
        let filterArray = _.filter(dat,
            { 'stat_code': st }
        );
        let order = _.orderBy(filterArray, ['ts7'], ['asc'])
        let result_de = _.map(order, x => [moment(x.ts7).subtract(7, 'h').format(), x.de]);
        // console.log(result_de);
        let result_dn = _.map(order, x => [moment(x.ts7).subtract(7, 'h').format(), x.dn]);
        let result_dh = _.map(order, x => [moment(x.ts7).subtract(7, 'h').format(), x.dh]);

        series_de.push({
            name: 'Station' + st,
            type: 'line',
            color: color[i],
            smooth: true,
            data: result_de
        })
        series_dn.push({
            name: 'Station' + st,
            type: 'line',
            color: color[i],
            smooth: true,
            data: result_dn
        })
        series_dh.push({
            name: 'Station' + st,
            type: 'line',
            color: color[i],
            smooth: true,
            data: result_dh
        })
    });

    showChart(series_de, "de")
    showChart(series_dn, "dn")
    showChart(series_dh, "dh")
}

// gaage chart
var optionG = {
    series: [
        {
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    width: 15,
                    color: [
                        [0.3, '#67e0e3'],
                        [0.7, '#37a2da'],
                        [1, '#fd666d']
                    ]
                }
            },
            pointer: {
                itemStyle: {
                    color: 'inherit'
                }
            },
            axisTick: {
                distance: -6,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 1
                }
            },
            splitLine: {
                distance: -15,
                length: 10,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            axisLabel: {
                color: 'inherit',
                distance: 23,
                fontSize: 10
            },
            detail: {
                valueAnimation: true,
                formatter: '{value} m/sec',
                color: 'inherit',
                fontSize: 18,
                offsetCenter: [0, '100%']
            },
            data: [
                {
                    value: (Math.random() * 100).toFixed(1)
                }
            ]
        }
    ]
};

var chartDomG = document.getElementById('g1');
var myChartG = echarts.init(chartDomG);
optionG && myChartG.setOption(optionG);

var chartDomG2 = document.getElementById('g2');
var myChartG2 = echarts.init(chartDomG2);
optionG && myChartG2.setOption(optionG);

var chartDomG3 = document.getElementById('g3');
var myChartG3 = echarts.init(chartDomG3);
optionG && myChartG3.setOption(optionG);

var chartDomG4 = document.getElementById('g4');
var myChartG4 = echarts.init(chartDomG4);
optionG && myChartG4.setOption(optionG);

// var chartDomG3 = document.getElementById('g3');
// var myChartG3 = echarts.init(chartDomG3);
// optionG && myChartG3.setOption(optionG);

// var chartDomG4 = document.getElementById('g4');
// var myChartG4 = echarts.init(chartDomG4);
// optionG && myChartG4.setOption(optionG);
// setInterval(function () {
//     myChartG.setOption({
//         series: [
//             {
//                 data: [
//                     {
//                         value: +(Math.random() * 100).toFixed(2)
//                     }
//                 ]
//             }
//         ]
//     });
// }, 2000);



// var table;
let showData = (data) => {
    // console.log(data);
    loadMarker(data.stat_code)
    table = $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/apiv2/selectmultidata',
            data: data,
            dataSrc: 'data',
            // cache: true,
            destroy: true
        },
        columns: [
            { data: 'sta_code_t' },
            { data: 'de' },
            { data: 'dn' },
            { data: 'dh' },
            { data: 'status' },
            { data: 'ts7' }
        ],
        "order": [[1, 'asc']],
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": true,
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],
        select: {
            style: 'os',
            selector: 'td:first-child'
        }
        // dom: 'Bfrtip',
        // buttons: [
        //     'excel', 'print'
        // ],
        // responsive: true,
        // scrollX: true,
        // order: [[5, 'asc']],
    });

    table.on('search.dt', async () => {
        let dat = table.rows({ search: 'applied' }).data();
        formatData(dat, data.stat_code)
    })
}


const getData = (arr) => {
    let stat_code = [];
    if (arr) {
        stat_code = arr
    } else {
        $(":checkbox:checked").each(function (e) {
            stat_code.push($(this).val());
        });
    }

    let start_date = moment($('#datetimes').data('daterangepicker').startDate).format('YYYY-MM-DD');
    let end_date = moment($('#datetimes').data('daterangepicker').endDate).format('YYYY-MM-DD');

    $("#table").dataTable().fnDestroy();
    showData({ stat_code: JSON.stringify(stat_code), start_date, end_date });
    // console.log({ stat_code: JSON.stringify(stat_code), start_date, end_date });
}

$('#datetimes').daterangepicker({
    autoApply: true,
    startDate: moment().subtract(7, 'days'),
    endDate: moment(),
    locale: {
        format: 'DD-MM-YYYY'
    }
});

getStation().then(() => {
    // init 
    let st_code = ["10"]
    getData(st_code)
    $('#st' + st_code).prop('checked', true);

    $('input[type="checkbox"]').change(function () {
        getData()
    });

    $('#datetimes').on('apply.daterangepicker', function (ev, picker) {
        getData()
    });
});
