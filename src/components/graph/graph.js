import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Chart = ({ incomeData, expense }) => {
  const chartRef = useRef(null);
  const [gradientIncome, setGradientIncome] = useState(null);
  const [gradientExpense, setGradientExpense] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      // Create gradient for income data
      const incomeGradient = ctx.createLinearGradient(0, 0, 0, 400);
      incomeGradient.addColorStop(0, 'rgba(34, 202, 236, 0.7)'); // Light blue
      incomeGradient.addColorStop(1, 'rgba(34, 202, 236, 0.1)'); // Faded blue
      setGradientIncome(incomeGradient);

      // Create gradient for expense data
      const expenseGradient = ctx.createLinearGradient(0, 0, 0, 400);
      expenseGradient.addColorStop(0, 'rgba(255, 99, 132, 0.7)'); // Light red
      expenseGradient.addColorStop(1, 'rgba(255, 99, 132, 0.1)'); // Faded red
      setGradientExpense(expenseGradient);
    }
  }, [chartRef]);

  const data = {
    labels: incomeData.map((inc, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Income',
        data: incomeData.map((income) => income.amount),
        backgroundColor: gradientIncome,
        borderColor: 'rgba(34, 202, 236, 1)',
        fill: true,
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
      },
      {
        label: 'Expense',
        data: expense.map((expend) => expend.amount),
        backgroundColor: gradientExpense,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4, // Adds a smooth curve to the lines
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Chart;
