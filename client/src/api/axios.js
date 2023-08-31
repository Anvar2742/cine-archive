import axios from "axios";
const BASE_URL = "http://192.168.1.223:7000";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default axios.create({ baseURL: BASE_URL, timeout: 2000 });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    timeout: 2000,
});

export const axiosMovies = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 2000,
});
