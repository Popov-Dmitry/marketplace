import {DELETE_CART, FETCH_CART, UPDATE_CART} from "./types";

const initialState = {
    info: []
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART:
            return { ...state, info: action.payload };
        case DELETE_CART:
            return { ...state, info: state.info.filter(value => value.id != action.payload) };
        case UPDATE_CART:
            // const updatedInfo = [ ...state.info ];
            // updatedInfo.map(i => action.payload.id === i.id ? { ...i, count: action.payload.count} : i)
            return { ...state , info: state.info.map(i => action.payload.id === i.id ? { ...i, count: action.payload.count} : i)}
        default:
            return state;
    }
}