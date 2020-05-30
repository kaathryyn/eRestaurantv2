import React, { useState, Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
			<nav className="navBar">
				<div className="container">
					<Link to='/menu'>Sapori Unici</Link>
					{links}
				</div>
			</nav>
		)
	}
}

export default NavBar;

// const NavBar = (props) => {
//     const { auth } = props
//     console.log(auth);
//     const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />

//     return (
//         <nav className="navBar">
//             <div className="container">
//                 <Link to='/'>Sapori Unici</Link>
//                 {links}
//             </div>
//         </nav>

//         // <div class="navBar">
//         //     <ul>
//         //         <li><Link to="/login">Login</Link></li>
//         //         <text>Sapori Unici</text>
//         //         <li><Link to="/menu">Menu</Link></li>
//         //         <li><Link to="/order">Order</Link></li>
//         //         <li><Link to="/reservation">Reservation</Link></li>
//         //     </ul>
//         // </div>  
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth
//     }
// }

// export default connect(mapStateToProps)(NavBar);