import { Call, LineAxis, People, Policy } from '@mui/icons-material';
import { Box } from '@mui/joy';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from 'recharts';

const Card = ({ circleColor, icon, title, number }) => {
  return (
    <Paper
      sx={{
        p: 3,
        bgcolor: 'white',
        boxShadow:
          'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
        borderRadius: '20px',
        height: '100%',
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
    </Paper>
  );
};

const data = [
  {
    circleColor: '#f04438',
    icon: <LineAxis />,
    title: 'Bénéficiaires',
    number: 32,
  },
  { circleColor: '#10b981', icon: <People />, title: 'Lignes', number: 60 },
  {
    circleColor: '#f79009',
    icon: <Call />,
    title: 'Terminaux',
    number: 32,
  },
  { circleColor: '#6366f1', icon: <Policy />, title: 'Forfaits', number: 15 },
];

const pieData = [
  {
    name: 'Lignes',
    value: 60,
    label: 'Lignes',
  },
  {
    name: 'Terminaux',
    value: 32,
    label: 'Terminaux',
  },
  {
    name: 'Forfaits',
    value: 15,
    label: 'Forfaits',
  },
];

const barData = [
  {
    name: 'Jan',
    'This year': 4000,
    'Last year': 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    'This year': 3000,
    'Last year': 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    'This year': 2000,
    'Last year': 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    'This year': 2780,
    'Last year': 3908,
    amt: 2000,
  },
  {
    name: 'May',
    'This year': 1890,
    'Last year': 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    'This year': 2390,
    'Last year': 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    'This year': 3490,
    'Last year': 4300,
    amt: 2100,
  },
];

const colors = ['#f04438', '#10b981', '#f79009'];

export default function Dashboard() {
  return (
    <Box px={4} pt={{ xs: 2, md: 2 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Card {...item} />
          </Grid>
        ))}
        <Grid item lg={9} md={8} sm={12} xs>
          <Paper
            sx={{
              p: 3,
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              borderRadius: '20px',
              height: '100%',
            }}
          >
            <Stack gap={4} sx={{ width: '100%', height: '100%' }}>
              <Typography variant="h3" fontWeight={'700'} fontSize={'1.125rem'}>
                Bénéficiaires
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="0 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      opacity: 0.85,
                      borderRadius: '10px',
                      boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.2)',
                      border: 'none',
                    }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="This year" fill="#6366F1" />
                  <Bar dataKey="Last year" fill="#6366f13d" />
                </BarChart>
              </ResponsiveContainer>
            </Stack>
          </Paper>
        </Grid>
        <Grid item lg={3} md={4} sm xs>
          <Paper
            sx={{
              p: 3,
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
              borderRadius: '20px',
              height: '100%',
            }}
          >
            <Stack gap={4} alignItems={'center'}>
              <Typography
                variant="h3"
                fontWeight={'700'}
                fontSize={'1.125rem'}
                alignSelf={'flex-start'}
              >
                Traffic
              </Typography>
              <PieChart width={250} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="40%"
                  innerRadius={60}
                  outerRadius={100}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'black',
                    opacity: 0.85,
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.2)',
                    border: 'none',
                  }}
                  itemStyle={{ color: 'white', fontSize: '12px' }}
                />
              </PieChart>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
