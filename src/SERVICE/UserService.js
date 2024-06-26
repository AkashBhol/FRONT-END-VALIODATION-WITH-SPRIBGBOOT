import api from "../configurations/http-common"


export const createUser = async (payload) => {
    return api.securedAxios().post("/api/v2/create", payload);
}

export const viewUser = async () => {
    return api.securedAxios().get("/api/v2/get");
}

// export const viewSingleUser = async (id) => {
//     return api.securedAxios().get("/api/v2/get/single/" + id);
// }
