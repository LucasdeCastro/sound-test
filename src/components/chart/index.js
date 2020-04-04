import React from 'react';
import {
  ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const colors = ['red', 'green', 'pink', 'yellow'];

const Chart = ({ data }) => (
  <ScatterChart
    width={600}
    height={500}
    margin={{
      top: 20, right: 20, bottom: 20, left: 20,
    }}
  >
    <XAxis type="number" dataKey="age" name="Idade" unit=" anos" />
    <YAxis type="number" dataKey="frequency" name="Frequencia" unit=" Hz" />
    <CartesianGrid />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name="A school" data={data} fill="#8884d8">
      {
        data.map((entry, index) => (
          <Cell
            key={`cell-${entry}`}
            fill={colors[index % colors.length]}
          />
        ))
      }
    </Scatter>
  </ScatterChart>
);

export default Chart;
