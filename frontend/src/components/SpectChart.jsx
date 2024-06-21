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

export default function SpectChart({ spectData }) {
  const data = spectData.slice(-50);

  return (
    <>
      <div className='text-white text-[2rem]'>Spectral Chart</div>
      <ResponsiveContainer width='100%' height={500}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            tick={{ dy: 10, fill: 'white' }}
            interval={Math.ceil(data.length / 10)}
          />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend
            verticalAlign='bottom'
            align='center'
            wrapperStyle={{ paddingTop: '40px' }} // Add padding to separate the legend from the chart
          />
          <Line type='monotone' dataKey='spectV' stroke='#8F00FF' />
          <Line type='monotone' dataKey='spectB' stroke='#1c53e7' />
          <Line type='monotone' dataKey='spectG' stroke='#2e6930' />
          <Line type='monotone' dataKey='spectY' stroke='#FFFF00' />
          <Line type='monotone' dataKey='spectD' stroke='#FFA500' />
          <Line type='monotone' dataKey='spectR' stroke='#FF0000' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
