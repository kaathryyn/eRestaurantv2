import React, { Component } from 'react';
import "./orderMenu.css";
import { firestore } from'../../config/firebase.js';
import headerImage from '../../Images/headerImage.png';
import drinksbg from '../../Images/drinksbg.jpg';
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StarRatingComponent from 'react-star-rating-component';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createMuiTheme } from '@material-ui/core/styles';
import { auth } from '../../config/firebase.js';
import firebase from '../../config/firebase';

class orderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        entree: [],
        main: [],
        dessert: [],
        drinks: [],
        quantity: '',
        id: 0
        };
    }

    componentDidMount() {
        var entree = "Entree"
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

    handleDeleteOrder = (event, foodName) => {
        event.preventDefault();
        alert('Food Removed from Reservation');
        this.setState({foodName: event.target.value});
        var foodTitle = foodName;
        
        firestore.collection("trialReservations")
        .orderBy('id', 'desc')
        .limit(1).get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data());
                if (doc && doc.exists) {
                    var newvalue = doc.id;
                    var ToString = ""+ newvalue;
                    firestore.collection("trialReservations").doc(ToString).collection("foodOrder").doc(foodTitle).delete();
                }
            })
        })
    }
    

    handleSaveQty = (event, foodName, foodCost, foodCategory) => {
        event.preventDefault();
        alert('Food Added to Reservation');
        const { quantity } = this.state;
        var user = firebase.auth().currentUser;
        this.setState({foodName: event.target.value});
        this.setState({foodCategory: event.target.value});
        this.setState({foodCost: event.target.value});
        var foodTitle = foodName;
        var foodCost = foodCost;
        var foodCategory = foodCategory;
                    firestore.collection("trialReservations")
                    .orderBy('id', 'desc')
                    .limit(1).get()
                    .then(snap => {
                      
                        snap.forEach(doc => {
                            console.log(doc.data());
                            if (doc && doc.exists) {
                                var newvalue = doc.id;
                                var ToString = ""+ newvalue;
                                         var reservationDetails = doc.data();
                                         
                                         firestore.collection("trialReservations").doc(ToString).collection("foodOrder").doc(foodTitle)
                                         .set({
                                            // reservationDetails,
                                            orderDetails: {quantity, foodName, foodCategory, foodCost},
                                         }
                                         );
                            }
                        });
                   
                    })
                        
                    
      }

  render() {
    const { entree } = this.state;
    const { main } = this.state;
    const { dessert } = this.state;
    const { drinks } = this.state;
    const { activeIndex } = this.state;
    const { inputValue } = this.state;
      return(
          <div className="wrapper">
            <div className="header">
                <Grid
                container
                spacing={10}
                direction="column"
                justify="space-evenly"
                alignItems="center"
                alignContent="center"
                >
                    <Grid item xs>
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
               </Grid>  
                    
               <Grid item xs>
               <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <MyButton variant="contained" >Skip Food Pre-Ordering</MyButton>
                            <MyButton variant="contained">Finished Food Pre-Ordering</MyButton>
                        </ButtonGroup>
                   </Grid> 
               </Grid>

               { activeIndex === 0 && <TabContainer>
                 <div className="alignPage"> 
                 <Grid
                         container
                         spacing={3}
                         direction="row"
                         justify="center"
                         alignItems="center"
                         alignContent="center"
                         className="entreebg"
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
                                     <MyTextField
                                         id="filledNumber"
                                         label="Quantity"
                                         type="number"
                                         value={this.state.value}
                                         InputProps = {{
                                            inputProps: {
                                                min: 1, max: 20},
                                        }}
                                         InputLabelProps={{
                                           shrink: true,
                                         }}
                                         variant="outlined"
                                         onChange={this.handleAddItem}
                                     />
                                     <ButtonGroup variant="contained"  aria-label="contained primary button group">
                                         <MyButton variant="contained"
                                         className="addButton"
                                         onClick={event => this.handleSaveQty(event, entreeItem.name, entreeItem.cost, entreeItem.category)}
                                         startIcon={<AddIcon />}>
                                             Add</MyButton>
                                         <MyButton
                                        
                                         variant="contained"
                                         className="addButton"
                                         onClick={event => this.handleDeleteOrder(event, entreeItem.name)}
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

                 { activeIndex === 1 && <TabContainer>
                 <div className="alignPage"> 
                 <Grid
                         container
                         spacing={3}
                         direction="row"
                         justify="center"
                         alignItems="center"
                         alignContent="center"
                         className="headerImg"
                     >
                      
                           {main.map((mainItem, index) => (
                              
                                 <Grid item xs key={mainItem}> 
                                    
                                     <MyCard className="root" variant="outlined" raised="false"
                                     boxShadow={3}>
                                 
                                         <CardHeader
                                         style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                             title={mainItem.name}
                                             subheader= {<StarRatingComponent 
                                             name="rate2" 
                                             editing={false}
                                             renderStarIcon={() => <span1>✰</span1>}
                                             starCount={5}
                                             value={mainItem.rating}
                                             />}
                                         />
                                          <Divider className="divider" variant="middle" />
                                     <div className="details">
                                     <CardContent className="content">
                                     <Typography gutterBottom variant="h5" component="h2">
                                         <h2>{mainItem.ingredients}</h2>
                                     </Typography>
                                     </CardContent>
                                     <CardContent className="subcontent">
                                     <Typography gutterBottom variant="h5" component="h2">
                                         <h3>${mainItem.cost}</h3>
                                     </Typography>
                                 </CardContent>
                                 <Divider className="divider" variant="middle" />
                                     <CardActions className="controls">
                                     <MyTextField
                                         id="filledNumber"
                                         label="Quantity"
                                         type="number"
                                         value={this.state.value}
                                         InputProps = {{
                                            inputProps: {
                                                min: 1, max: 20},
                                        }}
                                         InputLabelProps={{
                                           shrink: true,
                                         }}
                                         variant="outlined"
                                         onChange={this.handleAddItem}
                                     />
                                     <ButtonGroup variant="contained"  aria-label="contained primary button group">
                                         <MyButton variant="contained"
                                         className="addButton"
                                         onClick={event => this.handleSaveQty(event, mainItem.name, mainItem.cost, mainItem.category)}
                                         startIcon={<AddIcon />}>
                                             Add</MyButton>
                                         <MyButton
                                        
                                         variant="contained"
                                         className="addButton"
                                         onClick={event => this.handleDeleteOrder(event, mainItem.name)}
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
                 { activeIndex === 2 && <TabContainer>
                <div className="alignPage"> 
                <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        className="dessertbg"
                    >
                      
                          {dessert.map((dessertItem, index) => (
                              
                                <Grid item xs key={dessertItem}> 
                                    
                                    <MyCard className="root" variant="outlined" raised="false"
                                    boxShadow={3}>
                                 
                                        <CardHeader
                                        style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                            title={dessertItem.name}
                                            subheader= {<StarRatingComponent 
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span1>✰</span1>}
                                            starCount={5}
                                            value={dessertItem.rating}
                                            />}
                                        />
                                         <Divider className="divider" variant="middle" />
                                    <div className="details">
                                    <CardContent className="content">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <h2>{dessertItem.ingredients}</h2>
                                    </Typography>
                                    </CardContent>
                                    <CardContent className="subcontent">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <h3>${dessertItem.cost}</h3>
                                    </Typography>
                                </CardContent>
                                <Divider className="divider" variant="middle" />
                                    <CardActions className="controls">
                                    <MyTextField
                                        id="filledNumber"
                                        label="Quantity"
                                        type="number"
                                        value={this.state.value}
                                        InputProps = {{
                                            inputProps: {
                                                min: 1, max: 20},
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={this.handleAddItem}
                                    />
                                    <ButtonGroup variant="contained"  aria-label="contained primary button group">
                                        <MyButton variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleSaveQty(event, dessertItem.name, dessertItem.cost, dessertItem.category)}
                                        startIcon={<AddIcon />}>
                                            Add</MyButton>
                                        <MyButton
                                        
                                        variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleDeleteOrder(event, dessertItem.name)}
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
                { activeIndex === 3 && <TabContainer>
                <div className="alignPage"> 
                <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                        className="drinksBg"
                    >
                      
                          {drinks.map((drinksItem, index) => (
                              
                                <Grid item xs key={drinksItem}> 
                                    
                                    <MyCard className="root" variant="outlined" raised="false"
                                    boxShadow={3}>
                                 
                                        <CardHeader
                                        style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                            title={drinksItem.name}
                                            subheader= {<StarRatingComponent 
                                            name="rate2" 
                                            editing={false}
                                            renderStarIcon={() => <span1>✰</span1>}
                                            starCount={5}
                                            value={drinksItem.rating}
                                            />}
                                        />
                                         <Divider className="divider" variant="middle" />
                                    <div className="details">
                                    <CardContent className="content">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <h2>{drinksItem.ingredients}</h2>
                                    </Typography>
                                    </CardContent>
                                    <CardContent className="subcontent">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <h3>${drinksItem.cost}</h3>
                                    </Typography>
                                </CardContent>
                                <Divider className="divider" variant="middle" />
                                    <CardActions className="controls">
                                    <MyTextField
                                        id="filledNumber"
                                        label="Quantity"
                                        type="number"
                                        value={this.state.value}
                                        InputProps = {{
                                            inputProps: {
                                                min: 1, max: 20},
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={this.handleAddItem}
                                    />
                                    <ButtonGroup variant="contained"  aria-label="contained primary button group">
                                        <MyButton variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleSaveQty(event, drinksItem.name, drinksItem.cost, drinksItem.category)}
                                        startIcon={<AddIcon />}>
                                            Add</MyButton>
                                        <MyButton
                                        
                                        variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleDeleteOrder(event, drinksItem.name)}
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
        color: 'maroon',
        borderTop: '10px solid maroon',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  }))(Tab);

  const MyButton = withStyles(theme => ({
    root: {
        backgroundColor: 'maroon',
    },
     contained: {
        textTransform: 'capitalize',
        color: 'white',
        fontSize: '70%',
     },
    
  }))(Button);

  const MyTextField = withStyles(theme => ({
    root: {
        '& label.Mui-focused': {
          color: 'maroon',
        },
        '& .MuiInput-underline:after': {
            color: 'maroon',
          borderBottomColor: 'maroon',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
              color: 'maroon',
            borderColor: 'maroon',
          },
          '&:hover fieldset': {
            color: 'maroon',
            borderColor: 'maroon',
          },
          '&.Mui-focused fieldset': {
            color: 'maroon',
            borderColor: 'maroon',
          },
        },
      },
  }))(TextField);

 
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