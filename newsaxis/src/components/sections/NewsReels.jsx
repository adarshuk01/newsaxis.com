import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/newsReels';
import GradientCard from '../cards/GradientCard';
import { timeAgo } from '../../utils/datecal';
import NewsHeader from '../header/Newsheader';

function NewsReels() {
  const dispatch = useDispatch();
  const { newsReels, loading, error } = useSelector((state) => state.newsReels);
  console.log(newsReels);

  useEffect(() => {
    dispatch(fetchNews({ type: 'All' }));
  }, [dispatch]);

  return (
    <div className=''>
      <NewsHeader heading={'Reel '} link={'/malayalamreels'} />
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

    </div>
  );
}

export default NewsReels;