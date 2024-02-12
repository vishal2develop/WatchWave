import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";

// Keep the splash screen visible while we fetch resources

export default function App() {
  const [ready, setReady] = useState(false);

  // Effect to handle app readiness and hide splash screen
  // useEffect(() => {
  //   const handleFinish = async () => {
  //     // Set the app as ready
  //     setReady(true);
  //     // Hide the splash screen when the app is ready
  //     await SplashScreen.hideAsync();
  //   };

  //   handleFinish();
  // }, [ready]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts & images, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font);
        // use Asset to load images from local
        await Asset.loadAsync(require("./dreamhouse-logo.png"));
        // Use prefetch to fetch images that are not on your local system
        await Image.prefetch(
          "https://snack-web-player.s3.us-west-1.amazonaws.com/v2/49/assets/src/react-native-logo.png"
        );
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    }

    prepare();
  }, []);

  // Effect to prevent auto-hiding of splash screen initially
  useEffect(() => {
    // Prevent auto-hiding of splash screen when the component mounts
    if (!ready) {
      SplashScreen.preventAutoHideAsync();
    }
  }, []); // Run the effect only once when the component mounts

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SplashScreen Demo! 👋</Text>
    </View>
  );
}
