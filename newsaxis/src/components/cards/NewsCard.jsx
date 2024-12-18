import React from 'react';

export default function NewsArticle({ article, width, maxTitleWords = 20, maxDescriptionWords = 20 }) {


  // Utility function to truncate text to a specified number of words
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  // Function to generate a random hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to get the first two letters of the source name
  const getSourceInitials = (source) => {
    return source ? source.substring(0, 2).toUpperCase() : 'NA';
  };

  return (
    <article
      className="max-w-[365px] lg:w-[320px] md:w-[330px] flex-shrink-0 overflow-hidden rounded-lg bg-white animate-fade-in"
    >
      <div className="relative h-[210px]">
        <img
          src={article.imageUrl || '/default-image.jpg'} // Fallback image
          alt="Article"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          {article.sourceIcon ? (
            <img src={article.sourceIcon} alt="Source Icon" className="h-8 w-8 rounded-full" />
          ) : (
            <div
              className="h-8 w-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: getRandomColor() }}
            >
              <span className="text-white font-bold">{getSourceInitials(article.source)}</span>
            </div>
          )}
          <span className="text-sm text-gray-700">{article.source || 'Unknown Source'}</span>
          <span className="text-xs text-gray-500">• {article.timeAgo || 'Recently'}</span>
        </div>
        <h2 className="line-clamp-3 text-md font-semibold">
          {truncateText(article.title, maxTitleWords) || 'No title available'}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600">
          {truncateText(article.description, maxDescriptionWords) || 'Description is not available.'}
        </p>
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-red-500">{article.category || 'Uncategorized'}</span>
          <span className="text-xs text-gray-500">• {article.readTime || 'N/A'} min read</span>
          <a className="text-xs text-blue-600 font-bold underline" href={article.readMore} target="_blank" rel="noopener noreferrer">
            Read More...
          </a>
        </div>
      </div>
    </article>
  );
}
