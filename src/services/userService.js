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
export const userService = {
    handleLogin,
    createNewUserService,
    getAllUser
}