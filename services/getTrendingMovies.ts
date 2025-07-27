import { TrendingMovie } from "@/interfaces/interfaces";
import { COLLECTION_ID, database, DATABASE_ID } from "./appwrite";
import { Query } from "react-native-appwrite";

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
