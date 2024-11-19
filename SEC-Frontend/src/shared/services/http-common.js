import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

const http = axios.create({
    baseURL: API_BASE_URL
});

http.defaults.headers.common["Content-Type"] = "application/json";
http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default http;