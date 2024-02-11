import { httpClient } from "../utils/httpClient";

export const loginPost = (data) => {
    return httpClient.post("/account/login", data);
};