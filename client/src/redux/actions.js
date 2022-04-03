import {AUTH_USER, FETCH_USER} from "./types";

export function authUser(isAuth) {
    return {
        type: AUTH_USER,
        payload: isAuth
    }
}

export function fetchUser(user) {
    return {
        type: FETCH_USER,
        payload: user
    }
}