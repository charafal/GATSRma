import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const data = {
  labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Forfait',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: 'Facture',
      data: [2, 3, 20, 5, 1, 4],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const LineChart = () => (
  <>
    <Box sx={{
        height: 430,
        width: 770,
        margin: 5,
        padding: 2,

        backgroundColor: 'white',
        boxShadow: 6,
        paddingY: 2,
        borderRadius: 15,
    }}>
    <Line data={data} options={options} />
    </Box>
    </>
);

export default LineChart;


