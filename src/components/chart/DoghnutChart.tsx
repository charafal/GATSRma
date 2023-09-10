import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

//doghnut chart that shows the percentage of the each class of the data like class a, class b, class c

const data = {
  labels: ['Terminaux', 'Beneficiaires', 'forfaits'],
  datasets: [
    {

      data: [12, 19, 3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 4,
    },
  ],
};

const DoughnutChart = () => (
  <>
  <Box sx={{
        height: 430,
        width: 550,
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        boxShadow: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    <Doughnut data={data} />
    </Box>
  </>
);

export default DoughnutChart;