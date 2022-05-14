import {FETCH_ORDER, FETCH_ORDERS} from "./types";

const initialState = {
    orders: [],
    currentOrder: {}
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case FETCH_ORDER:
            return { ...state, currentOrder: action.payload };
        default:
            return state;
    }
}