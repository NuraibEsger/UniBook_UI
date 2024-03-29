import { httpClient } from "../utils/httpClient";

export const getStudents = (token) => {

    return httpClient.get("/student",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteStudents = (userId, token) => {
    return httpClient.delete(`/student/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}