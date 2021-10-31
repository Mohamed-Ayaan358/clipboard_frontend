import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './demo';
import App from './App';
import Land from './pages/land';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    {/* <App /> */}
    <Land />
    {/* This must be the main thing here and have a link to het started on it to take */}
  </StyledEngineProvider>,
  document.querySelector("#root")
);