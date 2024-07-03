import { Navbar, NavbarContent, Image, Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import DataFetcher from '../services/DataFetcher';

export default function Header({ isLive, toggleLive, spectData, setSpectData, setTempData, setHumidityData, setPressureData, setAccelerationData }) {
  const [time, setTime] = useState('Loading...');

  useEffect(() => {
    if (spectData?.length > 0) {
      const latestDataPoint = new Date(spectData[spectData.length - 1].dateTime);
      const adelaideTime = latestDataPoint.toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne'
      });
      setTime(adelaideTime);
    }
  }, [spectData]);

  return (
    <Navbar
      maxWidth='full'
      className='max-w-full py-4 min-h-[120px] md:min-h-[80px] bg-rsBlue'
      height='auto'
    >
      <NavbarContent justify='center'>
        <Image
          src='/logo/rs-logo.png'
          alt='ResearchSat logo'
          className='w-full max-h-[50px] md:w-auto'
        />
      </NavbarContent>
      <NavbarContent justify='left'>
        <div className='flex flex-row items-center gap-6'>
          <span className='text-white text-l'>Latest data: {time}</span>
          <DataFetcher setSpectData={setSpectData} setTempData={setTempData} setHumidityData={setHumidityData} setPressureData={setPressureData} setAccelerationData={setAccelerationData}/>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
