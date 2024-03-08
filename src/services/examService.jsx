import { httpClient } from "../utils/httpClient";

export const getExam = (id, token) => {
    console.log(id);
    return httpClient.get(`/exam?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getExamById = (Id, token) => {
    return httpClient.get(`/exam/${Id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postExam = (data, token) =>{
    return httpClient.post(`/exam`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const deleteExam = (examId, token) => {
    return httpClient.delete(`/exam/${examId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putExam = (examId, data, token) => {
    return httpClient.put(`/exam/${examId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};