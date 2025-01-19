import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HostelCard from "./subUi/hostelCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HostelSlider = () => {
  const navigate = useNavigate();
  const [hostelsData, setHostelsData] = useState([]);

  const handleHostelClick = (hostel) => {
    navigate(`/itemPage/${hostel._id}`);
  };

  useEffect(() => {
    axios
      .get("http://13.51.207.78:3000/api/hostel")
      .then((response) => {
        setHostelsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hostels data:", error);
      });
  }, []);

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 pb-8">Featured Hostels</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet !bg-blue-500",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-[#5d662e]",
        }}
        loop={true}
        spaceBetween={30}
        breakpoints={{
          420: { slidesPerView: 2, centeredSlides: false },
          768: { slidesPerView: 3, centeredSlides: false },
          1024: { slidesPerView: 4 },
          1440: { slidesPerView: 4 },
        }}
        className="relative"
      >
        {hostelsData.map((hostel, index) => (
          <SwiperSlide key={index}>
            <div onClick={() => handleHostelClick(hostel)} className="cursor-pointer">
              <HostelCard hostel={hostel} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev !w-10 !h-10 !bg-white !rounded-full !shadow-md !text-blue-500 after:!text-lg after:!font-bold"></div>
        <div className="swiper-button-next !w-10 !h-10 !bg-white !rounded-full !shadow-md !text-blue-500 after:!text-lg after:!font-bold"></div>
      </Swiper>
      <div className="swiper-pagination !static mt-8"></div>
    </div>
  );
};

export default HostelSlider;