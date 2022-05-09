import {FETCH_ALL_SELLERS_INFO, FETCH_SELLER_INFO, FETCH_SELLERS_INFO_COUNT} from "./types";

const initState = {
    sellersInfoCount: 0,
    sellersInfo: [],
    currentInfo: null
}

export const moderReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_SELLERS_INFO_COUNT:
            return { ...state, sellersInfoCount: action.payload.count };
        case FETCH_ALL_SELLERS_INFO:
            return { ...state, sellersInfo: action.payload };
        case FETCH_SELLER_INFO:
            return { ...state, currentInfo: action.payload };
        default:
            return state;
    }
}