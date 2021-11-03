import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pin from '../images/Logo.png';
import ReactDOM from 'react-dom';
import App from '../App'; //This is hella important to view it
import "./pages.css";
import { CSSTransition } from 'react-transition-group';

function Land() {

    const returnmain = () => {

        ReactDOM.render(<App />, document.getElementById('root'));
    }

    return (
        <>
            <div class="img-with-text">
                <img id="logo1" src={Pin} />
                <h4 id="caption1">Clipboard</h4>
            </div>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                {/* <DrawerHeader /> */}
                < Typography paragraph id="tagline1">
                    Compile everything.

                </Typography>
                <Typography paragraph id="tagline2" >

                    Even if its a simple note
                </Typography>
                <Typography paragraph id="tagline3" >
                    What is PinBoard you ask?
                    It’s a hyper effective planner for your daily needs.
                    <br />What are you waiting for, get registered now!
                </Typography>
                <div style={{ paddingTop: "100px", textAlign: "center" }}>
                    <Link to="/home">
                        <button id="getstarted"  >Let's get started</button>
                    </Link>
                </div>
            </Box>

            {/* Need to modify the contents of the actual navbar*/}
            <div id="bottom-bar" class="navbar" >
                <p id="about-us" > About us &emsp;</p>

            </div >

        </>
    );
}

export default Land;