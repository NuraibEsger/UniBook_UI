import { httpClient } from "../utils/httpClient";

export const getDepartments = (token) => {

    return httpClient.get("/department",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postDepartment = (data, token) =>{
    return httpClient.post("/department", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const deleteDepartment = (departmentId, token) => {
    return httpClient.delete(`/department/${departmentId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const putDepartment = (departmentId, data, token) => {
    return httpClient.put(`/department/${departmentId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};