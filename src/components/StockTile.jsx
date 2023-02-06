import React, { useEffect, useState } from 'react'
import { getStockData } from '../services/stockDataService';
import Volumes from './Volumes';

function StockTile({stockName}) {
  const [dataStock,setDataStock] = useState([]);  
  
  useEffect(()=>{
    let params = {"interval":"1d","range":"11d","stockName":stockName};
   
    getStockData( params, stockName)
        .then(response =>{
        //  console.log(JSON.parse(response.data)["chart"]["result"][0]["indicators"]);
         setDataStock(JSON.parse(response.data)["chart"]["result"]);
        //  console.log(dataStock);
    })
    .catch(e=>{console.log(e);})
  
  },[]);
  return (
    <div className=' p-5 w-full inline-flex space-x-3 '>
      <div className='border-2 border-red-500 items-center p-4'>
         {stockName}
      </div>
      <div className='w-full inline-flex space-x-3'>
            <div className='border-2 border-red-500 grid grid-cols-3 gap-4 p-2'>
              
                <div> Close1 </div>
                <div> Close 2</div>
                <div> close 3 </div>
              
                <div> Close1 </div>
                <div> Close 2</div>
                <div> close 3 </div>

                <div> Close1 </div>
                <div> Close 2</div>
                <div> close 3 </div>
              
              
            </div>
            <div className='border-2 border-red-500 grid grid-cols-2 gap-4 '>
                 {dataStock.length > 0 ?<Volumes volumes={dataStock[0]["indicators"]["quote"][0]["volume"]}></Volumes> : null }
                  
            </div>
      </div>

      
      
    
    </div>
  )
}

export default StockTile