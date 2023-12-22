import React, { useState } from 'react';

interface FormValues {
  cellAmount: number;
  city: boolean;
  forest: boolean;
  water: boolean;
  mountains: boolean;
  sand: boolean;
}

const GenerateCells: React.FC<FormValues> = (formData) => {
  const { cellAmount, city, forest, water, mountains, sand } = formData;

  // Create a list of available biomes based on form data
  const availableBiomes: string[] = [];
  if (city) availableBiomes.push('C');
  if (forest) availableBiomes.push('F');
  if (water) availableBiomes.push('W');
  if (mountains) availableBiomes.push('M');
  if (sand) availableBiomes.push('S');

  const getRandomBiomes = () => {
    const firstBiome = availableBiomes[Math.floor(Math.random() * availableBiomes.length)];
    const secondBiome = availableBiomes.find(b => b !== firstBiome) || firstBiome;
    return [firstBiome, secondBiome];
  };

  // Function to generate a cell with exactly two different biomes without breaking the same biome
  const generateCell = () => {
    const cell: string[] = [];
    const availableBiomesForGenerate: string[] = [];

    // Generate 2 biomes
    for (let j = 0; j < 2; j++) {
      const [biome1, biome2] = getRandomBiomes();
      availableBiomesForGenerate.push(biome1);
      availableBiomesForGenerate.push(biome2);
    }

    // Generate the remaining 4 biomes
    for (let i = 0; i < 6; i++) {
      // Use only biome[i-1] if it breaks the rule
      if (
        i >= 2 &&
        ((cell[i - 2] === availableBiomesForGenerate[1] && cell[i - 1] === availableBiomesForGenerate[0]) ||
          (cell[i - 2] === availableBiomesForGenerate[0] && cell[i - 1] === availableBiomesForGenerate[1]))
      ) {
        cell.push(cell[i - 1]);
      } else {
        cell.push(availableBiomesForGenerate[Math.floor(Math.random() * (1 - 0 + 1)) + 0]);
      }
    }

    return cell;
  };

  // Generate and store cells in a 2D array
  const map: string[][] = [];
  for (let i = 0; i < cellAmount; i++) {
    const cell = generateCell();
    console.log(cell);
    map.push(cell); // Push the entire cell array to the map
  }


  // Log the generated map
  console.log('Generated Map:', map);

  return (
    <div>
     
    </div>
  );
};

export default GenerateCells;
