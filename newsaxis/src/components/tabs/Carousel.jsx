import React, { useState } from 'react';

const Carousel = ({ items, autoSlide = false, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  React.useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <div className="relative w-full mt-10 overflow-hidden" style={{ maxWidth: `${340 * items.length}px` }}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 340}px)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-4"
            style={{ width: '340px'}}
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex h-[120px]">
              <img src={item.image} alt={`Slide ${index + 1}`} className="w-1/3 h-auto object-cover" />
              <div className="p-4 w-2/3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700 mt-2">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8249;
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8250;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'} focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
