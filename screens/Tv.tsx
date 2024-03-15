import { ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import Hlist from "../components/Hlist";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
  });

  const { isLoading: todayLoading, data: todayData } = useQuery({
    queryKey: ["tv", "today"],
    queryFn: tvApi.airingToday,
  });

  const { isLoading: topLoading, data: topData } = useQuery({
    queryKey: ["tv", "top"],
    queryFn: tvApi.topRated,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ["tv"] });
    setRefreshing(false);
  };

  const loading = trendingLoading || todayLoading || topLoading;

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <Hlist title="Trending TV" data={trendingData.results} />

      <Hlist title="Airing Today" data={todayData.results} />

      <Hlist title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
