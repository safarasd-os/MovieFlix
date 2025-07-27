# Appwrite Setup for MovieFlix

This project uses Appwrite for authentication, database, and storage. Here's how to configure your Appwrite backend:

---

## 1. Database: `movies`:

- ### Collections: (Permissions: any - create - delete - update- read)
  - ### `UserProfile:`
    - **userId** (string, **required**): Appwrite user ID
    - **profilePicture** (string): File ID
  - ### `SavedMovies:`
    - `attributes`:
      - **title** (string, **required**): Movie title
      - **userId** (string, **required**): Appwrite user ID
      - **poster_url** (URL, **required**): Poster image URL
      - **movie_id** (string, **required**): IMDb movie ID
  - ### `metrics:`
    - **searchTerm** (string, **required**): Searched keyword
    - **count** (integer): Number of times it was searched
    - **title** (string, **required**): Movie title
    - **poster_url** (URL, **required**): Poster URL
    - **movie_id** (string, **required**): IMDb ID

## 2. Storage Bucket:

- ### `Permissions:`
  - **any** `create` - `update` - `read` - `delete`

# Notes

- Make sure environment variables ids are set correctly in your `.env` file.
- Appwrite SDK must be initialized with the correct project ID and endpoint.
