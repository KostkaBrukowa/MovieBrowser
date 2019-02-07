import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { MovieDetailsScreen } from "./MovieDetailsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SearchButton } from "./../components/SeatchButton";
import { MovieListItem } from "./../components/MovieListItem";
import { fetchMoviesSearchAsync } from "./../api/moviesApi";

export const MoviesBarTitle = "Movies";
export const MoviesBarIcon = ({ focused, tintColor }) => {
  return <Icon name="md-tv" size={25} />;
};

export default class MoviesListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Movies",
    headerRight: <SearchButton />,
  };

  state = {
    movies: [],
    page: 0,
  };

  componentDidUpdate(prevProps) {
    const { favourites } = this.props.screenProps;

    if (prevProps.screenProps.favourites !== favourites) {
      const updatedMovies = this.state.movies.map(movie =>
        movie.isInFavourites !== favourites.includes(movie.imdbID)
          ? { ...movie, isInFavourites: !movie.isInFavourites }
          : movie
      );

      this.setState({
        movies: updatedMovies,
      });
    }
  }

  componentDidMount() {
    this.fetchNextMoviesPageAsync();
  }

  Movie = ({ item }) => {
    return <MovieListItem {...item} id={item.key} />;
  };

  goToMoviesDetail = imdbID => {
    console.log(imdbID)
    this.props.navigation.push('MovieDetails', {
      movie: this.state.movies.find(movie => movie.imdbID == imdbID)
    })
  }

  fetchNextMoviesPageAsync = async () => {
    const newPage = await fetchMoviesSearchAsync("harry", this.state.page + 1);
    const newPageWithFavourites = newPage.map(movie => ({
      ...movie,
      isInFavourites: this.props.screenProps.favourites.includes(movie.imdbID),
      onAddToFavourites: this.props.screenProps.onFavouriteAdd,
      onMoviePress: this.goToMoviesDetail,
    }));

    this.setState(prevState => ({
      movies: prevState.movies.concat(newPageWithFavourites),
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.movies}
        renderItem={this.Movie}
        onEndReached={this.fetchNextMoviesPageAsync}
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
