import {
  storage,
  database,
  BUCKET_ID,
  DATABASE_ID,
  USER_PROFILE,
} from "@/services/appwrite";
import { ID, Query } from "appwrite";

export const deleteProfilePicture = async (userId) => {
  try {
    // Get the document for this user
    const res = await database.listDocuments(DATABASE_ID, USER_PROFILE, [
      Query.equal("userId", userId),
    ]);
    const doc = res.documents[0];
    if (!doc || !doc.profilePicture) {
      console.warn("No profile picture found.");
      return;
    }

    const fileId = doc.profilePicture;

    // Delete file from storage
    await storage.deleteFile(BUCKET_ID, fileId);

    // Update user document (remove profilePicture field)
    await database.updateDocument(DATABASE_ID, USER_PROFILE, doc.$id, {
      profilePicture: null,
    });

    console.log("Profile picture deleted.");
  } catch (err) {
    console.error("Error deleting profile picture:", err);
  }
};
