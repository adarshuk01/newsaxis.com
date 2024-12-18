import React from "react";
import NewsHeader from "../header/Newsheader";

const BulletinStory = () => {
  const stories = [
    { id: 1, image: "https://cdn.vectorstock.com/i/1000v/48/26/bbc-news-logo-with-red-background-vector-42974826.jpg", name: "bbcnews" },
    // { id: 2, image: "/path/to/cat.png", name: "ecommurz" },
    // { id: 3, image: "/path/to/formula1.png", name: "formula_one" },
    // { id: 4, image: "/path/to/user.png", name: "_alvian.de..." },
    // { id: 5, image: "/path/to/goal.png", name: "goal" },
    // { id: 6, image: "/path/to/apple.png", name: "apple" },
    // { id: 7, image: "/path/to/samsung.png", name: "samsung" },
    // { id: 8, image: "/path/to/idn.png", name: "idntimes" },
    // { id: 9, image: "/path/to/kreta.png", name: "kretyastudio" },
    // { id: 10, image: "/path/to/fitra.png", name: "fitra.eri" },
  ];

  return (
    <section className=" mx-auto">
      {/* Header */}
      <div>
        <NewsHeader heading={'Bulletin Story'} />
      </div>

      {/* Scrollable Container */}
      <div className="flex gap-2 overflow-x-scroll">
        <div className="flex gap-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <div className="w-16 h-16 rounded-full border-4 border-red-500 overflow-hidden flex items-center justify-center">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 truncate w-20 text-center">
                {story.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BulletinStory;
