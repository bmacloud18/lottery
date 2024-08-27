import Item from "@/app/interfaces/item";

export default function Tile({
    item
}:  {
    item:Item,
    remove: any
}) {

    return (
        <div key={item.id} className="mb-1 border-solid border-2 border-black rounded-xl w-full p-2 overflow-hidden flex flex-row gap-2 justify-between">
            <span className={`text-center text-base`}>{item.name}</span>
        </div>
    )
}