import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SidebarData } from './sidebar'
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (

    <Box >
      <Drawer Drawer variant="permanent" open={open} PaperProps={{ sx: { backgroundColor: "#0D0C1D" } }} >
        <List>
          <h1 style={{
            color: "#FFFFFF", display: "inline-block"
          }}>Clipboard</h1>
          <Divider style={{ backgroundColor: "#E42346", border: '1x solid' }} />

          <IconButton
            color="inherit"
            aria-label="open drawer"

            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '15px',
              ...(open && { display: 'none' }),
              color: "#FFFFFF"
            }}

          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          {SidebarData.map((item, index) => {
            return (
              <div  >
                <ListItem button key={item} sx={{ color: "#FFFFFF" }}>
                  <ListItemIcon key={index} >
                    <Link to={item.path}>
                      <IconButton sx={{ color: "#FFFFFF" }}>{item.icon}</IconButton>
                    </Link>
                  </ListItemIcon>
                  <Link to={item.path} style={{ color: "#FFFFFF", textDecoration: "none" }}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              </div>)
          })}
        </List>
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer >
    </Box >
  );
}
