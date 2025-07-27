import { Query } from "appwrite";
import {
  BUCKET_ID,
  database,
  DATABASE_ID,
  storage,
  USER_PROFILE,
} from "./appwrite";

export const getUserProfilePictureUrl = async (userId: string) => {
  try {
    // Find user profile document
    const response = await database.listDocuments(DATABASE_ID, USER_PROFILE, [
      Query.equal("userId", userId),
    ]);

    if (response.documents.length === 0) {
      console.log("No profile picture found for this user");
      return null;
    }

    const profileDoc = response.documents[0];
    if (!profileDoc.profilePicture) {
      console.log("Profile document found but no profilePicture");
      return null;
    }

    // Generate a preview URL from storage
    const filePreview = storage.getFileView(
      BUCKET_ID,
      profileDoc.profilePicture
    );

    return filePreview.href ?? filePreview; // In some SDKs, this is a URL object
  } catch (error) {
    console.error("Error fetching profile picture URL:", error);
    return null;
  }
};
