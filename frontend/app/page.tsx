"use client";
import React, { useState, useEffect } from 'react';
import samples from "@/app/samples/samples";
import Wheel from "@/app/components/pieChart";
import Item from "@/app/interfaces/item";
import Tile from "@/app/components/lottoTile";
import ActiveGrid from "@/app/components/activeGrid";
import colors from "@/app/util/colors";
import Popup from "@/app/components/popup";

export default function Home() {

  const [items, setItems] = useState<Item[]>([]);
  const [tiles, setTiles] = useState<React.ReactNode[]>([]);
  const [id, setId] = useState<number>(0);
  const[popup, setPopup] = useState<boolean>(false);

  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState({});

  const [replacement, setReplacement] = useState<boolean>();


  const addItem = (name: string) => {
    const item = {
      id: id + 1,
      name: name
    }
    setItems([...items, item]);
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      const newArray = items.filter((item, idx) => idx !== id);
      setItems(newArray);
    }
    
  }

  useEffect(() => {
      if (items.length === 0) {
        const sampleItems = samples

        setItems(sampleItems);
        setId(items.length - 1);
      }
  }, [items]);

  const startAnimation = () => {
    const angle = Math.random() * 360;
    const newPosition = position + 360 * 10 + angle;
    const duration = `${Math.floor(6 + Math.random() * 100 % 6)}s`;

    setAnimation({
      animation: `spin ${duration} linear infinite`,
    });

    // Calculate the final index after the spin completes
    // setTimeout(() => {
    //   setSpinning(false);
    //   setAnimation({});
    // }, parseFloat(duration) * 1000); // Wait for the animation to complete

    setAnimation({
      transform: `rotate(${newPosition}deg)`,
      transition: `transform 5s ease-out`,
    });

    setPosition(newPosition);
  }

  return (
    <main className="flex min-h-screen flex-row justify-center gap-4 items-center">

      <Popup visible={popup} onSubmit={addItem} onClose={() => setPopup(false)} currentItems={items}></Popup>

      <div className="flex flex-row justify-around items-center gap-4">
        <ActiveGrid removeItem={(removeItem)} items={items}></ActiveGrid>

        <div className="relative flex flex-col overflow-hidden border-solid border-2 justify-center align-center">
            <div className="flex flex-row w-fit justify-center align-center pointer-events-none">
              <Wheel animation={animation} items={items}></Wheel>
            </div>
            <button onClick={startAnimation} className="border-solid border mt-4 mb-2 p-2 w-fit self-center bg-buttonwhite text-white rounded hover:bg-yellow">
              Spin da Wheel
            </button>
            <div className="absolute top-0 left-1/2 h-1/5 w-0.5 bg-yellow transform -translate-x-1/2 pointer-events-none"></div>
          </div>

          <div className="relative flex flex-col">
            {tiles}
          </div>
      </div>

      <div className="flex flex-row m-4 size-20 self-end">
        <button onClick={() => setPopup(true)} className="border-solid border w-fit bg-buttonwhite text-white rounded hover:bg-yellow justify-self-end">
          Add Items
        </button>
      </div>

    </main>
  );
}
