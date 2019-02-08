import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {FavouritesStar} from './../components/FavouritesStar'


const imageScale = 0.25;
const imageHeight = 455 * imageScale;
const imageWidth = 300 * imageScale;

export class MovieListItem extends React.Component {
  shouldComponentUpdate(nextProps){
    return this.props.isInFavourites !== nextProps.isInFavourites;
  }

  render() {
    const {
      Title,Year,Poster,isInFavourites,onFavouriteAdd,imdbID,onMoviePress,
    } = this.props;
    return (
      <TouchableOpacity onPress={() => onMoviePress(imdbID)}>
        <View style={styles.movieContainer}>
          <View style={{ flex: 1 }}>
            <Image style={styles.image} source={{ uri: Poster }} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{Title}</Text>
            <Text style={styles.text}>Year: {Year}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => onFavouriteAdd(this.props)}>
            <View style={{ flex: 1, paddingRight: 0 }}>
              <FavouritesStar isGold={isInFavourites} size={30} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    height: imageHeight + 3,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  text: {
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  infoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
