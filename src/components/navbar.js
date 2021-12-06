import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Pin from "../images/Logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FolderIcon from "@mui/icons-material/Folder";
import "./Sidebar.css";
const SidebarData = [
  {
    title: "Calendar",
    path: "/calendar",
    icon: <DateRangeIcon />,
    cName: "nav-text",
  },
  {
    title: "Folders",
    path: "/folders",
    icon: <FolderIcon />,
    cName: "nav-text",
  }, ,
  {
    title: "Trello",
    path: "/trello",
    icon: <DashboardIcon />,
    cName: "nav-text",
  }
];

const drawerWidth = 200;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth0();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MainheadData = [
    {
      title: "MainIcon",
      path: "/",
      cName: "nav-text",
      text: "Clipboard",
    },
  ];

  const LogoutheadData = [
    {
      title: "LogoutIcon",
      path: "/",
      icon: <LogoutIcon />,
      cName: "nav-text",
      text: "Logout",
    },
  ];

  const ShareData = [
    {
      titel: "ShareIcon",
      path: "/",
      icon: <ShareIcon />,
      cName: "nav-text",
      text: "Share",
    },
  ];

  return (
    <Box sx={{ display: "flex", "grid-gap": "20px" }}>
      <Drawer
        Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { backgroundColor: "#0D0C1D" } }}
      >
        <List>
          {MainheadData.map((item, index) => {
            return (
              <div>
                <ListItem button key={item} sx={{ color: "#FFFFFF" }}>
                  <ListItemIcon key={index}>
                    <Link to={item.path}>
                      <img id="logo2" src={Pin} alt="main logo" />
                    </Link>
                  </ListItemIcon>
                  <Link id="linklogo" to={item.path}>
                    <h2 style={{ fontFamily: "Roboto" }}>{item.text}</h2>
                  </Link>
                </ListItem>
              </div>
            );
          })}
          <Divider id="mini-divider" />

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: "15px",
              ...(open && { display: "none" }),
              color: "#FFFFFF",
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#FFFFFF" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          {SidebarData.map((item, index) => {
            return (
              <div>
                <ListItem button key={item} sx={{ color: "#FFFFFF" }}>
                  <ListItemIcon key={index}>
                    <Link to={item.path}>
                      <IconButton sx={{ color: "#FFFFFF" }}>
                        {item.icon}
                      </IconButton>
                    </Link>
                  </ListItemIcon>
                  <Link id="linklogo" to={item.path}>
                    <ListItemText primary={item.title} />
                  </Link>
                </ListItem>
              </div>
            );
          })}
        </List>


        {LogoutheadData.map((item, index) => {
          return (
            <div>
              <ListItem
                button
                onClick={() => {
                  sessionStorage.removeItem("user");
                  sessionStorage.removeItem("nickname");
                  sessionStorage.removeItem("id");
                  logout({
                    returnTo: window.location.origin,
                  });
                }
                }
                key={item}
                sx={{ color: "#FFFFFF", top: "200px" }}
              >
                <ListItemIcon key={index}>
                  <Link to={item.path}>
                    <IconButton sx={{ color: "#FFFFFF" }}>
                      {item.icon}
                    </IconButton>
                  </Link>
                </ListItemIcon>
                <Link id="linklogo" to={item.path}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            </div>
          );
        })}
        {ShareData.map((item, index) => {
          return (
            <div>
              <ListItem
                button
                key={item}
                sx={{ color: "#FFFFFF", top: "200px" }}
              >
                <ListItemIcon key={index}>
                  <Link to={item.path}>
                    <IconButton sx={{ color: "#FFFFFF" }}>
                      {item.icon}
                    </IconButton>
                  </Link>
                </ListItemIcon>
                <Link id="linklogo" to={item.path}>
                  <ListItemText primary={item.text} />
                </Link>
              </ListItem>
            </div>
          );
        })}
      </Drawer>
    </Box>
  );
}
