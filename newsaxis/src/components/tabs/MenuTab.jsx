import React, { useState } from 'react';

const TabMenu = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex  mt-4 overflow-x-auto border-b">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-2 px-4 text-lg  ${
            selectedCategory === category
              ? 'border-b-2 border-red-500 text-red-500'
              : 'text-gray-500 border hover:text-red-500'
          }`}
          onClick={() => handleSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
