import {FETCH_ALL_SELLERS_INFO, FETCH_SELLERS_INFO_COUNT} from "./types";

const initState = {
    sellersInfoCount: 0,
    sellersInfo: []
}

export const moderReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_SELLERS_INFO_COUNT:
            return { ...state, sellersInfoCount: action.payload.count };
        case FETCH_ALL_SELLERS_INFO:
            return { ...state, sellersInfo: action.payload };
        default:
            return state;
    }
}