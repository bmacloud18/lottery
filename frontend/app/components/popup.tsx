"use client";
import React, { useState } from 'react';
import { MouseEventHandler } from "react";
import Item from "@/app/interfaces/item";

export default function Popup({
    visible,
    onClose,
    onSubmit,
    currentItems
}: {
    visible: boolean,
    onClose: MouseEventHandler,
    onSubmit: any,
    currentItems: Item[]
}) {
    if (!visible) {
        return null;
    }

    const [itemName, setItemName] = useState('');

    return (
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
                        Cancel
                    </button>
                    <button type="button" onClick={() => onSubmit(itemName)} className="bg-buttonwhite border-solid border rounded">
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};