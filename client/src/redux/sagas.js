import {takeEvery,all, put, call, delay} from 'redux-saga/effects'
import {
    ADD_PRODUCT_DETAILS_ID,
    AUTH_USER, DELETE_ADDRESS,
    DELETE_CART,
    DELETE_CLOTHES,
    DELETE_CLOTHES_DETAILS,
    DELETE_PHOTO, FETCH_ADDRESS, FETCH_ADDRESSES,
    FETCH_ALL_SELLERS_INFO,
    FETCH_CART,
    FETCH_CLOTHES,
    FETCH_CLOTHES_SEARCH_PANEL_INFO, FETCH_CUSTOMER, FETCH_DELIVERIES, FETCH_DELIVERY, FETCH_MAIN_ADDRESS,
    FETCH_ORDER,
    FETCH_ORDERS,
    FETCH_PHOTOS_NAMES, FETCH_RETURN, FETCH_RUSSIAN_POST_DELIVERY, FETCH_SELLER,
    FETCH_SELLER_INFO,
    FETCH_SELLERS_INFO_COUNT,
    FETCH_USER,
    HIDE_ALERT, REQUEST_ADDRESS, REQUEST_ADDRESSES,
    REQUEST_ALERT,
    REQUEST_ALL_SELLERS_INFO,
    REQUEST_AUTH,
    REQUEST_AUTH_AND_FETCH_USER,
    REQUEST_CART,
    REQUEST_CLOTHES_BY_SELLER_ID,
    REQUEST_CLOTHES_SEARCH_PANEL_INFO, REQUEST_CUSTOMER, REQUEST_DELETE_ADDRESS,
    REQUEST_DELETE_CART,
    REQUEST_DELETE_CLOTHES,
    REQUEST_DELETE_CLOTHES_DETAILS,
    REQUEST_DELETE_PHOTO, REQUEST_DELIVERIES, REQUEST_DELIVERY,
    REQUEST_ORDER,
    REQUEST_ORDERS,
    REQUEST_PHOTOS_NAMES,
    REQUEST_REGISTRATION_USER, REQUEST_RUSSIAN_POST_DELIVERY, REQUEST_SAVE_ADDRESS,
    REQUEST_SAVE_CART, REQUEST_SAVE_DELIVERY,
    REQUEST_SAVE_ORDER,
    REQUEST_SAVE_PRODUCT, REQUEST_SAVE_RETURN,
    REQUEST_SEARCH_CLOTHES, REQUEST_SELLER,
    REQUEST_SELLER_INFO,
    REQUEST_SELLERS_INFO_COUNT, REQUEST_UPDATE_ADDRESS,
    REQUEST_UPDATE_CART,
    REQUEST_UPDATE_CLOTHES,
    REQUEST_UPDATE_CLOTHES_DETAILS, REQUEST_UPDATE_DELIVERY, REQUEST_UPDATE_ORDER_STATUS,
    REQUEST_UPDATE_SELLER_INFO,
    REQUEST_UPDATE_USER,
    REQUEST_UPLOAD_PHOTO,
    REQUEST_USER_BY_EMAIL, REQUEST_USER_BY_ID, SAVE_ADDRESS,
    SAVE_CART, SAVE_DELIVERY,
    SET_USER_ROLE,
    SHOW_ALERT, UPDATE_ADDRESS,
    UPDATE_CART,
    UPDATE_CLOTHES,
    UPDATE_CLOTHES_DETAILS, UPDATE_DELIVERY
} from "./types";
import {fetchCustomerByEmail, fetchCustomerById, registrationCustomer, updateCustomer} from "../http/customerApi";
import {
    deleteClothes, deleteClothesDetails,
    fetchClothesBySellerId,
    fetchSearchPanelInfo,
    saveClothes,
    searchClothes,
    updateClothes, updateClothesDetails
} from "../http/clothesProductApi";
import {
    deleteAllPhotosByDetailsId,
    deleteAllPhotosById,
    deletePhoto,
    fetchPhotosNames,
    uploadPhoto
} from "../http/photoApi";
import {deleteCart, fetchCart, saveCart, updateCart} from "../http/cartApi";
import {login} from "../http/authApi";
import {CUSTOMER, MODER, SELLER} from "../utils/roles";
import {fetchSellerByEmail, fetchSellerById, registrationSeller, updateSeller} from "../http/sellerApi";
import {fetchModerByEmail, fetchModerById} from "../http/moderApi";
import {
    fetchAllSellersInfo,
    fetchSellerInfoById,
    fetchSellersInfoCount,
    updateSellerInfoById
} from "../http/verificationApi";
import {
    fetchOrderById,
    fetchOrdersByCustomerId,
    fetchOrdersByProductDetailsId,
    fetchOrdersByProductId, fetchOrdersBySellerId,
    saveOrder, updateOrderStatus
} from "../http/orderApi";
import {fetchDeliveriesBySellerId, fetchDeliveryById, saveDelivery, updateDelivery} from "../http/deliveryApi";
import {saveReturn} from "../http/returnApi";
import {
    deleteAddress,
    fetchAddressById,
    fetchAddressesByCustomerId,
    saveAddress,
    updateAddress
} from "../http/addressApi";
import {fetchRussianPostDeliveryPrice} from "../http/russianPostApi";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_AUTH, requestAuthWorker),
        takeEvery(REQUEST_USER_BY_EMAIL, requestUserByEmailWorker),
        takeEvery(REQUEST_USER_BY_ID, requestUserByIdWorker),
        takeEvery(REQUEST_AUTH_AND_FETCH_USER, requestAuthAndFetchUserWorker),
        takeEvery(REQUEST_REGISTRATION_USER, requestRegistrationUserWorker),
        takeEvery(REQUEST_UPDATE_USER, requestUpdateUserWorker),
        takeEvery(REQUEST_ALERT, requestAlertWorker),
        takeEvery(REQUEST_CLOTHES_SEARCH_PANEL_INFO, requestSearchPanelInfoWorker),
        takeEvery(REQUEST_SEARCH_CLOTHES, requestSearchClothesWorker),
        takeEvery(REQUEST_CLOTHES_BY_SELLER_ID, requestClothesBySellerIdWorker),
        takeEvery(REQUEST_UPDATE_CLOTHES, requestUpdateClothesWorker),
        takeEvery(REQUEST_UPDATE_CLOTHES_DETAILS, requestUpdateClothesDetailsWorker),
        takeEvery(REQUEST_DELETE_CLOTHES, requestDeleteClothesWorker),
        takeEvery(REQUEST_DELETE_CLOTHES_DETAILS, requestDeleteClothesDetailsWorker),
        takeEvery(REQUEST_UPLOAD_PHOTO, requestUploadPhotoWorker),
        takeEvery(REQUEST_PHOTOS_NAMES, requestPhotosNamesWorker),
        takeEvery(REQUEST_DELETE_PHOTO, requestDeletePhotoWorker),
        takeEvery(REQUEST_CART, requestCartWorker),
        takeEvery(REQUEST_DELETE_CART, requestDeleteCartWorker),
        takeEvery(REQUEST_UPDATE_CART, requestUpdateCartWorker),
        takeEvery(REQUEST_SAVE_CART, requestSaveCartWorker),
        takeEvery(REQUEST_SAVE_PRODUCT, requestSaveProductWorker),
        takeEvery(REQUEST_SELLERS_INFO_COUNT, requestSellersInfoCountWorker),
        takeEvery(REQUEST_ALL_SELLERS_INFO, requestAllSellersInfoWorker),
        takeEvery(REQUEST_SELLER_INFO, requestSellerInfoWorker),
        takeEvery(REQUEST_UPDATE_SELLER_INFO, requestUpdateSellerInfoWorker),
        takeEvery(REQUEST_SAVE_ORDER, requestSaveOrderWorker),
        takeEvery(REQUEST_ORDERS, requestFetchOrdersWorker),
        takeEvery(REQUEST_ORDER, requestFetchOrderWorker),
        takeEvery(REQUEST_SELLER, requestSellerWorker),
        takeEvery(REQUEST_CUSTOMER, requestCustomerWorker),
        takeEvery(REQUEST_UPDATE_ORDER_STATUS, requestUpdateOrderStatusWorker),
        takeEvery(REQUEST_SAVE_DELIVERY, requestSaveDeliveryWorker),
        takeEvery(REQUEST_DELIVERY, requestDeliveryByIdWorker),
        takeEvery(REQUEST_DELIVERIES, requestDeliveriesBySellerIdWorker),
        takeEvery(REQUEST_UPDATE_DELIVERY, requestUpdateDeliveryWorker),
        takeEvery(REQUEST_RUSSIAN_POST_DELIVERY, requestRussianPostDeliveryWorker),
        takeEvery(REQUEST_SAVE_ADDRESS, requestSaveAddressWorker),
        takeEvery(REQUEST_ADDRESS, requestAddressByIdWorker),
        takeEvery(REQUEST_ADDRESSES, requestAddressesByCustomerIdWorker),
        takeEvery(REQUEST_UPDATE_ADDRESS, requestUpdateAddressWorker),
        takeEvery(REQUEST_DELETE_ADDRESS, requestDeleteAddressWorker),
        takeEvery(REQUEST_SAVE_RETURN, requestSaveReturnWorker)
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

