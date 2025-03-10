import React from 'react';
import MapComponent from './components/MapComponent/MapComponent';
import { parkings } from './core/geojsons/parking';

const App: React.FC = () => {

  const parkingFeatures = parkings.features.map((feature) => ({
    id: feature.properties.id,
    coordinates: feature.geometry.coordinates[0] as [number, number][],
  }));

  return (
    <div>
      <h1>Карта с парковками</h1>
      <MapComponent parkings={parkingFeatures} />
    </div>
  );
};

export default App;