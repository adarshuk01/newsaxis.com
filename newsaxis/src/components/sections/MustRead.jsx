import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/ManoramaSlice';
import GradientCard from '../cards/GradientCard';
import MiniArticleCard from '../cards/MiniArticleCard';
import { timeAgo } from '../../utils/datecal';
import NewsHeader from '../header/Newsheader';

function NewsPage() {
  const dispatch = useDispatch();
  const { newsManorama, loading, error } = useSelector((state) => state.ManoramaNews);
  console.log(newsManorama);
  

  useEffect(() => {
    dispatch(fetchNews({type:'latest'}));
  }, [dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">not found</div>;

  return (
    <>
       <NewsHeader heading={'മലയാളം വാർത്ത'} link={'/manoramanews'}/>
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto ">
      {/* Featured Article Section */}
      <div className="space-y-4">
        {newsManorama.slice(0, 2).map((article, index) => (
          <GradientCard
          width={'full'}
            key={index}
            article={{
              imageUrl: article.image || '/default-image.jpg',
              title: article.title || 'No title available',
              source: article.source || 'Unknown Source',
              sourceIcon: article.icon || '/placeholder.svg',
              channel:article.channel,
              timeAgo: timeAgo(article.readableTime),
              description: article.summary || 'Description is not available.',
              category: article.category || 'General',
              readTime: '10',
              link: article.link
            }}
          />
        ))}
      </div>

      {/* List of Other Articles */}
      <div className="space-y-4">
        {newsManorama.slice(3,9).map((article, index) => (
          <MiniArticleCard
            key={index}
            article={{
              imageUrl: article.image || '/default-image.jpg',
              title: article.title || 'No title available',
              timeAgo: timeAgo(article.readableTime),
              sourceIcon: article.icon || '/placeholder.svg',

              category: article.category || 'General',
              readTime: '6',
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
}

export default NewsPage;
