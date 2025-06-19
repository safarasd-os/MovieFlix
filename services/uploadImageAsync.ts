import { ID } from "react-native-appwrite";
import { AppwriteClientFactory, storage, BUCKET_ID } from "./appwrite";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const prepareNativeFile = async (
  asset: ImagePicker.ImagePickerAsset
): Promise<{ name: string; type: string; size: number; uri: string }> => {
  console.log("[prepareNativeFile] asset ==>", asset);
  try {
    const url = new URL(asset.uri);

    // Handle native file preparation
    return {
      name: url.pathname.split("/").pop()!,
      size: asset.fileSize!,
      type: asset.mimeType!,
      uri: url.href,
    } as any;
  } catch (error) {
    console.error("[preparationNativeFile] error ==>", error);
    return Promise.reject(error);
  }
};

export const uploadImageAsync = async (asset: ImagePicker.ImagePickerAsset) => {
  try {
    const response = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      Platform.OS === "web" ? asset.file! : await prepareNativeFile(asset)
    );
    console.log("[file uploaded] ==>", response);
    const fileUrl = storage.getFilePreview(BUCKET_ID, response.$id);
    console.log("[file url ==>], fileUrl");
    return fileUrl;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handleImagePicked = async (
  pickerResult: ImagePicker.ImagePickerResult
) => {
  try {
    if (!pickerResult.canceled) {
      await uploadImageAsync(pickerResult.assets[0]);
      alert("upload successful!");
    }
  } catch (error) {
    console.log(error);
    alert("upload failed, sorry :");
  } finally {
  }
};
export const pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log({ pickerResult });

  handleImagePicked(pickerResult);
};
