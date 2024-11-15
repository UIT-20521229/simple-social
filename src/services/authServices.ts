import AxiosClient from "./axiosClient";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    username: string;
}

interface RefreshTokenData {
    refreshToken: string;
}

const API_ENDPOINT = "authentication";

const userApi = {
    login: (data: LoginData) => {
        return AxiosClient.post<any>(API_ENDPOINT + "/login", data);
    },
    logout: (data: { userId: string }) => {
        return AxiosClient.post<any>(API_ENDPOINT + "/logout", data);
    },
    register: (data: RegisterData) => {
        return AxiosClient.post<any>(API_ENDPOINT + "/signup", data);
    },
    refreshToken: (refreshToken: string) => {
        return AxiosClient.post<any>(API_ENDPOINT + "/refresh-token", { refreshToken });
    },
};

export default userApi;
