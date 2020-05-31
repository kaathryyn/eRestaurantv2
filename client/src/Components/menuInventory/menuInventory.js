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
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { firestore } from'../../config/firebase.js';
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
                firestore.collection("menuItems").doc(docName).set(data);
                firestore.collection("menuItems").doc(foodTitle).delete();
            }
        })

        firestore.collection("menuItems").doc(foodTitle).update({
            name
        })
    }
    handleDeleteItem = (event, itemName) => {
        event.preventDefault();
        alert('Item has been deleted from the Menu');
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
                        <div className="page">
                        <form className="card" onSubmit={event => this.handleSaveItem(event)}>
                        <h1>Add New Item to the Sapori Unici Menu</h1>
                        <h4>Item Name</h4>
                        <div className='form-group row'>
                        <input
                        id="inputNew"
                            required
                                        placeholder="Item Name"
                                        onChange={this.handleItemName}
                                        
                            />
                        </div>
                       
                            <h4>Item Ingredients</h4>
                            <div className='form-group row'>
                            <input
                            id="inputNew"
                                        placeholder="Item Ingredients"
                                        onChange={this.handleItemIngredients}
                                        required
                                    /> 
                            </div>
                            <h4>Item Rating</h4>
                            <div className='form-group row'>
                            <input
                            id="rating"
                                        type="number"
                                        placeholder="Item Rating"
                                        min="1" max="5"
                                        onChange={this.handleItemRating}
                                        required
                                    />
                            </div>
                                   <h4>Item Cost</h4>
                                   <div className='form-group row'>
                                   <input
                                   id="cost"
                                    placeholder="Item Cost"
                                    min="1" max="100"
                                    type="number"
                                    onChange={this.handleItemCost}
                                    required
                                />
                                   </div>
                                  <h4>Item Category</h4>
                                  <div id="radioGroup">
                                        <div className="wrap">
                                        <input type="radio" name="category" value="Entree" required onChange={this.handleItemCategory}/><label>Entree
                                        </label>
                                        </div>
                                        <div className="wrap">
                                        <label>
                                        <input type="radio" name="category" value="Main" onChange={this.handleItemCategory}/>Main
                                        </label>
                                        </div>
                                        <div className="wrap">
                                        <label>
                                        <input type="radio" name="category" value="Dessert" onChange={this.handleItemCategory}/>Dessert
                                        </label>
                                        </div><div className="wrap">
                                        <label>
                                        <input type="radio" name="category" value="Drinks" onChange={this.handleItemCategory}/>Drinks
                                        </label>
                                  </div>
                                  </div>
                                  
                                       
  
                                <div className="alignButton">
                                <input type="submit"
                                value="Add to Menu"/>
                                </div>
                             
                        </form>
                        </div>
                        
                    </TabContainer> }
                    { activeIndex === 1 && <TabContainer>
                        <Grid
                         container
                         spacing={3}
                         direction="row"
                         justify="center"
                         alighnItems="center"
                         alignContent="center"
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
                                    id="editCost"
                                        placeholder="Item Cost"
                                        type="number"
                                        min="1" max="100"
                                        onChange={this.handleUpdateCost}
                                    /> <MyButton variant="contained"
                                    className="addButton"
                                    onClick={event => this.handleSaveUpdateCost(event, entreeItem.name)}
                                    startIcon={<AddIcon />}>
                                        Save Changes</MyButton></p>
                                    
                                    <h3>Item Rating: {entreeItem.rating}</h3>
                                    <p><input
                                        id="editRating"
                                        type="number"
                                        min="1" max="5"
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