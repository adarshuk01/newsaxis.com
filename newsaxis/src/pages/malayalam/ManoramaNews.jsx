import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/ManoramaSlice';
import NewsArticle from '../../components/cards/NewsCard';
import { timeAgo } from '../../utils/datecal';
import MiniArticleCard from '../../components/cards/MiniArticleCard';
import GradientCard from '../../components/cards/GradientCard';
import NewsArticleLoader from '../../components/wireframes/CardWireframe';
import TabMenu from '../../components/tabs/MenuTab';

function ManoramaNews() {
  const dispatch = useDispatch();
  const { newsManorama, loading, error } = useSelector((state) => state.ManoramaNews);
  const [selectedCategory, setSelectedCategory] = useState('latest');
  const categories = ['latest', 'sports', 'entertainment', 'technology', 'business','premium'];
  console.log(newsManorama);
  
  useEffect(() => {
    dispatch(fetchNews({ type: selectedCategory }));
  }, [dispatch, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className='text-2xl font-bold'>മലയാളം വാർത്ത</h1>
      <TabMenu categories={categories} onSelectCategory={setSelectedCategory} /> 
      <div className="mt-4">
        {loading ? (
          <div className="text-center mt-10">
            <NewsArticleLoader />
          </div>
        ) : error ? (
          <div className="text-center mt-10 font-extrabold text-3xl text-red-500">Coming Soon...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsManorama.map((article, index) => (
              <NewsArticle
                key={index}
                width={400}
                article={{
                  imageUrl: article.image || '/default-image.jpg',
                  title: article.title || 'No title available',
                  sourceIcon: article.icon || '/placeholder.svg',
                  source: article.channel || 'Unknown Source',
                  timeAgo: timeAgo(article.readableTime),
                  description: article.summary || 'Description is not available.',
                  category: article.category || 'General',
                  readTime: '5',
                  readMore: article.link
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManoramaNews;
