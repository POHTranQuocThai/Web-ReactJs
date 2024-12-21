import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
                topDoctors: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                allDoctors: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            return {
                ...state,
                allScheduleTime: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
            state.allScheduleTime = []
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            console.log('🚀 ~ adminReducer ~ allRequiredDoctorInfor:', action.data)
            return {
                ...state,
                allRequiredDoctorInfor: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;