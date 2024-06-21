import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import formatDateTick from '../utils/formatDateTick';

export default function HumidityChart({ humidityData }) {
  console.log('In humidity chart', humidityData);
  const data = humidityData.slice(-50);

  return (
    <>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            tick={{ dy: 10, fill: 'white' }}
            interval={Math.ceil(data.length / 5)}
          />
          <YAxis dataKey='humidity' tick={{ fill: 'white' }} />
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='humidity' stroke='#fff' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
