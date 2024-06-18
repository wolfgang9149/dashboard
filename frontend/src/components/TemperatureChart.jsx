import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function TemperatureChart({ tempData }) {
  console.log('Temp data', tempData);

  function formatDateTick(tickItem) {
    const date = new Date(tickItem);
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB');

    return `${formattedTime}`;
  }

  return (
    <>
      <div>TemperatureChart</div>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          width={730}
          height={250}
          data={tempData}
          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            angle={-90}
            height={60}
            textAnchor='end'
            tick={{ dx: -10, dy: 10 }}
          />
          <YAxis dataKey='temperature' />
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='temperature' stroke='#8884d8' />
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
