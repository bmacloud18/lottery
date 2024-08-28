"use client";
import React, { useState, useEffect, useRef } from 'react';
import samples from "@/app/samples/samples";
import Wheel from "@/app/components/pieChart";
import Item from "@/app/interfaces/item";
import Grid from "@/app/components/tileGrid";
import Popup from "@/app/components/popup";
import Button from "@/app/components/button";
import sampleColors from "@/app/util/colors";

export default function Home() {

  const [items, setItems] = useState<Item[]>([]);
  const [removed, setRemoved] = useState<Item[]>([]);
  const [id, setId] = useState<number>(0);
  const [popup, setPopup] = useState<boolean>(false);

  const [position, setPosition] = useState(0);
  const [animation, setAnimation] = useState({});
  const [colors, setColors] = useState<string[]>([]);

  const [selected, setSelected] = useState<string>('');
  const [removal, setRemoval] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);


  //resets the page to default values of 3 items, no removal
  //stops any active spin and resets colors array
  const restart = () => {
    const sampleItems = samples

    setColors(sampleColors);
    setItems(sampleItems);
    setId(sampleItems.length - 1);
    setRemoved([]);
    setAnimation({});
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  //get a color from the colors array in util or creates a random hex value if all colors have been taken
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

  //add an item to the list of items for the wheel to choose from
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

  //add an item to the list of removed items
  const addRemoved = (item: Item) => {
    setRemoved([...removed, item])
  }

  //removes a selected item and adds their color back to the list of colors to choose from for new items
  //does not call add item to the removed list by default, done separately by the above function
  const removeItem = (id: number) => {
    if (items.length > 1) {
      const newArray = items.filter((item, idx) => idx !== id);
      setItems(newArray);
      const newCol = items[id].color;
      setColors([...colors, newCol]);
    }
  }

  //changes removal value
  const changeRemoval = () => {
    if (removal) {
      setRemoval(false);
    }
    else {
      setRemoval(true);
    }
  }

  //component for the removal button, green when removal is on, red when off (defaults off)
  const removalButton = removal ? (
    <Button onClick={changeRemoval} text={'Removal On'} disabled={false}></Button>
  ) : (
    <Button onClick={changeRemoval} text={'Removal Off'} disabled={false}></Button>
  )

  //set to default wheel upon load
  useEffect(() => {
    if (items.length === 0) {
      restart();
    }
  }, [items]);


  //most important piece, calculates spin and determines winner following spin
  const startAnimation = () => {
    //disable the spin button so spins/calculations/results don't stack
    setDisabled(true);

    //randomize spin
    const angle = Math.random() * 360;
    const offset = Math.random() * 8 + 4
    const newPosition = position + 360 * offset + angle;
    const dn = Math.floor(5 + Math.random() * 100 % 5)
    const duration = `${dn}s`;


    //set animation of the wheel component to calculated spin
    setAnimation({
      transform: `rotate(${newPosition}deg)`,
      transition: `transform ${duration} ease-out`,
    });

    //calculate new position after spin and find corresponding idx
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

    //make sure calculations and results don't take effect until after spin
    timeout.current = setTimeout(() => {
      setSelected(items[idx].name);
      if (removal) {
        removeItem(idx);
        addRemoved(items[idx]);
      }
      setDisabled(false);
    }, dn * 1000);

    //save the new position for next calculation
    setPosition(newPosition);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center gap-4 items-center">

      <Popup visible={popup} onSubmit={addItem} onClose={() => setPopup(false)} selected={''}></Popup>
      <Popup visible={selected !== ''} onSubmit={null} onClose={() => setSelected('')} selected={selected}></Popup>
      <div className="flex flex-row justify-around items-center gap-4">

        <Grid removeItem={(removeItem)} items={items}></Grid>

        <div className="relative flex flex-col overflow-hidden border-solid border-2 items-center p-2">
          <div className="flex flex-row w-fit justify-center align-center pointer-events-none">
            <Wheel animation={animation} items={items}></Wheel>
          </div>
          <Button onClick={startAnimation} text={'Spin Wheel'} disabled={disabled}></Button>
          <div className="absolute top-0 left-1/2 h-1/5 w-0.5 bg-yellow transform -translate-x-1/2"></div>
        </div>

        <Grid removeItem={(undefined)} items={removed}></Grid>

      </div>

      

      <div className="flex flex-row m-4 self-end gap-2">
        {removalButton}
        <Button onClick={() => setPopup(true)} text={'Add Items'} disabled={false}></Button>
        <Button onClick={restart} text={'Restart'} disabled={false}></Button>
      </div>

    </main>
  );
}
