import {CLEAR_PHOTO_STORE, DELETE_PHOTO, FETCH_PHOTOS_NAMES} from "./types";

const initialState = {
    photosNames: []
};

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_NAMES:
            let newPhotosNames = { ...state.photosNames };
            newPhotosNames[action.payload.detailsId] = action.payload;
            return { ...state, photosNames: newPhotosNames };
        case DELETE_PHOTO:
            return { ...state,
                photosNames: { ...state.photosNames,
                    [action.payload.detailsId]: { ...state.photosNames[action.payload.detailsId],
                        photosNames: state.photosNames[action.payload.detailsId].photosNames.filter(p => p !== action.payload.name) } } };
        case CLEAR_PHOTO_STORE:
            return initialState;
        default:
            return state;
    }
}