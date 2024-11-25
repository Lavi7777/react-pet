import { call, put, takeEvery } from 'redux-saga/effects';
import {
    fetchCampaignsStart,
    fetchCampaignsSuccess,
    fetchCampaignsError,
} from '../features/campaignsSlice';

function* fetchCampaignsSaga() {
    try {
        const response = yield call(fetch, 'https://674437ffb4e2e04abea14d68.mockapi.io/campaigns');
        const data = yield response.json();
        yield put(fetchCampaignsSuccess(data));
    } catch (error) {
        yield put(fetchCampaignsError(error.message));
    }
}

export default function* campaignsSaga() {
    yield takeEvery(fetchCampaignsStart.type, fetchCampaignsSaga);
}
