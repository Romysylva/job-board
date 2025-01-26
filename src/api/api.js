import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getUser = () => API.get("/users");

export const Url = "http://localhost:5000/";
