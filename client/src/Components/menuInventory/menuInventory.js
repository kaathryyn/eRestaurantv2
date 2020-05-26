import React, { Component } from 'react';
import "./menuInventory.css";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import background from '../../Images/backgroundSize.jpg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { firestore } from'../../config/firebase.js';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
  
class MenuInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ingredients: '',
            rating: '',
            cost: '',
            category: '',
            updatedName: '',
            items: [],
            open: false,
            updatedCategory: '',
            updatedCost: '',
            updatedIngredients: '',
            updatedRating: '',
        };
        
    }
  
    componentDidMount() {
        var entree = "Entree"
        firestore.collection("menuItems")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ items: data });
            });
      }
    state = { activeIndex: 0 }
    
    handleChange = (_, activeIndex) => this.setState({ activeIndex })

    handleItemName = (evt) => {
        this.setState({ name: evt.target.value });
    }

   
    handleItemIngredients = (evt) => {
        this.setState({ ingredients: evt.target.value });
    }

    handleItemRating = (evt) => {
        this.setState({ rating: evt.target.value });
    }

    handleItemCost = (evt) => {
        this.setState({ cost: evt.target.value });
    }

    handleItemCategory = (evt) => {
        this.setState({ category: evt.target.value });
    }
    handleUpdateName = (evt) => {
        this.setState({ updatedName: evt.target.value });
    }
    handleUpdateCategory = (evt) => {
        this.setState({ updatedCategory: evt.target.value });
    }
    handleUpdateCost = (evt) => {
        this.setState({ updatedCost: evt.target.value });
    }
    handleUpdateIngredients = (evt) => {
        this.setState({ updatedIngredients: evt.target.value });
    }
    handleUpdateRating = (evt) => {
        this.setState({ updatedRating: evt.target.value });
    }
    handleSaveUpdateName = (event, itemName) => {
        event.preventDefault();
        alert('Item name has been updated');
        const { updatedName } = this.state;
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        var name = updatedName;
        var docName = updatedName;
        docName = docName.replace(/\s/g, '');
        foodTitle = foodTitle.replace(/\s/g, '');
        firestore.collection("menuItems").doc(foodTitle).get().then(function (doc) {
            if (doc && doc.exists) {
                var data = doc.data();
                firestore.collection("menuItems").doc(name).set(data)
                firestore.collection("menuItems").doc(foodTitle).delete();
            }
        })

        firestore.collection("menuItems").doc(foodTitle).update({
            name
        })
    }
    handleDeleteItem = (event, itemName) => {
        event.preventDefault();
        alert('Item name has been updated');
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        foodTitle = foodTitle.replace(/\s/g, '');
        firestore.collection("menuItems").doc(foodTitle).delete();
    }
    handleSaveUpdateIngredients = (event, itemName) => {
        event.preventDefault();
        alert('Item ingredients have been updated');
        const { updatedIngredients } = this.state;
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        foodTitle = foodTitle.replace(/\s/g, '');
        var ingredients = updatedIngredients;
        firestore.collection("menuItems").doc(foodTitle).update({
            ingredients
        })
    }
    handleSaveUpdateCategory = (event, itemName) => {
        event.preventDefault();
        alert('Item category has been updated');
        const { updatedCategory } = this.state;
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        foodTitle = foodTitle.replace(/\s/g, '');
        var category = updatedCategory;
        firestore.collection("menuItems").doc(foodTitle).update({
            category
        })
    }
    handleSaveUpdateCost = (event, itemName) => {
        event.preventDefault();
        alert('Item cost has been updated');
        const { updatedCost } = this.state;
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        foodTitle = foodTitle.replace(/\s/g, '');
        var cost = updatedCost;
        firestore.collection("menuItems").doc(foodTitle).update({
            cost
        })
    }
    handleSaveUpdateRating = (event, itemName) => {
        event.preventDefault();
        alert('Item rating has been updated');
        const { updatedRating } = this.state;
        this.setState({itemName: event.target.value});
        var foodTitle = itemName;
        foodTitle = foodTitle.replace(/\s/g, '');
        var rating = updatedRating;
        firestore.collection("menuItems").doc(foodTitle).update({
            rating
        })
    }
    handleSaveItem = (event) => {
        event.preventDefault();
        alert('Item has been added to the Menu');
        const { name } = this.state;
        const { ingredients } = this.state;
        const { rating } = this.state;
        const { cost } = this.state;
        const { category } = this.state;
        var foodTitle = name;
        foodTitle = foodTitle.replace(/\s/g, '');
        firestore.collection("menuItems").doc(foodTitle).set({
            name,
            ingredients,
            rating,
            cost,
            category
        })
        window.location.reload(false);
    }
    render() {
        const { activeIndex } = this.state;
        const { items } = this.state;
       
        return(
            <Grid
            container 
            spacing={0}
            direction="row"

            >
                <Grid item xs className="background">
                    <Paper>
                        <Tabs
                            centered
                            value={activeIndex}
                            onChange={this.handleChange}
                            variant="fullWidth"
                        >
                            <MyTab label="Add Menu Item" />
                            <MyTab label="Edit Menu Item" />
                        </Tabs>
                    </Paper>
                    { activeIndex === 0 && <TabContainer>
                        <Card >
                            <CardHeader
                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                title="Add New Item to the Sapori Unici Menu"
                                
                                
                            />
                            <Divider className="divider" variant="middle" />
                            <CardActions>  
                            <MyTextField
                                        id="filledNumber"
                                        label="Item Name"
                                        fullWidth="true"
                                        // value={this.state.value}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={this.handleItemName}
                            />
                            </CardActions>
                            <CardActions>
                            <MyTextField
                                        id="filledNumber"
                                        label="Item Ingredients"
                                        fullWidth="true"
                                        // value={this.state.value}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={this.handleItemIngredients}
                                    />
                            </CardActions>
                            <CardActions>
                                <MyTextField
                                        id="filledNumber"
                                        label="Item Rating"
                                        type="number"
                                        fullWidth="true"
                                        // value={this.state.value}
                                        InputProps = {{
                                            inputProps: {
                                                min: 1, max: 5},
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={this.handleItemRating}
                                    />
                            </CardActions>
                           
                                    <CardActions>
                                    <MyTextField
                                    
                                    id="input-with-icon-textfield"
                                    label="Item Cost"
                                    type="number"
                                    fullWidth="true"
                                    variant="filled"
                                    onChange={this.handleItemCost}
                                    InputProps={{
                                        inputProps: {
                                            min: 1, max: 50},
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                    </CardActions> 
                                   
                            <CardActions className="controls">
                            <RadioGroup row aria-label="position" name="position" defaultValue="Entree" onChange={this.handleItemCategory}>
                                    <FormControlLabel
                                    value="Entree"
                                    control={<Radio color="primary" />}
                                    label="Entree"
                                    labelPlacement="top"
                                    />
                                    <FormControlLabel
                                    value="Main"
                                    control={<Radio color="primary" />}
                                    label="Main"
                                    labelPlacement="top"
                                    />
                                    <FormControlLabel
                                    value="Dessert"
                                    control={<Radio color="primary" />}
                                    label="Dessert"
                                    labelPlacement="top"
                                    />
                                    <FormControlLabel
                                    value="Drinks"
                                    control={<Radio color="primary" />}
                                    label="Drinks"
                                    labelPlacement="top"
                                    />
                                    </RadioGroup>
                      </CardActions>
                      <CardActions className="controls">
                      <MyButton variant="contained"
                                        
                                        onClick={event => this.handleSaveItem(event)}
                                        startIcon={<AddIcon />}>
                                            Add to Menu</MyButton>
                                            
                      </CardActions>
                        </Card>
                    </TabContainer> }
                    { activeIndex === 1 && <TabContainer>
                        <Grid
                         container
                         spacing={3}
                         direction="row"
                         justify="center"
                         alighnItems="center"
                         alignContent="center"
                         className="background"
                     >
                           {items.map((entreeItem, index) => (
                              
                                 <Grid item xs key={entreeItem}> 
                                    
                                     <MyCard className="root" variant="outlined" raised="false"
                                     boxShadow={3}>
                                 
                                         <CardHeader
                                         style={{ textAlign: 'left', height: '3%', paddingLeft: '5%', paddingTop: '5%'}}
                                             title={entreeItem.name}
                                         />
                                          <Divider className="divider" variant="middle" />
                                     <div className="details">
                                     <CardContent className="content">
                                     <Typography gutterBottom variant="h5" component="h2">
                                       
                                       <h3>Item Name: {entreeItem.name}</h3>
                                       <p><input
                                        placeholder="Item Name"
                                        onChange={this.handleUpdateName}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateName(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p> 
                                     
                                     <h3>Item Ingredients: {entreeItem.ingredients}</h3>
                                     <p><input
                                        placeholder="Item Ingredients"
                                        onChange={this.handleUpdateIngredients}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateIngredients(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p> 
                                    
                                    <h3>Item Category: {entreeItem.category}</h3>
                                    <p><input
                                        placeholder="Item Category"
                                        onChange={this.handleUpdateCategory}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateCategory(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p> 
                                    
                                    <h3>Item Cost: ${entreeItem.cost}</h3> 
                                    <p><input
                                        placeholder="Item Cost"
                                        onChange={this.handleUpdateCost}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateCost(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p>
                                    
                                    <h3>Item Rating: {entreeItem.rating}</h3>
                                    <p><input
                                        placeholder="Item Rating"
                                        onChange={this.handleUpdateRating}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateRating(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p> 
                                     </Typography>
                                     </CardContent>
                                 
                                 <Divider className="divider" variant="middle" />
                                     <CardActions className="controls">
                                     <ButtonGroup variant="contained"  aria-label="contained primary button group">
                                         <MyButton
                                         variant="contained"
                                         className="addButton"
                                         onClick={event => this.handleDeleteItem(event, entreeItem.name)}
                                         startIcon={<RemoveIcon />}>Remove Item</MyButton>
                                     </ButtonGroup>
                                     </CardActions>
                                     </div>
                                     </MyCard>
                                 </Grid>
                           ))}
                     </Grid>
                    </TabContainer> }
                </Grid>
            </Grid>
        );
    }
}


const MyButton = withStyles(theme => ({
    root: {
        backgroundColor: 'maroon',
    },
     contained: {
        textTransform: 'capitalize',
        color: 'white',
        fontSize: '50%',
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

const MyTab = withStyles(theme => ({
    selected: {
        color: 'maroon',
        // borderTop: '10px solid maroon',
        borderBottom: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  }))(Tab);
  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 24 }}>
        {props.children}
      </Typography>
    );
  }
  
  const MyCard = withStyles(theme => ({
    root: {
      boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
      borderRadius: '2%',
      transition: '0.3s',
      backgroundColor: 'transparent white',
      height: '100%'
    }

}))(Card);
  export default MenuInventory;