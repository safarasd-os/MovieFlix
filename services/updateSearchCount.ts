import { Query } from "react-native-appwrite";
import { COLLECTION_ID, database, DATABASE_ID } from "./appwrite";
import { ID } from "appwrite";

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    //check if a record of that search has already been stored
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.imdbID,
        count: 1,
        title: movie.Title,
        poster_url: movie.Poster,
      });
    }
  } catch (error) {
    console.log(error);

    throw error;
  }

  //if a document is found increment the searchCount field
  //if no document is found create a new document in Appwrite database > 1
};
