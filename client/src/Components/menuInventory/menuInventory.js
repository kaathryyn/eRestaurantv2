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
import background from '../../Images/background.jpg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { firestore } from'../../config/firebase.js';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MenuInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ingredients: '',
            rating: '',
            cost: '',
            category: '',
            items: [],
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

    handleSaveItem = (event) => {
        event.preventDefault();
        const { name } = this.state;
        const { ingredients } = this.state;
        const { rating } = this.state;
        const { cost } = this.state;
        const { category } = this.state;
        var foodTitle = name;
        firestore.collection("menuItems").doc(foodTitle).set({
            name,
            ingredients,
            rating,
            cost,
            category
        })
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
                <Grid item xs>
                <img className="headerImage" src={background} alt=""/>
                </Grid>
                <Grid item xs>
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
                        <Card>
                            <CardHeader
                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                title="Add New Item to the Sapori Unici Menu"
                                subheader="Instructions?"
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
                                        id="filledNumber"
                                        label="Item Cost"
                                        type="number"
                                        fullWidth="true"
                                        // value={this.state.value}
                                        InputProps = {{
                                            inputProps: {
                                                min: 1, max: 50},
                                        }}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={this.handleItemCost}
                                    />
                            </CardActions>
                            <CardActions>
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
                      <CardActions>
                      <MyButton variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleSaveItem(event)}
                                        startIcon={<AddIcon />}>
                                            Add to Menu</MyButton>
                                            
                      </CardActions>
                        </Card>
                    </TabContainer> }
                    { activeIndex === 1 && <TabContainer>
                        <Card>
                            <CardHeader
                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%'}}
                                title="Edit Existing Item In the Sapori Unici Menu"
                                subheader="Instructions?"
                            />
                            <Divider className="divider" variant="middle" />
                            <CardActions>
                                <Select>
                                {this.state.items.map((entreeItem) => <MenuItem key={entreeItem.name} value={entreeItem.name}>{entreeItem.name}</MenuItem>)}
                                </Select>
                            </CardActions>
                      <CardActions>
                      <MyButton variant="contained"
                                        className="addButton"
                                        onClick={event => this.handleSaveItem(event)}
                                        startIcon={<AddIcon />}>
                                            Update Item</MyButton>
                                            
                      </CardActions>
                        </Card>
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
  
  export default MenuInventory;