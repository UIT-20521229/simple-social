import axios from "axios";
import { parse, stringify } from "qs";
import { getRefreshToken, getToken, setRefreshToken, setToken } from "../utils/localStorage";
import { API_ENDPOINT } from "../utils/varibaleLocal";

const AxiosClient = axios.create({
   baseURL: API_ENDPOINT,
   responseType: 'json',
   timeout: 50000,
   headers: {
      'Content-Type': 'application/json',
   },
   keepAlive: true,
});

AxiosClient.interceptors.request.use(
   async (config) => {
      const newConfig = config;
      let token = null;
      token = await getToken();
      if (token) {
         newConfig.headers.Authorization = `Bearer ${token}`;
      }
      return newConfig;
   },
   (error) => {
      return Promise.reject(error);
   },
);

AxiosClient.interceptors.response.use(
   function (response) {
      return response.data ?? response;
   },

   async function (error) {
      const originalRequest = error.config;
      const rftk = await getRefreshToken();

      if (error?.response?.status === 401 && !!rftk && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const res = await AxiosClient.post('/authentication/refresh-token', { refreshToken: rftk });
            const { accessToken, refreshToken } = res;
            // console.log(res);
            setToken(accessToken);
            setRefreshToken(refreshToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return AxiosClient(originalRequest);
         } catch (refreshError) {
            return Promise.reject(refreshError);
         }
      }
   },
);

export default AxiosClient;
