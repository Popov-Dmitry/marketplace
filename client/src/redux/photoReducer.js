import {FETCH_PHOTOS_NAMES} from "./types";

const initialState = {
    photosNames: []
};

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_NAMES:
            let newPhotosNames = { ...state.photosNames };
            newPhotosNames[action.payload.detailsId] = action.payload;
            return { ...state, photosNames: newPhotosNames };
        default:
            return state;
    }
}