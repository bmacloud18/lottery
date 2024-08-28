import Item from "@/app/interfaces/item";

export default function LottoTile({
    item,
    remove
}:  {
    item:Item,
    remove: any
}) {
    
    //returns a tile with the name, corresponding color, and a delete/remove button to remove the item from contention
    return (
        <div key={item.id} className="mb-1 border-solid border-2 border-black rounded-xl w-full p-2 overflow-hidden flex flex-row gap-2 justify-between">
            <div style={{ backgroundColor: item.color }} className={`size-6 border-solid border`}></div>
            <span className={`text-center text-base`}>{item.name}</span>
            <button onClick={remove}>
                <img src="/deletepng.png" alt="delete" className="size-2"/>
            </button>
        </div>
    )
}