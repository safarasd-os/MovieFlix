import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
const MovieCard = ({ imdbID, Title, Year, Type, Poster, Ratings }: Movie) => {
  return (
    <Link href={`/movies/${imdbID}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
          source={{
            uri: Poster
              ? Poster
              : "https://placeholder.co/600x400/1a1a1a/ffffff.png",
          }}
        />
        <Text numberOfLines={1} className="font-bold text-white mt-2">
          {Title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />

          <Text className="text-xs text-white font-bold uppercase">
            {Ratings?.[0]?.Value}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {Year}
          </Text>
          {/* <Text className="text-xs font-medium text-light-300 uppercase mt-1 mr-3">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default MovieCard;
