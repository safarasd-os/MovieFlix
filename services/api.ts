import { MovieDetails } from "@/interfaces/interfaces";

export const MODB_CONFIG = {
  BASE_URL: "http://www.omdbapi.com/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const url = query
    ? `${MODB_CONFIG.BASE_URL}?apikey=${
        MODB_CONFIG.API_KEY
      }&s=${encodeURIComponent(query)}`
    : `${MODB_CONFIG.BASE_URL}?apikey=${MODB_CONFIG.API_KEY}&s=batman`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movies");
  }

  // Fetch detailed info for each movie in parallel
  const detailedMovies = await Promise.all(
    data.Search.map(async (movie: { imdbID: string }) => {
      const detailUrl = `${MODB_CONFIG.BASE_URL}?apikey=${MODB_CONFIG.API_KEY}&i=${movie.imdbID}`;
      const detailResponse = await fetch(detailUrl);

      if (!detailResponse.ok) {
        throw new Error(`Failed to fetch details for movie ID ${movie.imdbID}`);
      }

      const detailData = await detailResponse.json();

      if (detailData.Response === "False") {
        throw new Error(
          `Error fetching details for movie ID ${movie.imdbID}: ${detailData.Error}`
        );
      }

      return detailData;
    })
  );
  return detailedMovies;
};

export const fetchMovieDetails = async (
  imdbID: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${MODB_CONFIG.BASE_URL}?apikey=${MODB_CONFIG.API_KEY}&i=${imdbID}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
