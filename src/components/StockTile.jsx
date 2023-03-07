import React, { useEffect, useState } from 'react'
import { getStockData } from '../services/stockDataService';
import Volumes from './Volumes';

function StockTile({stockName}) {
  const [dataStock,setDataStock] = useState([]);  
  const [open , setOpenData] = useState([]);
  const [close , setCloseData] = useState([]);
  const [timeStamp,setTimeStamp] = useState([]);
  const [greenCan,setGreenCan] = useState(0);
  const [redCan,setRedCan] = useState(0);
  const [greenAvg,setGreenAvg] = useState(0);
  const [redAvg , setRedAvg] = useState(0);

  useEffect(()=>{
    let params = {"interval":"1d","range":"10d","stockName":stockName+".NS"};
    
    getStockData( params, stockName)
        .then(response =>{
         
         var data = (JSON.parse(response.data)["chart"]["result"]);
          console.log(data);
         if(data.length>0){
          setOpenData(data[0]["indicators"]["quote"][0]["open"]);
          setCloseData(data[0]["indicators"]["quote"][0]["close"]);
          var gCount =0 ;
          var rCount = 0;
          var open = data[0]["indicators"]["quote"][0]["open"];
          var close = data[0]["indicators"]["quote"][0]["close"];
          var timeStamps = data[0]["timestamp"];
          setTimeStamp(timeStamps);
          var greenAvg = 0;
          var redAvg = 0;

          for(let i =5 ; i < 10 ; i++){
            if(open[i] < close[i]){
              gCount++;
              greenAvg += (close[i]-open[i]);
            } else {
              rCount++;
              redAvg += (open[i]-close[i]);
            }
          }
          setGreenCan(gCount);
          setRedCan(rCount);
          if(gCount > 0)
            setGreenAvg((greenAvg/gCount));
          if(rCount > 0)
            setRedAvg((redAvg/rCount));
          setDataStock(data);
         }
         
    })
    .catch(e=>{console.log(e);})
  
  },[]);

  
  

  return (
    <div className='  w-full inline-flex space-x-3 text-xs border-b-2 border-gray-200'>
      <div className=' w-1/6 items-center text-sm text-gray-500'>
         {stockName}
      </div>
      
      <div className='w-full inline-flex space-x-3 border-l-2 border-gray-200 pl-2'>
          
            <div className=' grid grid-cols-5 gap-4 '>
                { timeStamp.length > 0?
                  <>
                    <div> { new Date(timeStamp[5]* 1000).toDateString() }</div>
                    <div> { new Date(timeStamp[6]* 1000).toDateString() }</div>
                    <div> { new Date(timeStamp[7]* 1000).toDateString() }</div>
                    <div> { new Date(timeStamp[8]* 1000).toDateString() }</div>
                    <div> { new Date(timeStamp[9]* 1000).toDateString() }</div>
                  </>
                :
                  null
                }  
                
                { open.length > 0 ? 
                <>
                  <div> {open[5]<close[5] ? <div className='w-2 h-2 bg-green-500 rounded-full'></div> :<div className='w-2 h-2 bg-red-500 rounded-full'></div>} </div>
                    <div> {open[6]<close[6] ? <div className='w-2 h-2 bg-green-500 rounded-full'></div>:<div className='w-2 h-2 bg-red-500 rounded-full'></div>} </div>
                    <div> {open[7]<close[7] ? <div className='w-2 h-2 bg-green-500 rounded-full'></div>:<div className='w-2 h-2 bg-red-500 rounded-full'></div>} </div>
                    <div> {open[8]<close[8] ? <div className='w-2 h-2 bg-green-500 rounded-full'></div>:<div className='w-2 h-2 bg-red-500 rounded-full'></div>} </div>
                    <div> {open[9]<close[9] ? <div className='w-2 h-2 bg-green-500 rounded-full'></div>:<div className='w-2 h-2 bg-red-500 rounded-full'></div>} </div>
                </>
                    
                : null}
                
            </div>
            
            
            
            {/* <div className='border-2 border-red-500 grid grid-cols-2 gap-0 '>
                 {dataStock.length > 0 ?<Volumes volumes={dataStock[0]["indicators"]["quote"][0]["volume"]}></Volumes> : null }
                  
            </div> */}
            <div className=' grid grid-cols-2 gap-4 border-l-2 border-gray-200 pl-2'>
              <div> Green</div>
              <div> Red </div>
              <div> {greenCan}</div>
              <div> {redCan}</div>
            </div>
            <div className=' grid grid-cols-2 gap-4 border-l-2 border-gray-200 pl-2'>
              <div> Green Height</div>
              <div> Red Height</div>
              <div> {greenAvg.toFixed(2)}</div>
              <div> {redAvg.toFixed(2)}</div>
            </div>
            <div className=' grid grid-cols-1 gap-4 border-l-2 border-gray-200 pl-2'>
              <div> 5 Day Trend</div>
              <div>{ redCan > greenCan && redAvg > greenAvg? <div className='text-red-600'>Down</div> :null} {greenCan > redCan && greenAvg > redAvg ? <div className='text-green-600'>UP</div>:null} </div>
            </div>
            <div className=' grid grid-cols-1 gap-4 border-l-2 border-gray-200 pl-2'>
              <div> 10 Day Back</div>
              {close.length>0 ? 
                <div> {close[0] > close[9] &&  (close[0]-close[9])/close[0]*100 > 3 ? <div className='text-red-600'>Down</div>:null}  {close[9] > close[0] &&  (close[9]-close[0])/close[0]*100 > 3 ? <div className='text-green-600'>UP</div>:null}</div>
              : null}
              
            </div>
      </div>

      
      
    
    </div>
  )
}

export default StockTile