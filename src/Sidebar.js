/*
 *Module Authored by :
 *    Mohamed Ayaan https://github.com/Mohamed-Ayaan358/
 *    P K Navin Shrinivas https://github.com/NavinShrinivas/
 */

import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import mainlogo from "./assets/mainlogo.png";
import "./Sidebar.css";

const drawerWidth = 240;

//these below are paths for thelogos in list of sidebar
const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <DashboardIcon />,
    cName: "nav-text",
  },
  {
    title: "Calender",
    path: "/calender",
    icon: <DateRangeIcon />,
    cName: "nav-text",
  },
  {
    title: "Folders",
    path: "/documents",
    icon: <FolderIcon />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <LogoutIcon />,
    cName: "nav-text",
    text: "Logout",
  },
];
//End of paths and routed in Sidebar
//-----------Imported Code,can be thought of custom Drawer code imported from MUI documentation-----------
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
//------End of imported code------
//
export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: "flex", "padding-top": "20px" }}>
      <MenuIcon sx={{ color: "white" }} />

      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        PaperProps={{ sx: { backgroundColor: "#0D0C1D" } }}
      >
        <img src={mainlogo} alt="Main ClipBoard Logo" />
        <Divider />
        <List>
          {SidebarData.map((text, index) => (
            <ListItem button key={index} sx={{ color: "#FFFFFF" }}>
              <ListItemIcon>
                <Link to={text.path}>
                  <IconButton sx={{ color: "white" }}>{text.icon}</IconButton>
                </Link>
              </ListItemIcon>
              <Link to={text.path}>
                <ListItemText primary={text.title} sx={{ color: "white" }} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List></List>
      </Drawer>
    </div>
  );
}
