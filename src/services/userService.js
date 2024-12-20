import axios from '../axios'
const handleLogin = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    return response.data; // Đảm bảo trả về response.data
}
const getAllUser = async (id) => {
    return (await axios.get(`/api/get-all-users?id=${id}`)).data
}
const createNewUserService = async (data) => {
    return (await axios.post('/api/sign-up', data)).data
}
const deleteUserService = async (userId) => {
    return (await axios.delete('/api/delete-user', { data: { userId } })).data;
}
const editUserService = async (data) => {
    return (await axios.put('/api/edit-user', data)).data;
}
const getAllCodeService = async (dataType) => {
    return (await axios.get(`/api/allcode?type=${dataType}`)).data;
}
const getTopDoctorHome = async (limit) => {
    return (await axios.get(`/api/top-doctor-home?limit=${limit}`)).data;
}
const getAllDoctors = async () => {
    return (await axios.get(`/api/get-all-doctor`)).data;
}
const saveDetailsDoctor = async (data) => {
    return (await axios.post('/api/save-info-doctors', data)).data
}
const getDetailInforDoctor = async (id) => {
    return (await axios.get(`/api/get-detail-doctor-by-id?id=${id}`)).data
}
const bulkCreateSchedule = async (data) => {
    return (await axios.post(`/api/bulk-create-schedule`, data)).data
}
const getScheduleByDate = async (doctorId, date) => {
    return (await axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)).data
}
export const userService = {
    handleLogin,
    createNewUserService,
    deleteUserService,
    getAllUser,
    editUserService,
    getAllCodeService,
    getTopDoctorHome,
    getAllDoctors,
    saveDetailsDoctor,
    getDetailInforDoctor,
    bulkCreateSchedule,
    getScheduleByDate
}