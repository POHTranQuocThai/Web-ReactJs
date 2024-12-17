import { toast } from "react-toastify"
import { userService } from "../../services/userService"
import actionTypes from "./actionTypes"

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            const res = await userService.getAllCodeService('gender')
            if (res && res.status === 'OK') {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllCodeService('position')
            if (res && res.status === 'OK') {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllCodeService('role')
            if (res && res.status === 'OK') {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.createNewUserService(data);
            if (res && res.status === 'OK') {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success(res.message)
            } else {
                dispatch(saveUserFailded())
            }
        } catch (error) {
            dispatch(saveUserFailded())
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.deleteUserService(userId);
            if (res && res.status === 'OK') {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success(res.message)
            } else {
                dispatch(deleteUserFailded())
            }
        } catch (error) {
            dispatch(deleteUserFailded())
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editUser = (userEdit) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.editUserService(userEdit);
            if (res && res.status === 'OK') {
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success(res.message)
            } else {
                dispatch(editUserFailded())
            }
        } catch (error) {
            dispatch(editUserFailded())
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllUser('All')
            if (res && res.status === 'OK') {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed())
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed())
        }
    }
}
export const fetchAllUsersSuccess = (allUsers) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: allUsers
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getTopDoctorHome()
            if (res && res.status === 'OK') {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.getAllDoctors()
            if (res && res.status === 'OK') {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }

        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}
export const saveDetailsDoctorAction = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await userService.saveDetailsDoctor(data)
            if (res && res.status === 'OK') {
                console.log('🚀 ~ return ~ res:', res)
                dispatch({
                    type: actionTypes.SAVE_DETAILS_DOCTOR_SUCCESS,
                })
                toast.success(res.message)
            } else {
                toast.error(res.message)
                dispatch({
                    type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED
                })
            }

        } catch (error) {
            toast.error(error)
            dispatch({
                type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED
            })
        }
    }
}