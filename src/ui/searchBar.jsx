import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring"; // Import react-spring

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [universities, setUniversities] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://13.51.207.78:3000/universities")
      .then((response) => setUniversities(response.data))
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchQuery(value);
    setError("");

    if (value) {
      const filteredSuggestions = universities.filter((university) =>
        university.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setError("Please enter a university name");
      searchInputRef.current?.focus();
      return;
    }
    console.log("Searching for:", { searchQuery });
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/ListingPage/${suggestion.id}`);
  };

  // React-spring parallax effect on scroll
  const [props, set] = useSpring(() => ({ y: 0, opacity: 1 }));

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const opacityValue = Math.max(1 - scrollPosition * 0.001, 0); // Decrease opacity based on scroll position
    set({ y: scrollPosition * 0.5, opacity: opacityValue }); // Adjust opacity and parallax effect speed
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 pt-44">
      {/* Parallax effect applied to h1 with opacity */}
      <animated.h1
        className="text-7xl font-semibold font-source-serif-4 text-center mb-6 text-gray-800"
        style={{
          transform: props.y.interpolate((y) => `translateY(${y*0.5}px)`),
          opacity: props.opacity,
        }}
      >
        Find your dream hostel
      </animated.h1>

      {/* Parallax effect applied to h4 with opacity */}
      <animated.div
        className="text-center m-4 font-source-serif-4 text-gray-800 text-lg"
        style={{
          transform: props.y.interpolate((y) => `translateY(${y * 0.3}px)`),
          opacity: props.opacity,
        }}
      >
        <h4>MyDormie helps you find the most suitable hostel</h4>
        <h4>for you from the comfort of your home.</h4>
      </animated.div>

      {/* Parallax effect applied to search bar with opacity */}
      <div className="relative">
        <animated.form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2"
          style={{
            transform: props.y.interpolate((y) => `translateY(${y * 0.1}px)`),
            opacity: props.opacity,
          }}
        >
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search university"
              aria-label="Search university"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500"
              aria-label="Submit search"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            {suggestions.length > 0 ? (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </button>
                ))}
              </div>
            ) : (
              searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
                  No universities found
                </div>
              )
            )}
          </div>
        </animated.form>

        {error && (
          <div className="mt-2 text-red-500 text-sm" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
