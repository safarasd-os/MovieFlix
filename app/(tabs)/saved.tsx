import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/getSavedMovies";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import SavedCard from "../components/SavedCard";
import { useFocusEffect } from "expo-router";
const saved = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // fetch movies every time screen comes into focus (user visits page)
      const fetchMovies = async () => {
        setLoading(true);
        const data = await getSavedMovies();
        setMovies(data);
        setLoading(false);
      };
      fetchMovies();
    }, [])
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {movies.length === 0 ? (
          <Text className="text-white font-bold text-lg">
            No Saved Movies yet
          </Text>
        ) : loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : (
          <View className="flex-1 mt-5">
            <>
              <Text className="text-lg font-bold mt-5 mb-3 text-white">
                Saved Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <SavedCard {...item} />}
                keyExtractor={(item) => item.movie_id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default saved;
