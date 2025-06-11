import { Redirect, Stack, usePathname } from "expo-router";
import "./globals.css";
import { ActivityIndicator, StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect, useState } from "react";
import { account } from "@/services/appwrite";
import Toast from "react-native-toast-message";
import { toastConfig } from "../services/toastConfig";

export default function RootLayout() {
  //current folder path address
  const pathname = usePathname();
  //Checks if we're already on the login or register page
  const isAuthPage = pathname.startsWith("/auth");

  const [user, setUser] = useState<null | object>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    account
      .get()
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="mt-10 self-center"
      />
    );

  if (!user && !isAuthPage) {
    //User not logged in and not on auth page - send to login
    return <Redirect href="/auth/Login" />;
  }
  if (user && isAuthPage) {
    //User IS logged in but on login/register screen - send to home
    return <Redirect href="/(tabs)" />;
  }

  return (
    <RootSiblingParent>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </RootSiblingParent>
  );
}
