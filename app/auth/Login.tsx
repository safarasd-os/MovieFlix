import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { account } from "@/services/appwrite";
import Toast from "react-native-toast-message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async () => {
    try {
      // Checks if a session already exists
      const session = await account.get();
      console.log("Already logged in:", session);
      // Navigate to home page if needed
      router.replace("/(tabs)");
    } catch (error) {
      // Not logged in, so create session
      try {
        const response = await account.createEmailPasswordSession(
          email,
          password
        );
        console.log("Login success:", response);

        router.replace("/(tabs)");
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });
      } catch (error: any) {
        console.log("Login failed:", error);
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: "Wrong password or email",
        });
      }
    }
  };

  return (
    <View className="flex-1 bg-primary justify-center items-center px-6">
      <View className="bg-dark-200 w-full max-w-md rounded-2xl p-6 space-y- shadow-lg">
        <Text className="text-light-100 text-3xl font-bold text-center">
          Login
        </Text>

        <View className="my-4">
          <TextInput
            className="bg-secondary text-light-100 p-4 rounded-xl text-base my-4 border-white border-2"
            placeholder="Email"
            placeholderTextColor="#A8B5DB"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            className="bg-secondary text-light-100 p-4 rounded-xl text-base my-4 border-white border-2"
            placeholder="Password"
            placeholderTextColor="#A8B5DB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          onPress={handlePress}
          className="bg-accent py-4 rounded-xl items-center"
        >
          <Text className="text-white text-base font-semibold">Login</Text>
        </TouchableOpacity>

        <Text
          className="text-light-200 text-center underline text-sm my-4"
          onPress={() => router.push("/auth/Register")}
        >
          Don’t have an account? Register
        </Text>
      </View>
    </View>
  );
};

export default Login;
