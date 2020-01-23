import React, { Component } from 'react';
import axios from 'axios';
import { Container, Tabs, Tab, Divider, Box, Grid, Card, CardHeader, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import FlightIcon from '@material-ui/icons/Flight';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
  },
  dense: {
      marginTop: theme.spacing(1),
  },

  fab: {
      margin: theme.spacing(1),
  },
  button: {
      margin: theme.spacing(1),
  },

  media: {
    height: 140,
  },

});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={5}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flightId: null,
      routeId: null,
      fromPort: null,
      toPort: null,
      depTime: null,
      arrTime: null,
      price: null,
      activeIndex: 0
    };
  }


  componentDidMount() {
    axios.get('api/hotflights').then((res) => {
      console.log(res);
      this.setState({ data: res.data.rows });
      console.log(this.state.data);
    }).catch(err => console.log(err));
  }

  addToHotFlightDB = (flightId, routeId, fromPort, toPort, depTime, arrTime, price) => {
    axios.post('api/hotflights/add', {
      id: flightId,
      route: routeId,
      from: fromPort,
      to: toPort,
      depTime: depTime,
      arrTime: arrTime,
      price: price
    }).then((result) => {this.props.history.push('/')})
          .catch(err => console.log(err));
  };

  updateHotFlightDB = (flightId, price) => {
    axios.post('api/hotflights/update', {
      id: flightId,
      price: price
    }).then((result) => {this.props.history.push('/')})
          .catch(err => console.log(err));
  };

  deleteHotFlightDB = (flightId) => {
    axios.delete('api/hotflights/delete', {
      data: {
        id: flightId
      }
    }).catch(err => console.log(err));
  };

 
  handleChange = (_, activeIndex) => this.setState({ activeIndex })

  render()
  {
    const { activeIndex } = this.state;
    const { classes, children, className, ...other } = this.props;

    return (
      <React.Fragment>
      {/* <div>
         <Typography variant="h5">
          FLIGHTS                
          </Typography>
          <Typography variant="subtitle1">
          Search for the best flights.               
          </Typography>


        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                        Cheapest Flights!
              </h3>
            </div>
            <div className="panel-body"> */}

            <Container>
                  {this.state.data.map(flight => (
                        <Card style={{padding:'10px', margin: '10px', float: 'left', width:'300px'}}>
                            {/* <Typography gutterBottom variant="h5" component="h2" display="block">
                             ID: {flight._id}
                                </Typography>
                        <CardMedia
                        className={classes.media}
                        image="./images/ams.jpg"
                        title="Contemplative Reptile"
                        /> */}
                        <CardContent>

                            <Grid container justify="center" alignItems="center" spacing={1}> 
                                <Grid item xs={4} justify="center" alignItems="center">
                                <Typography gutterBottom variant="h5" component="h2" display="block">
                                {flight.fromPort}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {new Date(flight.depTime * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                                
                                </Typography>
                                    
                                </Grid>
                                <Grid item xs={2} justify="center" alignItems="center">
                                    <FlightIcon fontSize="large"/>   
                                </Grid>

                                <Grid item xs={4} justify="center" alignItems="center"> 
                                <Typography gutterBottom variant="h5" component="h2">
                                {flight.toPort} 
                                    
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {new Date(flight.arrTime * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}                               
                                </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container justify="center" alignItems="center" spacing={1}> 
                                <Grid item l>
                                    <Box p={2} >
                                <Typography variant="h4" color="" component="h4">
                                ${flight.price}
                                </Typography>
                                </Box>
                                </Grid>
                            </Grid>
                        
                        </CardContent>
                    <CardActions>
                        {/* <Button size="small" color="primary">
                        Learn More
                        </Button> */}
                    </CardActions>
                    </Card>

                  ))}
            </Container>
        
 {/* 
            </div>
          </div>
        </div> 
       <div className={classes.root}>
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeIndex}
        onChange={this.handleChange}
        aria-lable="menu"
        className={classes.tabs}
        >
          <Tab label="Add Hot Flights" {...a11yProps(0)} />
          <Tab label="Update Hot Flights" {...a11yProps(1)}/>
          <Tab label="Delete Hot Flights" {...a11yProps(2)}/>
        </Tabs>

      <TabPanel value={activeIndex} index={0}>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Add Hot Flights
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit = {() => this.addToHotFlightDB(this.state.flightId, this.state.routeId,
                  this.state.fromPort, this.state.toPort, this.state.depTime, this.state.arrTime,
                  this.state.price)}>
                <label>
                  Flight ID:
                  <input type="number" onChange={(i) => this.setState({flightId: i.target.value})}/>
                </label>
                <label>
                  Route ID:
                  <input type="number" onChange={(i) => this.setState({routeId: i.target.value})}/>
                </label>
                <label>
                  From:
                  <input type="text" onChange={(i) => this.setState({fromPort: i.target.value})}/>
                </label>
                <label>
                  DepTime:
                  <input type="number" onChange={(i) => this.setState({depTime: i.target.value})}/>
                </label>
                <label>
                  To:
                  <input type="text" onChange={(i) => this.setState({toPort: i.target.value})}/>
                </label>
                <label>
                  ArrTime:
                  <input type="number" onChange={(i) => this.setState({arrTime: i.target.value})}/>
                </label>
                <label>
                  Price:
                  <input type="number" onChange={(i) => this.setState({price: i.target.value})}/>
                </label>
                <button type="submit" class="btn btn-default"> Add </button>
              </form>
            </div>
          </div>
        </div>
      </TabPanel>
      
      <TabPanel value={activeIndex} index={1}>
      <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Update Hot Flights
              </h3>
            </div>
            <div className="panel-body">
              <form>
                <label>
                  Flight ID:
                  <input type="number" onChange={(i) => this.setState({flightId: i.target.value})}/>
                </label><br />
                <label>
                  Price:
                  <input type="number" onChange={(i) => this.setState({price: i.target.value})}/>
                </label><br />
                <button onClick={() => this.updateHotFlightDB(this.state.flightId, this.state.price)}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>

      </TabPanel>
      <TabPanel value={activeIndex} index={2}>
      <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                Delete Hot Flights
              </h3>
            </div>
            <div className="panel-body">
              <form>
                <label>
                  Flight ID:
                  <input type="number" onChange={(i) => this.setState({flightId: i.target.value})}/>
                </label><br />
                <button onClick={() => this.deleteHotFlightDB(this.state.flightId)}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      
      </TabPanel>

      </div> 

       
       
      </div>
      */}

      </React.Fragment>
    );
  }
}

Flights.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Flights);
