import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Dummy bin data for different locations in the USA
const bins = [
  { id: 'Bin-1', name: 'Bin 1', city: 'New York', coordinates: [-74.006, 40.7128], volume: 2000 },
  { id: 'Bin-2', name: 'Bin 2', city: 'Chicago', coordinates: [-87.6298, 41.8781], volume: 1500 },
  { id: 'Bin-3', name: 'Bin 3', city: 'Los Angeles', coordinates: [-118.2437, 34.0522], volume: 1800 },
  { id: 'Bin-4', name: 'Bin 4', city: 'Houston', coordinates: [-95.3698, 29.7604], volume: 1700 },
  { id: 'Bin-5', name: 'Bin 5', city: 'Minneapolis', coordinates: [-93.265, 44.9778], volume: 1200 },
];

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpheTQ2IiwiYSI6ImNtYnd0ejlnbTEzOXcya3MycnJ4dTI3eWMifQ.kRvxWoZ5g34RuWZX7kTL6g'; // Replace with your token

export default function MapView() {
  const [selectedBin, setSelectedBin] = useState<null | typeof bins[0]>(null);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        initialViewState={{
          longitude: -98.5795, // Center of USA
          latitude: 39.8283,
          zoom: 3.5
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {bins.map(bin => (
          <Marker
            key={bin.id}
            longitude={bin.coordinates[0]}
            latitude={bin.coordinates[1]}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedBin(bin);
            }}
          >
            <div
              style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold', fontSize: 18 }}
              onMouseEnter={() => setSelectedBin(bin)}
              onMouseLeave={() => setSelectedBin(null)}
            >
              ⬤
            </div>
          </Marker>
        ))}
        {selectedBin && (
          <Popup
            longitude={selectedBin.coordinates[0]}
            latitude={selectedBin.coordinates[1]}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedBin(null)}
          >
            <div>
              <strong>{selectedBin.name}</strong><br />
              City: {selectedBin.city}<br />
              Volume: {selectedBin.volume} units
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}