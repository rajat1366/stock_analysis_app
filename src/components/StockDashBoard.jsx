import React from 'react'
import GenericPdfDownloader from '../utils/GenericPdfDownloader'
import { stocks } from '../utils/stocks'
import StockTile from './StockTile'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const StockDashBoard = () => {
    var stockList = stocks 
    const printRef = React.useRef();

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    };
   

    return (
    <>
    <div>
    {/* <GenericPdfDownloader 
          downloadFileName="CustomPdf" 
          rootElementId="pdfPage" 
        /> */}
        <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>
    </div>
    <div className='w-full p-1' ref={printRef}>
       {
        stockList.map((stock)=>(
            
            <StockTile key={stock} stockName={stock}></StockTile>
        ))
       }
    </div>
    </>
  )
}

export default StockDashBoard