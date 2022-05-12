import {FETCH_ORDERS} from "./types";

const initialState = {
    orders: []
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {...state, orders: action.payload};
        default:
            return state;
    }
}