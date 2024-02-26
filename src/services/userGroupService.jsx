import { httpClient } from "../utils/httpClient";

export const getUserGroup = (token) => {

    
    return httpClient.get("/usergroup",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getUserGroupById = (usergroupId, token) => {
    return httpClient.get(`/usergroup/${usergroupId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postUserGroup = (data, token) =>{
    return httpClient.post("/usergroup", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const deleteUserGroup = (usergroupId, token) => {
    return httpClient.delete(`/usergroup/${usergroupId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putUserGroup = (usergroupId, data, token) => {
    return httpClient.put(`/usergroup/${usergroupId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};