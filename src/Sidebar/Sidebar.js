import React, { Component } from "react";
import "./Sidebar.css";
import Drawer from "@mui/material/Drawer";
class Sidebar extends Component {
  render() {
    return (
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      />
    );
  }
}

export default Sidebar;

