import {$authHost} from "./index";
import {GET_ALL_SELLERS_INFO, GET_SELLER_INFO, GET_SELLER_INFO_COUNT, UPDATE_SELLER_INFO} from "../utils/endpoints";

export const fetchAllSellersInfo = async () => {
    const {data} = await $authHost.get(GET_ALL_SELLERS_INFO);
    return data;
}

export const fetchSellersInfoCount = async () => {
    const {data} = await $authHost.get(GET_SELLER_INFO_COUNT);
    return data;
}

export const fetchSellerInfoById = async (id) => {
    const {data} = await $authHost.get(GET_SELLER_INFO + id);
    return data;
}

export const updateSellerInfoById = async (id, verificationStatus, message) => {
    const {data} = await $authHost.post(UPDATE_SELLER_INFO + id, { verificationStatus, message });
    return data;
}