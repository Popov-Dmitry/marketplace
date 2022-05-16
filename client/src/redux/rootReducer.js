import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {appReducer} from "./appReducer";
import {clothesReducer} from "./clothesReducer";
import {photoReducer} from "./photoReducer";
import {cartReducer} from "./cartReducer";
import {productReducer} from "./productReducer";
import {moderReducer} from "./moderReducer";
import {orderReducer} from "./orderReducer";
import {sellerReducer} from "./sellerReducer";
import {deliveryReducer} from "./deliveryReducer";
import {returnReducer} from "./returnReducer";

export const rootReducer = combineReducers({
    appReducer,
    userReducer,
    clothesReducer,
    photoReducer,
    cartReducer,
    productReducer,
    moderReducer,
    orderReducer,
    sellerReducer,
    deliveryReducer,
    returnReducer
})