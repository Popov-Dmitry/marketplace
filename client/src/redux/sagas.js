import {takeEvery,all, put, call, delay} from 'redux-saga/effects'
import {
    DELETE_CART,
    FETCH_CART,
    FETCH_CLOTHES_SEARCH_PANEL_INFO,
    FETCH_PHOTOS_NAMES,
    FETCH_SEARCH_CLOTHES,
    FETCH_USER,
    HIDE_ALERT,
    REQUEST_ALERT,
    REQUEST_CART,
    REQUEST_CLOTHES_SEARCH_PANEL_INFO, REQUEST_DELETE_CART,
    REQUEST_PHOTOS_NAMES,
    REQUEST_SEARCH_CLOTHES,
    REQUEST_USER,
    SHOW_ALERT
} from "./types";
import {fetchCustomerById} from "../http/customerApi";
import {fetchSearchPanelInfo, searchClothes} from "../http/clothesProductApi";
import {fetchPhotosNames} from "../http/photoApi";
import {deleteCart, fetchCart} from "../http/cartApi";
import {showAlert} from "./actions";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_USER, requestUserWorker),
        takeEvery(REQUEST_ALERT, requestAlertWorker),
        takeEvery(REQUEST_CLOTHES_SEARCH_PANEL_INFO, requestSearchPanelInfoWorker),
        takeEvery(REQUEST_SEARCH_CLOTHES, requestSearchClothesWorker),
        takeEvery(REQUEST_PHOTOS_NAMES, requestPhotosNames),
        takeEvery(REQUEST_CART, requestCartWorker),
        takeEvery(REQUEST_DELETE_CART, requestDeleteCartWorker)
    ]);
}

function* requestUserWorker(action) {
    const payload = yield call(fetchCustomerById, action.payload.userId);
    yield put({ type: FETCH_USER , payload });
}

function* requestAlertWorker(action) {
    yield put({ type: SHOW_ALERT , payload: {
            variant: action.payload.variant,
            text: action.payload.text
    } });
    yield delay(3000);
    yield put({ type: HIDE_ALERT });
}

function* requestSearchPanelInfoWorker(action) {
    const payload = yield call(fetchSearchPanelInfo);
    yield put({ type: FETCH_CLOTHES_SEARCH_PANEL_INFO, payload });
}

function* requestSearchClothesWorker(action) {
    const payload = yield call(searchClothes, action.payload.colors, action.payload.sizes, action.payload.price,
        action.payload.brands, action.payload.title, action.payload.categories, action.payload.seasons, action.payload.types);
    yield put({ type: FETCH_SEARCH_CLOTHES, payload });
}

function* requestPhotosNames(action) {
    const photosNames = yield call(fetchPhotosNames, action.payload.productType, action.payload.detailsId, action.payload.id);
    const payload = {
        detailsId: action.payload.detailsId,
        id: action.payload.id,
        photosNames
    };
    yield put({ type: FETCH_PHOTOS_NAMES, payload });
}

function* requestCartWorker(action) {
    const payload = yield call(fetchCart, action.payload);
    yield put({ type: FETCH_CART , payload });
}

function* requestDeleteCartWorker(action) {
    try {
        yield call(deleteCart, action.payload);
        yield put({ type: DELETE_CART, payload: action.payload});
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Чтото пошлол не так"
            }
        });
    }
}