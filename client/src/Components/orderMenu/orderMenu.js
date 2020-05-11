import React, { Component } from 'react';
import "./orderMenu.css";
import { firestore } from'../../config/firebase.js';
import headerImage from '../../Images/headerImage.png';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StarRatingComponent from 'react-star-rating-component';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
        // var orderDetails = firestore.collection("resFood").doc().collection('orderDeets');
        // var qty = {quantity}
        // var title = {foodName}
        // orderDetails.({
        //     orderDetails: { 
        //         qty, 
        //         title
        //     }
        // })
        // db.collection('users').doc(this.username).collection('booksList').add
       firestore.collection("resFood").doc("resId").collection("foodOrder").doc(foodName).add({
           orderDetails: {quantity, foodName},
        //    title: {foodName}
       })
        // firestore.collection("resFood").add({
        //     orderDetails: {quantity},
        //     name: {foodName}
        //     })
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
                        <MyTab label="Entree" />
                        <MyTab label="Main" />
                        <MyTab label="Dessert" />
                        <MyTab label="Drinks" />
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
                                    <MyCard className="root" variant="outlined" raised="false"
                                    boxShadow={3}>
                                 
                                        <CardHeader
                                        style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                            title={entreeItem.name}
                                            subheader= {<StarRatingComponent 
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span1>✰</span1>}
                                            starCount={5}
                                            value={entreeItem.rating}
                                            />}
                                        />
                                         <Divider className="divider" variant="middle" />
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
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <MyButton variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleSaveQty(event, entreeItem.name)}
                                        startIcon={<AddIcon />}>
                                            Add</MyButton>
                                        <MyButton
                                        startIcon={<RemoveIcon />}>Remove</MyButton>
                                    </ButtonGroup>
                                    </CardActions>
                                    </div>
                                    </MyCard>
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

const MyTab = withStyles(theme => ({
    selected: {
        color: 'red',
        borderBottom: '10px solid red',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  }))(Tab);

  const MyButton = withStyles(theme => ({
    root: {
        backgroundColor: 'rgba(139, 4, 4, 0.22)',
    },
     contained: {
        textTransform: 'capitalize',
        color: 'black'
     }
  }))(Button);
 
  const MyCard = withStyles(theme => ({
      root: {
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
        borderRadius: '2%',
        transition: '0.3s',
        backgroundColor: 'transparent white'
      }

  }))(Card);



function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 24 }}>
        {props.children}
      </Typography>
    );
  }
export default orderMenu;