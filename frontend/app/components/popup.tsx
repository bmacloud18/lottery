"use client";
import React, { useState } from 'react';
import { MouseEventHandler } from "react";
import Item from "@/app/interfaces/item";

export default function Popup({
    visible,
    onClose,
    onSubmit,
    selected
}: {
    visible: boolean,
    onClose: MouseEventHandler,
    onSubmit: any,
    selected: string
}) {
    const [itemName, setItemName] = useState('');
    if (!visible) {
        return null;
    }

    //returns two different pop ups based on whether or not a submit function is passed
    //popup 1 is for adding items and popup 2 is for the congratulations/selection screen post-spin
    return onSubmit ? (
        <div className="border-solid border-4 fixed z-50 bg-grey bg-opacity-100 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-sm font-semibold">Add Items</h2>
                <div className="mb-4">
                    <label className="block text-xs font-small">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full border rounded"
                        required
                    />
                </div>
                <div className="flex justify-end gap-1">
                    <button type="button" onClick={onClose} className="bg-buttonwhite border-solid border rounded">
                        Exit
                    </button>
                    <button type="button" onClick={() => onSubmit(itemName)} className="bg-buttonwhite border-solid border rounded">
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="border-solid border-4 fixed z-50 bg-grey bg-opacity-100 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-sm font-semibold">Congratulations!!</h2>
                <div className="mb-4">
                    <span>{selected}</span>
                </div>
                <div className="flex justify-end gap-1">
                    <button type="button" onClick={onClose} className="bg-buttonwhite border-solid border rounded">
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
};