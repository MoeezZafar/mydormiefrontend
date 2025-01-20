import React, { useEffect, useState } from "react";
import { FaWifi, FaBusAlt, FaUtensils, FaUserFriends, FaMapMarkerAlt, FaBed, FaParking, FaDumbbell } from "react-icons/fa";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { MdSecurity, MdCleaningServices, MdLocalLaundryService, MdHotel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

const HostelPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ type, setType ] = useState('girls')
  const [ hostel, setHostel ] = useState({
    name: '',
    location: '',
    type: 'girls',
    capacity: null,
    price: '',
    security_deposit: ''
  });
  const navigate = useNavigate();
  const { id: hostelId } = useParams();
  // console.log(hostelId);
  const fetchData = async (hostelId) => {
    const response = await fetch("https://mydormiebackend.abdurrehmanshafique.online/api/hosteldata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: hostelId }),
    });
    const data = await response.json(); // Await the parsed JSON
    console.log(data);
    setHostel(data);
  };
  
  useEffect(() => {
    setType(hostel.type);
  },[hostel])
  useEffect(() => {
    if (hostelId) {
      fetchData(hostelId);
    }
  }, [hostelId]);
  
  const images = [
    "images.unsplash.com/photo-1555854877-bab0e564b8d5",
    "images.unsplash.com/photo-1576495199011-eb94736d05d6",
    "images.unsplash.com/photo-1566665797739-1674de7a421a",
    "images.unsplash.com/photo-1618773928121-c32242e63f39"
  ];

  const amenities = [
    { icon: <FaWifi />, name: "Wi-Fi" },
    { icon: <FaBusAlt />, name: "Transport" },
    { icon: <FaUtensils />, name: "Meal Services" },
    { icon: <MdCleaningServices />, name: "Cleaning" },
    { icon: <MdLocalLaundryService />, name: "Laundry" },
    { icon: <MdSecurity />, name: "Security" }
  ];

  const facilities = [
    { icon: <FaParking />, name: "Parking Space" },
    { icon: <FaDumbbell />, name: "Fitness Gym" },
    { icon: <MdHotel />, name: "Furnished Rooms" },
    { icon: <FaUtensils />, name: "Clean Mess" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBooking = () => {
    navigate(`/BookingPage/${hostelId}`);
  };

  

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      <div className="relative h-[500px] mb-8 rounded-xl overflow-hidden group">
        <img
          src={`https:${images[currentImageIndex]}`}
          alt={`Hostel view ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <BsArrowLeftCircle />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <BsArrowRightCircle />
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{hostel.name}</h1>
        <div className="flex items-center text-gray-400 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{hostel.location}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <FaUserFriends className="mr-2" />
          <span>{hostel.capacity} Guests per Room</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Accommodation Type</h2>
        <div className="bg-[#65702f] text-white p-6 rounded-lg flex items-center justify-center">
          <FaBed className="mr-2 text-2xl opacity-70" />
          <span className="text-xl capitalize">{hostel.type} Hostel</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-2xl text-[#a5ad77] mb-2">{amenity.icon}</div>
              <span className="text-sm text-gray-600">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-2xl text-[#a5ad77] mb-2">{facility.icon}</div>
              <span className="text-sm text-gray-600">{facility.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Rent</span>
            <span className="font-bold">{hostel.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Security Deposit</span>
            <span className="font-bold">{hostel.security_deposit}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="bg-[#65702f] text-white px-8 py-3 rounded-lg hover:bg-[#4b5222] transition-colors focus:outline-none focus:ring-2 focus:ring-[#65702f] focus:ring-offset-2"
          aria-label="Request to book this hostel"
          onClick={handleBooking}
        >
          Request to Book
        </button>
      </div>
    </div>
    
  );
};

export default HostelPage; 