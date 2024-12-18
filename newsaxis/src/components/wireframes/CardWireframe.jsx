import React from 'react';

export default function NewsArticleLoader() {
  return (
    <article className="w-[330px] flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-md animate-pulse">
      <div className="relative h-[210px] bg-gray-200"></div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-6 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-20 h-3 bg-gray-300 rounded"></div>
          <div className="w-12 h-3 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </article>
  );
}
