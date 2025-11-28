import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

const [data,setData] = useState([["Date","Prices"]])

useEffect(()=> {
    let dataCopy = [["Date","Prices"]];
    if(historicalData.prices) {
        historicalData.prices.map((item)=> {

      const date = new Date(item[0]);

          
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            
            const dateString = `${day}/${month}`;




          dataCopy.push([dateString , item[1]])
        })

        setData(dataCopy);
    }


},[historicalData])


  return (
    <Chart
    chartType='LineChart'
    data={data}
    height="100%"
    legendToggle
 options={{ 
     hAxis: {
     slantedText: true, 
     format: 'text',
           
            maxTextLines: 1, 
            maxAlternation: 1 
 }
 }}
    
    />
  )
}

export default LineChart