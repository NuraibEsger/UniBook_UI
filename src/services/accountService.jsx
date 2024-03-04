import { httpClient } from "../utils/httpClient";

export const loginPost = (data) => {
    return httpClient.post("/account/login", data);
};

export const registerPost = (data) => {
    return httpClient.post("/account/register", data);
};

export const confirmEmail = (data) => {
    
    return httpClient.post("/account/confirmEmail", data);
};