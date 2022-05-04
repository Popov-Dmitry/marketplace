import {takeEvery,all, put, call, delay} from 'redux-saga/effects'
import {
    ADD_PRODUCT_DETAILS_ID,
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
    REQUEST_PHOTOS_NAMES, REQUEST_REGISTRATION_USER, REQUEST_SAVE_CART, REQUEST_SAVE_PRODUCT,
    REQUEST_SEARCH_CLOTHES, REQUEST_UPDATE_CART, REQUEST_UPDATE_USER, REQUEST_USER_BY_EMAIL,
    SAVE_CART, SET_USER_ROLE, SHOW_ALERT, UPDATE_CART
} from "./types";
import {fetchCustomerByEmail, registrationCustomer, updateCustomer} from "../http/customerApi";
import {fetchSearchPanelInfo, saveClothes, searchClothes} from "../http/clothesProductApi";
import {fetchPhotosNames, uploadPhoto} from "../http/photoApi";
import {deleteCart, fetchCart, saveCart, updateCart} from "../http/cartApi";
import {login} from "../http/authApi";
import {CUSTOMER, SELLER} from "../utils/roles";
import {fetchSellerByEmail, registrationSeller, updateSeller} from "../http/sellerApi";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_AUTH, requestAuthWorker),
        takeEvery(REQUEST_USER_BY_EMAIL, requestUserByEmailWorker),
        takeEvery(REQUEST_AUTH_AND_FETCH_USER, requestAuthAndFetchUserWorker),
        takeEvery(REQUEST_REGISTRATION_USER, requestRegistrationUserWorker),
        takeEvery(REQUEST_UPDATE_USER, requestUpdateUser),
        takeEvery(REQUEST_ALERT, requestAlertWorker),
        takeEvery(REQUEST_CLOTHES_SEARCH_PANEL_INFO, requestSearchPanelInfoWorker),
        takeEvery(REQUEST_SEARCH_CLOTHES, requestSearchClothesWorker),
        takeEvery(REQUEST_PHOTOS_NAMES, requestPhotosNames),
        takeEvery(REQUEST_CART, requestCartWorker),
        takeEvery(REQUEST_DELETE_CART, requestDeleteCartWorker),
        takeEvery(REQUEST_UPDATE_CART, requestUpdateCartWorker),
        takeEvery(REQUEST_SAVE_CART, requestSaveCartWorker),
        takeEvery(REQUEST_SAVE_PRODUCT, requestSaveProductWorker)
    ]);
}

function* requestAuthWorker(action) {
    try {
        const payload = yield call(login, action.payload.email, action.payload.password, action.payload.userRole);
        localStorage.setItem("token", payload.headers.authorization.substring(6));
        yield put({ type: AUTH_USER , payload: true });
        yield put({ type: SET_USER_ROLE , payload: action.payload.userRole });
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
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestAuthAndFetchUserWorker(action) {
    try {
        const payload1 = yield call(login, action.payload.email, action.payload.password, action.payload.userRole);
        localStorage.setItem("token", payload1.headers.authorization.substring(6));
        yield put({ type: AUTH_USER , payload: true });
        let payload2;
        if (action.payload.userRole === CUSTOMER) {
            payload2 = yield call(fetchCustomerByEmail, action.payload.email);
        }
        if (action.payload.userRole === SELLER) {
            payload2 = yield call(fetchSellerByEmail, action.payload.email);
        }
        yield put({ type: FETCH_USER , payload: payload2 });
        yield put({ type: SET_USER_ROLE , payload: action.payload.userRole });
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

function* requestRegistrationUserWorker(action) {
    try {
        let payload1;
        if (action.payload.userRole === CUSTOMER) {
            payload1 = yield call(registrationCustomer, action.payload.user.firstName,
                action.payload.user.secondName, action.payload.user.email, action.payload.user.password, action.payload.user.sex,
                action.payload.user.birthDay, action.payload.user.birthMonth, action.payload.user.birthYear);
        }
        if (action.payload.userRole === SELLER) {
            payload1 = yield call(registrationSeller, action.payload.user.firstName, action.payload.user.secondName,
                action.payload.user.email, action.payload.user.password, action.payload.user.shopName,
                action.payload.user.country, action.payload.user.organizationType, action.payload.user.inn,
                action.payload.user.legalAddress);
        }
        yield put({type: FETCH_USER, payload: payload1});
        const payload2 = yield call(login, action.payload.user.email, action.payload.user.password, action.payload.userRole);
        localStorage.setItem("token", payload2.headers.authorization.substring(6));
        yield put({type: AUTH_USER, payload: true});
        yield put({ type: SET_USER_ROLE , payload: action.payload.userRole });
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

function* requestUpdateUser(action) {
    try {
        let payload;
        if (action.payload.userRole === CUSTOMER) {
            payload = yield call(updateCustomer, action.payload.user.id, action.payload.user.firstName,
                action.payload.user.secondName, action.payload.user.email, action.payload.user.password,
                action.payload.user.sex, action.payload.user.birthDay, action.payload.user.birthMonth, action.payload.user.birthYear);
        }
        if (action.payload.userRole === SELLER) {
            payload = yield call(updateSeller, action.payload.user.id, action.payload.user.firstName,
                action.payload.user.secondName, action.payload.user.email, action.payload.user.password,
                action.payload.user.shopName, action.payload.user.country,
                action.payload.user.organizationType, action.payload.user.legalAddress);
        }
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
                text: "Что-то пошло не так"
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

function* requestSaveProductWorker(action) {
    let detailsId = action.payload.detailsId;
    let id;
    try {
        if (action.payload.productType === "CLOTHES") {
            let resp;
            if (action.payload.detailsId) {
                resp = yield call(saveClothes, action.payload.product.color, action.payload.product.size,
                    action.payload.product.count, action.payload.product.regularPrice, null,
                    action.payload.product.weight, action.payload.detailsId, null, null, null, null, null,
                    null, null, null, null, null, action.payload.sellerId);
            }
            else {
                resp = yield call(saveClothes, action.payload.product.color, action.payload.product.size,
                    action.payload.product.count, action.payload.product.regularPrice, null, action.payload.product.weight,
                    null, action.payload.productDetails.brand, action.payload.productDetails.title,
                    action.payload.productDetails.description, action.payload.productDetails.composition,
                    action.payload.productDetails.category, action.payload.productDetails.season,
                    action.payload.productDetails.type, action.payload.productDetails.productionCountry,
                    action.payload.productDetails.care, action.payload.productDetails.style,
                    action.payload.sellerId);
                yield put({ type: ADD_PRODUCT_DETAILS_ID, payload: resp.clothesDetailsId });
                detailsId = resp.clothesDetailsId;
            }
            id = resp.clothesId;
        }
        let formData = new FormData();
        for (let photo in action.payload.photos) {
            formData.append("file", action.payload.photos[photo]);
        }
        yield call(uploadPhoto, action.payload.productType, detailsId, id, formData);
    }
    catch (e) {
        console.log(e);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
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
                text: "Что-то пошло не так"
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
                text: "Что-то пошло не так"
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
                text: "Что-то пошло не так"
            }
        });
    }
}