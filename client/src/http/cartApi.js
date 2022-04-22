import {$authHost} from "./index";
import {ADD_CART, DELETE_CART, GET_CART, UPDATE_CART} from "../utils/endpoints";

export const fetchCart = async (customerId) => {
    const {data} = await $authHost.get(GET_CART + customerId);
    return data;
}

export const saveCart = async (customerId, productType, productDetailsId, productId, count) => {
    const {data} = await $authHost.post(ADD_CART, { customerId, productType, productDetailsId, productId, count });
    return data;
}

export const updateCart = async (cartId, customerId, productType, productDetailsId, productId, count) => {
    const {data} = await $authHost.patch(UPDATE_CART + cartId,
        { customerId, productType, productDetailsId, productId, count });
    return data;
}

export const deleteCart = async (cartId) => {
    const {data} = await $authHost.delete(DELETE_CART + cartId);
    return data;
}