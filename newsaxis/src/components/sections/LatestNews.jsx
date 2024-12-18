import React, { useEffect } from 'react';
import NewsCard from '../cards/NewsCard';
import NewsArticleLoader from '../wireframes/CardWireframe'; // Assuming this is where your loader is located
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/latestNewsSlice';
import NewsHeader from '../header/Newsheader';
import NewsArticle from '../cards/NewsCard';

function timeAgo(publishedAt) {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffInMs = now - publishedDate;

  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMins > 0) {
    return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export default function LatestNews() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.latestNews);

  useEffect(() => {
    dispatch(fetchNews({ searchQuery: 'a', sortBy: 'publishedAt' }));
  }, []);

  return (
    <section className="mx-auto h-fit">
      <div>
        <NewsHeader heading="Latest News" link="/latest" />
      </div>

      {/* Responsive Scrollable Container */}
      <div className="flex gap-2 overflow-x-scroll px-4 py-4">
        {loading && Array(5).fill().map((_, index) => <NewsArticleLoader key={index} />)}
        {error && <p>Error: {error}</p>}
        {articles.length === 0 && !loading && !error && <p>No articles found</p>}
        <div className="flex gap-2 w-[350px]">
          {!loading && articles.map((article) => (
            <NewsArticle
              key={article.url}
              width={350}
              article={{
                imageUrl: article.urlToImage,
                title: article.title,
               
                source: article.source.name,
                timeAgo: timeAgo(article.publishedAt),
                description: article.description,
                category: 'General',
                readTime: '5',
                readMore: article.url
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
