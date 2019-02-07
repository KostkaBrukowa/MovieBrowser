import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const SearchButton = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <TextInput style={styles.searchContainer} value={"placeholder"} />
    <TouchableHighlight onPress={() => console.log("search")}>
      <Icon name="md-search" size={25} />
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    height: 35
  }
});
