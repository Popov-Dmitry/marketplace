import {ADD_PRODUCT, ADD_PRODUCT_DETAILS, ADD_PRODUCT_PHOTOS} from "./types";

const initialState = {
    productDetails: {},
    products: [],
    photos: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_DETAILS:
            return { ...state, productDetails: action.payload };
        case ADD_PRODUCT:
            const newProducts = [ ...state.products ];
            newProducts.push(action.payload);
            return { ...state, products: newProducts };
        case ADD_PRODUCT_PHOTOS:
            const newPhotos = [ ...state.photos ];
            newPhotos.push(action.payload);
            return { ...state, photos: newPhotos };
        default:
            return state;
    }
}