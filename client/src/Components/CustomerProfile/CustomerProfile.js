import React, { useState, Component } from 'react';
import { Card, Box } from "@material-ui/core";
import firebase from '../../config/firebase';

import right_image from '../../Images/Login.jpg';
import "./CustomerProfile.css";

import { firestore } from '../../config/firebase.js';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';


class CustomerProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			gender: "",
			email: "",
			phone: ""

		};
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user.email)
				var userID = firebase.auth().currentUser.uid;
				console.log(userID);
				var customerRole = firebase.firestore().collection("customer").doc(userID).get();
				var staffRole = firebase.firestore().collection("staff").doc(userID).get();
				var links = '';

				if (customerRole) {
					firestore.collection("customer").doc(user.uid).get().then(doc => {
						console.log(doc.data())
						this.setState({ firstName: doc.data().firstName });
						this.setState({ lastName: doc.data().lastName });
						this.setState({ gender: doc.data().gender });
						this.setState({ email: doc.data().emailAddress });
						this.setState({ phone: doc.data().phoneNumber });
					});
				} else {
					console.log('No user!')
				}
			}
		})
	}

	signOut = (e) => {
		e.preventDefault();
		firebase.auth().signOut().then(() => {
			console.log("user signed out");
			window.location = '/';
		})
	}



	render() {
		return (
			<Grid container className="img" justify="center">
				<Grid item>
					<Card className="reservationBox" variant="outlined">
						<CardContent>
							<Typography component="h5" variant="h5">
								Profile
                            </Typography>
							<Divider className="divider" variant="middle" />
							<br />
							<Typography color="textSecondary" gutterBottom>
								Name
                        </Typography>
							<Typography variant="body2" component="p">
								{this.state.firstName} &emsp; {this.state.lastName}
							</Typography>
							<br />
							<Typography color="textSecondary" gutterBottom>
								Gender
                        </Typography>
							<Typography variant="body2" component="p">
								{this.state.gender}
							</Typography>
							<br />
							<Typography color="textSecondary" gutterBottom>
								Email
                        </Typography>
							<Typography variant="body2" component="p">
								{this.state.email}
							</Typography>
							<br />
							<Typography color="textSecondary" gutterBottom>
								Phone
                        </Typography>
							<Typography variant="body2" component="p">
								{this.state.phone}
							</Typography>

						</CardContent>

						<Button size="small" color="primary" onClick={this.signOut}>
							Log out
        </Button>

					</Card>
				</Grid>
			</Grid>


		);
	}
}

export default CustomerProfile
