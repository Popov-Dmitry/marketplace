import {FETCH_CLOTHES_SEARCH_PANEL_INFO} from "./types";

const initialState = {
    searchPanelInfo: null
};

export const clothesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLOTHES_SEARCH_PANEL_INFO:
            return { ...state, searchPanelInfo: action.payload };
        default:
            return state;
    }
}