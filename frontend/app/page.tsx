"use client";
import React, { useState, useEffect } from 'react';
import Tile from "@/app/components/lottoTile";
import samples from "@/app/samples/samples";
import Wheel from "@/app/components/pieChart";
import Item from "@/app/interfaces/item";

export default function Home() {

  const [tiles, setTiles] = useState<React.ReactNode[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState({});
  const [spinning, setSpinning] = useState(false);

  const [replacement, setReplacement] = useState<boolean>();


  useEffect(() => {
      if (tiles === undefined || items || undefined) {
        const sampleItems = samples
        let sampleTiles = sampleItems.map((item: Item) => {
          return <Tile item={item}/>
        });

        const more = sampleItems.map((item: Item) => {
          return <Tile item={item}/>
        });

        sampleTiles = sampleTiles.concat(more);

        setItems(sampleItems);
        setTiles(sampleTiles);
      }
  }, []);

  const addTile = () => {
    let newtiles = [];
  }


  const startAnimation = () => {
    const duration = `${ Math.floor(Math.random() * 5 + 5)}s`;

    setAnimation({
      animation: `spinEaseOut ${duration} ease-out`,
    });

    setSpinning(true);

    // Calculate the final index after the spin completes
    setTimeout(() => {
      setSpinning(false);
      setAnimation({});
    }, parseFloat(duration) * 1000); // Wait for the animation to complete
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center mt-10">
      <div  className="flex flex-row justify-center items-center">
        <div className="relative flex flex-row overflow-hidden w-fit h-fit border-solid border-2 p-2 justify-center content-center pointer-events-none">
          <div style={animation} className="flex flex-row justify-center align-center">
            <Wheel items={items}></Wheel>
          </div>
          <div className="absolute top-0 left-1/2 h-1/3 w-0.5 bg-yellow transform -translate-x-1/2 pointer-events-none"></div>
        </div>
      </div>
      
      <button onClick={startAnimation} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Spin da Wheel
      </button>
    </main>
  );
}
