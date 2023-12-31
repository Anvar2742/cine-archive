import axios from "axios";
const BASE_URL =
    import.meta.env.VITE_ENV === "dev"
        ? "https://172.20.10.6:7000"
        : "https://cine-archive.onrender.com";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const axiosMovies = axios.create({
    baseURL: TMDB_BASE_URL,
});
