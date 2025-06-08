import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          />

          <TextInput
            className="bg-secondary text-light-100 p-4 rounded-xl text-base my-4 border-white border-2"
            placeholder="Password"
            placeholderTextColor="#A8B5DB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity className="bg-accent py-4 rounded-xl items-center">
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
