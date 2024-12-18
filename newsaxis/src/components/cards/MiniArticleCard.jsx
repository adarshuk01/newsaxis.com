import React from 'react';

const MiniArticleCard = ({ article, maxTitleWords = 10, maxDescriptionWords = 10 }) => {
  // Utility function to truncate text to a specified number of words
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 rounded-lg p-4 shadow-sm">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full md:w-24 md:h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          {article.sourceIcon ? (
            <img src={article.sourceIcon} alt={article.source} className="w-5 h-5 rounded-full" />
            
          ) : (
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {article.source.slice(0, 1).toUpperCase()}
            </div>
          )}
          <span className="text-sm text-gray-600">{article.source}</span>
          <span className="text-sm text-gray-600">• {article.timeAgo}</span>
        </div>
        <h3 className="text-sm font-semibold mb-1">
          {truncateText(article.title, maxTitleWords)}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-red-500 text-sm font-medium">{article.category}</span>
          <span className="text-sm text-gray-600">{article.readTime} min read</span>
        </div>
        <p className="text-sm text-gray-600">
          {truncateText(article.description, maxDescriptionWords)}
        </p>
      </div>
    </div>
  );
};

export default MiniArticleCard;
