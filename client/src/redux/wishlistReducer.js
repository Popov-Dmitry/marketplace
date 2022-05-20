import {DELETE_WISH, FETCH_WISHLIST, SAVE_WISH} from "./types";

const initialState = {
    wishlist: []
}

export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WISH:
            const newWishlist = [ ...state.wishlist ];
            newWishlist.push(action.payload);
            return { ...state, wishlist: newWishlist };
        case FETCH_WISHLIST:
            return { ...state, wishlist: action.payload };
        case DELETE_WISH:
            return { ...state, wishlist: state.wishlist.filter(wish => wish.id !== action.payload) };
        default:
            return state;
    }
}