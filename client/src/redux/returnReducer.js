import {FETCH_RETURN, SET_CURRENT_ORDER_ID} from "./types";

const initialState = {
    ret: null,
    currentOrderId: null
}

export const returnReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RETURN:
            return { ...state, ret: action.payload };
        case SET_CURRENT_ORDER_ID:
            return { ...state, currentOrderId: action.payload };
        default:
            return state;
    }
}