import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const Map = () => {
    return (
        <div className='card'>
            <div className='card-body'>
                <MapContainer center={[14.5, 100.5]} zoom={12}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />

                </MapContainer>

            </div>
        </div>
    )
}

export default Map
