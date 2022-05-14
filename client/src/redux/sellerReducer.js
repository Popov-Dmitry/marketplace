import {FETCH_SELLER} from "./types";

const initialState= {
    currentSeller: null
}

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELLER:
            return { ...state, currentSeller: action.payload };
        default:
            return state;
    }
}