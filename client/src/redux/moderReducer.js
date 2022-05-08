import {FETCH_SELLERS_INFO_COUNT} from "./types";

const initState = {
    sellersInfoCount: 0,
    sellersInfo: []
}

export const moderReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_SELLERS_INFO_COUNT:
            return { ...state, sellersInfoCount: action.payload.count };
        default:
            return state;
    }
}