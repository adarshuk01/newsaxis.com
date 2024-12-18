import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL and key
const API_BASE_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '566c1ee2409440ef805058fbb8d134e1';

// Cache for temporary API responses
let newsCache = {};

// Helper function to retry with exponential backoff
const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryWithBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// Async thunk to fetch news data
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ searchQuery, sortBy }, { rejectWithValue }) => {
    const cacheKey = `${searchQuery}-${sortBy}`;
    if (newsCache[cacheKey]) {
      return newsCache[cacheKey]; // Return cached response if available
    }

    try {
      const response = await retryWithBackoff(() =>
        axios.get(API_BASE_URL, {
          params: {
            q: searchQuery,
            apiKey: API_KEY,
            sortBy: sortBy,
            language: 'en',
            searchIn: 'title',
          },
        })
      );
      newsCache[cacheKey] = response.data; // Store result in cache
      return response.data;
    } catch (error) {
      // Handle rate-limiting error (429) separately
      if (error.response?.status === 429) {
        return rejectWithValue('Rate limit exceeded. Please try again later.');
      }
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Slice definition
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
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
        // Filter out invalid articles
        state.articles = action.payload.articles.filter((article) => {
          return (
            article.title &&
            article.title !== '[Removed]' &&
            article.description &&
            article.description !== '[Removed]' &&
            article.urlToImage &&
            article.content &&
            article.content !== '[Removed]' &&
            (!article.source || article.source.name !== '[Removed]')
          );
        });
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
