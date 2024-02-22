import { httpClient } from "../utils/httpClient";

export const getUsers = (token) => {

    return httpClient.get("/user",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postStudent = (data, token) =>{
    return httpClient.post("/student", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}