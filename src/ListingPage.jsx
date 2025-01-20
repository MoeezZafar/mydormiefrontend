import React, { useState, useEffect } from "react";
import { FaSort, FaStar, FaUsers, FaArrowUp, FaArrowLeft, FaArrowRight, FaBookmark } from "react-icons/fa";
import Footer from "./ui/Footer";
import Navbar from "./ui/navbar";
import { useParams, Link } from "react-router-dom"; // Import Link for routing

const ListingPage = () => {
  const [hostels, setHostels] = useState([]);
  const { id: universityId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Default");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bookmarkedHostels, setBookmarkedHostels] = useState([]);

  const hostelsPerPage = 12;

  const fetchHostels = async (universityId) => {
    try {
      const response = await fetch("https://mydormiebackend.abdurrehmanshafique.online/hostels");
      const data = await response.json();
  
      // Filter hostels with id matching universityId
      const newData = data.filter((hostel) => hostel.id === parseInt(universityId, 10));
      setHostels(newData);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  useEffect(() => {
    if (universityId) {
      fetchHostels(universityId);
    }
  }, [universityId]);

  const toggleBookmark = (hostelId) => {
    setBookmarkedHostels((prev) =>
      prev.includes(hostelId) ? prev.filter((id) => id !== hostelId) : [...prev, hostelId]
    );
  };

  const sortHostels = (hostels) => {
    switch (sortOption) {
      case "Price (Low to High)":
        return [...hostels].sort((a, b) => a.price - b.price);
      case "Price (High to Low)":
        return [...hostels].sort((a, b) => b.price - a.price);
      case "Rating":
        return [...hostels].sort((a, b) => b.rating - a.rating);
      case "Guests per Room":
        return [...hostels].sort((a, b) => b.guestsPerRoom - a.guestsPerRoom);
      default:
        return hostels;
    }
  };

  const sortedHostels = sortHostels(hostels);
  const totalPages = Math.ceil(sortedHostels.length / hostelsPerPage);
  const currentHostels = sortedHostels.slice(
    (currentPage - 1) * hostelsPerPage,
    currentPage * hostelsPerPage
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-16 py-8 pt-24 bg-[#fdf9e4]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Hostel</h1>
        </div>

        <div className="relative mb-6">
          <button
            onClick={() => setShowSortOptions(!showSortOptions)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <FaSort />
            <span>Sort by: {sortOption}</span>
          </button>

          {showSortOptions && (
            <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              {["Default", "Price (Low to High)", "Price (High to Low)", "Rating", "Guests per Room"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setShowSortOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentHostels.map((hostel) => (
            <Link key={hostel._id} to={`/itemPageUni/${hostel._id}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48">
                <img
                  src={`https://${hostel.image}`}
                  alt={hostel.name}
                  className="absolute h-full w-full object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => toggleBookmark(hostel._id)}
                  className="absolute top-52 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <FaBookmark
                    className={`${bookmarkedHostels.includes(hostel._id) ? "text-blue-500" : "text-gray-400"} text-xl`}
                  />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{hostel.name}</h2>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gray-400" />
                  <span className="text-gray-700">{hostel.capacity} guests per room</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-700">{hostel.rating} rating</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{hostel.price}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-[#65702f] hover:bg-[#59622b] text-white"}`}
            >
              <FaArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-[#65702f] text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-[#65702f] hover:bg-[#59622b] text-white"}`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#65702f] hover:bg-[#59622b] text-white p-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <FaArrowUp />
        </button>
      )}

      <Footer />
    </>
  );
};

export default ListingPage;
