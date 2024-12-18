'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/newsSlice';
import NewsHeader from '../header/Newsheader';
import NewsArticle from './NewsCard';
import { timeAgo } from '../../utils/datecal';
import NewsArticleLoader from '../wireframes/CardWireframe';

export default function ArticleCard() {
  const dispatch = useDispatch();

  // Access data from Redux store
  const { articles, loading, error } = useSelector(
    (state) => state.news || { articles: [], loading: false, error: null }
  );

  // Dispatch action to fetch news
  useEffect(() => {
    dispatch(fetchNews({ searchQuery: 'series movies', sortBy: 'publishedAt' }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-2 py-8">
      <NewsHeader link="entertainment" heading="Entertainment" />

      {/* Loading, Error, or Empty State */}
      {error && <p className=" text-red-500">Error: {error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p className=" text-gray-600">No articles found</p>
      )}

      {/* Render Articles */}
      <div className="mt-  flex gap-2 overflow-x-scroll px-4 py-4 scrollbar-hide">
        {loading && Array(5).fill().map((_, index) => <NewsArticleLoader key={index} />)}
        {!loading && !error && articles.length > 0 && (
         <div className='flex gap-2 w-[350px]'>
            {articles.map((article, index) => (
              <NewsArticle
                key={index}
                width={300}
                article={{
                  imageUrl: article.urlToImage || '/default-image.jpg',
                  title: article.title || 'No title available',
                 
                  source: article.source?.name || 'Unknown Source',
                  timeAgo: timeAgo(article.publishedAt),
                  description: article.description || 'Description is not available.',
                  category: 'General', // Placeholder for category
                  readTime: '5', // Placeholder for read time
                  readMore: article.url
                }}
              />
            ))}</div>
         
        )}
      </div>
    </div>
  );
}
