import {$authHost, $host} from "./index";
import {ADD_MODER, DELETE_MODER, GET_MODER, UPDATE_MODER} from "../utils/endpoints";

export const addModer = async (firstName, secondName, email, password) => {
    const {data} = await $host.post(ADD_MODER,
        { firstName, secondName, email, password });
    return data;
}

export const fetchModerById = async (id) => {
    const {data} = await $authHost.get(GET_MODER + id)
    return data;
}

export const fetchModerByEmail = async (email) => {
    const {data} = await $authHost.get(GET_MODER, {
        params: {
            e:email
        }
    })
    return data;
}

export const updateModer = async (id, firstName, secondName, email, password) => {
    const {data} = await $authHost.patch(UPDATE_MODER + id,
        { firstName, secondName, email, password });
    return data;
}

export const deleteModer = async (id) => {
    const {data} = await $authHost.delete(DELETE_MODER + id)
    return data;
}