import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './Redux/newsSlice'; // Adjust path as needed
import latestNews from './Redux/latestNewsSlice'
import manorama from './Redux/ManoramaSlice'
import reels from './Redux/newsReels'
import banners from './Redux/newsBanners'

const store = configureStore({
  reducer: {
    news: newsReducer,
    latestNews:latestNews,
    ManoramaNews:manorama,
    newsReels:reels,
    newsBanners:banners
    
  },
});

export default store;
