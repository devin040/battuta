import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Home from './components/Home';
import About from './components/About';
import Flights from './components/Flights';
import Cities from './components/Cities';
import Navigation from './components/Navigation';
import Admin from './components/Admin';

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/flights" component={Flights}/>
                        <Route path="/cities" component={Cities}/>
                        <Route path="/about" component={About}/>
                        <Route path='/admin' component={Admin}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
