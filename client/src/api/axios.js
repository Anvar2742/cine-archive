import axios from "axios";
const BASE_URL = "http://localhost:7000";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const axiosMovies = axios.create({ baseURL: TMDB_BASE_URL });
