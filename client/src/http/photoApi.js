import {$authHost, $host} from "./index";
import {ADD_PHOTO, GET_PHOTO, GET_PHOTOS_NAMES} from "../utils/endpoints";

export const uploadPhoto = async (productType, detailsId, id, multipartFile) => {
    const {data} = await $authHost.post(ADD_PHOTO, null, {
        params: { productType, detailsId, id, multipartFile }
    });
    return data;
}

export const fetchPhotosNames = async (productType, detailsId, id) => {
    const {data} = await $host.get(GET_PHOTOS_NAMES + productType + "/" + detailsId + "/" + id);
    return data;
}

export const fetchPhoto = async (productType, detailsId, id, name) => {
    const {data} = await $host.get(GET_PHOTO + productType + "/" + detailsId + "/" + id + "/" + name);
    return data;
}

export const deletePhoto = async (productType, detailsId, id, name) => {
    const {data} = await $authHost.delete(GET_PHOTO + productType + "/" + detailsId + "/" + id + "/" + name);
    return data;
}

export const deleteAllPhotosById = async (productType, detailsId, id) => {
    const {data} = await $authHost.delete(GET_PHOTO + productType + "/" + detailsId + "/" + id);
    return data;
}

export const deleteAllPhotosByDetailsId = async (productType, detailsId) => {
    const {data} = await $authHost.delete(GET_PHOTO + productType + "/" + detailsId);
    return data;
}