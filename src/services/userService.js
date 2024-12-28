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
const getExtrainForDoctorById = async (doctorId) => {
    return (await axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)).data
}
const getProfileDoctorById = async (doctorId) => {
    return (await axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)).data
}
const postPatientBookAppointment = async (data) => {
    return (await axios.post(`/api/patient-book-appointment`, data)).data
}
const postVerifyBookAppointment = async (data) => {
    return (await axios.post(`/api/verify-book-appointment`, data)).data
}
const createNewSpecialty = async (data) => {
    return (await axios.post(`/api/create-new-specialty`, data)).data
}
const getAllSpecialty = async () => {
    return (await axios.get(`/api/get-specialty`)).data
}
const getDetialSpecialtyById = async (id, location) => {
    return (await axios.get(`/api/get-detail-specialty-by-id?id=${id}&location=${location}`)).data
}
const createNewClinic = async (data) => {
    return (await axios.post(`/api/create-new-clinic`, data)).data
}
const getAllClinic = async () => {
    return (await axios.get(`/api/get-clinic`)).data
}
const getDetialClinicById = async (id) => {
    return (await axios.get(`/api/get-detail-clinic-by-id?id=${id}`)).data
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
    getScheduleByDate,
    getExtrainForDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetialSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetialClinicById
}