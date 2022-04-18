import {takeEvery,all, put, call, delay} from 'redux-saga/effects'
import {FETCH_USER, HIDE_ALERT, REQUEST_ALERT, REQUEST_USER, SHOW_ALERT} from "./types";
import {fetchCustomerById} from "../http/customerApi";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_USER, requestUserWorker),
        takeEvery(REQUEST_ALERT, requestAlertWorker)
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