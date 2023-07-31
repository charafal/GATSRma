import { Call, LineAxis, People, Policy } from '@mui/icons-material';
import { Box } from '@mui/joy';
import { Grid, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const Card = ({ circleColor, icon, title, number }) => {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: 'white',
        boxShadow:
          'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
        borderRadius: '20px',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-between'} height={'100%'}>
        <Stack
          justifyContent={'space-between'}
          alignItems={'space-between'}
          gap={2}
        >
          <Typography
            variant="body1"
            fontSize={'13px'}
            color={'#6c737f'}
            textTransform={'uppercase'}
            fontWeight={'600'}
          >
            {title}
          </Typography>
          <Typography variant="h3" fontSize={'32px'} fontWeight={'700'}>
            {number}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '56px',
            height: '56px',
            bgcolor: circleColor,
            borderRadius: '50%',
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Box>
  );
};

const data = [
  {
    circleColor: '#f04438',
    icon: <LineAxis />,
    title: 'Bénéficiaires',
    number: 32,
  },
  { circleColor: '#10b981', icon: <People />, title: 'Lignes', number: 1.6 },
  {
    circleColor: '#f79009',
    icon: <Call />,
    title: 'Terminaux',
    number: 32,
  },
  { circleColor: '#6366f1', icon: <Policy />, title: 'Forfaits', number: 15 },
];

export default function Dashboard() {
  return (
    <Box px={4} pt={{ xs: 2, md: 2 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Card {...item} />
          </Grid>
        ))}
        <Grid item lg={3}>
          <Box
            sx={{
              p: 3,
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              borderRadius: '20px',
            }}
          >
            <PieChart
              colors={['#f04438', '#10b981', '#f79009']}
              legend={{ hidden: true }}
              series={[
                {
                  innerRadius: 55,
                  data: [
                    { id: 0, value: 10, label: 'Bénéficiaires' },
                    { id: 1, value: 15, label: 'Lignes' },
                    { id: 2, value: 15, label: 'Terminaux' },
                  ],
                },
              ]}
              height={200}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
