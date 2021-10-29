import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//Problem is that it is overriding the script already there
import Navbar from './demo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import SignIn from './pages/Signin';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/reports' component={Reports} />
                    <Route path='/products' component={Products} />
                    {/* <Route path='/sign-in' component={SignIn} /> */}
                </Switch>
            </Router>
        </>
    );
}

export default App;