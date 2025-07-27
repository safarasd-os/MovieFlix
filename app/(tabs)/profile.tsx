import { icons } from "@/constants/icons";
import { account } from "@/services/appwrite";
import { pickImage } from "@/services/uploadImageAsync";
import { getUserProfilePictureUrl } from "@/services/getUserProfilePicture";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { deleteProfilePicture } from "@/services/deleteProfilePicture";
import { images } from "@/constants/images";

const Profile = () => {
  const [refreshProfile, setRefreshProfile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  // New profile picture delete logic
  const handleUpload = async () => {
    if (profilePicUrl) {
      await deleteProfilePicture(user?.$id);
      setProfilePicUrl(null);
    }
    await pickImage(handleUploadSuccess);
  };
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
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!user?.$id) return; // Don't run until user is loaded
      try {
        const picUrl = await getUserProfilePictureUrl(user.$id);
        setProfilePicUrl(picUrl);
      } catch (error) {
        console.error("Error fetching profile pic:", error);
      }
    };

    fetchProfilePic();
  }, [user, refreshProfile]); // Runs only when `user` or `refreshProfile` changes

  const handleUploadSuccess = () => {
    setRefreshProfile((prev) => !prev); // toggles to re-trigger useEffect
  };

  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="w-full flex-row justify-center mt-20">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>
      <View className="p-10 pt-20 pb-40 justify-between flex-1 ">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/60">
            <View className="bg-white p-6 rounded-xl w-4/5">
              <Text className="text-lg font-semibold mb-4 text-center color-se">
                Edit Profile Picture
              </Text>

              <TouchableOpacity
                className="bg-accent p-3 rounded-lg mb-3"
                onPress={() => {
                  setModalVisible(false);
                  handleUpload();
                }}
              >
                <Text className="text-white text-center font-bold">
                  Upload New Picture
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-red-600 p-3 rounded-lg"
                onPress={async () => {
                  setModalVisible(false);
                  await deleteProfilePicture(user?.$id);
                  // Refresh UI
                  setProfilePicUrl(null);
                }}
              >
                <Text className="text-white text-center font-bold">
                  Delete Picture
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-4"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-center text-gray-600">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View className="border-2 border-accent justify-between p-5 rounded-2xl flex-1">
          <View className="flex-row  ">
            <Image
              className="size-32 rounded-full "
              resizeMode="cover"
              source={profilePicUrl ? { uri: profilePicUrl } : icons.person}
            />
            <View className="pl-5 flex-col justify-between">
              <Text className=" text-white text-4xl font-bold">
                {user?.name ?? "Loading..."}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-gray-600 p-2 rounded-lg"
              >
                <Text className="text-white text-center">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={logout}
            className="bg-accent py-4 rounded-xl items-center"
          >
            <Text className="text-white text-base font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
