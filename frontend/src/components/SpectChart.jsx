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

  // Custom tooltip formatter (optional, for better formatting)
  const CustomTooltip = ({ active, payload, label }) => {
    let time;
    if (label) {
      time = label.split('T')[1].split('.')[0];
    }

    if (active && payload && payload.length) {
      return (
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          <p className='label'>{`Time: ${time}`}</p>
          <p className='data'>{`Violet: ${payload[0].value.toFixed(2)}`}</p>
          <p className='data'>{`Blue: ${payload[1].value.toFixed(2)}`}</p>
          <p className='data'>{`Green: ${payload[2].value.toFixed(2)}`}</p>
          <p className='data'>{`Yellow: ${payload[3].value.toFixed(2)}`}</p>
          <p className='data'>{`Orange: ${payload[4].value.toFixed(2)}`}</p>
          <p className='data'>{`Red: ${payload[5].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <ResponsiveContainer width='100%' height={385}>
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
            tick={{ dy: 10, fill: 'gray' }}
            interval={Math.ceil(data.length / 10)}
          />
          <YAxis tick={{ fill: 'gray' }} />
          <Tooltip content={CustomTooltip} />
          <Legend
            verticalAlign='bottom'
            align='center'
            wrapperStyle={{ paddingTop: '40px' }} // Add padding to separate the legend from the chart
          />
          <Line type='monotone' dataKey='spectV' name='Violet' stroke='#8F00FF' />
          <Line type='monotone' dataKey='spectB' name='Blue' stroke='#1c53e7' />
          <Line type='monotone' dataKey='spectG' name='Green' stroke='#2e6930' />
          <Line type='monotone' dataKey='spectY' name='Yellow' stroke='#FFFF00' />
          <Line type='monotone' dataKey='spectD' name='Orange' stroke='#FFA500' />
          <Line type='monotone' dataKey='spectR' name='Red' stroke='#FF0000' />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
