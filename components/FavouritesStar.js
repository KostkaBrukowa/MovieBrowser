import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export const FavouritesStar = props => {
  return props.isGold ? (
    <Icon name={"md-star"} size={props.size} color="gold" />
  ) : (
    <Icon name={"md-star"} size={props.size} />
  );
};
