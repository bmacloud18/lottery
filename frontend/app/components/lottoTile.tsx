import Tile from "@/app/interfaces/item";

export default function LottoTile({
    item
}:  {
    item:Tile
}) {
    return (
        <div className="border-solid border-2 border-black p-12 rounded-2xl min-w-48 flex flex-col justify-center gap-6 m-2">
            <span className="text-center text-xl">{item.name}</span>
        </div>
    )
}