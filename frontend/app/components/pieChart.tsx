import { useMemo } from "react";
import * as d3 from "d3";
import Item from "@/app/interfaces/item";




type DataItem = {
    name: string;
    value: number;
  };

  //converts items for the d3 pie chart
const convertData = (item: Item) => {
    return {name: `${item.name}`, value: 100}
}

const MARGIN = 30;
const width = 600;
const height = 600;


//not an expert with d3, made some additions to this pie chart guide from react graph gallery
//https://www.react-graph-gallery.com/pie-plot
//only thing missing is a nice transition animation on removal, may look into in the future
export default function PieChartWithCustomizedLabel({
    items,
    animation
}: {
    items: Item[],
    animation: React.CSSProperties
}) {
    const n = items.length;
    //resets id values since indices change after removal and ids are used in a few places to access the items array
    //changed the way colors are accessed so that this works without scrambling colors each spin
    for (let i = 0; i < n; i++)
    {
      items[i].id = i;
    }
    const arclength = 360 / n;
    const data = items.map(convertData);
    const radius = Math.min(width, height) / 2 - MARGIN;

    //this function helps set the startDegree to the proper relative number
    //this is necessary because the wheel spins counter clockwise while the degrees of the arc are calculated clockwise
    //the start degree is used to determine where the spinner has landed, i.e. who wins
    const reverseDegrees = (items: Item[]) => {
      let i = 0;
      let j = items.length - 1;
      while (i < j) {
        const temp = items[i].startDegree;
        items[i].startDegree = items[j].startDegree;
        items[j].startDegree = temp;
  
        i++;
        j--;
      }
    }

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        const newArcs = pie.map((p, i) => {
            const path = arcPathGenerator({
                innerRadius: 0,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            });
            items[i].startDegree = ((p.endAngle) * (180 / Math.PI) + (arclength * (n - 1))) % 360;
            return {
              path: path ?? '',
              color: items[i].color,
              item: data[i]
            }
        });

        reverseDegrees(items);
        console.log(items);

        return newArcs;
        
    }, [radius, pie]);


    
    return (
        <svg width={width} height={height} className={"flex flex-col"} style={animation}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {arcs.map((arc, i) => {
              return <path key={i} d={arc.path} fill={items[i].color} />;
            })}
          </g>
        </svg>
      );
}