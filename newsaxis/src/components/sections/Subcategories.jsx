import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/newsSlice';
import NewsArticle from "../cards/NewsCard";
import NewsArticleLoader from "../wireframes/CardWireframe";
import { timeAgo } from "../../utils/datecal";


function Subcategories({ categories }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(categories[0]); // Default to the first category as active tab
console.log(activeTab);
const { articles, loading, error } = useSelector((state) => state.news);

  // Dispatch action to fetch news
  useEffect(() => {
    dispatch(fetchNews({ searchQuery: activeTab, sortBy: 'publishedAt' }));
  }, [activeTab]);

  return (
    <div className="py-4">
      <div className="flex  overflow-x-scroll">
        {/* Tab buttons */}
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 text-md  
              ${activeTab === category ? "border-b-2  border-red-600 text-red-600" : "border "} 
              `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <div className=" rounded-lg">
          {/* Responsive Scrollable Container */}
      <div className="flex  gap-2 justify-center flex-wrap ">
        {loading && Array(8).fill().map((_, index) => <NewsArticleLoader key={index} />)}
        {error && <p>Error: {error}</p>}
        {articles.length === 0 && !loading && !error && <p>No articles found</p>}
        <div className="flex flex-wrap  justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
}

export default Subcategories;
