import {AUTH_USER, FETCH_USER, HIDE_ALERT, REQUEST_ALERT, SHOW_ALERT} from "./types";

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

export function showAlert(variant, text) {
    return {
        type: REQUEST_ALERT,
        payload: {variant, text}
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}