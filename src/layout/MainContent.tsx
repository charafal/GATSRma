import React from 'react';
import Header from '../components/Header/Header';
import AppSidebar from '../components/Sidebar';
import { DrawerHeader } from '../components/Sidebar';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const mdTheme = createTheme();

export const MainContent = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header Handler={toggleDrawer} Open={open} />
        <AppSidebar
          open={open}
          handleDrawerClose={toggleDrawer}
          handleDrawerOpen={toggleDrawer}
        />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <DrawerHeader />
          <Box sx={{ pt: 3 }}>
            <Outlet></Outlet>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
