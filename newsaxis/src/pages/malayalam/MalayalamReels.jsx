import React, { useEffect, useState } from 'react'
import TabMenu from '../../components/tabs/MenuTab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/newsReels';
import NewsArticleLoader from '../../components/wireframes/CardWireframe';
import GradientCard from '../../components/cards/GradientCard';
import { timeAgo } from '../../utils/datecal';

function MalayalamReels() {
    const dispatch = useDispatch();
     const [selectedCategory, setSelectedCategory] = useState('All');
      const categories = ['All', 'Entertainment', 'Technology', 'Travel', 'Pachakam','Premium'];
        const { newsReels, loading, error } = useSelector((state) => state.newsReels);
      
        useEffect(() => {
          dispatch(fetchNews({ type: selectedCategory }));
        }, [dispatch, selectedCategory]);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold'>മലയാളം Reels</h1>
      <TabMenu categories={categories} onSelectCategory={setSelectedCategory} /> 
      <div className="mt-4">
              {loading ? (
                <div className="text-center mt-10">
                  <NewsArticleLoader />
                </div>
              ) : error ? (
                <div className="text-center mt-10 font-extrabold text-3xl text-red-500">Coming Soon...</div>
              ) : (
                <div className="flex flex-nowrap overflow-x-scroll lg:flex-wrap  gap-2  mt-4">
                {newsReels.slice(0, 10).map((article, index) => (
                  <div className="flex-shrink-0">
                    <GradientCard
                      key={index}
                      showPlayButton={true}
                      width="260px"
                      article={{
                        imageUrl: article.image || '/default-image.jpg',
                        title: article.title || 'No title available',
                        source: article.source || 'Unknown Source',
                        sourceIcon: article.icon || '/placeholder.svg',
                        timeAgo: timeAgo(article.readableTime),
                        link: article.link,
                        channel: article.channel,
                      }}
                    />
                  </div>
                ))}
              </div>
              )}
            </div>
    </div>
  )
}

export default MalayalamReels
