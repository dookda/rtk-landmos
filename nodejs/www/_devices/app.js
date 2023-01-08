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
var redMarker = L.ExtraMarkers.icon({
    icon: 'fa fa-podcast',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
});

var yellowMarker = L.ExtraMarkers.icon({
    icon: 'fa fa-podcast',
    markerColor: 'yellow',
    shape: 'circle',
    prefix: 'fa'
});

var greenMarker = L.ExtraMarkers.icon({
    icon: 'fa fa-podcast',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
});

let removeLayer = () => {
    map.eachLayer(i => {
        if (i.options.name == "mk") {
            map.removeLayer(i)
        }
    })
}

const getStation = () => {
    return new Promise((resolve, reject) => {
        axios.get('/apiv2/basestation').then(r => {
            r.data.map(i => {
                // console.log(i);
                L.marker([i.y_coor, i.x_coor], { icon: yellowMarker }).bindPopup(`station:  ${i.stat_code}`).addTo(map)
                document.getElementById("tb").innerHTML += ` <tr>
                            <td class="py-1"> ${i.stat_code} </td>
                            <td> 102 kW/h </td>
                            <td> <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 25%"
                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                            </td>
                            <td> 77.99 kW/h </td>
                            <td> ok </td>
                        </tr>`
            })
            resolve();
        })
    })
}


$("#update").text(moment().format("DD-MM-YYYY HH:ss น."))

getStation()