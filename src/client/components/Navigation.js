import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
         <AppBar position="static" style={{ backgroundColor: "rgba(73, 3, 40, 0.81)"}}>
            <Tabs >
            <NavLink style={{textDecoration:'none', color: '#fff'}} to="/"><Tab label="Home"/></NavLink>
            <NavLink style={{textDecoration:'none', color: '#fff'}} to="/cities"><Tab label="Cities Attractions"/></NavLink>
            {/* <NavLink style={{textDecoration:'none', color: '#fff'}} to="/about"><Tab label="About"/></NavLink> */}
            </Tabs>

            {/* <NavLink to="/">Home</NavLink>
            <NavLink to="/flights">Flights</NavLink> */}
            {/* <NavLink to="/cities">Cities</NavLink>
            <NavLink to="/about">About</NavLink> */}

            </AppBar>
        </div>
    );
}

export default Navigation;
