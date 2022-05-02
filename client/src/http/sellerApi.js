import {$authHost, $host} from "./index";
import {ADD_SELLER, GET_SELLER, UPDATE_SELLER} from "../utils/endpoints";

export const registrationSeller = async (firstName, secondName, email, password, shopName, country, organizationType, inn, legalAddress) => {
    const {data} = await $host.post(ADD_SELLER,
        {firstName, secondName, email, password, shopName, country, organizationType, inn, legalAddress});
    return data;
}

export const fetchSellerById = async (id) => {
    const {data} = await $authHost.get(GET_SELLER + id)
    return data;
}

export const fetchSellerByEmail = async (email) => {
    const {data} = await $authHost.get(GET_SELLER, {
        params: {
            e:email
        }
    })
    return data;
}

export const updateSeller = async (id, firstName, secondName, email, password, shopName, country, organizationType, inn, legalAddress) => {
    const {data} = await $authHost.patch(UPDATE_SELLER + id,
        {firstName, secondName, email, password, shopName, country, organizationType, inn, legalAddress});
    return data;
}