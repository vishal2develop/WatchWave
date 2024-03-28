import { ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { tvApi, TVResponse } from "../api";
import Loader from "../components/Loader";
import Hlist from "../components/Hlist";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
    initialPageParam: 1,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: todayLoading,
    data: todayData,
    hasNextPage: todayHasNextPage,
    fetchNextPage: todayFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["tv", "today"],
    queryFn: tvApi.airingToday,
    initialPageParam: 1,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: topLoading,
    data: topData,
    hasNextPage: topDataHasNextPage,
    fetchNextPage: topDataFetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["tv", "top"],
    queryFn: tvApi.topRated,
    initialPageParam: 1,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({ queryKey: ["tv"] });
    setRefreshing(false);
  };

  const loadMoreTrendingTV = () => {
    if (trendingHasNextPage) {
      trendingFetchNextPage();
    }
  };

  const loadMoreTodayTV = () => {
    if (todayHasNextPage) {
      todayFetchNextPage();
    }
  };

  const loadMoreTopTV = () => {
    if (topDataHasNextPage) {
      topDataFetchNextPage();
    }
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
      {trendingData ? (
        <Hlist
          title="Trending TV"
          data={trendingData.pages.map((page) => page.results).flat()}
          loadMore={loadMoreTrendingTV}
        />
      ) : null}

      {todayData ? (
        <Hlist
          title="Airing Today"
          data={todayData.pages.map((page) => page.results).flat()}
          loadMore={loadMoreTodayTV}
        />
      ) : null}

      {topData ? (
        <Hlist
          title="Top Rated TV"
          data={topData.pages.map((page) => page.results).flat()}
          loadMore={loadMoreTopTV}
        />
      ) : null}
    </ScrollView>
  );
};

export default Tv;
