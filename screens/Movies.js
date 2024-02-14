import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Movies = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={() => navigate("Stack", { screen: "Two" })}
    >
      <Text>Movie</Text>
    </TouchableOpacity>
  );
};

export default Movies;
