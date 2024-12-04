import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
    items: [],
    loading: false,
    error: null,
};

// Создание слайса для кампаний
const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {
        fetchCampaignsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCampaignsSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchCampaignsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCampaignById: (state, action) => {
            const campaignId = action.payload;
            const campaign = state.items.find(c => c.id === campaignId);
            return campaign ? { ...state, selectedCampaign: campaign } : state;
        },
        updateCampaign: (state, action) => {
            const updatedCampaign = action.payload;
            state.items = state.items.map((campaign) =>
                campaign.id === updatedCampaign.id ? updatedCampaign : campaign
            );
        },
    },
});

// Экшены
export const {
    fetchCampaignsStart,
    fetchCampaignsSuccess,
    fetchCampaignsFailure,
    fetchCampaignById,
    updateCampaign,
} = campaignsSlice.actions;

// Асинхронные экшены с использованием Redux Thunk или Saga
export const fetchCampaigns = () => async (dispatch) => {
    dispatch(fetchCampaignsStart());
    try {
        const response = await fetch('https://674437ffb4e2e04abea14d68.mockapi.io/campaigns');
        const data = await response.json();
        dispatch(fetchCampaignsSuccess(data));
    } catch (error) {
        dispatch(fetchCampaignsFailure(error.toString()));
    }
};

// Экспорт редьюсера
export default campaignsSlice.reducer;
