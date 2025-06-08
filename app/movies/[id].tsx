import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => {
    return fetchMovieDetails(id as string);
  });
  
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: movie?.Poster,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.Title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">{movie?.Year}</Text>
            <Text className="text-light-200 text-sm">{movie?.Runtime}</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {movie?.imdbRating}/10
            </Text>
            <Text className="text-light-200 text-sm">({movie?.imdbVotes})</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.Plot} />
          <MovieInfo label="Genres" value={movie?.Genre} />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Actors" value={movie?.Actors} />
            <MovieInfo label="Director" value={movie?.Director} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180 "
          tintColor="#fff"
        />
        <Text className=" text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MovieDetails;
