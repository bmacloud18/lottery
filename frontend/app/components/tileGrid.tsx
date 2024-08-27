import Item from "@/app/interfaces/item";
import LottoTile from "@/app/components/lottoTile";
import SelectedTile from "@/app/components/selectedTile";

export default function Grid({
    items,
    removeItem
} : {
    items: Item[];
    removeItem: any
}) {
    let tiles
    if (removeItem !== undefined) {
        tiles = items.map((item: Item) => {
            return <LottoTile key={item.id} item={item} remove={() => removeItem(item.id)}/>
        });
    }
    else {
        tiles = items.map((item: Item) => {
            return <SelectedTile key={item.id} item={item} remove={() => removeItem(item.id)}/>
        });
    }
    

    return items.length > 0 ? (
        <div className="overflow-hidden">
            <div className="overflow-hidden w-[12rem] p-4 flex flex-col gap-1 border-solid border-2">{tiles}</div>
        </div>
    ) : (
        <div className="overflow-hidden invisible">
            <div className="overflow-hidden w-[12rem] p-4 flex flex-col gap-1 border-solid border-2">{tiles}</div>
        </div>
    )
    
}