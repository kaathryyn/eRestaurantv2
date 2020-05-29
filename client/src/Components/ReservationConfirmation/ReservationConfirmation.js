import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from '../../config/firebase';
import { firestore } from '../../config/firebase.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./ReservationConfirmation.css";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class ReservationConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            noOfGuests: '',
            date: '',
            time: '',
            additionalComments: '',
            data: [],
        }
    }
    componentDidMount() {
        // to get reservation details from firestore
        firestore.collection("trialReservations")
            .orderBy('id', 'desc')
            .limit(1).get()
            .then(snap => {

                snap.forEach(doc => {
                    console.log(doc.data());
                    if (doc && doc.exists) {
                        this.setState({ name: doc.data().memberFullName });
                        this.setState({ noOfGuests: doc.data().numOfPpl });
                        this.setState({ date: doc.data().dateOfRes });
                        this.setState({ time: doc.data().timeOfRes });
                        this.setState({ additionalComments: doc.data().additionalComms });
                    }
                });

            })


        //to get food order sub collection data from firestore
        firestore.collection("trialReservations")
            .orderBy('id', 'desc')
            .limit(1).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log("Parent Document ID: ", doc.id);

                    let subCollectionDocs = firestore.collection("trialReservations")
                        .doc(doc.id).collection("foodOrder").get()
                        .then(snapshot => {
                            const data = [];
                            snapshot.forEach(doc => {
                                // console.log(doc.data().orderDetails.foodCost);
                                data.push({
                                    foodName: doc.data().orderDetails.foodName,
                                    foodCost: doc.data().orderDetails.foodCost,
                                    quantity: doc.data().orderDetails.quantity,
                                });
                            })
                            this.setState({ data: data });
                            console.log(this.state.data)
                        }).catch(err => {
                            console.log("Error getting sub-collection documents", err);
                        })
                });
            }).catch(err => {
                console.log("Error getting documents", err);
            });
    }
    handleDeleteOrder = (event, foodName) => {
        event.preventDefault();
        // alert('Food Removed from Reservation');
        this.setState({foodName: event.target.value});
        var foodTitle = foodName;
        
        firestore.collection("trialReservations")
        .orderBy('id', 'desc')
        .limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data());
                if (doc && doc.exists) {
                    var newvalue = doc.id;
                    var ToString = ""+ newvalue;
                    firestore.collection("trialReservations").doc(ToString).collection("foodOrder").doc(foodTitle).delete();
                }
            })
        })
        this.componentDidMount()
    }
    render() {
        return (

            <Grid container className="img">
                <Grid item

                    spacing={3}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Card className="reservationBox" variant="outlined">
                        <CardContent>
                            <Typography component="h5" variant="h5">
                                Booking Details
          </Typography>
                            <Divider className="divider" variant="middle" />
                            <br />
                            <Typography color="textSecondary" gutterBottom>
                                Name
                        </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.name}
                            </Typography>
                            <br />
                            <Typography color="textSecondary" gutterBottom>
                                Reservation Date
                        </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.date}
                            </Typography>
                            <br />
                            <Typography color="textSecondary" gutterBottom>
                                Reservation Time
                        </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.time}
                            </Typography>
                            <br />
                            <Typography color="textSecondary" gutterBottom>
                                No. Of Guests
                        </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.noOfGuests}
                            </Typography>
                            <br />
                            <Typography color="textSecondary" gutterBottom>
                                Additional Comments
                        </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.additionalComments}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>

                <div className="alignPage">
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Card className="reservationBox" variant="outlined">
                            <CardContent >
                                
                                <CardActions >
                                <button  className = "edit" alignItems = "flex-end" >Edit</button>
      </CardActions>
                            <Typography component="h5" variant="h5">
                                Order Details
                            </Typography>
                                {this.state.data.map((x, index) => (
                                    <div >
                                        <List>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={x.foodName}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                            >
                                                                x{x.quantity}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                                ${x.foodCost}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" 
                                                onClick={event => this.handleDeleteOrder(event, x.foodName)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            <Divider variant="middle" />
                                        </List>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </div>
            </Grid>
        )
    }
}

export default ReservationConfirmation;