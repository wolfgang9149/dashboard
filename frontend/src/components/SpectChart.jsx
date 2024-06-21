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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            tick={{ dy: 10, fill: 'gray' }}
            interval={Math.ceil(data.length / 10)}
          />
          <YAxis tick={{ fill: 'gray', dy: -15 }} angle={-45} />
          <Tooltip content={CustomTooltip} />
          <Legend
            verticalAlign='bottom'
            align='center'
            wrapperStyle={{ paddingTop: '40px' }} // Add padding to separate the legend from the chart
          />
          <Line
            type='monotone'
            dataKey='spectV'
            name='Violet (450nm)'
            stroke='#8F00FF'
            dot={false}
          />
          <Line type='monotone' dataKey='spectB' name='Blue (500nm)' stroke='#1c53e7' dot={false} />
          <Line
            type='monotone'
            dataKey='spectG'
            name='Green (550nm)'
            stroke='#2e6930'
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='spectY'
            name='Yellow (570nm)'
            stroke='#FFFF00'
            dot={false}
          />
          <Line
            type='monotone'
            dataKey='spectD'
            name='Orange (600nm)'
            stroke='#FFA500'
            dot={false}
          />
          <Line type='monotone' dataKey='spectR' name='Red (650nm)' stroke='#FF0000' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
