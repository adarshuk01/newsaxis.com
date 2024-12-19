import React from "react";
import NewsHeader from "../header/Newsheader";

const BulletinStory = () => {
  const stories = [
    { id: 1, image: "https://cdn.vectorstock.com/i/1000v/48/26/bbc-news-logo-with-red-background-vector-42974826.jpg", name: "bbcnews" },
    { id: 2, image: "https://yt3.googleusercontent.com/gizUTRt3mGlEsAEfvvLWR9PIaTAeOhXBT89pTuQ6CcrAww1tWRlcskmWVK9sahEf-KWZZ3iJCw=s900-c-k-c0x00ffffff-no-rj", name: "Asianet News" },
    { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWnnAcP5mWJSPeBd3Mml3z-goTfsB518WJQ&s", name: "Manorama News" },
    { id: 4, image: "https://yt3.googleusercontent.com/ytc/AIdro_nFqgCQfk09vEWUTJ8YLJqTaahT-cqdX1fP8-rv7ZI5Kos=s900-c-k-c0x00ffffff-no-rj", name: "MediaOne" },
    { id: 5, image: "https://epaper.mathrubhumi.com/img/favicon/ms-icon-310x310.png", name: "Mathrubhumi" },
    { id: 6, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrOZqkeKB-JsbdFvIw3MtzyB3Hb3P0H_SNw&s", name: "Reporter" },
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
              <div className="w-16 h-16 rounded-full border-4  border-red-500 overflow-hidden flex items-center justify-center">
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
