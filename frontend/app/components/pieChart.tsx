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

const getArcLabel = (params: DefaultizedPieValueType) => {
  return `${params.label}`;
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

    const data = items.map(convertData);
    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 0,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            })
        ).filter((arc): arc is string => arc !== null);;
    }, [radius, pie]);


    
    return (
        <svg width={width} height={height} className={"flex flex-col"} style={animation}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {arcs.map((arc, i) => {
              return <path key={i} d={arc} fill={colors[i].hex} />;
            })}
          </g>
        </svg>
      );
}