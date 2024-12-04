import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchCampaigns, fetchCampaignsStart, fetchCampaignsSuccess, fetchCampaignsFailure } from '../features/campaignsSlice';

function* fetchCampaignsSaga() {
    try {
        // Загрузка данных
        const response = yield call(fetch, 'http://localhost:5244/AffiliateCampaign/GetList');
        const data = yield response.json();

        // Диспатч успешного получения данных
        yield put(fetchCampaignsSuccess(data));
    } catch (error) {
        // Диспатч ошибки, если запрос не удался
        yield put(fetchCampaignsFailure(error.message));
    }
}

// Следим за экшеном fetchCampaigns, чтобы запускать этот сагу
function* campaignsSaga() {
    yield takeLatest(fetchCampaigns, fetchCampaignsSaga);
}

export default campaignsSaga;
