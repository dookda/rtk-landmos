const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const st_code = urlParams.get('st_code')
// map area
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

// get station
let removeLayer = () => {
    map.eachLayer(i => {
        if (i.options.name == "mk") {
            map.removeLayer(i)
        }
    })
}

// chart area

const legend = {
    position: 'top',
    display: true,
    labels: {
        usePointStyle: true,
        boxWidth: 10,
        fontSize: 8
    }
}
const x = {
    type: 'time',
    time: {
        displayFormats: {
            'millisecond': 'h:mm a',
            'second': 'DD MMM h:mm a',
            'minute': 'DD MMM h:mm a',
            'hour': 'DD MMM h:mm a',
            'day': 'DD MMM YYYY',
            'week': 'DD MMM YYYY',
            'month': 'DD MMM YYYY',
            'quarter': 'DD MMM YYYY',
            'year': 'DD MMM YYYY',
        }
    },
}
const zoom = {
    pan: {
        enabled: true,
        mode: 'xy',
    },
    zoom: {
        wheel: {
            enabled: true,
        },
        pinch: {
            enabled: true
        },
        drag: {
            enabled: false
        },
        mode: 'xy',
    },
}

const ctx = document.getElementById('en').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่าการเคลื่อนตัว (de และ dn) '
            // },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    drag: {
                        enabled: false
                    },
                    mode: 'xy',
                },
            },
        },
        scales: {
            x: {
                // min: -300,
                // max: 3000,
                title: {
                    display: true,
                    text: 'de (cm)'
                },
                grid: {
                    display: true,
                    drawTicks: true,
                    drawBorder: true,
                    lineWidth: function (context) {
                        if (context.tick.value == 0) {
                            return 2;
                        } {
                            return 0.5;
                        }
                    },
                    color: function (context) {
                        if (context.tick.value == 0) {
                            return '#6e6b6b';
                        } {
                            return '#bfbfbf';
                        }
                    }
                }
            },
            y: {
                // min: -300,
                // max: 4500,
                title: {
                    display: true,
                    text: 'dn (cm)'
                },
                grid: {
                    display: true,
                    drawTicks: true,
                    drawBorder: true,
                    lineWidth: function (context) {
                        if (context.tick.value == 0) {
                            return 2;
                        } {
                            return 0.5;
                        }
                    },
                    color: function (context) {
                        if (context.tick.value == 0) {
                            return '#6e6b6b';
                        } {
                            return '#bfbfbf';
                        }
                    }
                }
            }
        }
    },
});

const resetZoom = () => {
    chart.resetZoom();
}

// chart h
const cth = document.getElementById('h').getContext('2d');
const chartH = new Chart(cth, {
    type: 'line',
    data: {},
    options: {
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่า H Difference (dh)'
            // },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'dh (cm)'
                }
            }
        },
    },
});
const resetZoomH = () => {
    chartH.resetZoom();
}

// chart e
const cte = document.getElementById('e').getContext('2d');
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartE = new Chart(cte, {
    type: 'line',
    data: {},
    options: {
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่า E Difference (de)'
            // },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'de (cm)'
                }
            },
        }
    },
});

const resetZoomE = () => {
    chartE.resetZoom();
}

// chart n
const ctn = document.getElementById('n').getContext('2d');
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartN = new Chart(ctn, {
    type: 'line',
    data: {},
    options: {
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่า N Difference (dn)'
            // },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'dn (cm)'
                }
            },
        }
    },
});

const resetZoomN = () => {
    chartN.resetZoom();
}

// chart acceleration
const ctacc = document.getElementById('acc').getContext('2d');
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartAcc = new Chart(ctacc, {
    type: 'line',
    data: {},
    options: {
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่า N Difference (dn)'
            // },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'acceleration (cm/min2)'
                }
            },
        }
    },
});

const resetZoomAcc = () => {
    chartAcc.resetZoom();
}

