import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/news';

// Async thunk to fetch news data based on type
export const fetchNews = createAsyncThunk(
  'manoramanews/fetchNews',
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${type}`);
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Slice definition
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsManorama: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsManorama = action.payload; // Assuming the API returns an array of news articles
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
