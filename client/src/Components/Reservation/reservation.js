import React, { Component } from "react";
import { Card, Grid, FormControl, Button } from '@material-ui/core';
import firebase from '../../config/firebase';

import './reservation.css';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberFullName: "Donkey Kong",
      numOfPpl: '',
      dateOfRes: '',
      timeOfRes: '',
      additionalComms: '',
      timestamp: '',
      resStatus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.addReservation = this.addReservation.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  addReservation = (e) => {
    e.preventDefault();
    alert('Booking made');
    var user = firebase.auth().currentUser; //will congifure this when we sort out different user settings
    var time = firebase.firestore.FieldValue.serverTimestamp();
    const resDb = firebase.firestore();
    resDb.settings({
      timestampsInSnapshots: true
    });
    return resDb.collection("reservations").add({
      memberFullName: this.state.memberFullName,
      numOfPpl: this.state.numOfPpl,
      dateOfRes: this.state.dateOfRes,
      timeOfRes: this.state.timeOfRes,
      additionalComms: this.state.additionalComms,
      timestamp: time,
      resStatus: true
    }).then(() => {
      this.setState({
        memberFullName: '',
        numOfPpl: '',
        dateOfRes: '',
        timeOfRes: '',
        additionalComms: '',
        timestamp: time,
        resStatus: false
      })
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={6}>
          <form class="reservation" onSubmit={this.addReservation}>
            <FormControl>
              <Card className="reservation_Info" variant="outlined">
                <h1>Reservation</h1>
                <label for="numOfPpl" class="numOfPplLbl"><b>No. of People</b></label>
                <br />
                <input type="number" min="1" max="12" name="numOfPpl" class="numOfPpl" required value={this.state.numOfPpl} onChange={this.handleChange} />
                <br />
                <br />
                <label for="dateofRes" class="dateLbl"><b>Date</b></label>
                <br />
                <input type="date" name="dateOfRes" class="date" required value={this.state.dateOfRes} onChange={this.handleChange} />
                <br />
                <br />
                <label for="timeOfRes" class="timeLbl"><b>Time</b></label>
                <br />
                <select name="timeOfRes" class="time" required value={this.state.timeOfRes} onChange={this.handleChange}>
                  <option selected value="" disabled hidden />
                  <option value="lunchTimes" disabled>Lunch</option>
                  <option value="11am">11:00</option>
                  <option value="11.30am">11:30</option>
                  <option value="12pm">12:00</option>
                  <option value="12.30pm">12:30</option>
                  <option value="1pm">13:00</option>
                  <option value="1.30pm">13:30</option>
                  <option value="2pm">14:00</option>
                  <option value="2.30pm">14:30</option>
                  <option value="dinnerTimes" disabled>Dinner</option>
                  <option value="5pm">17:00</option>
                  <option value="5.30pm">17:30</option>
                  <option value="6pm">18:00</option>
                  <option value="6.30pm">18:30</option>
                  <option value="7pm">19:00</option>
                  <option value="7.30pm">19:30</option>
                  <option value="8pm">20:00</option>
                  <option value="8.30pm">20:30</option>
                  <option value="5pm">21:00</option>
                </select>
                <br></br>
                <br></br>
                <label for="additionalComms" class="commentsLbl"><b>Additional Comments</b></label>
                <br />
                <input type="text" name="additionalComms" class="comments" value={this.state.additionalComms} onChange={this.handleChange} />
                <br></br>
                <br></br>
                <button>Book</button>
              </Card>
            </FormControl>
          </form>
        </Grid>
        {/* This is for the image */}
        {/* <Grid item xs={6}>
          <div class="reservationImg">
            <img src={}></img>
          </div>
        </Grid> */}
      </Grid >
    );
  }
}

export default Reservation;