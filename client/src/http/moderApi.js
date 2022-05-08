import {$authHost, $host} from "./index";
import {ADD_MODER, GET_MODER, GET_SELLER, UPDATE_MODER} from "../utils/endpoints";

export const addModer = async (firstName, secondName, email, password) => {
    const {data} = await $host.post(ADD_MODER,
        { firstName, secondName, email, password });
    return data;
}

export const fetchModerById = async (id) => {
    const {data} = await $authHost.get(GET_MODER + id)
    return data;
}

export const updateModer = async (id, firstName, secondName, email, password) => {
    const {data} = await $authHost.patch(UPDATE_MODER + id,
        { firstName, secondName, email, password });
    return data;
}

export const deleteModer = async (id) => {
    const {data} = await $authHost.delete(GET_SELLER + id)
    return data;
}