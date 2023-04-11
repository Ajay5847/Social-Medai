import axios from "axios";
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from "./localStorage";
import store from '../redux/store'
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";

let baseURL = 'http://localhost:4200';
console.log('env is ', process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
  baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  store.dispatch(setLoading(true));
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

axiosClient.interceptors.response.use(async (response) => {
  store.dispatch(setLoading(false));
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }
  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.result;
  store.dispatch(showToast({
    type: TOAST_FAILURE,
    message: error
  }))

  if (statusCode === 401 && !originalRequest._retry) {
    // means the access token has expired
    originalRequest._retry = true;

    const response = await axios
        .create({
            withCredentials: true,
        })
        .post(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

    if (response.data.status === "ok") {
        setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
        originalRequest.headers[
            "Authorization"
        ] = `Bearer ${response.data.result.accessToken}`;

        return axios(originalRequest);
    } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }
  }
    return Promise.reject(error);
}, async (error) => {
  store.dispatch(setLoading(false));
  store.dispatch(showToast({
    type: TOAST_FAILURE,
    message: error.message
  }))
  return Promise.reject(error);
});
