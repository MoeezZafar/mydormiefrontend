import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UniversitySlider = () => {
  const navigate = useNavigate();

  const handleListingClick = (universityId) => {
    navigate(`/ListingPage/${universityId}`);
  };

  const [universities, setUniversities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(window.innerWidth < 760 ? 2 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://13.51.207.78:3000/universities")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? universities.length - cardsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === universities.length - cardsPerView ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Popular Universities</h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            aria-label="Previous slide"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <BsChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <BsChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden pb-4">
        <div
          className={`flex transition-transform duration-500 pb-4 ease-in-out ${
            cardsPerView === 2 ? "gap-2" : "gap-4"
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {universities.map((university) => (
            <div
              key={university.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300 ${
                cardsPerView === 2 ? "min-w-[calc(50%-0.5rem)] p-4" : "min-w-[calc(33.5%-1rem)] p-4"
              }`}
              role="group"
              aria-label={`University card for ${university.name}`}
              onClick={() => handleListingClick(university.id)}
            >
              <div className="aspect-video overflow-hidden rounded-lg border-2 border-gray-200 mb-4">
                <img
                  src={`https://${university.image}`}
                  alt={`Campus of ${university.name}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3";
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {university.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversitySlider;