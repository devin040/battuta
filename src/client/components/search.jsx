import React, {Component} from 'react';
import {
    Grid,
    Paper,
    Container,
    Box,
    Divider,
    Switch,
    FormControlLabel,
    Button,
    IconButton,
    List, ListItem, ListItemText, ListItemAvatar, Avatar,
    TextField, Card, Typography, CardMedia, CardContent, CardActions, Collapse,
    Table, TableBody, TableCell, TableRow, TableHead,

} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import 'date-fns';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FlightIcon from '@material-ui/icons/Flight';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import { mergeClasses } from '@material-ui/styles';
import { bigIntLiteral } from '@babel/types';


const styles = theme => ( {
    
    card: {
      padding:'10px', 
      width:'850px',
      marginRight: "176px", 
      marginLeft: "176px",
    },

    dateField:{

      marginLeft: "10%",
      marginRight: "10%"


    },
 
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),        
    },
    dense: {
        marginTop: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    fab: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

});



class Search extends Component {

 

 constructor(){
    super();
    this.state =
      {
        searchResults: [],
        destinationCount: 1,
        destinations: [{ from: "", date: new Date(), to: "" }],
        startDate: new Date(),
        endDate: new Date(),
        flexibleFlag: true,
        expanded: false,
        disableAdd: false,
  
    };

 };
      
      
   handleExpandClick = () => {
        this.setState({ 
          expanded: !this.state.expanded
        });
   };

    handleStartDate = (idx, dateValue) =>{

        
        const newDestinations = this.state.destinations.map((destination, sidx) => {
            if (idx !== sidx) return destination;
            return { ...destination, date: dateValue };
          });
        this.setState(
           {destinations: newDestinations}
        );
    };

    handleEndDate = (date) => {
        this.setState({
            endDate: date
        });
    };

    handleFromChange = idx => evt => {
        // if (e.target.value.length === 3) {
        //     let destinations = [...this.state.destinations];
        //     destinations[e.target.id].number = Number(e.target.id) + 1;
        //     destinations[e.target.id].city = e.target.value.toUpperCase();
        //     this.setState({destinations}, () => console.log(this.state.destinations));
        // }
        console.log(evt.target.value)
          const newDestinations = this.state.destinations.map((destination, sidx) => {
            if (idx !== sidx) return destination;
            return { ...destination, from: evt.target.value };
          });
      
          this.setState({ destinations: newDestinations });
       
    };

    handleToChange = idx => evt => {
        const newDestinations = this.state.destinations.map((destination, sidx) => {
            if (idx !== sidx) return destination;
            return { ...destination, to: evt.target.value };
          });
      
          this.setState({ destinations: newDestinations });

    }

    handleAdd = () => {
        let dc = this.state.destinationCount;
        if (dc < 4) {
            // this.setState((prevState) => ({
            //     destinations: [...prevState.destinations, {number: "", city: ""}],
            // }));
            this.setState({
              destinations: this.state.destinations.concat([{ from: "", date: new Date(), to: "" }])
            });
            this.setState({destinationCount: this.state.destinationCount + 1});
            
            
        } else {
            this.setState({disableAdd: !this.state.disableAdd})
            //notification
        }
    };

   
    handleRemove = idx => () => {
      this.setState({
        destinations: this.state.destinations.filter((s, sidx) => idx !== sidx)
      });
      this.setState({destinationCount: this.state.destinationCount - 1});
      this.setState({ disableAdd: false })
   

    };

    handleFlexible = () => {
        this.setState(prevState => ({
            flexibleFlag: !prevState.flexibleFlag
        }));
    };

    handleSubmit = () => {
        // let cities = []
        // for (let i = 0; i < this.state.destinations.length; i += 1) {
        //     cities.push(this.state.destinations[i].city);
        // }

        // axios.post("api/flight/search", {
        //     startDate: this.state.startDate,
        //     endDate: this.state.endDate,
        //     cities: cities,
        // }).then((res) => {
        //     this.setState({searchResults: res.data.rows[0]});
        // }).catch(err => console.log(err));

        const cities = [];
        const dates = [];
        cities.push(this.state.destinations[0].from);

        for (let i = 0; i < this.state.destinations.length; i += 1) {
            let comp = this.state.destinations[i];
            let dateValue = comp.date;
            let month = '' + (dateValue.getMonth() + 1),
            day = '' + dateValue.getDate(),
            year = dateValue.getFullYear();
    
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            const newDateFormat = [year, month, day].join('-');

            cities.push(comp.to);
            dates.push(newDateFormat);
        }
 

        switch (this.state.destinationCount){
            case 1:

                axios.post("api/flight/basicsearch", {cities: cities, dates: dates}).then((res) => {
                  this.setState({searchResults: res.data.rows[0]});
              }).catch(err => console.log(err));

              return;

            case 2:
              
                axios.post("api/flight/onecitysearch", {cities: cities, dates: dates}).then((res) => {
                  this.setState({searchResults: res.data.rows[0]});
              }).catch(err => console.log(err));

            return;
            
            case 3:
              
                axios.post("api/flight/twocitysearch", {cities: cities, dates: dates}).then((res) => {
                  this.setState({searchResults: res.data.rows[0]});
              }).catch(err => console.log(err));
              
            return;

            case 4:
              
              axios.post("api/flight/threecitysearch", {cities: cities, dates: dates}).then((res) => {
                         this.setState({searchResults: res.data.rows[0]});
                     }).catch(err => console.log(err));
            return;
  

              
          }      
        }
        





    render() {
        const {startDate, endDate} = this.state;
        const { classes, children, className, ...other } = this.props;
        // const firstPort = this.state.searchResults[0];
        // const lastPort = this.state.searchResults[this.state.searchResults.length];
        const availableCities =[
            {city: 'DUB'}, 
            {city: 'AMS'}, 
            {city: 'LHR'}, 
            {city: 'MAD'}, 
            {city: 'CDG'}, 
            {city: 'TXL'}, 
        
        ];
        const     displayThree =() =>
    {
        switch(this.state.destinationCount){

          case 1:
              return(
                <React.Fragment>
    
    {this.state.searchResults.map((flight, index) => (
                    <Container style={{    marginBottom: '10px'}}>
                    
                    <Card className={classes.card}>
                    <Box textAlign="center">        
                                <CardContent>
    
                                    <Grid container justify="center" alignItems="center" spacing={1} direction="row" alignContent="center" style={{ marginLeft: "100px", marginRight: "100px", width: "80%"}} >
                                     
    
                                      
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2" display="block">
                                              <Box textAlign="center">
                                              {flight.rs1.substring(0,3)}
                                              </Box>
                                                
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.dt1 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
    
                                        </Grid>
                                        <Grid item xs={2} justify="center" alignItems="center">
                                        <Box textAlign="center">
                                        <FlightIcon fontSize="large"/>
                                              </Box>
                                        </Grid>
    
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2">
                                            <Box textAlign="center">
                                                {flight.rs1.substring(3,6)}
    
                                              </Box>
    
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.at1 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Grid container justify="center" alignItems="center" spacing={1}>
                                        <Grid item l>
                                            <Box textAlign="center" p={3}>
                                                <Typography variant="h4" color="" component="h4">
                                                    ${flight.total}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                      className={clsx(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                      })}
                                      onClick={this.handleExpandClick}
                                      aria-expanded={this.state.expanded}
                                      aria-label="show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                     
        
                                      <List className={classes.list} >
                                      <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs1.substring(0,3)} secondary={ new Date(flight.dt1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs1.substring(3,6)} secondary={new Date(flight.at1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p1}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
                        
    
                                      </List>
    
                                    </CardContent>
                                </Collapse>
                                </Box>
                            </Card>
                    </Container>
          ))}       
                </React.Fragment>
            );


          case 2:

              return(
                <React.Fragment>
    
    {this.state.searchResults.map((flight, index) => (
                    <Container style={{    marginBottom: '10px'}}>
                    
                    <Card className={classes.card}>
                    <Box textAlign="center">        
                                <CardContent>
    
                                    <Grid container justify="center" alignItems="center" spacing={1} direction="row" alignContent="center" style={{ marginLeft: "100px", marginRight: "100px", width: "80%"}} >
                                     
    
                                      
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2" display="block">
                                              <Box textAlign="center">
                                              {flight.rs1.substring(0,3)}
                                              </Box>
                                                
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.dt1 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
    
                                        </Grid>
                                        <Grid item xs={2} justify="center" alignItems="center">
                                        <Box textAlign="center">
                                        <FlightIcon fontSize="large"/>
                                              </Box>
                                        </Grid>
    
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2">
                                            <Box textAlign="center">
                                                {flight.rs2.substring(3,6)}
    
                                              </Box>
    
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.at2 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Grid container justify="center" alignItems="center" spacing={1}>
                                        <Grid item l>
                                            <Box textAlign="center" p={3}>
                                                <Typography variant="h4" color="" component="h4">
                                                    ${flight.total}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                      className={clsx(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                      })}
                                      onClick={this.handleExpandClick}
                                      aria-expanded={this.state.expanded}
                                      aria-label="show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                     
        
                                      <List className={classes.list} >
                                      <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs1.substring(0,3)} secondary={ new Date(flight.dt1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs1.substring(3,6)} secondary={new Date(flight.at1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p1}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
    
                                       <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs2.substring(0,3)} secondary={ new Date(flight.dt2 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs2.substring(3,6)} secondary={new Date(flight.at2 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p2}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
                        
    
                                      </List>
    
                                    </CardContent>
                                </Collapse>
                                </Box>
                            </Card>
                    </Container>
          ))}       
                </React.Fragment>
            );

          case 3:

              return(
                <React.Fragment>
    
    {this.state.searchResults.map((flight, index) => (
                    <Container style={{    marginBottom: '10px'}}>
                    
                    <Card className={classes.card}>
                    <Box textAlign="center">        
                                <CardContent>
    
                                    <Grid container justify="center" alignItems="center" spacing={1} direction="row" alignContent="center" style={{ marginLeft: "100px", marginRight: "100px", width: "80%"}} >
                                     
    
                                      
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2" display="block">
                                              <Box textAlign="center">
                                              {flight.rs1.substring(0,3)}
                                              </Box>
                                                
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.dt1 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
    
                                        </Grid>
                                        <Grid item xs={2} justify="center" alignItems="center">
                                        <Box textAlign="center">
                                        <FlightIcon fontSize="large"/>
                                              </Box>
                                        </Grid>
    
                                        <Grid item xs={4} justify="center" alignItems="center">
                                            <Typography gutterBottom variant="h5" component="h2">
                                            <Box textAlign="center">
                                                {flight.rs3.substring(3,6)}
    
                                              </Box>
    
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <Box textAlign="center">
                                            {new Date(flight.at3 * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                              </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider/>
                                    <Grid container justify="center" alignItems="center" spacing={1}>
                                        <Grid item l>
                                            <Box textAlign="center" p={3}>
                                                <Typography variant="h4" color="" component="h4">
                                                    ${flight.total}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton
                                      className={clsx(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                      })}
                                      onClick={this.handleExpandClick}
                                      aria-expanded={this.state.expanded}
                                      aria-label="show more"
                                    >
                                      <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                     
        
                                      <List className={classes.list} >
                                      <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs1.substring(0,3)} secondary={ new Date(flight.dt1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs1.substring(3,6)} secondary={new Date(flight.at1 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p1}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
    
                                       <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs2.substring(0,3)} secondary={ new Date(flight.dt2 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs2.substring(3,6)} secondary={new Date(flight.at2 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p2}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
    
                                       <div key="flightid" style={{flexGrow: 1}}>
                                      <ListItem>
                                      <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                       <Grid item style={{ padding: "10px"}}>
                                       <Avatar>
                                          < FlightTakeoffIcon/>
                                       </Avatar>
                                       </Grid>
                                       <Grid item> 
                                          <ListItemText primary={flight.rs3.substring(0,3)} secondary={ new Date(flight.dt3 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item>
                                              <LinearScaleIcon style={{ padding: "20px"}}/>
                                        </Grid> 
                                        <Grid item style={{ padding: "10px"}}>
                                        <Avatar>
                                          < FlightLandIcon/>
                                       </Avatar>
                                       </Grid>
                                        <Grid item>
                                          <ListItemText primary={flight.rs3.substring(3,6)} secondary={new Date(flight.at3 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                        </Grid>
                                        <Grid item style ={{ padding: "20px"}}>
                                          <Typography variant="subtitle1">${flight.p3}</Typography>
                                        </Grid>
                                      </Grid>
    
                                      </ListItem>
                                      <Divider/>
                                       </div>
                        
    
                                      </List>
    
                                    </CardContent>
                                </Collapse>
                                </Box>
                            </Card>
                    </Container>
          ))}       
                </React.Fragment>
            );


        case 4:
      
        return(
            <React.Fragment>

{this.state.searchResults.map((flight, index) => (
                <Container style={{    marginBottom: '10px'}}>
                
                <Card className={classes.card}>
                <Box textAlign="center">        
                            <CardContent>

                                <Grid container justify="center" alignItems="center" spacing={1} direction="row" alignContent="center" style={{ marginLeft: "100px", marginRight: "100px", width: "80%"}} >
                                 

                                  
                                    <Grid item xs={4} justify="center" alignItems="center">
                                        <Typography gutterBottom variant="h5" component="h2" display="block">
                                          <Box textAlign="center">
                                          {flight.rs1.substring(0,3)}
                                          </Box>
                                            
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        <Box textAlign="center">
                                        {new Date(flight.dt1 *1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                          </Box>
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={2} justify="center" alignItems="center">
                                    <Box textAlign="center">
                                    <FlightIcon fontSize="large"/>
                                          </Box>
                                    </Grid>

                                    <Grid item xs={4} justify="center" alignItems="center">
                                        <Typography gutterBottom variant="h5" component="h2">
                                        <Box textAlign="center">
                                            {flight.rs4.substring(3,6)}

                                          </Box>

                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        <Box textAlign="center">
                                        {new Date(flight.at4 *1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                          </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <Grid container justify="center" alignItems="center" spacing={1}>
                                    <Grid item l>
                                        <Box textAlign="center" p={3}>
                                            <Typography variant="h4" color="" component="h4">
                                                ${flight.total}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                  className={clsx(classes.expand, {
                                    [classes.expandOpen]: this.state.expanded,
                                  })}
                                  onClick={this.handleExpandClick}
                                  aria-expanded={this.state.expanded}
                                  aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                 
    
                                  <List className={classes.list} >
                                  <div key="flightid" style={{flexGrow: 1}}>
                                  <ListItem>
                                  <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                   <Grid item style={{ padding: "10px"}}>
                                   <Avatar>
                                      < FlightTakeoffIcon/>
                                   </Avatar>
                                   </Grid>
                                   <Grid item> 
                                      <ListItemText primary={flight.rs1.substring(0,3)} secondary={ new Date(flight.dt1 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item>
                                          <LinearScaleIcon style={{ padding: "20px"}}/>
                                    </Grid> 
                                    <Grid item style={{ padding: "10px"}}>
                                    <Avatar>
                                      < FlightLandIcon/>
                                   </Avatar>
                                   </Grid>
                                    <Grid item>
                                      <ListItemText primary={flight.rs1.substring(3,6)} secondary={new Date(flight.at1 *1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item style ={{ padding: "20px"}}>
                                      <Typography variant="subtitle1">${flight.p1}</Typography>
                                    </Grid>
                                  </Grid>

                                  </ListItem>
                                  <Divider/>
                                   </div>

                                   <div key="flightid" style={{flexGrow: 1}}>
                                  <ListItem>
                                  <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                   <Grid item style={{ padding: "10px"}}>
                                   <Avatar>
                                      < FlightTakeoffIcon/>
                                   </Avatar>
                                   </Grid>
                                   <Grid item> 
                                      <ListItemText primary={flight.rs2.substring(0,3)} secondary={ new Date(flight.dt2 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item>
                                          <LinearScaleIcon style={{ padding: "20px"}}/>
                                    </Grid> 
                                    <Grid item style={{ padding: "10px"}}>
                                    <Avatar>
                                      < FlightLandIcon/>
                                   </Avatar>
                                   </Grid>
                                    <Grid item>
                                      <ListItemText primary={flight.rs2.substring(3,6)} secondary={new Date(flight.at2 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item style ={{ padding: "20px"}}>
                                      <Typography variant="subtitle1">${flight.p2}</Typography>
                                    </Grid>
                                  </Grid>

                                  </ListItem>
                                  <Divider/>
                                   </div>

                                   <div key="flightid" style={{flexGrow: 1}}>
                                  <ListItem>
                                  <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                   <Grid item style={{ padding: "10px"}}>
                                   <Avatar>
                                      < FlightTakeoffIcon/>
                                   </Avatar>
                                   </Grid>
                                   <Grid item> 
                                      <ListItemText primary={flight.rs3.substring(0,3)} secondary={ new Date(flight.dt3 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item>
                                          <LinearScaleIcon style={{ padding: "20px"}}/>
                                    </Grid> 
                                    <Grid item style={{ padding: "10px"}}>
                                    <Avatar>
                                      < FlightLandIcon/>
                                   </Avatar>
                                   </Grid>
                                    <Grid item>
                                      <ListItemText primary={flight.rs3.substring(3,6)} secondary={new Date(flight.at3 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item style ={{ padding: "20px"}}>
                                      <Typography variant="subtitle1">${flight.p3}</Typography>
                                    </Grid>
                                  </Grid>

                                  </ListItem>
                                  <Divider/>
                                   </div>
                                   <div key="flightid" style={{flexGrow: 1}}>
                                  <ListItem>
                                  <Grid container spacing={2} style={{marginLeft: "8%", marginRight: "8%"}}>
                                   <Grid item style={{ padding: "10px"}}>
                                   <Avatar>
                                      < FlightTakeoffIcon/>
                                   </Avatar>
                                   </Grid>
                                   <Grid item> 
                                      <ListItemText primary={flight.rs4.substring(0,3)} secondary={ new Date(flight.dt4 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item>
                                          <LinearScaleIcon style={{ padding: "20px"}}/>
                                    </Grid> 
                                    <Grid item style={{ padding: "10px"}}>
                                    <Avatar>
                                      < FlightLandIcon/>
                                   </Avatar>
                                   </Grid>
                                    <Grid item>
                                      <ListItemText primary={flight.rs4.substring(3,6)} secondary={new Date(flight.at4 * 1000).toLocaleString('en-US', {timeZone: 'Europe/Berlin'})}/>
                                    </Grid>
                                    <Grid item style ={{ padding: "20px"}}>
                                      <Typography variant="subtitle1">${flight.p4}</Typography>
                                    </Grid>
                                  </Grid>

                                  </ListItem>
                                  <Divider/>
                                   </div>

                                   

                                  </List>

                                </CardContent>
                            </Collapse>
                            </Box>
                        </Card>
                </Container>
      ))}       
            </React.Fragment>
        );
        }

    }

        return (
            <React.Fragment>
                <Container style={{width: '60%', backgroundColor: '#ffff', padding: '32px', marginBottom: '20px'}}>
                    <form className={classes.container}>
                        {/* <Grid container>
                            <Grid item className={classes.dateField}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="start-date"
                                        label="Start Date"
                                        value={startDate}
                                        minDate={new Date()}
                                        onChange={this.handleStartDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item className={classes.dateField}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="end-date"
                                        label="End Date"
                                        value={endDate}
                                        minDate={new Date()}
                                        onChange={this.handleEndDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Divider/> */}
                        

                        <Grid container justify="right" spacing={1}>
                        <Table>
                            <TableBody>
                            {
                                this.state.destinations.map((destination, idx) => (
                                   <TableRow>
                                        <TableCell>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                Stop # {idx + 1}       
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                        {/* <Autocomplete
                                        id="available"
                                        options={availableCities.map(option => option.city)}
                                        style={{ width: 300 }}
                                        renderInput={params => ( */}
                                            <TextField
                                                    // {...params}
                                                    id={idx}
                                                    label={"From"}
                                                    className={clsx(classes.textField, classes.dense)}
                                                    margin="dense"
                                                    variant="outlined"
                                                    value={destination.from}
                                                    onChange={this.handleFromChange(idx)}
                                                    fullWidth
                                                />
                                        {/* )}       
                                         />    */}
                                        </TableCell>
                                        <TableCell>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="start-date"
                                                        label="Arrival Date"
                                                        value={destination.date}
                                                        minDate={new Date()}
                                                        onChange={(value) => this.handleStartDate(idx, value)}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                        </TableCell>
                                        <TableCell>
                                                <TextField
                                                    id={idx}
                                                    label={"To"}
                                                    className={clsx(classes.textField, classes.dense)}
                                                    margin="dense"
                                                    variant="outlined"
                                                    value={destination.to}
                                                    onChange={this.handleToChange(idx)}
                                                />

                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="remove" onClick={this.handleRemove(idx)}>                                             
                                                <RemoveCircleIcon fontSize="large" />
                                            </IconButton>
                                            
                                        </TableCell>

                                       
                                            {/* <Grid item xs={4}>
                                              <Box textAlign="center">
                                                <TextField
                                                    id={idx}
                                                    label={`From ${idx + 1}`}
                                                    className={clsx(classes.textField, classes.dense)}
                                                    margin="dense"
                                                    variant="outlined"
                                                    value={destination.city}
                                                    onChange={this.handleChange(idx)}
                                                />
                                                </Box>
                                            </Grid>
                                            <Grid item className={classes.dateField}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM/dd/yyyy"
                                                        margin="normal"
                                                        id="start-date"
                                                        label="Start Date"
                                                        value={startDate}
                                                        minDate={new Date()}
                                                        onChange={this.handleStartDate}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>

                                            <Grid item xs>
                                            <IconButton aria-label="remove" onClick={this.handleRemove(idx)}>                                             
                                                <RemoveCircleIcon fontSize="large" />
                                            </IconButton>
                                            </Grid>
                                       */}
                                    </TableRow>
                                ))
                            }
                                                            
                            </TableBody>

                        </Table>
                        </Grid>

                        <Grid item xs={12} alignItems="center" justify="center">
                            {/* <IconButton aria-label="add" className={classes.margin} onClick={() => this.handleAdd()}>                                             
                                  <AddCircleIcon fontSize="large" />
                            </IconButton> */}
                             <Button
                                        variant="contained"
                                        style= {{margin: '10px', width: '98%' , background: "rgb(216, 185, 201)" }}
                                        startIcon={<AddLocationIcon/>}
                                        onClick={this.handleAdd}
                                        disabled={this.state.disableAdd}


                                    > ADD DESTINATION </Button>
                          </Grid>

                        <Divider/>

                        <Grid container justify="left" alignItems="left" spacing={12} style={{ padding: "10px"}}>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={this.state.flexibleFlag} color="primary" 
                                                onClick={() => this.handleFlexible()}/>
                                    }
                                    label="Flexible order of destinations for best price!"
                                />

                            </Grid> */}
                            <Grid item xs={12}  >
                     

                                    <Button
                                        variant="contained"
                                        style= {{float: 'right', marginBottom: '10px', backgroundColor: "rgba(73, 3, 40, 0.81)", color: "white"}}
                                        startIcon={<FlightTakeoffIcon/>}
                                        onClick={() => this.handleSubmit()}

                                    > SEARCH </Button>
                               
                            </Grid>
                        </Grid>

                    </form>
                                  
                </Container>

                {displayThree()}

 
            </React.Fragment>
        );
    }


}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
