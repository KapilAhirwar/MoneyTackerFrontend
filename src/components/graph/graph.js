import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJs.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);

const dataFormat = (data) => {
  // Your data formatting logic goes here
  return data;
};

const Chart = ({ incomeData, expense }) => {
  const data = {
    labels: incomeData.map((inc) => {
      const { data } = inc;
      return dataFormat(data);
    }),
    datasets: [
      {
        label: 'income',
        data: [...incomeData.map((income) => income.amount)],
        backgroundColor: 'green',
      },
      {
        label: 'Expends',
        data: [...expense.map((expend) => expend.amount)],
        backgroundColor: 'red',
      },
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0.4, // Adjust the tension to control the wave appearance
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div className=''>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
