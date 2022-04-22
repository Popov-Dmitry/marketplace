import {FETCH_CART} from "./types";

const initialState = {
    products: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART:
            return { ...state, products: action.payload };
        default:
            return state;
    }
}