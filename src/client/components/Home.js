import React from 'react';
import Search from './search';
import Flights from './Flights';
import { createMuiTheme } from '@material-ui/core/styles';

import { Container, Typography, Box, Card, Paper } from '@material-ui/core'
import { inheritTrailingComments } from '@babel/types';
import Image from '../images/battuta.png';
import battutaFont from '../fonts/arabian.ttf'
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: purple,
    },
    status: {
      danger: 'orange',
    },
  });

const backStyle = {

    backgroundImage: `url(${Image})`,
    height: '100%',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    
    //backgroundColor: '#f1f1f1f1'
    
}

const Home = () => {
    return (
        <React.Fragment>
             <div style={backStyle}> 
             <Typography variant="h3" style={{ paddingLeft: "50px", paddingTop:"50px", color:"antiquewhite", fontFamily: 'Trattatello, fantasy'}}>
             IBN BATTUTA
             </Typography>
             <Typography variant= "p" style={{ paddingLeft: "60px", paddingTop:"50px", color:"beige", fontFamily: 'Trattatello, fantasy'}}>
                  Life of a Traveler 
             </Typography>

          
                 <Search />
              <Paper style ={{ backgroundColor: "rgb(107, 50, 80)"}}>
             <Typography variant="h6" style={{padding: '1%', paddingLeft: "30px", color:"white" ,fontFamily: '', fontWeight: "100"}}>
             RECOMMENDATIONS FOR YOU
             </Typography>
             </Paper>
             <div style = {{paddingLeft: "80px", paddingRight: "80px", marginLeft: "80px", marginRight: "80px", backgroundColor: "white"}}>
                <Flights /> 
            </div>    
        </div>
        </React.Fragment>
    );
    
}

export default Home;
