import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
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

  useEffect(() => {
    async function prepare() {
      if (!ready) {
        SplashScreen.preventAutoHideAsync();
      }
      try {
        // Pre-load fonts & images, make any API calls you need to do here
        // Loading fonts in bulk
        const fonts = loadFonts([Ionicons.font]);
        console.log("fonts:", fonts);
        // Loading both local & remote assets in bulk
        const images = loadImages([
          require("./dreamhouse-logo.png"),
          "https://snack-web-player.s3.us-west-1.amazonaws.com/v2/49/assets/src/react-native-logo.png",
        ]);
        await Promise.all([...fonts, ...images]);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
        // hide splash screen after timeout
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SplashScreen Demo! 👋</Text>
    </View>
  );
}
