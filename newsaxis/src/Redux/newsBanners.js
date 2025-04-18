import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL ||'http://localhost:5001/api/news';

// Async thunk to fetch news data based on type
export const fetchNews = createAsyncThunk(
  'newsbanners/fetchNews',
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/banner/${type}`);
      console.log(response.data);

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
    newsbanners: [],
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
        state.newsbanners = action.payload; // Assuming the API returns an array of news articles
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
