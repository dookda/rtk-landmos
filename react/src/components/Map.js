import React from 'react'
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

// google layers
// Hybrid: s,h;
// Satellite: s;
// Streets: m;
// Terrain: p;

const Map = () => {
    const position = [18.332477331186354, 99.71991659988102]

    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}


                <LayersControl position='topright' >
                    <LayersControl.BaseLayer checked name="Satellite">
                        <TileLayer url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Streets">
                        <TileLayer url='https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Terrain">
                        <TileLayer url='https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </div>
    )
}

export default Map