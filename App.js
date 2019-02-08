import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import MoviesListScreen, {
  MoviesBarTitle,
  MoviesBarIcon,
} from "./screens/MoviesListScreen";
import FavouriteMoviesScreen, {
  FavouritesBarTitle,
  FavouritesBarIcon,
} from "./screens/FavouriteMoviesScreen";
import { Map } from "immutable";

const MoviesNavigator = createStackNavigator(
  {
    MovieDetails: MovieDetailsScreen,
    MoviesList: MoviesListScreen,
  },
  {
    initialRouteName: "MoviesList",
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    MoviesNavigator: {
      screen: MoviesNavigator,
      navigationOptions: () => ({
        tabBarLabel: MoviesBarTitle,
        tabBarIcon: MoviesBarIcon,
        title: "Movies",
      }),
    },
    FavouriteScreen: {
      screen: FavouriteMoviesScreen,
      navigationOptions: () => ({
        tabBarLabel: FavouritesBarTitle,
        tabBarIcon: FavouritesBarIcon,
      }),
    },
  },
  {
    initialRouteName: "MoviesNavigator",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    favourites: new Map(),
  };

  // componentDidMount(){
  //   console.log(this.state.favourites.includes(2))
  // }
  // componentDidUpdate() {
  //   console.log(this.state.favourites);
  // }
  addNewFavourite = movie => {
    this.setState(prevState => ({
      favourites: this.state.favourites.has(movie.imdbID)
        ? prevState.favourites.remove(movie.imdbID)
        : prevState.favourites.set(movie.imdbID, movie),
    }));
  };

  render() {
    return (
      <AppContainer
        screenProps={{
          onFavouriteAdd: this.addNewFavourite,
          favourites: this.state.favourites,
        }}
      />
    );
  }
}
