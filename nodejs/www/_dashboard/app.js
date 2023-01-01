
var map = L.map('map').setView([51.505, -0.09], 13);
const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

osm.addTo(map);

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

var option2 = {
    legend: {
        orient: 'horizontal',
        // right: 100,
        top: '0',
        // top: 'center'
    },
    tooltip: {
        trigger: 'axis',
        // formatter: function (params) {
        //     params = params[0];
        //     var date = new Date(params.axisValueLabel);
        //     return (
        //         date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +
        //         date.getHours() + ':' + date.getMinutes() + ' น.' +
        //         ' = ' +
        //         params.value + ' cm.'
        //     );
        // },
        axisPointer: {
            animation: false
        }
    },
    yAxis: {
        type: 'value'
    },
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
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
            // start: 40,
            // end: 60
        }, {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none'
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
};


var option = {
    title: {
        text: 'Fuel History',
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
                return moment(value).format('DD-MM-YYYY HH:mm');
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
        left: '5%',
        right: '5%',
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
            // start: 40,
            // end: 60
        }, {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none'
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
        top: '0',
        // top: 'center'
    },
}

// option["xAxis"] = { type: 'time' };
let showChart = (series, type) => {
    option["series"] = series

    console.log(series);

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
        let result_de = _.map(order, x => [x.ts7, x.de]);
        let result_dn = _.map(order, x => [x.ts7, x.dn]);
        let result_dh = _.map(order, x => [x.ts7, x.dh]);

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

var table;
let showData = (data) => {
    table = $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/api/selectmultidata',
            data: data,
            dataSrc: 'data',
            cache: true,
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
        // console.log(dat);
        formatData(dat, data.stat_code)
        // multipleSta(dat)
    })
}

const getData = () => {
    let stat_code = $("#stat_code").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();
    table.clear().draw();
    $("#table").dataTable().fnDestroy();
    showData({ stat_code: JSON.stringify(stat_code), start_date, end_date });
    console.log(stat_code);
}

const today = moment().format('YYYY-MM-DD')
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

$("#start_date").val(yesterday);
$("#end_date").val(today);
$("#stat_code").val('10');
let stat_code = $("#stat_code").val();
showData({ stat_code: JSON.stringify(stat_code), start_date: yesterday, end_date: today })
