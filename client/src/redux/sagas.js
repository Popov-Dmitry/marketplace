import {takeEvery,all, put, call} from 'redux-saga/effects'
import {FETCH_USER, REQUEST_USER} from "./types";
import {fetchCustomerById} from "../http/customerApi";

export function* watchAll() {
    yield all([
        takeEvery(REQUEST_USER, requestUserWorker)
    ])
}

function* requestUserWorker(action) {
    const payload = yield call(fetchCustomerById, action.payload.userId)
    yield put({ type: FETCH_USER , payload })
}