import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { YELLOW_COLOR } from "../constants/colors";

const Screen1 = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Two")}>
    <Text>Screen One</Text>
  </TouchableOpacity>
);
const Screen2 = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Three")}>
    <Text>Screen Two</Text>
  </TouchableOpacity>
);
const Screen3 = ({ navigation: { goBack, setOptions, navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Goto Search Screen</Text>
  </TouchableOpacity>
);
const NativeStack = createNativeStackNavigator();
const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTintColor: YELLOW_COLOR,
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="One" component={Screen1} />
      <NativeStack.Screen name="Two" component={Screen2} />
      <NativeStack.Screen name="Three" component={Screen3} />
    </NativeStack.Navigator>
  );
};

export default Stack;