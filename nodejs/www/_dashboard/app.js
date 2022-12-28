
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
    color: ["#009C95", "#21ba45"],
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
    xAxis: [
        {
            type: 'time',
            boundaryGap: false,
            axisLabel: {
                formatter: (function (value) {
                    return moment(value).format('HH:mm');
                })
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],

}

// option["xAxis"] = { type: 'time' };
let showChart = (cat, val, type) => {
    option["series"] = [
        {
            backgroundColor: '#4D86FF',
            name: 'Refuelling',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [["2018-08-15T10:04:01.339Z", 5], ["2018-08-15T10:40:13.914Z", 7]]
        },
        {
            name: 'Fuel Theft',
            type: 'line',
            smooth: true,
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [["2018-08-15T10:04:01.339Z", 1], ["2018-08-15T10:14:13.914Z", 2], ["2018-08-15T10:40:03.147Z", 3], ["2018-08-15T11:50:14.335Z", 4]]
        }
    ]

    if (type == "de") {
        // option["series"] = [{ data: val, type: 'line', name: 'de' }];
        if (option && typeof option === 'object') {
            chart_e.setOption(option);
        }
        window.addEventListener('resize', chart_e.resize);
    } else if (type == "dn") {
        // option["series"] = [{ data: val, type: 'line', name: 'dn' }];
        if (option && typeof option === 'object') {
            chart_n.setOption(option);
        }
        window.addEventListener('resize', chart_n.resize);
    } else if (type == "dh") {
        // option["series"] = [{ data: val, type: 'line', name: 'dh' }];
        if (option && typeof option === 'object') {
            chart_h.setOption(option);
        }
        window.addEventListener('resize', chart_h.resize);
    }
}

let singleSta = (dat) => {
    let dd = dat.map(i => i.ts7t);
    let de = dat.map(i => i.de);
    let dn = dat.map(i => i.dn);
    let dh = dat.map(i => i.dh);

    showChart(dd, de, "de");
    showChart(dd, dn, "dn");
    showChart(dd, dh, "dh");
}

let multipleSta = (dat) => {
    console.log(dat);
    let dd = dat.map(i => i.ts7);
    let de_st10 = dat.map(i => [i.ts7, i.de_st10]);
    let dn_st10 = dat.map(i => [i.ts7, i.dn_st10]);
    let dh_st10 = dat.map(i => [i.ts7, i.dh_st10]);

    let de_st04 = dat.map(i => [i.ts7, i.de_st04]);
    let dn_st04 = dat.map(i => [i.ts7, i.dn_st04]);
    let dh_st04 = dat.map(i => [i.ts7, i.dh_st04]);

    // let de = [{ data: [], type: 'line', name: 'de_st10' }, { data: de_st04, type: 'line', name: 'de_st04' }];
    // let dn = [{ data: [], type: 'line', name: 'dn_st10' }, { data: dn_st04, type: 'line', name: 'dn_st04' }];
    // let dh = [{ data: [], type: 'line', name: 'dh_st10' }, { data: dh_st04, type: 'line', name: 'dh_st04' }];

    showChart(dd, de_st10, "de");
    showChart(dd, dn_st10, "dn");
    showChart(dd, dh_st10, "dh");
}

let formatData = (dat, st_code) => {
    let stat_code = JSON.parse(st_code)

    stat_code.forEach(e => {
        dat.filter(i => i.stat_code == "station" + e)
    });

    // 
}

let showData = (data) => {
    let table = $('#table').DataTable({
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
        // formatData(dat, data.stat_code)
        multipleSta(dat)
    })
}

const getData = () => {
    let stat_code = $("#stat_code").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();
    $("#table").dataTable().fnDestroy();
    showData({ stat_code: JSON.stringify(stat_code), start_date, end_date });
    // console.log(stat_code);
}

const today = moment().format('YYYY-MM-DD')
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

$("#start_date").val(yesterday);
$("#end_date").val(today);
$("#stat_code").val('10');
let stat_code = $("#stat_code").val();
showData({ stat_code: JSON.stringify(stat_code), start_date: yesterday, end_date: today })
