import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput
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

const Movie = ({ item }) => {
  return (
    <MovieListItem
      title={item.Title}
      year={item.Year}
      imgSource={item.Poster}
    />
  );
};

export default class MoviesListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Movies",
    headerRight: <SearchButton />
  };

  state = {
    movies: [],
    page: 0
  };

  componentDidMount() {
    this.fetchNextMoviesPageAsync();
  }


  fetchNextMoviesPageAsync = async () => {
    const newPage = await fetchMoviesSearchAsync("harry", this.state.page + 1);
    const newPageWithFavourites = newPage.map((movie) => ({
      ...movie,
      // isInFavourites: this.props.isFavourite(movie.imdbID)
    }))

    this.setState(prevState => ({
      movies: prevState.movies.concat(newPageWithFavourites),
      page: prevState.page + 1
    }));
  };

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.movies}
        renderItem={MovieListItem}
        onEndReached={this.fetchNextMoviesPageAsync}
        extraData={this.props}
      />
    );
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
