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
  const data = tempData.slice(-20);

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
          <p className='data'>{`Temperature: ${payload[0].value.toFixed(2)}°C`}</p>
        </div>
      );
    }

    return null;
  };

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
          <YAxis dataKey='temperature' tick={{ fill: 'gray' }} angle={-45}>
            <Label value={'Temperature (°C)'} angle={-90} fill='white' dx={-15} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='temperature' stroke='#fff' dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
