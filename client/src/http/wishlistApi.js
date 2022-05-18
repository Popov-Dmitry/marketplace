import {$authHost} from "./index";
import {
    ADD_WISH, DELETE_WISH,
    GET_WISHLIST_BY_CUSTOMER_ID,
    GET_WISHLIST_BY_PRODUCT_DETAILS_ID, GET_WISHLIST_BY_PRODUCT_ID,
    GET_WISHLIST_BY_SELLER_ID
} from "../utils/endpoints";

export const saveWish = async (productType, productDetailsId, productId, customerId, sellerId) => {
    const {data} = await $authHost.post(ADD_WISH,
        { productType, productDetailsId, productId, customerId, sellerId });
    return data;
}

export const fetchWishlistByCustomerId = async (id) => {
    const {data} = await $authHost.get(GET_WISHLIST_BY_CUSTOMER_ID + id);
    return data;
}

export const fetchWishlistBySellerId = async (id) => {
    const {data} = await $authHost.get(GET_WISHLIST_BY_SELLER_ID + id);
    return data;
}

export const fetchWishlistByProductDetailsId = async (id) => {
    const {data} = await $authHost.get(GET_WISHLIST_BY_PRODUCT_DETAILS_ID + id);
    return data;
}

export const fetchWishlistByProductId = async (id) => {
    const {data} = await $authHost.get(GET_WISHLIST_BY_PRODUCT_ID + id);
    return data;
}

export const deleteWish = async (id) => {
    const {data} = await $authHost.get(DELETE_WISH + id);
    return data;
}