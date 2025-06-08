import { Redirect, Stack, usePathname } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

const user = true;

export default function RootLayout() {
  //current folder path address
  const pathname = usePathname();
  //Checks if we're already on the login or register page
  const isAuthPage = pathname.startsWith("/auth");

  if (!user && !isAuthPage) {
    //User not logged in and not on auth page - send to login
    return <Redirect href="/auth/Login" />;
  }
  if (user && isAuthPage) {
    //User IS logged in but on login/register screen - send to home
    return <Redirect href="/(tabs)" />;
  }

  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
