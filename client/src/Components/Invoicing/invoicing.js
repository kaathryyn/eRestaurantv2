import React, {Component} from 'react';
import firebase from 'firebase';

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations : [],
        };
}