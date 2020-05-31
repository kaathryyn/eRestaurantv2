import React, {Component} from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import './staffReservationList.css';
import StaffReservationTable from './staffReservationTable.js';
import InvoicePopUp from '../Invoicing/invoicingPopup.js';
import { makeStyles } from '@material-ui/core/styles';

class StaffReservationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations : [],
        };
    }

    componentDidMount() {
        const reservations = firebase.firestore();
        reservations.collection("trialReservations")
            .orderBy('id', 'desc')
            .get()
            .then((querySnapshot) => {
                const reservations = [];
                querySnapshot.docs.forEach(doc => {
                    reservations.push({
                        fullName: doc.data().memberFullName,
                        resDate: doc.data().dateOfRes,
                        resTime: doc.data().timeOfRes,
                        numPeople: doc.data().numOfPpl,
                        resStatus: doc.data().resStatus,
                        addComms: doc.data().additionalComms,
                    });
                });
                this.setState({ reservations });
            });

            let foodSubColl = firebase.firestore();
            foodSubColl.collection("trialReservations")
            .get()
            .then((querySnapshot) => {
                const foodOrders = [];
                querySnapshot.docs.forEach(doc => {
                    foodOrders.push({
                        id: doc.id,
                        foodName: doc.data().orderDetails.foodName,
                        foodCost: doc.data().orderDetails.foodCost,
                        quantity: doc.data().orderDetails.quantity,
                    });
                });
                this.setState({ foodOrders });
            })

            .catch(function (error) {
                console.log("error getting docs: ", error);

            });
    }

    render() {
        return (
            <Grid>
                <Grid item>
                <div>
                    <StaffReservationTable
                        title="Reservations"
                        data={this.state.reservations}
                        header={[
                            {
                                name: 'Name',
                                prop: 'fullName',
                            },
                            {
                                name: 'Date',
                                prop: 'resDate',
                            },
                            {
                                name: 'Time',
                                prop: 'resTime',
                            },
                            {
                                name: 'No. of People',
                                prop: 'numPeople',
                            },
                            {
                                name: 'Comments',
                                prop: 'addComms',
                            }
                            ]}
                            />
                    </div>
                    </Grid>
                    <InvoicePopUp />
                </Grid>
        )
    }
}

export default StaffReservationList;