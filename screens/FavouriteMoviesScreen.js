import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MovieListItem } from "./../components/MovieListItem";

export const FavouritesBarTitle = "Favourites";
export const FavouritesBarIcon = ({ focused, tintColor }) => {
  return <Icon name={`md-star${focused ? "" : "-outline"}`} size={25} />;
};

export default class FavouriteMoviesScreen extends React.Component {
  state = {
    movies: null,
  };

  goToMoviesDetail = imdbID => {
    this.props.navigation.push("MovieDetails", {
      movie: this.state.movies.find(movie => movie.imdbID == imdbID),
    });
  };

  getFavouriteMovies = async () => {
    const { favourites } = this.props.screenProps;
    const movies = [...favourites.toList()];
    this.setState({ movies });
  };

  componentDidMount() {
    this.getFavouriteMovies();
    console.log(this.state.movies);
  }

  componentDidUpdate(prevProps) {
    const { favourites } = this.props.screenProps;
    if (prevProps.screenProps.favourites !== favourites)
      this.getFavouriteMovies();
  }

  render() {
    if (this.state.movies === null) return <View />;

    // const moviesList = this.state.movies.map(movie => (
    //   <MovieListItem {...movie} />
    // ));
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.movies}
        renderItem={({ item }) => <MovieListItem {...item} isInFavourites={true} />}
        keyExtractor={movie => movie.imdbID}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
