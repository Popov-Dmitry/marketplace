import {ADD_PRODUCT, ADD_PRODUCT_DETAILS, ADD_PRODUCT_DETAILS_ID, ADD_PRODUCT_PHOTOS} from "./types";

const initialState = {
    productDetails: {},
    detailsId: null,
    product: {},
    photos: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_DETAILS:
            return { ...state, productDetails: action.payload };
        case ADD_PRODUCT_DETAILS_ID:
            return { ...state, detailsId: action.payload };
        case ADD_PRODUCT:
            return { ...state, product: action.payload };
        case ADD_PRODUCT_PHOTOS:
            return { ...state, photos: action.payload };
        default:
            return state;
    }
}