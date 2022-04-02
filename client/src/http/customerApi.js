import {$authHost, $host} from "./index";
import {ADD_CUSTOMER, GET_CUSTOMER, UPDATE_CUSTOMER} from "../utils/endpoints";

export const registrationCustomer = async (firstName, secondName, email, password) => {
    const {data} = await $host.post(ADD_CUSTOMER, {firstName, secondName, email, password});
    return data;
}

export const fetchCustomerById = async (id) => {
    const {data} = await $authHost.get(GET_CUSTOMER + id)
    return data;
}

export const updateCustomer = async (id, firstName, secondName, email, password) => {
    const {data} = await $authHost.patch(UPDATE_CUSTOMER + id, {firstName, secondName, email, password});
    return data;
}