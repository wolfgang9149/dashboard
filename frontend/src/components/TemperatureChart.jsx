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
import formatDateTick from '../utils/formatDateTick';

export default function TemperatureChart({ tempData }) {
  
    const data = tempData.slice(-50)

  return (
    <>
        <div className="text-white text-[2rem]">Temp Chart</div>
      <ResponsiveContainer width='100%' height={500}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e'/>
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            angle={-90}
            height={60}
            textAnchor='end'
            tick={{ dx: -10, dy: 10, fill: 'white' }}
            interval={ Math.ceil(data.length / 10 )}
          />
          <YAxis dataKey='temperature' tick={{ fill: 'white' }} />
          <Tooltip />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='temperature' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
