
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


let showChart = (cat, val, type) => {
    var option = {
        legend: {
            // Try 'horizontal'
            orient: 'horizontal',
            // right: 100,
            top: '0',
            // top: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return (
                    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +
                    date.getHours() + ':' + date.getMinutes() + ' น.' +
                    ' = ' +
                    params.value + ' cm.'
                );
            },
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
    console.log(type);
    if (type == "de") {
        option["xAxis"] = { type: 'category', data: cat };
        option["series"] = [{ data: val, type: 'scatter', name: 'de' }];
        if (option && typeof option === 'object') {
            chart_e.setOption(option);
        }
        window.addEventListener('resize', chart_e.resize);
    } else if (type == "dn") {
        option["xAxis"] = { type: 'category', data: cat };
        option["series"] = [{ data: val, type: 'scatter', name: 'dn' }];
        if (option && typeof option === 'object') {
            chart_n.setOption(option);
        }
        window.addEventListener('resize', chart_n.resize);
    } else if (type == "dh") {
        option["xAxis"] = { type: 'category', data: cat };
        option["series"] = [{ data: val, type: 'scatter', name: 'dh' }];
        if (option && typeof option === 'object') {
            chart_h.setOption(option);
        }
        window.addEventListener('resize', chart_h.resize);
    }
}

let showData = (data) => {
    let table = $('#table').DataTable({
        ajax: {
            type: 'POST',
            url: '/api/selectdata',
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
            { data: 'ts7t' }
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
        let dd = dat.map(i => i.ts7t);
        let de = dat.map(i => i.de);
        let dn = dat.map(i => i.dn);
        let dh = dat.map(i => i.dh);
        showChart(dd, de, "de");
        showChart(dd, dn, "dn");
        showChart(dd, dh, "dh");
    })
}

const getData = () => {
    let stat_code = $("#stat_code").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();
    $("#table").dataTable().fnDestroy();
    showData({ stat_code, start_date, end_date });
}

const today = moment().format('YYYY-MM-DD')
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
const stat_code = '10';
$("#start_date").val(yesterday);
$("#end_date").val(today);
$("#stat_code").val('10');
showData({ stat_code: stat_code, start_date: yesterday, end_date: today })
