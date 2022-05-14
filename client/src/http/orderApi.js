import {$authHost} from "./index";
import {
    ADD_ORDER,
    GET_CART,
    GET_ORDER_BY_CUSTOMER_ID,
    GET_ORDER_BY_ID, GET_ORDER_BY_PRODUCT_DETAILS_ID, GET_ORDER_BY_PRODUCT_ID,
    GET_ORDER_BY_SELLER_ID, UPDATE_ORDER_STATUS
} from "../utils/endpoints";

export const saveOrder = async (productDetailsId, productId, count, customerId, address, sellerId, productType, regularPrice, price) => {
    const {data} = await $authHost.post(ADD_ORDER,
        { productDetailsId, productId, count, customerId, address, sellerId, productType, regularPrice, price });
    return data;
}

export const fetchOrderById = async (id) => {
    const {data} = await $authHost.get(GET_ORDER_BY_ID + id);
    return data;
}

export const fetchOrdersByCustomerId = async (id) => {
    const {data} = await $authHost.get(GET_ORDER_BY_CUSTOMER_ID + id);
    return data;
}

export const fetchOrdersBySellerId = async (id) => {
    const {data} = await $authHost.get(GET_ORDER_BY_SELLER_ID + id);
    return data;
}

export const fetchOrdersByProductId = async (detailsId, id) => {
    const {data} = await $authHost.get(GET_ORDER_BY_PRODUCT_ID + detailsId + "/" + id);
    return data;
}

export const fetchOrdersByProductDetailsId = async (detailsId) => {
    const {data} = await $authHost.get(GET_ORDER_BY_PRODUCT_DETAILS_ID + detailsId);
    return data;
}

export const updateOrderStatus = async (id, status) => {
    const {data} = await $authHost.patch(UPDATE_ORDER_STATUS + id, { status });
    return data;
}