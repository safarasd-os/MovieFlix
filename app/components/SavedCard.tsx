import { TrendingCardProps } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCard = ({ movie_id, title, poster_url }) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          className="w-full h-52 rounded-lg"
          source={{ uri: poster_url }}
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="font-bold text-white mt-2">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};
export default TrendingCard;