function* requestUserByIdWorker(action) {
    try {
        let payload;
        if (action.payload.userRole === CUSTOMER) {
            payload = yield call(fetchCustomerById, action.payload.id);
        }
        if (action.payload.userRole === SELLER) {
            payload = yield call(fetchSellerById, action.payload.id);
        }
        if (action.payload.userRole === MODER) {
            payload = yield call(fetchModerById, action.payload.id);
        }
        yield put({ type: FETCH_USER , payload });
        yield put({ type: AUTH_USER , payload: true });
    }
    catch (e) {
        console.log(e);
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
        if (action.payload.userRole === MODER) {
            payload2 = yield call(fetchModerByEmail, action.payload.email);
        }
        localStorage.setItem("userId", payload2.id);
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

function* requestUpdateUserWorker(action) {
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

function* requestSearchPanelInfoWorker() {
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
        const payload = yield call(searchClothes, action.payload.colors, action.payload.sizes,
            action.payload.price ? action.payload.price.trim() : null, action.payload.brands,
            action.payload.title, action.payload.categories, action.payload.seasons, action.payload.types);
        yield put({ type: FETCH_CLOTHES, payload });
    }
    catch (e) {
        console.log(e);
    }
}

function* requestClothesBySellerIdWorker(action) {
    try {
        const resp = yield call(fetchClothesBySellerId, action.payload);
        yield put({ type: FETCH_CLOTHES, payload: resp});
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

function* requestUpdateClothesWorker(action) {
    try {
        const resp = yield call(updateClothes, action.payload.clothesDetailsId, action.payload.clothesId,
            action.payload.color, action.payload.size, action.payload.count, action.payload.regularPrice,
            (action.payload.price !== "" && action.payload.price > 0) ? action.payload.price : null ,
            action.payload.weight, action.payload.deliveryId);
        yield put({ type: UPDATE_CLOTHES, payload: { clothesDetailsId: action.payload.clothesDetailsId, clothes: resp }});
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

function* requestUpdateClothesDetailsWorker(action) {
    try {
        const resp = yield call(updateClothesDetails, action.payload.clothesDetailsId, action.payload.brand,
            action.payload.title, action.payload.description, action.payload.composition, action.payload.category,
            action.payload.season, action.payload.type, action.payload.productionCountry, action.payload.care,
            action.payload.style, null);
        yield put({ type: UPDATE_CLOTHES_DETAILS, payload: { clothesDetailsId: action.payload.clothesDetailsId, clothes: resp }});
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
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestDeleteClothesWorker(action) {
    try {
        yield call(deleteClothes, action.payload.clothesDetailsId, action.payload.clothesId);
        yield call(deleteAllPhotosById, "CLOTHES", action.payload.clothesDetailsId, action.payload.clothesId);
        yield put({
            type: DELETE_CLOTHES,
            payload: {
                clothesDetailsId: action.payload.clothesDetailsId,
                clothesId: action.payload.clothesId
            }
        });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно удалены"
            }
        });
    }
    catch (e) {
        console.log(e);
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestDeleteClothesDetailsWorker(action) {
    try {
        yield call(deleteClothesDetails, action.payload);
        yield call(deleteAllPhotosByDetailsId, "CLOTHES", action.payload);
        yield put({ type: DELETE_CLOTHES_DETAILS, payload: action.payload });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно удалены"
            }
        });
    }
    catch (e) {
        console.log(e);
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestPhotosNamesWorker(action) {
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
        console.log(e);
    }
}

function* requestDeletePhotoWorker(action) {
    try {
        yield call(deletePhoto, action.payload.productType, action.payload.detailsId, action.payload.id, action.payload.name);
        yield put({ type: DELETE_PHOTO, payload: { detailsId: action.payload.detailsId, name: action.payload.name } });
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

function* requestUploadPhotoWorker(action) {
    try {
        let formData = new FormData();
        for (let photo in action.payload.photos) {
            formData.append("file", action.payload.photos[photo]);
        }
        yield call(uploadPhoto, action.payload.productType, action.payload.detailsId, action.payload.id, formData);
        const photosNames = yield call(fetchPhotosNames, action.payload.productType, action.payload.detailsId, action.payload.id);
        const payload = {
            detailsId: action.payload.detailsId,
            id: action.payload.id,
            photosNames
        };
        yield put({ type: FETCH_PHOTOS_NAMES, payload });
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

function* requestSaveProductWorker(action) {
    let detailsId = action.payload.detailsId;
    let id;
    try {
        if (action.payload.productType === "CLOTHES") {
            let resp;
            if (action.payload.detailsId) {
                resp = yield call(saveClothes, action.payload.product.color, action.payload.product.size,
                    action.payload.product.count, action.payload.product.regularPrice, null,
                    action.payload.product.weight, action.payload.product.deliveryId, action.payload.detailsId,
                    null, null, null, null, null, null, null, null, null, null, action.payload.sellerId);
            }
            else {
                resp = yield call(saveClothes, action.payload.product.color, action.payload.product.size,
                    action.payload.product.count, action.payload.product.regularPrice, null, action.payload.product.weight,
                    action.payload.product.deliveryId, null, action.payload.productDetails.brand,
                    action.payload.productDetails.title, action.payload.productDetails.description,
                    action.payload.productDetails.composition, action.payload.productDetails.category,
                    action.payload.productDetails.season, action.payload.productDetails.type,
                    action.payload.productDetails.productionCountry, action.payload.productDetails.care,
                    action.payload.productDetails.style, action.payload.sellerId);
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
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Информация успешно сохранена"
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
        yield put({ type: DELETE_CART, payload: action.payload });
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
        yield put({ type: UPDATE_CART, payload });
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
        yield put({ type: SAVE_CART, payload });
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

function* requestSellersInfoCountWorker() {
    try {
        const payload = yield call(fetchSellersInfoCount);
        yield put({ type: FETCH_SELLERS_INFO_COUNT, payload });
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

function* requestAllSellersInfoWorker() {
    try {
        const payload = yield call(fetchAllSellersInfo);
        yield put({ type: FETCH_ALL_SELLERS_INFO, payload });
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

function* requestSellerInfoWorker(action) {
    try {
        const payload = yield call(fetchSellerInfoById, action.payload);
        yield put({ type: FETCH_SELLER_INFO, payload });
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

function* requestUpdateSellerInfoWorker(action) {
    try {
        yield call(updateSellerInfoById, action.payload.id, action.payload.verificationStatus, action.payload.message);
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

function* requestSaveOrderWorker(action) {
    try {
        yield call(saveOrder, action.payload.productDetailsId, action.payload.productId, action.payload.count,
            action.payload.customerId, action.payload.address, action.payload.sellerId, action.payload.productType,
            action.payload.regularPrice, action.payload.price);
        yield call(deleteCart, action.payload.cartId);
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

function* requestFetchOrdersWorker(action) {
    try {
        let payload;
        if (action.payload.fetchBy === CUSTOMER) {
            payload = yield call(fetchOrdersByCustomerId, action.payload.id);
        }
        if (action.payload.fetchBy === SELLER) {
            payload = yield call(fetchOrdersBySellerId, action.payload.id);
        }
        if (action.payload.fetchBy === "productId") {
            payload = yield call(fetchOrdersByProductId, action.payload.id);
        }
        if (action.payload.fetchBy === "productDetails") {
            payload = yield call(fetchOrdersByProductDetailsId, action.payload.id);
        }
        yield put({ type: FETCH_ORDERS, payload });
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

function* requestFetchOrderWorker(action) {
    try {
        const payload = yield call(fetchOrderById, action.payload);
        yield put({ type: FETCH_ORDER, payload });
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

function* requestSellerWorker(action) {
    try {
        const payload = yield call(fetchSellerById, action.payload);
        yield put({ type: FETCH_SELLER, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestCustomerWorker(action) {
    try {
        const payload = yield call(fetchCustomerById, action.payload);
        yield put({ type: FETCH_CUSTOMER, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestUpdateOrderStatusWorker(action) {
    try {
        const payload = yield call(updateOrderStatus, action.payload.id, action.payload.newStatus);
        yield put({ type: FETCH_ORDER, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestSaveDeliveryWorker(action) {
    try {
        const payload = yield call(saveDelivery, action.payload.deliveryVariant, action.payload.deliveryPriceIncluded,
            action.payload.deliveryPrice, action.payload.deliveryPriceVariant.length > 0 ? action.payload.deliveryPriceVariant : null,
            action.payload.departureIndex.length > 0 ? action.payload.departureIndex : null,
            action.payload.returnIndex.length > 0 ? action.payload.returnIndex : null,
            action.payload.packVariant.length > 0 ? action.payload.packVariant : null,
            action.payload.service.length > 0 ? action.payload.service : null, action.payload.sellerId);
        yield put({ type: SAVE_DELIVERY, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestDeliveryByIdWorker(action) {
    try {
        const payload = yield call(fetchDeliveryById, action.payload);
        yield put({ type: FETCH_DELIVERY, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestDeliveriesBySellerIdWorker(action) {
    try {
        const payload = yield call(fetchDeliveriesBySellerId, action.payload);
        yield put({ type: FETCH_DELIVERIES, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestUpdateDeliveryWorker(action) {
    try {
        const payload = yield call(updateDelivery, action.payload.id, action.payload.deliveryVariant, action.payload.deliveryPriceIncluded,
            action.payload.deliveryPrice, action.payload.deliveryPriceVariant.length > 0 ? action.payload.deliveryPriceVariant : null,
            action.payload.departureIndex.length > 0 ? action.payload.departureIndex : null,
            action.payload.returnIndex.length > 0 ? action.payload.returnIndex : null,
            action.payload.packVariant.length > 0 ? action.payload.packVariant : null,
            action.payload.service.length > 0 ? action.payload.service : null, action.payload.sellerId);
        yield put({ type: UPDATE_DELIVERY, payload });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно обновлены"
            }
        });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestRussianPostDeliveryWorker(action) {
    try {
        const payload = yield call(fetchRussianPostDeliveryPrice, action.payload.from, action.payload.to,
            action.payload.weight, action.payload.pack, action.payload.ret, action.payload.price, action.payload.service);
        yield put({ type: FETCH_RUSSIAN_POST_DELIVERY, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestSaveAddressWorker(action) {
    try {
        const payload = yield call(saveAddress, action.payload.address, action.payload.index,
            action.payload.customerId, action.payload.isMain);
        yield put({ type: SAVE_ADDRESS, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestAddressByIdWorker(action) {
    try {
        const payload = yield call(fetchAddressById, action.payload.id);
        yield put({ type: FETCH_ADDRESS, payload });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestAddressesByCustomerIdWorker(action) {
    try {
        const payload = yield call(fetchAddressesByCustomerId, action.payload.id,
            action.payload.hasOwnProperty("isMain") ? action.payload.isMain : false);

        if (action.payload.hasOwnProperty("isMain")) {
            yield put({ type: FETCH_ADDRESS, payload: payload[0] });
        }
        else {
            yield put({ type: FETCH_ADDRESSES, payload });
        }
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestUpdateAddressWorker(action) {
    try {
        const payload = yield call(updateAddress, action.payload.id, action.payload.address, action.payload.index,
            action.payload.customerId, action.payload.isMain);
        yield put({ type: UPDATE_ADDRESS, payload });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно обновлены"
            }
        });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}

function* requestDeleteAddressWorker(action) {
    try {
        yield call(deleteAddress, action.payload);
        yield put({ type: DELETE_ADDRESS, payload: action.payload });
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "success",
                text: "Данные успешно удалены"
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

function* requestSaveReturnWorker(action) {
    try {
        const payload1 = yield call(saveReturn, action.payload.reason, action.payload.description, action.payload.orderId);
        yield put({ type: FETCH_RETURN, payload: payload1 });
        const payload2 = yield call(fetchOrderById, action.payload.orderId);
        yield put({ type: FETCH_ORDER, payload: payload2 });
    }
    catch (e) {
        console.log(e.response.request.response);
        yield put({
            type: REQUEST_ALERT,
            payload: {
                variant: "danger",
                text: "Что-то пошло не так"
            }
        });
    }
}