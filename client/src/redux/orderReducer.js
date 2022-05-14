import {FETCH_CUSTOMER, FETCH_ORDER, FETCH_ORDERS} from "./types";

const initialState = {
    orders: [],
    currentOrder: {},
    currentCustomer: {}
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return { ...state, orders: action.payload };
        case FETCH_ORDER:
            return { ...state, currentOrder: action.payload };
        case FETCH_CUSTOMER:
            return { ...state, currentCustomer: action.payload };
        default:
            return state;
    }
}