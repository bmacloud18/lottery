import { useMemo } from "react";
import * as d3 from "d3";            
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Item from "@/app/interfaces/item";
import colors from "@/app/util/colors";




type DataItem = {
    name: string;
    value: number;
  };

const convertData = (item: Item) => {
    return {name: `${item.name}`, value: 100}
}

const MARGIN = 30;
const width = 600;
const height = 600;

export default function PieChartWithCustomizedLabel({
    items,
    animation
}: {
    items: Item[],
    animation: React.CSSProperties
}) {
    const n = items.length;
    const arclength = 360 / n;
    const data = items.map(convertData);
    const radius = Math.min(width, height) / 2 - MARGIN;

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
              color: colors[i].hex,
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
              return <path key={i} d={arc.path} fill={colors[i].hex} />;
            })}
          </g>
        </svg>
      );
}