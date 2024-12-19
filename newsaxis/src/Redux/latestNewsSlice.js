import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL and key
const API_BASE_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '566c1ee2409440ef805058fbb8d134e1';

// Cache to store results temporarily
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
  'latestNews/fetchNews',
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
            sortBy,
            language: 'en',
          },
        })
      );
      newsCache[cacheKey] = response.data; // Store result in cache
      return response.data;
    } catch (error) {
      // Handle specific errors
      if (error.response) {
        if (error.response.status === 429) {
          return rejectWithValue('Rate limit exceeded. Please try again later.');
        }
        if (error.response.status === 401) {
          return rejectWithValue('Invalid API key. Please check your configuration.');
        }
        if (error.response.status === 404) {
          return rejectWithValue('No articles found for the given query.');
        }
        return rejectWithValue(
          error.response.data?.message || 'An error occurred while fetching news.'
        );
      }
      // Handle network or other errors
      return rejectWithValue('A network error occurred. Please check your connection.');
    }
  }
);

// Slice definition
const latestNewsSlice = createSlice({
  name: 'latestNews',
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
        // Filter out articles with invalid or removed content
        state.articles = action.payload.articles.filter((article) => {
          return (
            article?.title &&
            article.title !== '[Removed]' &&
            article?.description &&
            article.description !== '[Removed]' &&
            article?.content &&
            article.content !== '[Removed]' &&
            article?.urlToImage &&
            (!article.source || article.source.name !== '[Removed]')
          );
        });
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch news.';
      });
  },
});

export default latestNewsSlice.reducer;
