import React, { useEffect, useState } from 'react'

function Volumes({volumes}) {
  const [averageVolume,setAverageVolume] = useState(0);
  useEffect(()=>{
   
    // setAverageVolume(volumes.slice(0,volumes.length-1).reduce((a,b)=> a+b,0)/volumes.length-1 );
    setAverageVolume(volumes.reduce((a,b)=> a+b,0)/volumes.length-1 );

  },[]);
 return (
    <>
        <div>Average Vol</div>
        <div> Today Volume</div>
        <div>{averageVolume.toFixed(2)}</div>
        <div>{volumes[volumes.length-1]}</div>
        <div className='col-span-2 border-2 border-red-500 items-center justify-center flex'>
        {
          averageVolume <= volumes[volumes.length-1]
          
          ? 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          : 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        

       


        </div>
    </>
  )
}

export default Volumes