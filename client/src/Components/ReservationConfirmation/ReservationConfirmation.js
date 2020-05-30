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
import uniqueId from 'react-html-id';


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
            isInEditMode: false,
            qtyArray: []
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
                                    id: doc.id,
                                    foodName: doc.data().orderDetails.foodName,
                                    foodCost: doc.data().orderDetails.foodCost,
                                    quantity: doc.data().orderDetails.quantity,
                                });
                                console.log(data)
                                this.state.qtyArray.push(doc.data().orderDetails.quantity);
                            })
                            this.setState({ data: data });
                            console.log(this.state.qtyArray)
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
        this.setState({ foodName: event.target.value });
        var foodTitle = foodName;

        firestore.collection("trialReservations")
            .orderBy('id', 'desc')
            .limit(1).get()
            .then(snap => {
                snap.forEach(doc => {
                    console.log(doc.data());
                    if (doc && doc.exists) {
                        var newvalue = doc.id;
                        var ToString = "" + newvalue;
                        firestore.collection("trialReservations").doc(ToString).collection("foodOrder").doc(foodTitle).delete();
                    }
                })
            })
        this.componentDidMount()
    }

    editOrder = () => {
        this.setState({ isInEditMode: !this.state.isInEditMode })
    }

    updateEdit = () => {
        this.setState({isInEditMode: false,
        // qtyArray: document.getElementById('input').value})
        // console.log(this.state.qtyArray)

    })
}
    readInput = (id,e) => {
    
        console.log (id)
    
        const index = this.state.data.findIndex((user)=> {
            return (user.id === id);
        })
        console.log(index)
       const quan=  document.querySelectorAll('#input').value;
       console.log(quan)

    }
    render() {
        return this.state.isInEditMode ? (

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

                                {/* <CardActions >
                                    <button className="edit" onClick={this.editOrder}>Edit</button>
                                </CardActions> */}
                                <CardActions >
                                    <button className="edit" onClick={this.updateEdit}>Done</button>
                                </CardActions>
                                <Typography component="h5" variant="h5">
                                    Order Details
                            </Typography>
                                {this.state.data.map((x, index) => (
                                    <div >
                                        <List >
                                            <ListItem alignItems="flex-start">
                                                <ListItemText key={x.id}
                                                    primary={x.foodName}
                                                    secondary={
                                                        <React.Fragment>
                                                            Qty&emsp;
                                                            <input
                                                            className = "input"
                                                                // component="span"
                                                                // variant="body2"
                                                                // color="textPrimary"
                                                                // type="text"
                                                                defaultValue={x.quantity}
                                                                ref= "qtyInput"
                                                                onChange = {this.readInput(x.id)}
                                                                id="input"
                                                                
                                                            />


                                                            
                                                              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                             <Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                            >

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
                            <button className = "addMore" onClick={() => window.location = '/orderMenu'} size="small" variant="contained" color="secondary">
                             Add more
                            </button>
                        </Card>
                    </Grid>
                </div>
            </Grid>
        ) :


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
                                    <button className="edit" onClick={this.editOrder}>Edit</button>
                                </CardActions>
                                <Typography component="h5" variant="h5">
                                    Order Details
                    </Typography>
                                {this.state.data.map((x, i) => (
                                    <div >
                                        <List key={`tr-${i}`}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={x.foodName}
                                                    secondary={
                                                        <React.Fragment>
                                                            Qty:&emsp;&emsp;<Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                            >

                                                                {x.quantity}

                                                            </Typography>
                                                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                    <Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                            >

                                                                ${x.foodCost}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            {/* <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" 
                                        onClick={event => this.handleDeleteOrder(event, x.foodName)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction> */}
                                            <Divider variant="middle" />
                                        </List>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
        </div>
            </Grid>
    }
}

export default ReservationConfirmation;