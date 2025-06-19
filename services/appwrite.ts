import * as apw from "appwrite";
import { Platform } from "react-native";
import * as aprn from "react-native-appwrite";
import {
  Client,
  Account,
  Databases,
  Storage,
  Storage as aprnStorage,
  Account as aprnAccount,
} from "react-native-appwrite";

// env IDs
export const BUNDLE_ID = process.env.EXPO_PUBLIC_BUNDLE_ID;
export const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
export const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
export const BUCKET_ID = process.env.EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
export const SAVED_MOVIE_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("http://192.168.0.100/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
// Account
export const account = new Account(client);
// Database
export const database = new Databases(client);
// Storage
export const storage = new Storage(client);
// upload image
