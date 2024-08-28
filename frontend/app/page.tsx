"use client";
import React, { useState, useEffect, useRef } from 'react';
import samples from "@/app/samples/samples";
import Wheel from "@/app/components/pieChart";
import Item from "@/app/interfaces/item";
import Grid from "@/app/components/tileGrid";
import Popup from "@/app/components/popup";
import sampleColors from "@/app/util/colors";

export default function Home() {

  const [items, setItems] = useState<Item[]>([]);
  const [replaced, setReplaced] = useState<Item[]>([]);
  const [tiles, setTiles] = useState<React.ReactNode[]>([]);
  const [id, setId] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);

  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState({});
  const [colors, setColors] = useState<string[]>([]);

  const [selected, setSelected] = useState<string>('');
  const [replacement, setReplacement] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const restart = () => {
    const sampleItems = samples

    setColors(sampleColors);
    setItems(sampleItems);
    setId(sampleItems.length - 1);
    setReplaced([]);
    setAnimation({});
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  const getColor = () => {
    let col;
    if (colors.length > 0) {
      const idx = Math.floor((Math.random() * 100) % colors.length);
      col = colors[idx];
      console.log(col, idx, colors.length);
      const newColors = colors.filter((c, i) => i !== idx);
      setColors(newColors);
    }
    else {
      col = `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6,'0')}`;
    }

    return col;
  }

  const addItem = (name: string) => {
    if (items.length < 36) {
      const randomColor = getColor();
      const item = {
        id: id + 1,
        name: name,
        startDegree: 0,
        color: randomColor
      }
      setItems([...items, item]);
      setId(id + 1);
    }
  }

  const addReplaced = (item: Item) => {
    setReplaced([...replaced, item])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      const newArray = items.filter((item, idx) => idx !== id);
      setItems(newArray);
      const newCol = items[id].color;
      setColors([...colors, newCol]);
    }
  }

  const changeReplacement = () => {
    if (replacement) {
      setReplacement(false);
    }
    else {
      setReplacement(true);
    }
  }

  const replacementButton = replacement ? (
    <button onClick={(changeReplacement)} className="border-solid border w-28 bg-buttongreen text-white rounded hover:bg-buttonwhite justify-self-end">
      Replacement On
    </button>
  ) : (
    <button onClick={(changeReplacement)} className="border-solid border w-28 bg-buttonred text-white rounded hover:bg-buttonwhite justify-self-end">
      Replacement Off
    </button>
  )

  useEffect(() => {
    if (items.length === 0) {
      restart();
    }
  }, [items]);

  const startAnimation = () => {
    setDisabled(true);
    const angle = Math.random() * 360;
    const newPosition = position + 360 * 10 + angle;
    const dn = Math.floor(5 + Math.random() * 100 % 5)
    const duration = `${dn}s`;


    // Calculate the final index after the spin completes
    timeout.current = setTimeout(() => {
      setSelected(items[idx].name);
      if (replacement) {
        removeItem(idx);
        addReplaced(items[idx]);
      }
      setDisabled(false);
    }, dn * 1000); // Wait for the animation to complete

    setAnimation({
      transform: `rotate(${newPosition}deg)`,
      transition: `transform ${duration} ease-out`,
    });

    console.log(position, newPosition);
    const n = items.length;
    const arclength = 360 / n;
    const degree = newPosition % 360;
    let idx = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (degree > item.startDegree && degree < item.startDegree + arclength) {
        idx = item.id;
      }
    }

    setPosition(newPosition);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center gap-4 items-center">

      <Popup visible={popup} onSubmit={addItem} onClose={() => setPopup(false)} currentItems={items} selected={''}></Popup>
      <Popup visible={selected !== ''} onSubmit={null} onClose={() => setSelected('')} currentItems={items} selected={selected}></Popup>
      <div className="flex flex-row justify-around items-center gap-4">

        <Grid removeItem={(removeItem)} items={items}></Grid>

        <div className="relative flex flex-col overflow-hidden border-solid border-2 justify-center align-center">
          <div className="flex flex-row w-fit justify-center align-center pointer-events-none">
            <Wheel animation={animation} items={items}></Wheel>
          </div>
          <button disabled={disabled} onClick={startAnimation} className="border-solid border mt-4 mb-2 p-2 w-fit self-center bg-buttonwhite text-white rounded hover:bg-yellow">
            Spin da Wheel
          </button>
          <div className="absolute top-0 left-1/2 h-1/5 w-0.5 bg-yellow transform -translate-x-1/2 pointer-events-none"></div>
        </div>

        <Grid removeItem={(undefined)} items={replaced}></Grid>

      </div>

      

      <div className="flex flex-row m-4 self-end gap-2">
        {replacementButton}
        <button onClick={() => setPopup(true)} className="border-solid border w-28 bg-buttonwhite text-white rounded hover:bg-yellow justify-self-end">
          Add Items
        </button>
        <button onClick={restart} className="border-solid border w-28 bg-buttonwhite text-white rounded hover:bg-yellow justify-self-end">
          Restart
        </button>
      </div>

    </main>
  );
}
