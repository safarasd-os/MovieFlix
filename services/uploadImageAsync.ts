import { ID, Role } from "react-native-appwrite";
import {
  storage,
  BUCKET_ID,
  USER_PROFILE,
  DATABASE_ID,
  database,
  account,
} from "./appwrite";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Permission, Query } from "appwrite";

const prepareNativeFile = async (
  asset: ImagePicker.ImagePickerAsset
): Promise<{ name: string; type: string; size: number; uri: string }> => {
  console.log("[prepareNativeFile] asset ==>", asset);
  try {
    const url = new URL(asset.uri);

    return {
      name: url.pathname.split("/").pop()!,
      size: asset.fileSize!,
      type: asset.mimeType!,
      uri: url.href,
    } as any;
  } catch (error) {
    console.error("[prepareNativeFile] error ==>", error);
    return Promise.reject(error);
  }
};

export const uploadImageAsync = async (asset: ImagePicker.ImagePickerAsset, upload) => {
  try {
    const user = await account.get();
    const userId = user.$id;

    // 1. Upload file to Storage
    const response = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      Platform.OS === "web" ? asset.file! : await prepareNativeFile(asset),
      [
        Permission.read("any"), // Make public
        Permission.write(Role.user(userId)), // Owner can write
      ]
    );
    console.log("[file uploaded] ==>", response);

    // 2. Store file ID into userProfile collection
    const existingProfile = await database.listDocuments(
      DATABASE_ID,
      USER_PROFILE,
      [Query.equal("userId", userId)]
    );

    if (existingProfile.documents.length > 0) {
      // Update existing profile
      await database.updateDocument(
        DATABASE_ID,
        USER_PROFILE,
        existingProfile.documents[0].$id,
        { profilePicture: response.$id }
      );
    } else {
      // Create new profile
      await database.createDocument(
        DATABASE_ID,
        USER_PROFILE,
        ID.unique(),
        {
          userId,
          profilePicture: response.$id,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
        ]
      );
    }

    // 3. Return preview URL
    const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
    console.log("[file url ==>]", fileUrl);
    upload()
    return fileUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handleImagePicked = async (
  pickerResult: ImagePicker.ImagePickerResult, upload
) => {
  try {
    if (!pickerResult.canceled) {
      await uploadImageAsync(pickerResult.assets[0], upload);
      alert("Upload successful!");
    }
  } catch (error) {
    console.log(error);
    alert("Upload failed, sorry :(");
  }
};

export const pickImage = async (upload) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log({ pickerResult });

  handleImagePicked(pickerResult, upload);
};
//Get the profile picture
