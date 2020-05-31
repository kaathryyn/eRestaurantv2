import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from '../../config/firebase';


import StaffListTable from './StaffListTable.js';

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentDidMount() {
        const staffDb = firebase.firestore();
        staffDb.collection("staff")
            .get()
            .then((querySnapshot) => {
                const data = [];
                querySnapshot.docs.forEach(doc => {
                    data.push({
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        role: doc.data().role,
                        phone: doc.data().mobNum,
                        email: doc.data().email
                    });
                });
                this.setState({ data });
            })
            .catch(function (error) {
                console.log("error getting docs: ", error);

            });
    }

    // handleData = (doc) => {
    //     const firstName = doc.data().firstName;
    //     const lastName = doc.data().lastName;
    //     const role = doc.data().role;
    //     const phone = doc.data().mobNum;
    //     const email = doc.data().email;

    //     const newData = [firstName, lastName, role, phone, email];
    //     // this.state.data.push(newData);
    //     this.setState({ data: newData })
    // }

    render() {
        return (
          <Grid container justify="center" 
          
          alignItems="center">
              <Grid item xs={10}> 
                <StaffListTable
                    data={this.state.data}
                    header={[
                        {
                            name: 'First name',
                            prop: 'firstName',
                        },
                        {
                            name: 'Last name',
                            prop: 'lastName',
                        },
                        {
                            name: 'Role',
                            prop: 'role',
                        },
                        {
                            name: 'Phone',
                            prop: 'phone',
                        },
                        {
                            name: 'Email',
                            prop: 'email',
                        }
                    ]} />
                </Grid>
                </Grid>
        )
    }
}
export default StaffList;