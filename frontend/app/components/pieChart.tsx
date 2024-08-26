import { useMemo } from "react";
import * as d3 from "d3";            
import { DefaultizedPieValueType } from '@mui/x-charts/models';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Item from "@/app/interfaces/item";



const colors = [
    { name: 'red', hex: '#b91c1c'}, 
    {name: 'blue', hex: '#0b46e6'}, 
    {name: 'black', hex: '#262626'},
    {name: 'green', hex: '#14532d'},
    {name: 'purple', hex: '#9a19e0'},
    {name: 'cyan', hex: '#2da6e3'},
    {name: 'pink', hex: '#f211cd'},
    {name: 'lime', hex: '#27de16'},
    {name: 'indigo', hex: '#49318c'},
    {name: 'orange', hex: '#e37f0e'}
]

type DataItem = {
    name: string;
    value: number;
  };

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};

const getArcLabel = (params: DefaultizedPieValueType) => {
  return `${params.label}`;
};

const convertData = (item: Item) => {
    return {name: `${item.name}`, value: 100}
}

const MARGIN = 30;
const width = 350;
const height = 350;

export default function PieChartWithCustomizedLabel({
    items
}: {
    items: Item[]
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
        );
    }, [radius, pie]);


    
    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {arcs.map((arc, i) => {
              return <path key={i} d={arc} fill={colors[i].hex} />;
            })}
          </g>
        </svg>
      );
}