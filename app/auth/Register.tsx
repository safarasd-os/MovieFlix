import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { account } from "@/services/appwrite";
import Toast from "react-native-toast-message";
import { ID } from "react-native-appwrite";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

  const registerHandler = async () => {
    if (password === password2) {
      try {
        const response = await account.create(
          ID.unique(), // Generate a unique user ID
          email,
          password,
          name,
        );
        console.log("Register success:", response);
        try {
          const response = await account.createEmailPasswordSession(
            email,
            password
          );
          console.log("Login success:", response);

          router.replace("/(tabs)");
        } catch (error: any) {
          console.log("Login failed:", error);
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Password must be between 8 and 265 characters",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
        text2: "Please check your passwords",
      });
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
            placeholder="Enter a userName"
            placeholderTextColor="#A8B5DB"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
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
          <TextInput
            className="bg-secondary text-light-100 p-4 rounded-xl text-base my-4 border-white border-2"
            placeholder="Confirm the password"
            placeholderTextColor="#A8B5DB"
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          onPress={registerHandler}
          className="bg-accent py-4 rounded-xl items-center"
        >
          <Text className="text-white text-base font-semibold">Register</Text>
        </TouchableOpacity>

        <Text
          className="text-light-200 text-center underline text-sm my-4"
          onPress={() => router.push("/auth/Login")}
        >
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};
export default Register;
