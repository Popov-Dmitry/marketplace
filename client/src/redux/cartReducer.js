import {DELETE_CART, FETCH_CART} from "./types";

const initialState = {
    info: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART:
            return { ...state, info: action.payload };
        case DELETE_CART:
            return { ...state, info: state.info.filter(value => value.id != action.payload) };
        default:
            return state;
    }
}