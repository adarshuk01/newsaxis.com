import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Subcategories from "../components/sections/Subcategories";
import { navigationData } from "../datas/navData";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../Redux/newsSlice';
import NotFound from "./NotFound";

function DynamicPage() {
  const { section } = useParams();
  const dispatch = useDispatch();
  const [isNotFound, setIsNotFound] = useState(false);

  // Find the matching section in navigationData
  const sectionData = navigationData.find((item) => item.href === `/${section}`);

  // Get categories or fallback to an empty array
  const categories = sectionData ? sectionData.category : [];

  // Capitalize the first letter of the section
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Dispatch action to fetch news
  useEffect(() => {
    if (section) {
      dispatch(fetchNews({ searchQuery: section, sortBy: 'publishedAt' }));
    }
  }, [dispatch, section]);

  // Check if the sectionData is undefined to set the NotFound state
  useEffect(() => {
    if (!sectionData) {
      setIsNotFound(true);
    }
  }, [sectionData]);

  // Render NotFound component if the sectionData is not found
  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div>
      <header className="bg-red-50 border-l-4 border-red-600 py-4 mt-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl flex gap-2 items-center font-bold text-red-600">
            {sectionData?.icon} {sectionData ? `${capitalizeFirstLetter(section)} News` : "Section Not Found"}
          </h1>
        </div>
      </header>
     
      <div>
        {/* Render Subcategories component with dynamic categories */}
        {categories.length > 0 ? (
          <Subcategories categories={categories} />
        ) : (
          <p className="text-gray-800"></p>
        )}
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Content of the dynamic page */}
        <p className="text-gray-800">
          Here is the content for the {sectionData ? section : "unknown"} section.
        </p>
      </div>
    </div>
  );
}

export default DynamicPage;
