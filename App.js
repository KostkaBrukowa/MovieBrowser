import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import MoviesListScreen, {
  MoviesBarTitle,
  MoviesBarIcon
} from "./screens/MoviesListScreen";
import FavouriteMoviesScreen, {
  FavouritesBarTitle,
  FavouritesBarIcon
} from "./screens/FavouriteMoviesScreen";
import {Set} from 'immutable'


const MoviesNavigator = createStackNavigator(
  {
    MovieDetails: MovieDetailsScreen,
    MoviesList: MoviesListScreen
  },
  {
    initialRouteName: "MoviesList"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    MoviesNavigator: {
      screen: MoviesNavigator,
      navigationOptions: () => ({
        tabBarLabel: MoviesBarTitle,
        tabBarIcon: MoviesBarIcon,
        title:'Movies',
      })
    },
    FavouriteScreen: {
      screen: FavouriteMoviesScreen,
      navigationOptions: () => ({
        tabBarLabel: FavouritesBarTitle,
        tabBarIcon: FavouritesBarIcon,
      })
    }
  },
  {
    initialRouteName: "MoviesNavigator",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    favourites: new Set(),
  }

  // componentDidMount(){
  //   console.log(this.state.favourites.includes(2))
  // }
  componentDidUpdate(){
    console.log(this.state.favourites)
  }
  addNewFavourite = (imdbID) => {
    this.setState(prevState =>({
      favourites: prevState.favourites.add(imdbID)
    }))
  }

  isFavourite = imdbID => this.state.favourites.includes(imdbID)

  render() {
    return <AppContainer onFavouriteAdd={this.addNewFavourite} isInFavourites={this.isFavourite} />;
  }
}
