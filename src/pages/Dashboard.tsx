import { Box } from '@mui/joy';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import {AiOutlinePhone} from 'react-icons/ai';
import {BsArrowUpRight} from 'react-icons/bs';
import {AiOutlineUser}  from 'react-icons/ai';
import {BsArrowDownRight} from 'react-icons/bs';
import {BsFillPhoneFill}  from 'react-icons/bs';
import { BsSim } from 'react-icons/bs';
import LineChart from '../components/chart/LineChart';
import { PieChart } from '@mui/icons-material';
import DoughnutChart from '../components/chart/DoghnutChart';

export default function Dashboard() {
  return (
    <Stack>
    <Box ml={5} mr={5} style={{
      display: 'flex',
      flexDirection: 'row',
      //spacing
      //gap: 20,
      alignItems: 'center',
      justifyContent: 'space-between',

    }}>
      {/** 
      <Grid container spacing={2}>
        <Grid
          item
          lg={3}
          sx={{
            p: 2,
            bgcolor: 'white',
            boxShadow:
              'rgba(0, 0, 0, 0.04) 0px 5px 22px, rgba(0, 0, 0, 0.03) 0px 0px 0px 0.5px',
          }}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack justifyContent={'space-between'}>
              <Typography variant="body1">bénéficiaires</Typography>
              <Typography variant="h3">32</Typography>
            </Stack>
            <Box
              sx={{
                width: '56px',
                height: '56px',
                bgcolor: '#f04438',
                borderRadius: '50%',
              }}
            ></Box>
          </Stack>
        </Grid>
        <Grid item lg={3} bgcolor={'#ccc'}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body1">bénéficiaires</Typography>
            <Typography variant="h3">32</Typography>
          </Stack>
        </Grid>
        <Grid item lg={3} bgcolor={'#ccc'}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body1">bénéficiaires</Typography>
            <Typography variant="h3">32</Typography>
          </Stack>
        </Grid>
        <Grid item lg={3} bgcolor={'#ccc'}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body1">bénéficiaires</Typography>
            <Typography variant="h3">32</Typography>
          </Stack>
        </Grid>
      </Grid>
      */}
      <Box
        height={220}
        width={350}
        bgcolor={'white'}
        borderRadius={10}
        boxShadow={6}
        style={{
          //position : "relative"
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center', // Optional: Align items horizontally
          //gap: theme.spacing(2), // Optional: Adds spacing between items
          //padding horizontal
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
        <Box style={{
          display: 'flex',
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: '#0276ab',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
          <AiOutlinePhone style={{
            fontSize: 30,
            color: 'white',
            
          }}/>
        </Box>  
        <div style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>Lignes</div>
        </Box>
        <div style={{
          fontSize: 45,
          fontWeight: 'bold',
          marginTop: 15,
          marginLeft: 8,

        }}>200</div>
        <Divider  style={{
          marginTop: 15,
          marginBottom: 10,
          height: 5,

        }}/>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
          <BsArrowUpRight style={{
            fontSize: 20,
            color: '#00b300',
            fontWeight: 'bold',
          }}/>
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 8,
          //color green
          color: '#00b300',

        }}>20%</div>
        
        <div style={{
          fontSize: 15,
          marginLeft: 8,
          fontWeight: 'medium',
          opacity: 0.8,
          //color green
          

        }}>par rapport à l'année dernière</div>
        </Box>
      </Box>
      <Box
        height={220}
        width={350}
        bgcolor={'white'}
        borderRadius={10}
        boxShadow={6}
        style={{
          //position : "relative"
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center', // Optional: Align items horizontally
          //gap: theme.spacing(2), // Optional: Adds spacing between items
          //padding horizontal
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
        <Box style={{
          display: 'flex',
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: '#0276ab',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
          <AiOutlineUser style={{
            fontSize: 30,
            color: 'white',
            
          }}/>
        </Box>  
        <div style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>beneficaires</div>
        </Box>
        <div style={{
          fontSize: 45,
          fontWeight: 'bold',
          marginTop: 15,
          marginLeft: 8,

        }}>15</div>
        <Divider  style={{
          marginTop: 15,
          marginBottom: 10,
          height: 5,

        }}/>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
          <BsArrowDownRight style={{
            fontSize: 20,
            color: '#ff0000',
            fontWeight: 'bold',
          }}/>
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 8,
          //color red
          color: '#ff0000',

        }}>10%</div>
        
        <div style={{
          fontSize: 15,
          marginLeft: 8,
          fontWeight: 'medium',
          opacity: 0.8,
          //color green
          

        }}>par rapport à l'année dernière</div>
        </Box>
      </Box>
      <Box
        height={220}
        width={350}
        bgcolor={'white'}
        borderRadius={10}
        boxShadow={6}
        style={{
          //position : "relative"
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center', // Optional: Align items horizontally
          //gap: theme.spacing(2), // Optional: Adds spacing between items
          //padding horizontal
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
        <Box style={{
          display: 'flex',
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: '#0276ab',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
          <BsFillPhoneFill style={{
            fontSize: 30,
            color: 'white',
            
          }}/>
        </Box>  
        <div style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>Terminaux</div>
        </Box>
        <div style={{
          fontSize: 45,
          fontWeight: 'bold',
          marginTop: 15,
          marginLeft: 8,

        }}>90</div>
        <Divider  style={{
          marginTop: 15,
          marginBottom: 10,
          height: 5,

        }}/>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
          <BsArrowUpRight style={{
            fontSize: 20,
            color: '#00b300',
            fontWeight: 'bold',
          }}/>
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 8,
          //color green
          color: '#00b300',

        }}>20%</div>
        
        <div style={{
          fontSize: 15,
          marginLeft: 8,
          fontWeight: 'medium',
          opacity: 0.8,
          //color green
          

        }}>par rapport à l'année dernière</div>
        </Box>
      </Box>
      <Box
        height={220}
        width={350}
        bgcolor={'white'}
        borderRadius={10}
        boxShadow={6}
        style={{
          //position : "relative"
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center', // Optional: Align items horizontally
          //gap: theme.spacing(2), // Optional: Adds spacing between items
          //padding horizontal
          paddingLeft: '2%',
          paddingRight: '2%',
          paddingTop: '1%',
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
        <Box style={{
          display: 'flex',
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: '#0276ab',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
          <BsSim style={{
            fontSize: 30,
            color: 'white',
            
          }}/>
        </Box>  
        <div style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>Forfait</div>
        </Box>
        <div style={{
          fontSize: 45,
          fontWeight: 'bold',
          marginTop: 15,
          marginLeft: 8,

        }}>15</div>
        <Divider  style={{
          marginTop: 15,
          marginBottom: 10,
          height: 5,

        }}/>
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          
        }}>
          <BsArrowDownRight style={{
            fontSize: 20,
            color: '#ff0000',
            fontWeight: 'bold',
          }}/>
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 8,
          //color red
          color: '#ff0000',

        }}>10%</div>
        
        <div style={{
          fontSize: 15,
          marginLeft: 8,
          fontWeight: 'medium',
          opacity: 0.8,
          //color green
          

        }}>par rapport à l'année dernière</div>
        </Box>
      </Box>
      
    </Box>
    <Stack direction={'row'} justifyContent={'space-between'} ml={5} mr={5} mt={5}>
    <LineChart/>
    <DoughnutChart/>
    </Stack>
    </Stack>
  );
}
