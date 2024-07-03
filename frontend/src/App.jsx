import { useState, useEffect } from 'react';
import { useDisclosure, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import BaseLayout from './layout/BaseLayout';
import TemperatureChart from './components/TemperatureChart';
import SpectChart from './components/SpectChart';
import HumidityChart from './components/HumidityChart';
import PressureChart from './components/PressureChart';
import PressureChartFull from './components/PressureChartFull';
import HumidityChartFull from './components/HumidityChartFull';
import TemperatureChartFull from './components/TermperatureChartFull';
import SpectChartFull from './components/SpectChartFull';
import AccelerationChart from './components/AccelerationChart';
import AccelerationChartFull from './components/AccelerationChartFull';

function App() {
  const [spectData, setSpectData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [accelerationData, setAccelerationData] = useState([]);
  const [flightStage, setFlightStage] = useState("");
  const [activeData, setActiveData] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [currentActiveChart, setCurrentActiveChart] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setCurrentActiveChart(null);

      setActiveData([]);
    }
  });

  useEffect(() => {
    getData();
  }, [isLive]);

  // Single API call for all data points, query limited to 50
  async function getData() {
    const response = await fetch('http://localhost:4001/mission/data?limit=50');

    const data = await response.json();

    const temperatureArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      temperature: entry.temperature
    }));

    const humidityArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      humidity: entry.humidity
    }));

    const pressureArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      pressure: entry.pressure
    }));

    const spectArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      spectV: entry.spectV,
      spectB: entry.spectB,
      spectG: entry.spectG,
      spectY: entry.spectY,
      spectD: entry.spectD,
      spectR: entry.spectR
    }));

    const accelerationArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      acx: entry.acx,
      acy: entry.acy,
      acz: entry.acz
    }));

    setTempData(temperatureArr);
    setHumidityData(humidityArr);
    setPressureData(pressureArr);
    setSpectData(spectArr);
    setAccelerationData(accelerationArr);

    const signalColorMap = {
      LO: "rgba(117, 4, 32, 0.4)",
      MG: "rgba(44, 105, 0, 0.4)",
      RE: "rgba(117, 4, 32, 0.4)"
    };
    
    // Find signal of last data point
    const currentSignal = data[data.length - 1].signal;
    
    // Set flightStage based on the signal value
    setFlightStage({
      signal: currentSignal,
      colour: signalColorMap[currentSignal] || "rgba(0, 0, 0, 0)" // Default to transparent black if signal not found
    });

  }

  // Call individual API endpoints for full data set for sensor type, passed in as sensor 'name'
  async function getFullSensorData(name) {
    // console.log('Getting data triggered');
    const response = await fetch(`http://localhost:4001/mission/data/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    let dataArr = [];

    if (name === 'spect') {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        spectV: entry.spectV,
        spectB: entry.spectB,
        spectG: entry.spectG,
        spectY: entry.spectY,
        spectD: entry.spectD,
        spectR: entry.spectR
      }));
    } else if (name === 'acceleration') {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        acx: entry.acx,
        acy: entry.acy,
        acz: entry.acz,
        signal: entry.signal
      }));
    } else {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        [name]: entry[name]
      }));
    }

    setActiveData(dataArr);
  }

  // Expand chart to full screen onClick function
  function renderActiveChart() {
    switch (currentActiveChart) {
      case 'pressure':
        return <PressureChartFull pressureData={activeData} />;

      case 'humidity':
        return <HumidityChartFull humidityData={activeData} />;

      case 'temperature':
        return <TemperatureChartFull temperatureData={activeData} />;

      case 'spect':
        return <SpectChartFull spectData={activeData} />;

      case 'acceleration':
        return <AccelerationChartFull accelerationData={activeData} />;
    }
  }

  const onSelectActiveChart = (chartName) => async () => {
    setCurrentActiveChart(chartName);

    await getFullSensorData(chartName);

    onOpen();
  };

  const toggleLive = () => {
    setIsLive((c) => !c);
  };

  return (
    <BaseLayout headerProps={{ isLive, toggleLive, spectData }}>
      <div className='grid grid-cols-3 grid-rows-[30vh_30vh_30vh] w-full'>
        <div className='h-[300px]'>
          <div className='bg-gray-300 text-[2rem]'>Image placeholder</div>
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-l-1 border-white'>
          <PressureChart
            pressureData={pressureData}
            dataPoints={20}
            handleChartClick={onSelectActiveChart}
          />
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <HumidityChart humidityData={humidityData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <TemperatureChart tempData={tempData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-8 col-start-1 col-span-2 row-span-2 row-start-3 flex flex-col text-center border-t-1 border-white'>
          <SpectChart spectData={spectData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-6 col-start-2 col-span-1 row-span-2 row-start-3 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <AccelerationChart
            accelerationData={accelerationData}
            handleChartClick={onSelectActiveChart}
            flightStage={flightStage}
          />
        </div>
      </div>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalContent className='bg-background p-8'>
          {() => <ModalBody>{renderActiveChart()}</ModalBody>}
        </ModalContent>
      </Modal>
    </BaseLayout>
  );
}

export default App;
