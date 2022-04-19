import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {appReducer} from "./appReducer";
import {clothesReducer} from "./clothesReducer";

export const rootReducer = combineReducers({
    appReducer,
    userReducer,
    clothesReducer
})