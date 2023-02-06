import React, { useEffect } from 'react'

function Volumes({volumes}) {
  
  useEffect(()=>{
    console.log(volumes);
  
  },[]);
 return (
    <>
        <div>Volume 1</div>
        <div> Volume 2</div>
    </>
  )
}

export default Volumes