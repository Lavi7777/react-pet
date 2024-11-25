import { all } from 'redux-saga/effects';
import campaignsSaga from './campaignsSaga';

export default function* rootSaga() {
    yield all([
        campaignsSaga(), // Подключение саги для кампаний
    ]);
}
