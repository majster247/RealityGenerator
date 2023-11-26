import React, { useEffect, useRef } from 'react';

interface CellProps {
  biomes: string[];
  x: number;
  y: number;
}

const Cell: React.FC<CellProps> = ({ biomes, x, y }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        drawHexagon(ctx, x, y);
        fillBiomes(ctx, biomes, x, y);
      }
    }
  }, [biomes, x, y]);

  const drawHexagon = (ctx: CanvasRenderingContext2D, cellX: number, cellY: number) => {
    const size = 20; // Set your desired size
    const centerX = cellX + size;
    const centerY = cellY + size;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);

      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };

  const fillBiomes = (ctx: CanvasRenderingContext2D, biomes: string[], cellX: number, cellY: number) => {
    const size = 20; // Set your desired size
    const centerX = cellX + size;
    const centerY = cellY + size;

    const biomeColors: { [key: string]: string } = {
      water: 'blue',
      city: 'grey',
      forest: 'green',
      orchard: 'orange',
      field: 'yellow',
      mountains: 'brown',
    };

    biomes.forEach((biome, index) => {
      const angle = ((index % 6) * Math.PI) / 3;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);

      ctx.fillStyle = biomeColors[biome] || 'white';
      ctx.fill();
    });
  };

  return <canvas ref={canvasRef} width={40} height={40} style={{ position: 'absolute' }}></canvas>;
};

export default Cell;
