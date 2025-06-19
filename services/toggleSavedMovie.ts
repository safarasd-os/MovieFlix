import { ID, Permission, Query, Role } from "react-native-appwrite";
import {
  account,
  database,
  DATABASE_ID,
  SAVED_MOVIE_COLLECTION_ID,
} from "./appwrite";

export const toggleSaveMovie = async (movie) => {
  try {
    const user = await account.get();
    const userId = user.$id;
    const movieId = movie.imdbID;

    if (!userId || !movieId) {
      throw new Error("Missing user ID or movie ID");
    }

    // Check if movie is already saved
    const existing = await database.listDocuments(
      DATABASE_ID,
      SAVED_MOVIE_COLLECTION_ID,
      [Query.equal("userId", userId), Query.equal("movie_id", movieId)]
    );

    if (existing.documents.length > 0) {
      // Movie already saved, delete it (toggle off)
      const docId = existing.documents[0].$id;
      await database.deleteDocument(
        DATABASE_ID,
        SAVED_MOVIE_COLLECTION_ID,
        docId
      );
      console.log("Movie removed from saved list");
      return { saved: false };
    } else {
      // Movie not saved yet, create it (toggle on)
      const response = await database.createDocument(
        DATABASE_ID,
        SAVED_MOVIE_COLLECTION_ID,
        ID.unique(),
        {
          movie_id: movieId,
          title: movie.Title,
          poster_url: movie.Poster,
          userId: userId,
        },
        [
          Permission.read(Role.user(userId)),
          Permission.write(Role.user(userId)),
        ]
      );
      console.log("Movie saved:", response);
      return { saved: true };
    }
  } catch (error) {
    console.error("Error toggling movie save state:", error);
    throw error;
  }
};
