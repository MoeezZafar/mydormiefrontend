import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser, FaMoneyBillWave, FaFileUpload } from "react-icons/fa";
import { BsCalendarDate, BsShieldLock } from "react-icons/bs";
import Navbar from "./ui/navbar";
import Footer from "./ui/Footer";
import { FaUpload, FaCreditCard, FaPaypal, FaGoogle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const BookingPage = () => {
  const navigate = useNavigate();
  const { id: hostelId } = useParams();
  const [ hostel, setHostel ] = useState({
      _id: null,
      name: '',
      location: '',
      type: 'girls',
      capacity: null,
      price: '',
      monthly_rent: '',
      security_deposit: ''
    });
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
    
    // useEffect(() => {
    //   setType(hostel.type);
    // },[hostel])
    useEffect(() => {
      if (hostelId) {
        fetchData(hostelId);
      }
    }, [hostelId]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    contact: "",
    arrivalDate: "",
    departureDate: "",
    specialNote: "",
    paymentMethod: "credit",
    receipt: null,
    termsAgreed: false,
    hostelId: null

  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.contact) newErrors.contact = "Contact number is required";
    if (!/^\d{11}$/.test(formData.contact)) newErrors.contact = "Invalid contact number";
    if (!formData.arrivalDate) newErrors.arrivalDate = "Arrival date is required";
    if (!formData.departureDate) newErrors.departureDate = "Departure date is required";
    if (!formData.termsAgreed) newErrors.terms = "You must agree to the terms";
    return newErrors;
  };
  useEffect(() => {
    formData.hostelId = hostel._id;

  },[hostel._id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('https://mydormiebackend.abdurrehmanshafique.online/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      
      // Create the message body
      const messageBody = `
        Booking Details:
        - FirstName: ${formData.firstName}
        - LastName: ${formData.lastName}
        - Occupation: ${formData.occupation}
        - Hostel: ${hostel.name}
        - Location: ${hostel.location}
        - Arrival Date: ${formData.arrivalDate}
        - Departure Date: ${formData.departureDate}
        - Contact Number: ${formData.contact}
        - Occupation: ${formData.occupation}
        - Monthly Rent: ${hostel.monthly_rent}
        - Security Deposit: ${hostel.security_deposit}
        ${formData.specialNote ? `\nSpecial Note: ${formData.specialNote}` : ''}
      `;
  
      // Prepare template parameters matching the template structure
      const templateParams = {
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: "MyDormie",
        message: messageBody
      };
  
      // Send email
      await emailjs.send(
        'mydormie',
        'template_828b37i',
        templateParams,
        'cinZEkDx68C3Vqf8-'
      );
  
      if (response.ok) {
        // Clear form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          occupation: "",
          contact: "",
          arrivalDate: "",
          departureDate: "",
          specialNote: "",
          paymentMethod: "credit",
          receipt: null,
          termsAgreed: false
        });
        
        navigate("/PostBooking");
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-[#fdf9e4] py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
          <div className="flex items-center justify-center mt-2 text-gray-600">
            <IoLocationOutline className="text-[#65702f] mr-1" />
            <span>{hostel.location}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Guests per Room</p>
              <p>{hostel.capacity} People</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Monthly Rent</p>
              <p>{hostel.monthly_rent}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold">Security Deposit</p>
              <p>{hostel.security_deposit}</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg mt-4">
              <p className="font-semibold">Special Notes</p>
              <p>Utilities included</p>
            </div>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaRegUser className="text-[#65702f] mr-2" />
              Add your Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50 ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50 ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50 ${errors.contact ? 'border-red-500' : ''}`}
                />
                {errors.contact && <p className="mt-1 text-sm text-red-500">{errors.contact}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Arrival</label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50 ${errors.arrivalDate ? 'border-red-500' : ''}`}
                />
                {errors.arrivalDate && <p className="mt-1 text-sm text-red-500">{errors.arrivalDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Departure</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50 ${errors.departureDate ? 'border-red-500' : ''}`}
                />
                {errors.departureDate && <p className="mt-1 text-sm text-red-500">{errors.departureDate}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Special Note for Host</label>
                <textarea
                  name="specialNote"
                  value={formData.specialNote}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-[#65702f] focus:ring focus:ring-[#65702f] focus:ring-opacity-50"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaMoneyBillWave className="text-[#65702f] mr-2" />
              Payment Method
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="credit"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === "credit"}
                  onChange={handleInputChange}
                  className="focus:ring-[#65702f] h-4 w-4 text-[#65702f] border-gray-300"
                />
                <label htmlFor="credit" className="text-sm font-medium text-gray-700">Credit Card</label>

                <input
                  type="radio"
                  id="debit"
                  name="paymentMethod"
                  value="debit"
                  checked={formData.paymentMethod === "debit"}
                  onChange={handleInputChange}
                  className="focus:ring-[#65702f] h-4 w-4 text-[#65702f] border-gray-300"
                />
                <label htmlFor="debit" className="text-sm font-medium text-gray-700">Debit Card</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Payment Receipt</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="receipt" className="relative cursor-pointer bg-white rounded-md font-medium text-[#65702f] hover:text-[#65702f] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#65702f]">
                        <span>Upload a file</span>
                        <input
                          id="receipt"
                          name="receipt"
                          type="file"
                          className="sr-only"
                          onChange={handleInputChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

<div>
              

              {/* <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Upload Receipt</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="receipt" className="relative cursor-pointer bg-white rounded-md font-medium text-[#65702f] hover:text-[#4a5222] focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          id="receipt"
                          name="receipt"
                          type="file"
                          className="sr-only"
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>






          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#65702f] focus:ring-[#65702f] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
            {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#65702f] hover:bg-[#65702f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#65702f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Book Me"
            )}
          </button>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default BookingPage;