import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import campaignsReducer from '../features/campaignsSlice';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        campaigns: campaignsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware), // Исправление
});

sagaMiddleware.run(rootSaga);

export default store;
