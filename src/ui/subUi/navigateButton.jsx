import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavigationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [universities, setUniversities] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mydormiebackend.abdurrehmanshafique.online/universities")
      .then((response) => {
        setUniversities(response.data); // Assuming response.data contains [{ id: "1", name: "NUST" }, ...]
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveTab(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveTab(null);
    }
  };

  const handleUniversityClick = (universityId) => {
    navigate(`/ListingPage/${universityId}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center px-3 py-2 text-sm font-bold text-gray-900 rounded-md hover:text-[#59622b] focus:outline-none transition-colors duration-200"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Navigation menu"
      >
        Navigate
        <FiChevronDown className="ml-2" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-64 mt-2 bg-white rounded-lg shadow-lg"
          >
            <div className="p-2 space-y-1">
              <div className="relative">
                <button
                  className={`w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-100 focus:outline-none ${
                    activeTab === "University" ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => setActiveTab("University")}
                  onClick={() => setActiveTab("University")}
                  aria-expanded={activeTab === "University"}
                >
                  University
                </button>

                <AnimatePresence>
                  {activeTab === "University" && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-full top-0 w-64 ml-2 bg-white rounded-lg shadow-lg"
                    >
                      <div className="p-2 space-y-1">
                        {universities.map((university) => (
                          <button
                            key={university.id}
                            onClick={() => handleUniversityClick(university.id)}
                            className="block w-full px-4 py-2 text-left text-sm rounded-md hover:bg-gray-100 focus:outline-none"
                          >
                            {university.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationButton;
