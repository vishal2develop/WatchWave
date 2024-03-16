import { QueryFunction } from "@tanstack/react-query";

const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
  dates: { maximum: string; minimum: string };
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "en-US";
const REGION = "IN";

const trending = "";

const nowPlaying = "";

const upcoming = "";

export const moviesApi: Fetchers<MovieResponse> = {
  trending: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/trending/movie/week?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  nowPlaying: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/movie/now_playing?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  upcoming: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/movie/upcoming?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  search: ({ queryKey }: any) => {
    console.log("queryKey1:", queryKey);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    const [_, query] = queryKey;
    console.log("query1", query);

    return fetch(
      `${BASE_URL}/search/movie?language=${LANGUAGE}&page=1&query=${query}`,
      options
    ).then((res) => res.json());
  },
};

export const tvApi: Fetchers<TVResponse> = {
  trending: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/trending/tv/day?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  airingToday: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/tv/airing_today?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  topRated: () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    return fetch(
      `${BASE_URL}/tv/top_rated?language=${LANGUAGE}&page=1&&region=${REGION}`,
      options
    ).then((res) => res.json());
  },
  search: ({ queryKey }: any) => {
    console.log("queryKey2:", queryKey);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    };
    const [_, query] = queryKey;
    console.log("query", query);

    return fetch(
      `${BASE_URL}/search/tv?language=${LANGUAGE}&page=1&query=${query}`,
      options
    ).then((res) => res.json());
  },
};
