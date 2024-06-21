import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from 'recharts';
import formatDateTick from '../utils/formatDateTick';

export default function TemperatureChart({ tempData }) {
  const data = tempData.slice(-50);

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
            tick={{ dy: 10, fill: 'gray' }}
            interval={Math.ceil(data.length / 5)}
          />
          <YAxis dataKey='temperature' tick={{ fill: 'gray' }}>
            <Label 
            value={'Temperature (°C)'}
            angle={-90}
            fill='white'
            dx={-15}/>
          </YAxis>
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='temperature' stroke='#fff' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
