import { fork, all } from 'redux-saga/effects';
import DashboardSaga from './Saga/DashboardSaga';
import DemoSaga from './Saga/DemoSaga';
import ConstantSaga from './Saga/ConstantSaga';

function* rootSaga() {
    yield all([
        fork(DashboardSaga),
        fork(DemoSaga),
        fork(ConstantSaga),
    ]);
}

export default rootSaga