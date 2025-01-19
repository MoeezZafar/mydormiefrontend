import React from "react";
import { FaUsers } from "react-icons/fa";

const HostelCard = ({ hostel }) => {
    return (
      <div className="max-w-[280px] mx-auto rounded-lg overflow-hidden shadow-lg bg-white mb-8">
        <div className="relative h-40 overflow-hidden rounded-lg p-2 pb-0">
          <img
            src={hostel.image}
            alt="Hostel Room"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
          />
        </div>
        <div className="px-6 py-4 space-y-3">
          <div className="font-bold text-xl text-gray-800 truncate">{hostel.location}</div>
          <div className="text-gray-600">
            <span className="bg-[#808e3a74] text-[#5d662e] text-sm font-medium px-2.5 py-0.5 rounded">
              {hostel.type}
            </span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaUsers className="mr-2" />
            <span>{hostel.capacity} People</span>
          </div>
          <div className="text-xl font-bold text-gray-800">
            {hostel.price}
          </div>
        </div>
      </div>
    );
  };

export default HostelCard;