import { httpClient } from "../utils/httpClient";

export const getTeachers = (token) => {

    return httpClient.get("/teacher",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTeacher = (userId, token) => {
    return httpClient.delete(`/teacher/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const addToSubject = (data, userId, token) => {
        return httpClient.post(`/teacher/${userId}`, data ,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}