// table area;
let showData = (data) => {
    // console.log(data);
    // loadMarker(data.stat_code)
    table = $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/apiv2/selectdata',
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
            { data: 'ts7t' }
        ],
        "order": [[1, 'asc']],
        "paging": true,
        "ordering": true,
        "info": false,
        "filter": true,
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
        // console.log(dat);
        let accel_e = [];
        dat.map((i, indx) => {
            if (indx > 0) {
                let a = moment(i.ts7);//now
                let b = moment(dat[indx - 1].ts7);
                let delDistance = i.de - dat[indx - 1].de;
                // console.log(delDistance);
                let delTime = a.diff(b, 'minutes');
                let acceleration = (delDistance / delTime);
                accel_e.push({ x: moment(i.ts7).subtract(7, 'h'), y: acceleration })
            }
        });

        let accel_n = [];
        dat.map((i, indx) => {
            if (indx > 0) {
                let a = moment(i.ts7);//now
                let b = moment(dat[indx - 1].ts7);
                let delDistance = i.dn - dat[indx - 1].dn;
                let delTime = a.diff(b, 'minutes');
                let acceleration = (delDistance / delTime);
                accel_n.push({ x: moment(i.ts7).subtract(7, 'h'), y: acceleration })
            }
        });

        let accel_h = [];
        dat.map((i, indx) => {
            if (indx > 0) {
                let a = moment(i.ts7);//now
                let b = moment(dat[indx - 1].ts7);
                let delDistance = i.dh - dat[indx - 1].dh;
                let delTime = a.diff(b, 'minutes');
                let acceleration = (delDistance / delTime);
                accel_h.push({ x: moment(i.ts7).subtract(7, 'h'), y: acceleration })
            }
        });

        // console.log(accel_e);

        let en0 = []
        dat.filter(i => i.status == 0).map(i => en0.push({ x: i.de, y: i.dn, z: i.status }))
        let en1 = []
        dat.filter(i => i.status == 1).map(i => en1.push({ x: i.de, y: i.dn, z: i.status }))
        let en2 = []
        dat.filter(i => i.status == 2).map(i => en2.push({ x: i.de, y: i.dn, z: i.status }))
        let en3 = []
        dat.filter(i => i.status == 3).map(i => en3.push({ x: i.de, y: i.dn, z: i.status }))
        let en4 = []
        dat.filter(i => i.status == 4).map(i => en4.push({ x: i.de, y: i.dn, z: i.status }))

        let h0 = []
        dat.filter(i => i.status == 0).map(i => h0.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dh, z: i.status }))
        let h1 = []
        dat.filter(i => i.status == 1).map(i => h1.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dh, z: i.status }))
        let h2 = []
        dat.filter(i => i.status == 2).map(i => h2.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dh, z: i.status }))
        let h3 = []
        dat.filter(i => i.status == 3).map(i => h3.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dh, z: i.status }))
        let h4 = []
        dat.filter(i => i.status == 4).map(i => h4.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dh, z: i.status }))

        let e0 = []
        dat.filter(i => i.status == 0).map(i => e0.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.de, z: i.status }))
        let e1 = []
        dat.filter(i => i.status == 1).map(i => e1.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.de, z: i.status }))
        let e2 = []
        dat.filter(i => i.status == 2).map(i => e2.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.de, z: i.status }))
        let e3 = []
        dat.filter(i => i.status == 3).map(i => e3.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.de, z: i.status }))
        let e4 = []
        dat.filter(i => i.status == 4).map(i => e4.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.de, z: i.status }))

        let n0 = []
        dat.filter(i => i.status == 0).map(i => n0.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dn, z: i.status }))
        let n1 = []
        dat.filter(i => i.status == 1).map(i => n1.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dn, z: i.status }))
        let n2 = []
        dat.filter(i => i.status == 2).map(i => n2.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dn, z: i.status }))
        let n3 = []
        dat.filter(i => i.status == 3).map(i => n3.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dn, z: i.status }))
        let n4 = []
        dat.filter(i => i.status == 4).map(i => n4.push({ x: moment(i.ts7).subtract(7, 'h'), y: i.dn, z: i.status }))


        chart.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: en0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: en1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: en2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: en3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: en4,
                showLine: false,
                hidden: true
            }]
        };
        chart.update();

        chartH.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: h0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: h1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: h2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: h3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: h4,
                showLine: false,
                hidden: true
            }]
        };
        chartH.scales.x.min = new Date(data.start_date).valueOf();
        chartH.scales.x.max = new Date(data.end_date).valueOf();
        chartH.update();
        chartH.resetZoom();

        chartE.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: e0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: e1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: e2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: e3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: e4,
                showLine: false,
                hidden: true
            }]
        };
        chartE.scales.x.min = new Date(data.start_date).valueOf();
        chartE.scales.x.max = new Date(data.end_date).valueOf();
        chartE.update();
        chartE.resetZoom();

        chartN.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: n0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: n1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: n2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: n3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: n4,
                showLine: false,
                hidden: true
            }]
        };
        chartN.scales.x.min = new Date(data.start_date).valueOf();
        chartN.scales.x.max = new Date(data.end_date).valueOf();
        chartN.update();
        chartN.resetZoom();

        chartAcc.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'red',
                label: 'ความเร่ง แกน e',
                data: accel_e,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "ความเร่ง แกน n",
                data: accel_n,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "ความเร่ง แกน z",
                data: accel_h,
                showLine: false,
            }]
        };
        chartAcc.scales.x.min = new Date(data.start_date).valueOf();
        chartAcc.scales.x.max = new Date(data.end_date).valueOf();
        chartAcc.update();
        chartAcc.resetZoom();
    })
}

