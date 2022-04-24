import {
    ADD_FILTER,
    AUTH_USER,
    FETCH_USER,
    HIDE_ALERT,
    REMOVE_FILTER,
    REQUEST_ALERT,
    REQUEST_CART,
    REQUEST_CLOTHES_SEARCH_PANEL_INFO,
    REQUEST_DELETE_CART,
    REQUEST_PHOTOS_NAMES, REQUEST_SAVE_CART,
    REQUEST_SEARCH_CLOTHES, REQUEST_UPDATE_CART, SELECT_ITEM
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
        type: REQUEST_CLOTHES_SEARCH_PANEL_INFO
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

export function fetchSearchClothes(filter) {
    return {
        type: REQUEST_SEARCH_CLOTHES,
        payload: {
            colors: filter.colors,
            sizes: filter.sizes,
            price: filter.price,
            brands: filter.brands,
            title: filter.title,
            categories: filter.categories,
            seasons: filter.seasons,
            types: filter.types
        }
    }
}

export function fetchPhotosNames(productType, detailsId, id) {
    return {
        type: REQUEST_PHOTOS_NAMES,
        payload: { productType, detailsId, id }
    }
}

export function fetchCart(customerId) {
    return {
        type: REQUEST_CART,
        payload: customerId
    }
}

export function deleteCart(cartId) {
    return {
        type: REQUEST_DELETE_CART,
        payload: cartId
    }
}

export function updateCart(cartId, count) {
    return {
        type: REQUEST_UPDATE_CART,
        payload: { cartId, count }
    }
}

export function selectItemCart(cartId, checked) {
    return {
        type: SELECT_ITEM,
        payload: { cartId, checked }
    }
}

export function saveCart(customerId, productType, productDetailsId, productId, count) {
    return {
        type: REQUEST_SAVE_CART,
        payload: { customerId, productType, productDetailsId, productId, count }
    }
}