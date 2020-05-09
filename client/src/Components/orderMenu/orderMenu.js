import React, { Component } from 'react';
import "./orderMenu.css";
import { firestore } from'../../config/firebase.js';
import headerImage from '../../Images/headerImage.png';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class orderMenu extends Component {
    constructor(props) {
        super(props);
        // this.state = { quantity: '' };
        this.state = {
        entree: [],
        main: [],
        dessert: [],
        drinks: [],
        quantity: '',
        };
    }

    componentDidMount() {
        firestore.collection("menuItems")
            .where("category", "==", "Entree")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ entree: data });
            });
            firestore.collection("menuItems")
            .where("category", "==", "Main")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ main: data });
            });
            firestore.collection("menuItems")
            .where("category", "==", "Dessert")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ dessert: data });
            });
            firestore.collection("menuItems")
            .where("category", "==", "Drinks")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ drinks: data });
            });
      }

    state = { activeIndex: 0 }
    handleChange = (_, activeIndex) => this.setState({ activeIndex })
    
    handleAddItem = (evt) => {
        this.setState({ quantity: evt.target.value });
    }

    handleSaveQty = (event, foodName) => {
        event.preventDefault();
        const { quantity } = this.state;
        this.setState({foodName: event.target.value});
        firestore.collection("resFood").add({
            orderDetails: {quantity},
            name: {foodName}
            })
      }
  render() {
    const { entree } = this.state;
    const { main } = this.state;
    const { dessert } = this.state;
    const { drinks } = this.state;
    const { activeIndex } = this.state;
      return(
        <div class="menu">
            <div className="header">
            <img className="headerImage" src={headerImage} alt=""/>
                <Paper className="topnav">
                <Tabs
                        centered
                        value={activeIndex}
                        onChange={this.handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Entree" />
                        <Tab label="Main" />
                        <Tab label="Dessert" />
                        <Tab label="Drinks" />
                    </Tabs>
                </Paper>
                { activeIndex === 0 && <TabContainer>
                <div className="alignPage"> 
                <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                          {entree.map((entreeItem, index) => (
                                <Grid item xs key={entreeItem}> 
                                    <Card className="root" variant="outlined">
                                        <CardHeader
                                        style={{ textAlign: 'left', height: '4%', paddingLeft: '5%', paddingTop: '5%'}}
                                            title={entreeItem.name}
                                            // subheader={entreeItem.rating}
                                        />
                                    <div className="details">
                                    <CardContent className="content">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {/* <h1>{entreeItem.name} {this.state.quantity} </h1> */}
                                        <h2>{entreeItem.ingredients}</h2>
                                    </Typography>
                                    </CardContent>
                                    <CardContent className="subcontent">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <h3>${entreeItem.cost}</h3>
                                        {/* <p>Customer Rating: <StarRatingComponent 
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span>✰</span>}
                                            starCount={5}
                                            value={entreeItem.rating}
                                            />
                                        </p> */}
                                    </Typography>
                                </CardContent>
                                <Divider className="divider" variant="middle" />
                                    <CardActions className="controls">
                                    <TextField
                                        id="filled-number"
                                        label="Quantity"
                                        type="number"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={this.handleAddItem}
                                    />
                                    <Button
                                        variant="contained"
                                        className="addButton"
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={event => this.handleSaveQty(event, entreeItem.name)}
                                    >
                                        <h1>Add to Order</h1>
                                    </Button>
                                    </CardActions>
                                    </div>
                                    </Card>
                                </Grid>
                          ))}
                    </Grid>
                </div>
                </TabContainer> }
            </div>
        </div>
      );
  }
}
function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 24 }}>
        {props.children}
      </Typography>
    );
  }
export default orderMenu;