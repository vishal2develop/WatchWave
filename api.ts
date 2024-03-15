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

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "en-US";
const REGION = "IN";

const trending = "";

const nowPlaying = "";

const upcoming = "";

export const moviesApi = {
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
};

export const tvApi = {
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
};
