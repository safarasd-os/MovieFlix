# MovieFlix

MovieFlix is a mobile app built with React Native that lets users browse, search, and save movies. Users can create an account, upload a profile picture, and explore trending movies based on search popularity.

## Features:

- Search movies using the free IMDb API

- User registration and login (via Appwrite)

- Upload and delete profile pictures

- Save favorite movies (user-specific)

- Trending movies based on most searched titles

- Movie details: poster, description, actors, directors/writers, and title

- Built with Expo for easy development and quick testing

## Tech Stack

- **Frontend**: React Native + Expo

- **Backend**: Appwrite (Authentication, Database, Storage)

- **Styling**: Tailwind CSS (via NativeWind)

- **Dev Tools**: Docker (for Appwrite), Git

## Demo

A video demo is available on my portfolio website (). It walks through all major features of the app.

## Backend Setup (Appwrite)

This project uses Appwrite with docker for backend services for a setup guide go to ./docs/APPWRITE_SETUP.md

# Getting Started

- **Clone the repository**
  `git clone https://github.com/yourusername/MovieFlix.git
cd MovieFlix`

- **Install dependencies**
  `npm install` or `yarn install`

- **Configure environment**
  Create a .env file in the root directory with these variables:

  EXPO_PUBLIC_MOVIE_API_KEY=3847cde2
  EXPO_PUBLIC_APPWRITE_ENDPOINT=http://your-endpoint/v1
  EXPO_PUBLIC_APPWRITE_PROJECT_ID=your-project-key
  EXPO_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
  EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your-collection-id
  EXPO_PUBLIC_APPWRITE_SAVED_MOVIE_COLLECTION_ID=your-saved-movie-collection-id
  EXPO_PUBLIC_APPWRITE_USER_PROFILE_COLLECTION_ID=your-user-profile-collection-id
  EXPO_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id
  EXPO_PUBLIC_BUNDLE_ID=your-bundle-id

  Also configure your Docker .env file accordingly and add both .env files to .gitignore

  **Start the app**
  `npx expo start`

Make sure your Appwrite backend is running.

## Notes

The UI started from a tutorial, but all the API/backend logic (auth, image uploads, saved movies, metrics) were built independently.

Learned everything through self-study, no formal schooling.

## Contact

Email: tilen.lorenci12@gmail.com
Phone: +386 40 260 266
