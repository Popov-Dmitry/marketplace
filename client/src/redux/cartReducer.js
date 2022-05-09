import {CLEAR_SELECTED_ITEMS, DELETE_CART, FETCH_CART, SAVE_CART, SELECT_ITEM, UPDATE_CART} from "./types";

const initialState = {
    info: [],
    selected: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_CART:
            const newInfo = [ ...state.info ];
            newInfo.push(action.payload);
            return { ...state, info: newInfo };
        case FETCH_CART:
            return { ...state, info: action.payload };
        case DELETE_CART:
            return { ...state, info: state.info.filter(value => value.id != action.payload) };
        case UPDATE_CART:
            return { ...state, info: state.info.map(i =>
                    action.payload.id === i.id ? { ...i, count: action.payload.count} : i)};
        case SELECT_ITEM:
            if (action.payload.checked === true) {
                const newSelected = [ ...state.selected ];
                newSelected.push(action.payload.cartId);
                return { ...state, selected: newSelected };
            }
            else {
                return { ...state, selected: [ ...state.selected ].filter(item => item !== action.payload.cartId) };
            }
        case CLEAR_SELECTED_ITEMS:
            return { ...state, selected: [] };
        default:
            return state;
    }
}