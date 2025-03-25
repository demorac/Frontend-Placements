
import axiosInstance from "../Interceptor/AxiosInterceptor";


const getProfile = async (id:any) => {
    return axiosInstance.get(`/profiles/get/${id}`) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};
const updateProfile = async (profile:any) => {
    return axiosInstance.put(`/profiles/update`, profile) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};
const getAllProfiles = async () => {
    return axiosInstance.get(`/profiles/getAll`) // ✅ Fixed URL and Payload
        .then(res => res.data)
        .catch(error => { throw error; });
};

export {getProfile,updateProfile,getAllProfiles};