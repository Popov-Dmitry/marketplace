import axios from "axios";

const $russianPost = axios.create({
    baseURL: process.env.REACT_APP_RUSSIAN_POST_API_URL
});

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost,
    $russianPost
};