import React from 'react';
import { PlayCircleIcon } from 'lucide-react'; // Lucide-react for play button icon

const GradientCard = ({ article, width, showPlayButton = false }) => {
  console.log(article);

  // Utility function to truncate text to a specified number of words
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg h-96" style={{ width: `${width}` }}>
      <div
        className={`relative h-full bg-cover bg-center`}
        style={{ backgroundImage: `url('${article.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center">
            <a href={`${article.link}`} className="flex items-center justify-center">
              <PlayCircleIcon className="h-16 w-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        )}

        <div className="absolute bottom-0 p-2">
          <div className="flex items-center gap-2 mb-4">
            {article.sourceIcon ? (
              <img src={article.sourceIcon} alt={article.source} className="h-8 w-8 rounded-full" />
            ) : (
              <div className="bg-red-600 h-6 w-14 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {article.source.slice(0, 3).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <span className='text-white'>{article.channel}</span> <br />
              <span className="text-gray-300 text-sm">{article.timeAgo}</span>
            </div>
          </div>

          <h2 className="text-white text-sm font-semibold leading-tight mb-2">
            {truncateText(article.title, 20)}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-2">
            {truncateText(article.description, 20)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradientCard;