const getData = () => {
    let stat_code = st_code;
    let start_date = moment($('#datetimes').data('daterangepicker').startDate).format('YYYY-MM-DD');
    let end_date = moment($('#datetimes').data('daterangepicker').endDate).format('YYYY-MM-DD');

    $("#table").dataTable().fnDestroy();
    showData({ stat_code, start_date, end_date })
}

let closeModal = () => {
    $('#checkModal').modal('hide')
}

$('#datetimes').daterangepicker({
    autoApply: true,
    startDate: moment().subtract(7, 'days'),
    endDate: moment(),
    locale: {
        format: 'DD-MM-YYYY'
    }
});

$('#datetimes').on('apply.daterangepicker', function (ev, picker) {
    getData()
});

$("#st_code").html(st_code)
$("#st_code2").html(st_code)
$("#st_code3").html(st_code)
getData()




var areaData = {
    labels: ["10", "", "", "20", "", "", "30", "", "", "40", "", "", "50", "", "", "60", "", "", "70"],
    datasets: [
        {
            data: [200, 480, 700, 600, 620, 350, 380, 350, 850, "600", "650", "350", "590", "350", "620", "500", "990", "780", "650"],
            borderColor: [
                '#4747A1'
            ],
            borderWidth: 2,
            fill: false,
            label: "Solar Generation"
        },
        {
            data: [400, 450, 410, 500, 480, 600, 450, 550, 460, "560", "450", "700", "450", "640", "550", "650", "400", "850", "800"],
            borderColor: [
                '#F09397'
            ],
            borderWidth: 2,
            fill: false,
            label: "Energy Consumption"
        }
    ]
};
var areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        filler: {
            propagate: false
        }
    },
    scales: {
        xAxes: [{
            display: true,
            ticks: {
                display: true,
                padding: 10,
                fontColor: "#6C7383"
            },
            gridLines: {
                display: false,
                drawBorder: false,
                color: 'transparent',
                zeroLineColor: '#eeeeee'
            }
        }],
        yAxes: [{
            display: true,
            ticks: {
                display: true,
                autoSkip: false,
                maxRotation: 0,
                stepSize: 200,
                min: 200,
                max: 1200,
                padding: 18,
                fontColor: "#6C7383"
            },
            gridLines: {
                display: true,
                color: "#f2f2f2",
                drawBorder: false
            }
        }]
    },
    legend: {
        display: false
    },
    tooltips: {
        enabled: true
    },
    elements: {
        line: {
            tension: .35
        },
        point: {
            radius: 0
        }
    }
}
var revenueChartCanvas = $("#order-chart").get(0).getContext("2d");
var revenueChart = new Chart(revenueChartCanvas, {
    type: 'line',
    data: areaData,
    options: areaOptions
});
