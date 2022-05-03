import {ADD_PRODUCT, ADD_PRODUCT_DETAILS} from "./types";

const initialState = {
    productDetails: {},
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_DETAILS:
            return { ...state, productDetails: action.payload };
        case ADD_PRODUCT:
            const newProducts = [ ...state.products ];
            newProducts.push(action.payload);
            return { ...state, products: newProducts };
        default:
            return state;
    }
}