import {AUTH_USER, FETCH_USER, SET_USER_ROLE} from "./types";

const initialState = {
    user: {},
    isAuth: false,
    userRole: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, isAuth: action.payload };
        case FETCH_USER:
            return { ...state, user: action.payload };
        case SET_USER_ROLE:
            return { ...state, userRole: action.payload };
        default:
            return state;
    }
}