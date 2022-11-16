
var map = L.map('map', {
    center: [18.359549715002537, 99.69806926182481],
    zoom: 12,
    zoomControl: false
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    lyr: 'basemap'
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

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

var prov = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/wms?", {
    layers: 'th:province_4326',
    format: 'image/png',
    transparent: true,
    attribution: "Sakda"
});

let lyrs = L.layerGroup();


var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron,
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb.addTo(map)
}

var overlayMap = {
    "ตำแหน่งสถานีตรวจวัด": lyrs.addTo(map),
    // "ขอบเขตจังหหวัด": prov.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
L.control.zoom({ position: 'bottomright' }).addTo(map);

let iconGreen = L.icon({
    iconUrl: './marker/location-green.svg',
    iconSize: [45, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconYellow = L.icon({
    iconUrl: './marker/location-yellow.svg',
    iconSize: [45, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconRed = L.icon({
    iconUrl: './marker/location-red.svg',
    iconSize: [45, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconAlert = L.icon({
    iconUrl: './marker/location-yellow-red.gif',
    iconSize: [45, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconGrey = L.icon({
    iconUrl: './marker/location-grey.svg',
    iconSize: [45, 45],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let rmLyr = (mkname) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == mkname) {
            map.removeLayer(lyr)
        }
    })
}


let changeColorMarker = (id, val) => {
    // console.log(val);
    let staLatlon;
    id == '01' ? staLatlon = [18.33223153, 99.68745009] : null;
    id == '02' ? staLatlon = [18.35877826, 99.69847428] : null;
    id == '03' ? staLatlon = [18.33999353, 99.69027081] : null;
    id == '04' ? staLatlon = [18.33595178, 99.69072118] : null;
    id == '05' ? staLatlon = [18.36597498, 99.7073393] : null;
    id == '06' ? staLatlon = [18.35931796, 99.69806747] : null;
    id == '07' ? staLatlon = [18.36377594, 99.70573018] : null;
    id == '08' ? staLatlon = [18.33787827, 99.73419017] : null;
    id == '09' ? staLatlon = [18.30336786, 99.73275612] : null;
    id == '10' ? staLatlon = [18.34953189, 99.68724773] : null;

    if (val == 1) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconYellow }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/yellow.svg");
    } else if (val == 2) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconRed }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/red.svg");
    } else if (val == 3) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconAlert }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/yr.gif");
    } else if (val == 4) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconGrey }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/grey.svg");
    } else {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconGreen }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/green.svg");
    }
}

var chart;

let showChart = async (stat_code, param, cat, dat, titlename) => {
    Highcharts.chart("sta0" + stat_code + param, {
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: titlename,
            // style: {
            //     display: 'none'
            // }
        },
        yAxis: {
            title: {
                text: "&#9651;" + param + " (cm.)"
            }
        },
        xAxis: {
            categories: cat
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series: [{
            name: param,
            data: dat
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });
}



let last = []
let loadData = async (stat_code) => {
    try {
        let de = [];
        let dn = [];
        let dh = [];
        let cat = [];
        let status = 0;
        let d;
        let t;


        $.post('/api/last20position', { stat_code }).done(async function (resp) {
            resp.data.map(i => {
                // console.log(i);
                d = i.d;
                t = i.t;
                status = i.status;
                $("#sta").text(`${i.stname}`);
                $("#date").text(`${i.d}`);
                $("#time").text(`${i.t}`);
                cat.push(i.t);
                de.push(Number(i.de));
                dn.push(Number(i.dn));
                dh.push(Number(i.dh));
            });
            console.log(de, dn);

            await showChart(stat_code, "de", cat, de, 'E-Diff (&larr; W- , +E &rarr;)');
            await showChart(stat_code, "dn", cat, dn, ' N-Diff (&darr; S- , +N  &uarr;)');
            await showChart(stat_code, "dh", cat, dh, ' H-Diff (&#8597 Sub- , + Up &#8597)');
        });

        $.post('/api/lastposition', { stat_code }).done(function (r) {
            if (r.data.length > 0) {
                changeColorMarker(stat_code, r.data[0].status)
                $("#gid_sta" + stat_code).val(r.data[0].id)
            }
        })


    } catch (err) {
        console.error(err);
    }
}

let reset = (stat_code, value) => {
    let id = $("#gid_sta" + stat_code).val()
    $.post("/api/reset", { stat_code, id }).done(r => {
        loadData(stat_code);
    })
    $.get(`/api/status_reset/${stat_code}`).done(r => {
        // loadData(stat_code);
        console.log(r)
    })
}

loadData("01");
loadData("02");
loadData("03");
loadData("04");
loadData("05");
loadData("06");
loadData("07");
loadData("08");
loadData("09");
loadData("10");

setInterval(() => {
    loadData("01");
    loadData("02");
    loadData("03");
    loadData("04");
    loadData("05");
    loadData("06");
    loadData("07");
    loadData("08");
    loadData("09");
    loadData("10");
}, 60000)

let startPy = (station) => {
    $.post('/api/startpython', { station }).done(r => {
        $("#status_sta" + station).html("starting...");
        $("#btn_sta" + station).prop("disabled", true);
        console.log(r)
    });
}

let stopPy = (station) => {
    $.post('/api/stoppython', { station }).done(r => {
        $("#status_sta" + station).html("stoped");
        $("#btn_sta" + station).prop("disabled", false);
        console.log(r)
    });
}

$("#status_sta01").html("starting...");
$("#btn_sta01").prop("disabled", true);

$("#status_sta02").html("starting...");
$("#btn_sta02").prop("disabled", true);

$("#status_sta03").html("starting...");
$("#btn_sta03").prop("disabled", true);

$("#status_sta04").html("starting...");
$("#btn_sta04").prop("disabled", true);

$("#status_sta05").html("starting...");
$("#btn_sta05").prop("disabled", true);

$("#status_sta06").html("starting...");
$("#btn_sta06").prop("disabled", true);

$("#status_sta07").html("starting...");
$("#btn_sta07").prop("disabled", true);

$("#status_sta08").html("starting...");
$("#btn_sta08").prop("disabled", true);

$("#status_sta09").html("starting...");
$("#btn_sta09").prop("disabled", true);

$("#status_sta10").html("starting...");
$("#btn_sta10").prop("disabled", true);