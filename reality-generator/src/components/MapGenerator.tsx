import React, { useState } from "react";
import './MapGenerator.css'
import { useForm } from 'react-hook-form';
import GenerateCells from './Cell';

interface FormValues {
  cellAmount: number;
  city: boolean;
  forest: boolean;
  water: boolean;
  mountains: boolean;
  sand: boolean;
}
function MapMatch(map: string[][]){
  
  
}

export default function MapGeneratorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [isGenerating, setGenerating] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    // Set the loading state to true
    setGenerating(true);

    // Simulate an asynchronous operation (e.g., API call, cell generation)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Perform the cell generation logic
    MapMatch(GenerateCells(data));

    // Set the loading state back to false
    setGenerating(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ol>
        <label>Number of cells to generate:</label>
        <input type="text" placeholder="cellAmount" {...register("cellAmount", { required: true, pattern: /^[0-9]*$/ })} />
        
        <p>What biomes you want to generate</p>
        
        <ul><input type="checkbox" {...register("city")} /> City</ul>
        <ul><input type="checkbox" {...register("forest")} /> Forest</ul>
        <ul><input type="checkbox" {...register("water")} /> Water</ul>
        <ul><input type="checkbox" {...register("mountains")} /> Mountains</ul>
        <ul><input type="checkbox" {...register("sand")} /> Sand</ul>
      </ol>

      {/* Display "Generating..." text while the generation is in progress */}
      <button type="submit" disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
