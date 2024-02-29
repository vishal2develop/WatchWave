const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;
console.log("API_READ_ACCESS_TOKEN:", API_READ_ACCESS_TOKEN);

const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "en-US";
const REGION = "IN";

const trending = () => {
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
};

const nowPlaying = () => {
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
};

const upcoming = () => {
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
};

export const moviesApi = { trending, nowPlaying, upcoming };
