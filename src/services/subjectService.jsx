import { httpClient } from "../utils/httpClient";

export const getSubjects = (token) => {

    return httpClient.get("/subject",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postSubject = (data, token) =>{
    return httpClient.post("/subject", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const deleteSubject = (subjectId, token) => {
    return httpClient.delete(`/subject/${subjectId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putSubject = (subjectId, data, token) => {
    return httpClient.put(`/subject/${subjectId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};