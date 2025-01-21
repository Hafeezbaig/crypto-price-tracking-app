import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Prices']]); // Initialize with column headers

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const dataCopy = [['Date', 'Prices']];
      historicalData.prices.forEach((item) => {
        dataCopy.push([
          new Date(item[0]).toLocaleDateString(), // Format date
          item[1], // Price
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  if (!historicalData?.prices) {
    return <div>No historical data available</div>;
  }

  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="400px"
      options={{
        legend: { position: 'bottom' },
        hAxis: { title: 'Date' },
        vAxis: { title: 'Prices' },
      }}
    />
  );
};

export default LineChart;
