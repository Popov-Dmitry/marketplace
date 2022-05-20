import {CLEAR_SELLERS, FETCH_SELLER} from "./types";

const initialState= {
    currentSeller: null,
    sellers: []
}

export const sellerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELLER:
            const newSellers = [ ...state.sellers ];
            newSellers.push(action.payload);
            return { ...state, currentSeller: action.payload, sellers: newSellers };
        case CLEAR_SELLERS:
            return { ...state, sellers: [] };
        default:
            return state;
    }
}