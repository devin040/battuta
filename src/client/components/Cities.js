import React, {Component, Link} from 'react';
import axios from "axios";

import {
    Container,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Divider,
    Box,
    Grid,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField,
    ListItemSecondaryAction
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';


const styles = theme => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        width: '300px'
    },

    root: {
        padding: theme.spacing(3, 2),
    },

    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }

});


class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            open: false,
            isSelect: false,
            attractions: [],
            costOfLiving: 0,
            newAttractionName: '',
            newAttractionLocation: '',
            newAttractionLink: ''
        };
    }

    handleChange = (e) => {
        this.setState({city: e.target.value});
        this.setState({isSelect: true});

        axios.post("api/cities/places", {
            city: e.target.value
        }).then((res) => {
            this.setState({attractions: res.data.allSights})
        });

        axios.post("api/cities/cost", {
            city: e.target.value
        }).then((res) => {
            this.setState({costOfLiving: res.data.costOfLiving});
        });
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    handleAddAttraction = (e) => {
        this.setState({open: false});
        axios.post("api/cities/addplace", {
            city: this.state.city,
            newplacename: this.state.newAttractionName,
            newplacelocation: this.state.newAttractionLocation,
            newplacelink: this.state.newAttractionLink
        }).then((res) => {
            this.props.history.push('/')
        });
    }

    render() {
        const {classes, children, className, ...other} = this.props;


        return (
            <React.Fragment>

                <Typography variant="h5" gutterBottom style={{padding: '5%'}}>
                    Explore Destinations Top Attactions
                </Typography>
                <div>
                    <Container style={{width: '60%', padding: '32px', marginBottom: '20px'}}>
                        <Paper className={classes.root}>
                            <Grid container>
                                <Box textAlign='center' style={{marginLeft: "225px"}}>
                                    <FormControl className={classes.formControl}>
                                        <Grid item xs={12}>

                                            <InputLabel variant="outlined" id="demo-simple-select-outlined-label">
                                                Destination City
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="cityAttraction"
                                                value={this.state.city}
                                                onChange={this.handleChange}
                                                className={classes.select}>
                                                <MenuItem value="">
                                                </MenuItem>
                                                <MenuItem value={'London'}>London</MenuItem>
                                                <MenuItem value={'Berlin'}>Berlin</MenuItem>
                                                <MenuItem value={'Amsterdam'}>Amsterdam</MenuItem>
                                                <MenuItem value={'Zurich'}>Zurich</MenuItem>
                                                <MenuItem value={'Madrid'}>Madrid</MenuItem>
                                                <MenuItem value={'Paris'}>Paris</MenuItem>
                                                <MenuItem value={'Copenhagen'}>Copenhagen</MenuItem>
                                                <MenuItem value={'Rome'}>Rome</MenuItem>
                                                <MenuItem value={'Dublin'}>Dublin</MenuItem>
                                                <MenuItem value={'Vienna'}>Vienna</MenuItem>
                                                <MenuItem value={'Barcelona'}>Barcelona</MenuItem>


                                            </Select>

                                        </Grid>
                                    </FormControl>

                                </Box>

                                <Divider/>
                                <Grid item xs={12}>
                                    <List component="nav" className={classes.List} aria-label="attractions">
                                        {this.state.attractions.map((attr, idx) => (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <StarIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary={attr.name} secondary={attr.location}/>                                         
                                                <a href={attr.link} style={{color:"#6b3250"}}>Check it Out</a>
                                            </ListItem>

                                        ))}
                                        {this.state.isSelect ? (
                                            <div>
                                                <ListItem style={{backgroundColor: 'gainsboro'}}>
                                                    <Typography component="p">
                                                        Cost of living in {this.state.city} = $
                                                    </Typography>
                                                    <Typography component="p">
                                                        {this.state.costOfLiving}
                                                    </Typography>
                                                </ListItem>
                                            </div>
                                        ) : (<div></div>)

                                        }

                                    </List>

                                </Grid>
                                <Grid item xs={12}>
                                    <Box textAlign="right">
                                        <Button size="small" style={{fontSize: "x-small"}}
                                                onClick={this.handleClickOpen}>
                                            Suggest attraction
                                        </Button>
                                    </Box>
                                    <Dialog open={this.state.open} onClose={this.handleClose}
                                            aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Suggest Attraction</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Submit your suggestions for attractions in {this.state.city}
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Attraction name"
                                                fullWidth
                                                onChange={(i) => this.setState({newAttractionName: i.target.value})}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="location"
                                                label="Attraction location"
                                                fullWidth
                                                onChange={(i) => this.setState({newAttractionLocation: i.target.value})}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="link"
                                                label="Attraction link"
                                                fullWidth
                                                onChange={(i) => this.setState({newAttractionLink: i.target.value})}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.handleAddAttraction} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div>

            </React.Fragment>
        );
    }

}


Cities.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cities);

