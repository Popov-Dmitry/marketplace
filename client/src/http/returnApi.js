import {$authHost} from "./index";
import {ADD_RETURN, GET_ORDER_BY_ID, GET_RETURN_BY_ID} from "../utils/endpoints";

export const saveReturn = async (reason, description, orderId) => {
    const {data} = await $authHost.post(ADD_RETURN,
        { reason, description, orderId });
    return data;
}

export const fetchReturnById = async (id) => {
    const {data} = await $authHost.get(GET_RETURN_BY_ID + id);
    return data;
}

export const fetchReturnByOrderId = async (id) => {
    const {data} = await $authHost.get(GET_ORDER_BY_ID + id + "/returns");
    return data;
}