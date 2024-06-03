import { useState, useEffect } from 'react'
import SensorChart from './components/SensorChart'
import Navbar from './components/Navbar'

function App() {

  const [sensorData, setSensorData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const response = await fetch('http://localhost:4001/mission')
    const data = await response.json()
    console.log(data.sensor_data[0].spectroscopy)
    setSensorData(data.sensor_data[0].spectroscopy)
  }


  return (
    <>
      <Navbar />
      <SensorChart data={sensorData}/>
      <h1 className='p-4 text-pink-500'>Vite + React + Tailwindcss</h1>;
    </>
)
}

export default App;
