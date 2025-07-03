import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunks for API calls
export const fetchBands = createAsyncThunk(
  'bands/fetchBands',
  async (_, { rejectWithValue }) => {
    try {
      // This would be a real API call
      // const response = await api.get('/bands');
      // return response.data;
      
      // For demo purposes, return mock data
      return {
        bands: [
          { id: '1', name: 'Rock Band', leader_id: '123' },
          { id: '2', name: 'Jazz Ensemble', leader_id: '456' }
        ]
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch bands');
    }
  }
);

const bandSlice = createSlice({
  name: 'bands',
  initialState: {
    bands: [],
    currentBand: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentBand: (state, action) => {
      state.currentBand = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBands.fulfilled, (state, action) => {
        state.loading = false;
        state.bands = action.payload.bands;
      })
      .addCase(fetchBands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch bands';
      });
  },
});

export const { setCurrentBand, clearError } = bandSlice.actions;
export default bandSlice.reducer;