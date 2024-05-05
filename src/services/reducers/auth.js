
import {
    AUTH_REGISTRATION_IN_PROGRESS,
    AUTH_REGISTRATION_SUCCESS,
    AUTH_REGISTRATION_FAILED,

    AUTH_LOGIN_IN_PROGRESS,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,

    AUTH_LOGOUT_SUCCESS,

    AUTH_GET_USER_IN_PROGRESS,
    AUTH_GET_USER_SUCCESS,
    AUTH_GET_USER_FAILED,

    AUTH_UPDATE_USER_IN_PROGRESS,
    AUTH_UPDATE_USER_SUCCESS,
    AUTH_UPDATE_USER_FAILED,

    AUTH_FORGOT_PASSWORD_SUCCESS

} from '../actions/auth';
import { getCookie } from "../../utils/cookie";




const initialState = {
    error: false,
    login: !!getCookie('token'),
    // aToken: null,
    // rToken: null,
    user: {
        name: '',
        email: ''
    }
};



export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_REGISTRATION_IN_PROGRESS: {
            return {
                ...state

            };
        }
        case AUTH_REGISTRATION_SUCCESS: {
            return {
                ...state,
                error: false
            };
        }
        case AUTH_REGISTRATION_FAILED: {
            return {
                ...state,
                error: true
            };
        }

        case AUTH_LOGIN_IN_PROGRESS: {
            return {
                ...state,
                error: false,
                login: false
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            //console.log(action);
            return {
                ...state,
                error: false,
                login: true,
                user: action.user
            };
        }
        case AUTH_LOGIN_FAILED: {
            return {
                ...state,
                error: true,
                login: false
            };
        }
        case AUTH_LOGOUT_SUCCESS: {
            return {
                ...state,
                error: false,
                login: false,
                user: {
                    name: '',
                    email: ''
                }
            };
        }
        case AUTH_GET_USER_IN_PROGRESS: {
            return {
                ...state,
                error: false,
            };
        }

        case AUTH_GET_USER_SUCCESS: {
            return {
                ...state,
                error: false,
                login: true,
                user: action.user
            };
        }

        case AUTH_GET_USER_FAILED: {
            return {
                ...state,
                error: true,
                login: false
            };
        }

        case AUTH_UPDATE_USER_IN_PROGRESS: {
            return {
                ...state,
                error: false,
            };
        }

        case AUTH_UPDATE_USER_SUCCESS: {
            return {
                ...state,
                error: false,
                user: action.user
            };
        }

        case AUTH_UPDATE_USER_FAILED: {
            return {
                ...state,
                error: true,
            };
        }

        default:
            return state;
    }
}