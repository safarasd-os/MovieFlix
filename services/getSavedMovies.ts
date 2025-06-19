import { Query } from "react-native-appwrite";
import {
  account,
  database,
  DATABASE_ID,
  SAVED_MOVIE_COLLECTION_ID,
} from "./appwrite";

export const getSavedMovies = async () => {
  try {
    const user = await account.get();
    const userId = user.$id; // Current logged-in user ID

    const response = await database.listDocuments(
      DATABASE_ID,
      SAVED_MOVIE_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};
