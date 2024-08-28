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

    const chunkSize = 12;
    const splitArray = (array: Item[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    const a = splitArray(items, chunkSize);
    

    return (
        <div className="overflow-hidden flex flex-row gap-2 mt-4">
            {a.map((chunk, index) => (
                <div key={index} className="overflow-hidden mb-4 flex flex-row">
                    <div className="overflow-hidden w-[12rem] p-4 flex flex-col gap-1 border-solid border-2">
                        {chunk.map((item: Item) => (
                            removeItem !== undefined ? (
                                <LottoTile key={item.id} item={item} remove={() => removeItem(item.id)} />
                            ) : (
                                <SelectedTile key={item.id} item={item} remove={() => removeItem(item.id)} />
                            )
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}