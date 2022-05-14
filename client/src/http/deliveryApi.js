import {$authHost} from "./index";
import {ADD_DELIVERY, GET_DELIVERIES_BY_SELLER_ID, GET_DELIVERY_BY_ID, UPDATE_DELIVERY} from "../utils/endpoints";

export const saveDelivery = async (deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
                                   departureIndex, returnIndex, packVariant, service, sellerId) => {
    const {data} = await $authHost.post(ADD_DELIVERY,
        { deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
            departureIndex, returnIndex, packVariant, service, sellerId });
    return data;
}

export const fetchDeliveryById = async (id) => {
    const {data} = await $authHost.get(GET_DELIVERY_BY_ID + id);
    return data;
}

export const fetchDeliveriesBySellerId = async (id) => {
    const {data} = await $authHost.get(GET_DELIVERIES_BY_SELLER_ID + id);
    return data;
}

export const updateDelivery = async (id, deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
                                     departureIndex, returnIndex, packVariant, service, sellerId) => {
    const {data} = await $authHost.patch(UPDATE_DELIVERY + id,
        { deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
            departureIndex, returnIndex, packVariant, service, sellerId });
    return data;
}