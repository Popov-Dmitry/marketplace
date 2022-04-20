import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {appReducer} from "./appReducer";
import {clothesReducer} from "./clothesReducer";
import {photoReducer} from "./photoReducer";

export const rootReducer = combineReducers({
    appReducer,
    userReducer,
    clothesReducer,
    photoReducer
})