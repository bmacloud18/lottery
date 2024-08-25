"use client";
import React, { useState, useEffect } from 'react';
import Item from "@/app/interfaces/item";
import Tile from "@/app/components/lottoTile";
import TileGrid from "@/app/components/tileGrid";
import samples from "@/app/samples/samples";

export default function Home() {

  const [tiles, setTiles] = useState<React.ReactNode[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState({});
  const [selected, setSelected] = useState<Item>();
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

  const getSpeed = () => {
    const minSpeed = 10; // minimum speed in seconds
    const maxSpeed = 1000; // maximum speed in seconds

    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

    return speed;
  };


  const startAnimation = () => {
    const n = tiles.length;
    const duration = '5s';
    const l = 100;
    const tiles_length = n * l;

    const spin_rounds = Math.floor(Math.random() * 5 + 5);
    const speed = getSpeed();
    const rand = Math.random() * 5555 % n;
    const total_dist = (spin_rounds * tiles_length + rand)

    setAnimation({
      animation: `loop-scroll ${duration} linear`,
    });

    setSpinning(true);

    // Calculate the final index after the spin completes
    setTimeout(() => {
      setSpinning(false);
      setAnimation({});
    }, parseFloat(duration) * 1000); // Wait for the animation to complete
  }

  return (
    <main className="flex min-h-screen flex-col justify-center align-center">
      <div className="flex flex-row overflow-hidden w-fit border-solid border-2 justify-center">
        <div style={animation} className="overflow-hidden p-4 flex flex-row gap-8 ${isAnimating ? 'loop-scroll' : ''}">
          {tiles}
        </div>
        <div style={animation} aria-hidden="true" className="overflow-hidden p-4 flex flex-row gap-8 ${isAnimating ? 'loop-scroll' : ''}">
          {tiles}
        </div>
      </div>
      <button onClick={startAnimation} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Spin da Wheel
      </button>
    </main>
  );
}
