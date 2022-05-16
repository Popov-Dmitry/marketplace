import {$authHost} from "./index";
import {
    ADD_ADDRESS,
    DELETE_ADDRESS, GET_ADDRESS_BY_ID, GET_ADDRESSES_BY_CUSTOMER_ID,
    UPDATE_ADDRESS
} from "../utils/endpoints";

export const saveAddress = async (address, index, customerId, isMain) => {
    const {data} = await $authHost.post(ADD_ADDRESS,
        { address, index, customerId, isMain });
    return data;
}

export const fetchAddressById = async (id) => {
    const {data} = await $authHost.get(GET_ADDRESS_BY_ID + id);
    return data;
}

export const fetchAddressesByCustomerId = async (id, isMain) => {
    if (isMain === true) {
        const {data} = await $authHost.get(GET_ADDRESSES_BY_CUSTOMER_ID + id, { params: { isMain } });
        return data;
    }
    else {
        const {data} = await $authHost.get(GET_ADDRESSES_BY_CUSTOMER_ID + id);
        return data;
    }

}

export const updateAddress = async (id, address, index, customerId, isMain) => {
    const {data} = await $authHost.patch(UPDATE_ADDRESS + id,
        { address, index, customerId, isMain });
    return data;
}

export const deleteAddress = async (id) => {
    const {data} = await $authHost.delete(DELETE_ADDRESS + id);
    return data;
}