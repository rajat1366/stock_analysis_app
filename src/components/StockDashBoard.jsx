import React from 'react'
import { stocks } from '../utils/stocks'
import StockTile from './StockTile'

const StockDashBoard = () => {
    var stockList = stocks 
    return (
    <>
    <div className='w-full p-5'>
       {
        stockList.map((stock)=>(
            
            <StockTile stockName={stock+".NS"}></StockTile>
        ))
       }
    </div>
    </>
  )
}

export default StockDashBoard