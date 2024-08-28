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
    

    //returns a uniform column grid of tiles to be placed on the sides of the wheel as a legend
    //returns some empty space for when no items are present (items will always be present on the active side,
    //however the removed side needs an option to take up the space so as not to make clunky changes when something
    //is removed)
    //also notable that each grid maxes out at 12 items to stay in line with the wheel size,
    //and 3 grids (36 items) is the maximum amount allowed for this app (may change in the future)
    return items.length > 0 ? (
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
    ) : (
        <div className="visibility-hidden overflow-hidden flex flex-row gap-2 mt-4">
            <div className="overflow-hidden mb-4 flex flex-row">
                <div className="visibility-hidden opacity-0 overflow-hidden w-[12rem] p-4 flex flex-col gap-1 border-solid border-2">
                        
                </div>
            </div>
        </div>
    );
}