import React, {Component} from 'react';
import Popup from "reactjs-popup";
import firebase from '../../config/firebase';
import { firestore } from '../../config/firebase.js';
import '../StaffReservation/staffReservationList.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class InvoicePopUp extends Component {
        constructor(props) {
            super(props);
            this.state = { 
               open: false,
               data: [],
               qtyArray: [],
            };
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
          
        }

        componentDidMount() {
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

        openModal() {
          this.setState({ open: true });
        }

        closeModal() {
          this.setState({ open: false });
        }
      
        render() {
          return (
            <div>
                <Button size="small" variant="contained" onClick={this.openModal}>Finish Meal</Button>&emsp;
                <Button size="small" variant="contained">Edit Food Order</Button>&emsp;
                <Button size="small" variant="contained">Cancel Booking</Button>&emsp;
              <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}
              >
                <div className="modal">
                  <a className="close" onClick={this.closeModal}>
                    &times;
                  </a>
                  <Grid>
                    <Grid container direction="row" justify="flex-end" alignItems="flex-start"><Button justify="flex-end" size="small">Print</Button>&emsp;&emsp;&emsp;</Grid>
                
                    <Typography component="h5" variant="h5">Order Details</Typography>
                            {this.state.data.map((x, index) => (
                                <div>
                                    <List>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText key={x.id}
                                                primary={x.foodName}
                                                secondary={
                                                    <React.Fragment>
                                                        Qty:&emsp;&emsp;
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary">
                                                                {x.quantity}
                                                                </Typography>
                                                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="textPrimary">
                                                                    ${x.foodCost}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                            </div>
                            ))}
                  </Grid>
                  </div>
              </Popup>
            </div>
          );
        }
      }
      
    export default InvoicePopUp;