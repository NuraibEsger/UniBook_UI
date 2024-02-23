import { httpClient } from "../utils/httpClient";

export const getStudents = (token) => {

    return httpClient.get("/student",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};