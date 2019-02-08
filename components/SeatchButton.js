import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export class SearchButton extends React.Component {
  state = {
    animatedValue: new Animated.Value(0)
  };

  showTextInput = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 500
    }).start();
  };

  hideTextInput = () => {
    if (this.props.value === "")
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 500
      }).start();
  };

  componentDidMount() {
    // this.showTextInput()
  }

  toSearchInputWidth = () => {
    return this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 220]
    });
  };

  render() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" , marginRight:10}}>
        <AnimatedTextInput
          style={[styles.searchContainer, { width: this.toSearchInputWidth() }]}
          placeholder="Search"
          onFocus={this.showTextInput}
          onBlur={this.hideTextInput}
          {...this.props}
        />
        <TouchableOpacity onPress={this.props.onSubmitEditing}>
          <Icon name="md-search" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderRadius: 15,
    height: 35,
    paddingRight: 20,
    marginRight:10,
    textAlign: "right"
  }
});
