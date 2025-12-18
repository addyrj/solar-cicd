/* eslint-disable require-yield */
import { put, takeEvery } from "redux-saga/effects"
import toast from "react-hot-toast"
import axios from "axios";
import { GET_DATA_FROM_SOURCE, SET_DATA_FROM_SOURCE, SET_FILTER_DATA } from "../Constant/DemoConstant";
import { getHeaderWithoutToken } from "../Utils";

function* getDataApi() {
    try {
        let response = yield axios.get("https://jsonplaceholder.typicode.com/comments", getHeaderWithoutToken);
        if (response.status === 200) {
            yield put({ type: SET_DATA_FROM_SOURCE, payload: response.data })
        }

    } catch (error) {
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}



function* DemoSaga() {
    yield takeEvery(GET_DATA_FROM_SOURCE, getDataApi)
}

export default DemoSaga