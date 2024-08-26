import Item from "@/app/interfaces/item";
import Tile from "@/app/components/lottoTile";
import { MouseEventHandler } from "react";

export default function Grid({
    items,
    removeItem
} : {
    items: Item[];
    removeItem: any
}) {
    const tiles = items.map((item: Item) => {
        return <Tile key={item.id} item={item} remove={() => removeItem(item.id)}/>
    });

    return (
        <div className="overflow-hidden">
            <div className="overflow-hidden max-w-[50rem] p-4 flex flex-col gap-1 border-solid border-2">{tiles}</div>
        </div>
    )
    
}