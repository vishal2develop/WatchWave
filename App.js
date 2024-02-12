import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources

export default function App() {
  const [ready, setReady] = useState(false);

  // Effect to handle app readiness and hide splash screen
  useEffect(() => {
    const handleFinish = async () => {
      // Set the app as ready
      setReady(true);
      // Hide the splash screen when the app is ready
      await SplashScreen.hideAsync();
    };
    handleFinish();
  }, [ready]);

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
