import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export const FavouritesBarTitle = "Favourites"
export const FavouritesBarIcon = ({ focused, tintColor }) => {
  return <Icon name={`md-star${focused ? "" : "-outline"}`} size={25} />;
};

export default class FavouriteMoviesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a favourite movies screen</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});