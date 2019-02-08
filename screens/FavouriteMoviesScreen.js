import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MovieListItem } from "./../components/MovieListItem";

export const FavouritesBarTitle = "Favourites";
export const FavouritesBarIcon = ({ focused, tintColor }) => {
  return <Icon name={`md-star${focused ? "" : "-outline"}`} size={25} />;
};

export default class FavouriteMoviesScreen extends React.Component {
  state = {
    movies: null
  };

  goToMoviesDetail = imdbID => {
    this.props.navigation.push('MovieDetails', {
      movie: this.state.movies.find(movie => movie.imdbID == imdbID)
    })
  }

  fetchFavouriteMoviesAsync = async () => {
    const {favourites} = this.props.screenProps
    // const movies =     
  }

  componentDidMount(){
    this.fetchFavouriteMoviesAsync()
  }

  componentDidUpdate() {
    console.log('updated')
    // this.setState({
    //   movies: this.statemovies.filter(movie =>
    //     this.props.favourites.includes(movie.imdbID)
    //   )
    // });
  }

  render() {
    if (this.state.movies === null || 1)//!!!!!
      return (
        <View style={styles.container}>
          <Text>This is a favourite movies screen</Text>
        </View>
      );


    <ScrollView style={{flex:1}}>
      {this.state.movies.map(movie => (
        <MovieListItem {...movie} isInFavourites />
      ))}
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
