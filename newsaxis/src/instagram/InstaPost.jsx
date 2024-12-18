import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../Redux/ManoramaSlice';
import React, { useEffect } from 'react';

function InstaPost() {
  const dispatch = useDispatch();
  const { newsManorama, loading, error } = useSelector((state) => state.ManoramaNews);

  useEffect(() => {
    dispatch(fetchNews({ type: 'latest' }));
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[550px]">
        <p className="text-white">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[550px]">
        <p className="text-red-500">Error loading news.</p>
      </div>
    );

  const article = newsManorama[0] || {}; // Taking the second article as an example

  return (
    <div className="flex justify-center  items-center bg-black w-fit mx-auto">
      <div className="relative w-[550px] h-[550px]  shadow-lg overflow-hidden">
        {/* Logo and Date */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center text-white z-10">
          <h2 className="font-bold text-xl">{'NewsAxis' || 'Unknown Channel'}</h2>
          <time>{article.readableTime || 'Unknown Date'}</time>
        </div>
        {/* Image with Gradient Overlay */}
        <div className="w-full h-[320px] relative bg-gray-800">
          <img
            src={article.image || 'https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705346_640.jpg'}
            alt={article.title || 'Placeholder image'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        {/* Title */}
        <div className="absolute bottom-0 left-0 w-full bg-black text-yellow-300  text-center z-10">
        <h3 className="text-black font-extrabold text-4xl bg-yellow-300 text-center mb-4">BREAKING NEWS</h3>
          <h1
            className="title text-3xl p-2 manjari-bold font-extrabold mb-2 "
            // style={{ wordSpacing: '0.4em', letterSpacing: '-0.07em' }}
          >
            {article.title || 'No title available'}
          </h1>
          <div className="text-white p-2">
            <p>NewsAxisMedia</p>
        </div>
        </div>
       
      </div>
      
    </div>
  );
}

export default InstaPost;
