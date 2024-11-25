import { createSlice } from '@reduxjs/toolkit';

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchCampaignsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCampaignsSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchCampaignsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchCampaignsStart, fetchCampaignsSuccess, fetchCampaignsError } = campaignsSlice.actions;

export default campaignsSlice.reducer;
