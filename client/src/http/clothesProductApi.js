import {$authHost, $host} from "./index";
import {
    ADD_CLOTHES,
    DELETE_CLOTHES,
    GET_CLOTHES,
    SEARCH_CLOTHES,
    SEARCH_CLOTHES_PANEL_INFO,
    UPDATE_CLOTHES
} from "../utils/endpoints";

export const fetchClothes = async (clothesDetailsId, clothesId) => {
    const {data} = await $host.get(GET_CLOTHES + clothesDetailsId + "/" + clothesId);
    return data;
}

export const fetchAllClothesByClothesDetailsId = async (clothesDetailsId) => {
    const {data} = await $host.get(GET_CLOTHES + clothesDetailsId);
    return data;
}

export const saveClothes = async (color, size, count, price, clothesDetailsId, brand, title,
                                  description, composition, category, season, type) => {
    const {data} = await $authHost.post(ADD_CLOTHES,
        { color, size, count, price, brand, title, description, composition, category, season, type });
    return data;
}

export const updateClothes = async (clothesDetailsId, clothesId, color, size, count, price) => {
    const {data} = await $authHost.patch(UPDATE_CLOTHES + clothesDetailsId + "/" + clothesId,
        { color, size, count, price });
    return data;
}

export const saveClothesDetails = async (clothesDetailsId, brand, title, description, composition, category, season, type) => {
    const {data} = await $authHost.patch(UPDATE_CLOTHES + clothesDetailsId,
        { brand, title, description, composition, category, season, type });
    return data;
}

export const deleteClothes = async (clothesDetailsId) => {
    const {data} = await $authHost.delete(DELETE_CLOTHES + clothesDetailsId);
    return data;
}

export const deleteClothesDetails = async (clothesDetailsId, clothesId) => {
    const {data} = await $authHost.delete(DELETE_CLOTHES + clothesDetailsId + "/" + clothesId);
    return data;
}

export const searchClothes = async (colors, sizes, price, brands, title, categories, seasons, types) => {
    const {data} = await $host.post(SEARCH_CLOTHES,
        { colors, sizes, price, brands, title, categories, seasons, types });
    return data;
}

export const fetchSearchPanelInfo = async () => {
    const {data} = await $host.get(SEARCH_CLOTHES_PANEL_INFO);
    return data;
}

