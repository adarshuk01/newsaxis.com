import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../Redux/newsBanners';
import Carousel from '../tabs/Carousel';
import NewsArticleLoader from '../wireframes/CardWireframe';

function NewsBanners() {
  const dispatch = useDispatch();
  const { newsbanners, loading, error } = useSelector((state) => state.newsBanners);

 
  useEffect(() => {
    dispatch(fetchNews({ type: 'breakingbanner' }));
  }, [dispatch]);

  if (loading) {
    return <div>{<NewsArticleLoader />}</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(newsbanners);  // Log to see the data structure

  return (
    <div>
      {newsbanners && newsbanners.length > 0 ? (
        <Carousel autoSlide={true} items={newsbanners} />
      ) : (
        <div>No banners available.</div>
      )}
    </div>
  );
}

export default NewsBanners;