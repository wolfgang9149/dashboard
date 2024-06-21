export default function FlightStageTab({ flightStage }) {
  return (
    <div className='bg-white rounded-xl border-4 border-solid border-black text-center flex justify-center flex-col w-[200px] h-[150px]'>
      <p className='text-2xl mb-1'>Flight Stage:</p>
      <p className='text-3xl'>{flightStage}</p>
    </div>
  );
}
