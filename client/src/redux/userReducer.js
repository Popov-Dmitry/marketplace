import {AUTH_USER, FETCH_USER} from "./types";

const initialState = {
    user: {},
    isAuth: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, isAuth: action.payload };
        case FETCH_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}