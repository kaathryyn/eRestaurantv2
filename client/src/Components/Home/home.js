import React, { Component } from "react";
import home1 from '../../Images/restaurant.jpg';
import home2 from '../../Images/home2.jpg';
import home3 from '../../Images/headerbackground.jpg';

import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <br></br>
        <text className="homeTitle">Buongiorno!</text>
        <br></br>
        <br></br>
        <div className="homeRow">
          <div className="column">
            <img src={home1} alt="home1" className="img1"/>
          </div>
          <div className="column">
            <img src={home3} alt="home3" className="img3"/>
          </div>
        </div>
        <div className="homeText">
          <p>Sapori Unici is an Italian restaurant in the inner West of Sydney, perfect for all your dining needs. Come right in,
          during our lunch (11am-2.30pm) and dinner (5pm-9.30pm) service times, or create a booking online. Eat the delicious food
          that is shown on our online Menu. Come and enjoy the ambience of Italy, without having to book a flight!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;