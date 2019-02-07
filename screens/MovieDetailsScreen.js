import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'


export default class MovieDetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a movie details screen</Text>
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