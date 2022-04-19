import {
    ADD_FILTER,
    AUTH_USER,
    FETCH_USER,
    HIDE_ALERT, REMOVE_FILTER,
    REQUEST_ALERT,
    REQUEST_FETCH_CLOTHES_SEARCH_PANEL_INFO
} from "./types";

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

export function fetchSearchPanelInfo() {
    return {
        type: REQUEST_FETCH_CLOTHES_SEARCH_PANEL_INFO
    }
}

export function addFilter(field, value) {
    return {
        type: ADD_FILTER,
        payload: { field, value }
    }
}

export function removeFilter(field, value) {
    return {
        type: REMOVE_FILTER,
        payload: { field, value }
    }
}