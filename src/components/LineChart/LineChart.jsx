

import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {

  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];

    if (historicalData && historicalData.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");

        const dateString = `${day}/${month}`;

        dataCopy.push([dateString, Number(item[1])]);
      });

      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
      options={{
        backgroundColor: "#ffffff",
        hAxis: {
          slantedText: true,
          format: "text",
          maxTextLines: 1,
          maxAlternation: 1,
          textStyle: { color: "#333" },
        },
        vAxis: {
          textStyle: { color: "#333" },
        },
        series: {
          0: { lineWidth: 2 },
        },
        chartArea: { left: 50, right: 20, top: 20, bottom: 50 },
      }}
    />
  );
};

export default LineChart;
