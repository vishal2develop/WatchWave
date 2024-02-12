import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset, useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

const loadFonts = (fonts) =>
  fonts.map(async (font) => await Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const [assets] = useAssets([
    require("./dreamhouse-logo.png"),
    "https://snack-web-player.s3.us-west-1.amazonaws.com/v2/49/assets/src/react-native-logo.png",
  ]);

  const [fonts] = Font.useFonts(Ionicons.font);

  if (!assets || !fonts) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SplashScreen Demo! 👋</Text>
    </View>
  );
}
