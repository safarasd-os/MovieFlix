import { icons } from "@/constants/icons";
import { account } from "@/services/appwrite";
import { pickImage } from "@/services/uploadImageAsync";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

const Profile = () => {
  const [user, setUser] = useState(null);
  // Logout logic
  const logout = async () => {
    await account.deleteSession("current");
    router.replace("/auth/Login");
  };
  // Get user data (username)
  const getUserData = async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <View className="flex-1 bg-primary px-10">
      <Image className="size-10" tintColor="#fff" source={icons.person} />
      <Text className="text-white text-base">{user?.name ?? "Loading..."}</Text>

      <TouchableOpacity
        onPress={logout}
        className="bg-accent py-4 rounded-xl items-center"
      >
        <Text className="text-white text-base font-semibold">Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-accent px-4 rounded-md mt-4"
        onPress={pickImage}
      >
        <Text className="text-white font-bold text-base text-center">
          Upload Profile Picture
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
