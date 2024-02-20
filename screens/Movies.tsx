import { Dimensions, ActivityIndicator, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const { height } = Dimensions.get("window");
const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNowPlaying = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&&region=IN`,
        options
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  const getUpcoming = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&&region=IN`,
        options
      )
    ).json();

    setUpcoming(results);
  };

  const getTrending = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1&&region=IN`,
        options
      )
    ).json();

    setTrending(results);
  };

  const getMovieData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMovieData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            containerStyle={{
              width: "100%",
              height: height / 4,
              marginBottom: 40,
            }}
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                voteAverage={movie.vote_average}
                originalTitle={movie.original_title}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              horizontal
              keyExtractor={(item) => item.id + ""}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

export default Movies;
