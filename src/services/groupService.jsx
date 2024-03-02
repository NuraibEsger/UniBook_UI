import { httpClient } from "../utils/httpClient";

export const getGroup = (token) => {
    return httpClient.get("/group",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getGroupById = (Id, token) => {
    return httpClient.get(`/group/${Id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postGroup = (data, token) =>{
    return httpClient.post("/group", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const deleteGroup = (groupId, token) => {
    return httpClient.delete(`/group/${groupId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putGroup = (groupId, data, token) => {
    return httpClient.put(`/group/${groupId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};