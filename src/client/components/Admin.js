import React, { Component } from 'react';
import axios from 'axios';
import { 
    Container, Tabs, Tab, Divider, Box, Grid, Paper,
    Card, CardHeader, CardActions, CardContent, CardMedia, 
    Button, Typography,
    Table, TableBody, TableCell, TableRow, TableHead,
    IconButton

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
    padding: '50px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  container: {
    padding: '32px',
    width: '900px'
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

  paper: {
    width: '100%',
    overflowX: 'auto',
  },

  table: {
      minWidth: 650,
  }
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


class Admin extends Component {
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
    const displayAttractions = () => {

        return (
            <Container>
                <Paper>
                    <Table> 
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    City
                                </TableCell>
                                <TableCell align="center">
                                    Attraction
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    London
                                </TableCell>
                                <TableCell align="center">
                                    Tower of London
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        );

    };

    const displayTable =() =>
        {

            return (
                <Container className={classes.container}>
                <div className="panel panel-default">
                <Paper className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
               <TableHead>
                 <TableRow>
                   <TableCell>Flight ID</TableCell>
                   <TableCell align="right">From</TableCell>
                   <TableCell align="right">Departure Time</TableCell>
                   <TableCell align="right">To </TableCell>
                   <TableCell align="right">Arrival Time</TableCell>
                 </TableRow>
               </TableHead>
         
                 <TableBody>
                 {this.state.data.map(flight => (
                      <TableRow key={flight._id}>
                      <TableCell component="th" scope="row">
                        {flight._id}
                      </TableCell>
                      <TableCell align="right">{flight.fromPort}</TableCell>
                      <TableCell align="right">{new Date(flight.depTime * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}</TableCell>
                      <TableCell align="right">{flight.toPort}</TableCell>
                      <TableCell align="right">{new Date(flight.arrTime * 1000).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })}</TableCell>
                      <TableCell>${flight.price}</TableCell>
                    </TableRow>
                       ))}
                 </TableBody>
               </Table > 
               </Paper>
                 </div>
                 
                 </Container>
            );
        };

    return (
      <React.Fragment>
      <div>
         <Typography variant="h5">
                    
          </Typography>
       
       <Divider />

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
          {/* <Tab label= "Manage Top Attractions" {...a11yProps(3)}/> */}
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
        <div>
        { displayTable() }
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
        <div>
        { displayTable() }
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
        <div>
        { displayTable() }
        </div>
      </TabPanel>
      {/* <TabPanel value={activeIndex} index={3}>
          <div style={{ width: '800px'}}>
             {displayAttractions()}
          </div>

        
      </TabPanel> */}

      </div> 

       
      </div>
     

      </React.Fragment>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
