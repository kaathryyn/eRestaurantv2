import React, { useState, Component } from "react";
import { NavLink } from 'react-router-dom';
import firebase from '../../config/firebase';

import SignedOutLinks from './signedOutLinks';
import SignedInLinks from './signedInLinks';

import './navBar.css';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user.email);
				this.setState({
					user: user
				});
			}
		})
	}

	render() {
		var links = this.state.user ? <SignedInLinks /> : <SignedOutLinks />

		return (
			<nav class="navBar">
					{links}
			</nav>
		)
	}
}

export default NavBar;