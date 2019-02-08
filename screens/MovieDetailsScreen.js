import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {FavouritesStar} from './../components/FavouritesStar'
import {fetchMovieDetailsAsync} from './../api/moviesApi'



export default class MovieDetailsScreen extends React.Component {

  state = {
    details:null
  }

  getMovieDetails = async () => {
    const movie = this.props.navigation.getParam('movie')
    const details = await fetchMovieDetailsAsync(movie.imdbID)

    this.setState({details})
  }

  componentDidMount(){
    this.getMovieDetails()
  }

  render() {

    if(this.state.details === null) return <View />
    const {isInFavourites} = this.props.navigation.getParam('movie')
    const {Poster, Released, Title, imdbRating, imdbVotes, Plot} = this.state.details

    return (
        <ScrollView style={{flex:1}} contentContainerStyle={styles.movieContainer}>
          <View style={{ }}>
            <Image style={styles.image} source={{ uri: Poster }} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, styles.title]}>{Title}</Text>
            <Text style={styles.text}>Released: {Released}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{Plot}</Text>
          </View>
          <View style={{  }}>
            <Text>Rating: {imdbRating}/10 with {imdbVotes} votes</Text>
          </View>
          <FavouritesStar isGold={isInFavourites} size={50} />
        </ScrollView>
    );
  }
}

const imageScale = 1;
const imageHeight = 455 * imageScale;
const imageWidth = 300 * imageScale;

const styles = StyleSheet.create({
  movieContainer: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  text: {
    textAlign: "center",
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  title:{
    fontSize:22,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});