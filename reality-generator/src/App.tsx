import React from 'react';
import MapGenerator from './components/MapGenerator';

const App: React.FC = () => {
  const mapGeneratorProps = {
    cellCount: 50,
    allowedBiomes: ['water', 'city', 'forest', 'orchard', 'field', 'mountains'],
    maxSize: 200,
  };

  return (
    <div>
      <h1>Map Generator App</h1>
      <MapGenerator {...mapGeneratorProps} />
    </div>
  );
};

export default App;
