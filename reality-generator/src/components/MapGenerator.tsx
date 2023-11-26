import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import ReactDOM from 'react-dom';

interface MapGeneratorProps {
  cellCount: number;
  allowedBiomes: string[];
  maxSize: number;
}

const MapGenerator: React.FC<MapGeneratorProps> = ({ cellCount, allowedBiomes, maxSize }) => {
  const [map, setMap] = useState<string[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    generateMap();
    drawMap();
  }, [cellCount, allowedBiomes, maxSize]);

  const generateMap = () => {
    const newMap: string[][] = Array.from({ length: maxSize }, () => Array(maxSize).fill(''));
  
    for (let i = 0; i < cellCount; i++) {
      const x = Math.floor(Math.random() * maxSize);
      const y = Math.floor(Math.random() * maxSize);
      const randomBiome = allowedBiomes[Math.floor(Math.random() * allowedBiomes.length)];
  
      newMap[x][y] = randomBiome;
    }

    setMap(newMap);
  };

  const drawMap = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
  
      if (ctx) {
        ctx.clearRect(0, 0, maxSize * 40, maxSize * 40); // Clear the canvas
  
        map.forEach((row, rowIndex) => {
          row.forEach((biomes, colIndex) => {
            const cellX = colIndex * 40; // Assuming each cell has a width of 40
            const cellY = rowIndex * 40; // Assuming each cell has a height of 40
  
            // Wrap biomes in an array
            const cell = <Cell key={`${rowIndex}-${colIndex}`} biomes={[biomes]} x={cellX} y={cellY} />;
            ReactDOM.render(cell, canvasRef.current); // Render the Cell component
          });
        });
      }
    }
  };
  

  return <canvas ref={canvasRef} width={maxSize * 40} height={maxSize * 40}></canvas>;
};

export default MapGenerator;
