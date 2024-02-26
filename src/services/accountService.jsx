import { httpClient } from "../utils/httpClient";

export const loginPost = (data) => {
    return httpClient.post("/account/login", data);
};

export const registerPost = (data) => {
    return httpClient.post("/account/register", data);
};

export const confirmEmail = (token, email) => {
    return httpClient.post(`/account/confirmEmail?token=${token}&email=${email}`);
};