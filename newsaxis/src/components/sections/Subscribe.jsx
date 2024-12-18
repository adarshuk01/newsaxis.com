import React from 'react';

const NewsletterSubscription = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-lg px-6 py-8 mx-auto max-w-6xl shadow-md">
      {/* Text Section */}
      <div className="mb-4 md:mb-0 md:mr-4 text-center md:text-left">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Get first update
        </p>
        <p className="mt-1 text-2xl font-semibold text-gray-800">
          Get the news in front line by{' '}
          <span className="text-red-500 font-bold">
            subscribe{' '}
            <span role="img" aria-label="hand pointing">
              👉
            </span>
          </span>{' '}
          our latest updates
        </p>
      </div>

      {/* Input Section */}
      <form className="flex w-full md:w-auto">
        <input
          type="email"
          placeholder="Your email"
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-r-md hover:bg-red-600 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
