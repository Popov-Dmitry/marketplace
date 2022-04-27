import {takeEvery,all, put, call, delay} from 'redux-saga/effects'
import {
    AUTH_USER,
    DELETE_CART,
    FETCH_CART,
    FETCH_CLOTHES_SEARCH_PANEL_INFO,
    FETCH_PHOTOS_NAMES,
    FETCH_SEARCH_CLOTHES, FETCH_USER,
    HIDE_ALERT,
    REQUEST_ALERT, REQUEST_AUTH, REQUEST_AUTH_AND_FETCH_USER,
    REQUEST_CART,
    REQUEST_CLOTHES_SEARCH_PANEL_INFO, REQUEST_DELETE_CART,
    REQUEST_PHOTOS_NAMES, REQUEST_REGISTRATION_CUSTOMER, REQUEST_SAVE_CART,
    REQUEST_SEARCH_CLOTHES, REQUEST_UPDATE_CART, REQUEST_UPDATE_CUSTOMER, REQUEST_USER_BY_EMAIL,
    SAVE_CART, SHOW_ALERT, UPDATE_CART
} from "./types";
import {fetchCustomerByEmail, registrationCustomer, updateCustomer} from "../http/customerApi";
import {fetchSearchPanelInfo, searchClothes} from "../http/clothesProductApi";
import {fetchPhotosNames} from "../http/photoApi";
import {deleteCart, fetchCart, saveCart, updateCart} from "../http/cartApi";
import {login} from "../http/authApi";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_AUTH, requestAuthWorker),
        takeEvery(REQUEST_USER_BY_EMAIL, requestUserByEmailWorker),
        takeEvery(REQUEST_AUTH_AND_FETCH_USER, requestAuthAndFetchUserWorker),
        takeEvery(REQUEST_REGISTRATION_CUSTOMER, requestRegistrationCustomerWorker),
        takeEvery(REQUEST_UPDATE_CUSTOMER, requestUpdateCustomer),
        takeEvery(REQUEST_ALERT, requestAlertWorker),
        takeEvery(REQUEST_CLOTHES_SEARCH_PANEL_INFO, requestSearchPanelInfoWorker),
        takeEvery(REQUEST_SEARCH_CLOTHES, requestSearchClothesWorker),
        takeEvery(REQUEST_PHOTOS_NAMES, requestPhotosNames),
        takeEvery(REQUEST_CART, requestCartWorker),
        takeEvery(REQUEST_DELETE_CART, requestDeleteCartWorker),
        takeEvery(REQUEST_UPDATE_CART, requestUpdateCartWorker),
        takeEvery(REQUEST_SAVE_CART, requestSaveCartWorker)
    ]);
}

function* requestAuthWorker(action) {
    try {
        const payload = yield call(login, action.payload.email, action.payload.password, action.payload.userRole);
        localStorage.setItem("token", payload.headers.authorization.substring(6));
        yield put({ type: AUTH_USER , payload: true });
    }
    catch (e) {
        console.log(e);
        yield put({ type: AUTH_USER , payload: false });
        if(e.response.status === 401) {
            yield put({
                type: REQUEST_ALERT,
                payload: {
                    variant: "danger",
                    text: "Неверный email или пароль"
                }
            });
        }
        else {
            yield put({
                type: REQUEST_ALERT,
                payload: {
                    variant: "danger",
                    text: e.response.request.response
                }
            });
        }
    }
}

function* requestUserByEmailWorker(action) {
    try {
        const payload = yield call(fetchCustomerByEmail, action.payload);
        yield put({ type: FETCH_USER , payload });
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошлол не так"
            }
        });
    }
}

function* requestAuthAndFetchUserWorker(action) {
    try {
        const payload1 = yield call(login, action.payload.email, action.payload.password, action.payload.userRole);
        localStorage.setItem("token", payload1.headers.authorization.substring(6));
        yield put({ type: AUTH_USER , payload: true });
        const payload2 = yield call(fetchCustomerByEmail, action.payload.email);
        yield put({ type: FETCH_USER , payload: payload2 });
    }
    catch (e) {
        console.log(e);
        yield put({ type: AUTH_USER , payload: false });
        if(e.response.status === 401) {
            yield put({
                type: REQUEST_ALERT,
                payload: {
                    variant: "danger",
                    text: "Неверный email или пароль"
                }
            });
        }
        else {
            yield put({
                type: REQUEST_ALERT,
                payload: {
                    variant: "danger",
                    text: e.response.request.response
                }
            });
        }
    }
}

function* requestRegistrationCustomerWorker(action) {
    try {
        const payload1 = yield call(registrationCustomer, action.payload.firstName,
            action.payload.secondName, action.payload.email, action.payload.password, action.payload.sex,
            action.payload.birthDay, action.payload.birthMonth, action.payload.birthYear);
        yield put({type: FETCH_USER, payload: payload1});
        const payload2 = yield call(login, action.payload.email, action.payload.password, "CUSTOMER");
        localStorage.setItem("token", payload2.headers.authorization.substring(6));
        yield put({type: AUTH_USER, payload: true});
    }
    catch (e) {
        console.log(e);
        yield put({type: AUTH_USER, payload: false});
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: e.response.request.response
            }
        });
    }
}

function* requestUpdateCustomer(action) {
    try {
        const payload = yield call(updateCustomer, action.payload.id, action.payload.firstName,
            action.payload.secondName, action.payload.email, action.payload.password, action.payload.sex,
            action.payload.birthDay, action.payload.birthMonth, action.payload.birthYear);
        yield put({ type: FETCH_USER , payload });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно обновлены"
            }
        });
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошлол не так"
            }
        });
    }
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
    try {
        const payload = yield call(fetchSearchPanelInfo);
        yield put({ type: FETCH_CLOTHES_SEARCH_PANEL_INFO, payload });
    }
    catch (e) {
        console.log(e);
    }
}

function* requestSearchClothesWorker(action) {
    try {
        const payload = yield call(searchClothes, action.payload.colors, action.payload.sizes, action.payload.price,
            action.payload.brands, action.payload.title, action.payload.categories, action.payload.seasons, action.payload.types);
        yield put({ type: FETCH_SEARCH_CLOTHES, payload });
    }
    catch (e) {
        console.log(e);
    }
}

function* requestPhotosNames(action) {
    try {
        const photosNames = yield call(fetchPhotosNames, action.payload.productType, action.payload.detailsId, action.payload.id);
        const payload = {
            detailsId: action.payload.detailsId,
            id: action.payload.id,
            photosNames
        };
        yield put({ type: FETCH_PHOTOS_NAMES, payload });
    }
    catch (e) {
        console.log(e)
    }
}

function* requestCartWorker(action) {
    try {
        const payload = yield call(fetchCart, action.payload);
        yield put({ type: FETCH_CART , payload });
    }
    catch (e) {
        console.log(e);
    }
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
                text: "Что-то пошлол не так"
            }
        });
    }
}

function* requestUpdateCartWorker(action) {
    try {
        const payload = yield call(updateCart, action.payload.cartId, action.payload.count);
        yield put({ type: UPDATE_CART, payload: payload});
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошлол не так"
            }
        });
    }
}

function* requestSaveCartWorker(action) {
    try {
        const payload = yield call(saveCart, action.payload.customerId, action.payload.productType,
            action.payload.productDetailsId, action.payload.productId, action.payload.count);
        yield put({ type: SAVE_CART, payload: payload});
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошлол не так"
            }
        });
    }
}