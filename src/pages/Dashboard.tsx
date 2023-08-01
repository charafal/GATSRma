import { Box } from '@mui/joy';
import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Dashboard() {
  return (
    <Box ml={4}>
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
    </Box>
  );
}
