import Item from "@/app/interfaces/item";
import colors from "@/app/util/colors";

export default function LottoTile({
    item,
    remove
}:  {
    item:Item,
    remove: any
}) {
    const color = colors[item.id].name;
    
    return (
        <div key={item.id} className="mb-1 border-solid border-2 border-black rounded-xl w-full p-2 overflow-hidden flex flex-row gap-2 justify-between">
            <div className={`size-6 border-solid border bg-${color}`}></div>
            <span className="text-center text-base">{item.name}</span>
            <button onClick={remove}>
                <img src="/deletepng.png" alt="delete" className="size-2"/>
            </button>
        </div>
    )
}