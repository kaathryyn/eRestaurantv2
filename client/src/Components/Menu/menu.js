import React, { Component } from 'react';
import "./menu.css";
import { firestore } from '../../config/firebase.js';
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
import firebase from '../../config/firebase';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entree: [],
            main: [],
            dessert: [],
            drinks: [],
            quantity: '',
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
                    </Grid>

                    {activeIndex === 0 && <TabContainer>
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
                                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%' }}
                                                title={entreeItem.name}
                                                subheader={<StarRatingComponent
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
                                            </div>
                                        </MyCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </TabContainer>}

                    {activeIndex === 1 && <TabContainer>
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
                                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%' }}
                                                title={mainItem.name}
                                                subheader={<StarRatingComponent
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
                                            </div>
                                        </MyCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </TabContainer>}
                    {activeIndex === 2 && <TabContainer>
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
                                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%' }}
                                                title={dessertItem.name}
                                                subheader={<StarRatingComponent
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
                                            </div>
                                        </MyCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </TabContainer>}
                    {activeIndex === 3 && <TabContainer>
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
                                                style={{ textAlign: 'left', height: '6%', paddingLeft: '5%', paddingTop: '8%' }}
                                                title={drinksItem.name}
                                                subheader={<StarRatingComponent
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
                                            </div>
                                        </MyCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </TabContainer>}
                </div>
                </TabContainer>}
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

export default Menu;