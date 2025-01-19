import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBed, FaMoneyBillWave, FaCalendarAlt, FaUserFriends, FaKey, FaShieldAlt } from "react-icons/fa";
import Navbar from './ui/navbar';
import Footer from './ui/Footer';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = [
    {
      category: "Booking Process",
      icon: <FaBed className="text-2xl text-[#65702f]"/>,
      questions: [
        {
          question: "How do I make a hostel reservation?",
          answer: "To make a reservation, simply search for your desired location and dates, select a hostel, and follow the booking process. You'll need to provide your details and payment information to confirm the booking."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking through your account dashboard. Please note that cancellation policies vary by hostel and booking type."
        }
      ]
    },
    {
      category: "Payments & Pricing",
      icon: <FaMoneyBillWave className="text-2xl text-[#65702f]" />,
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "We accept all major credit cards, PayPal, and bank transfers. Some hostels may also accept cash payments upon arrival."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, all fees are clearly displayed during the booking process. You'll see the total amount including any applicable taxes and fees before confirming your reservation."
        }
      ]
    },
    {
      category: "Check-in & Check-out",
      icon: <FaCalendarAlt className="text-2xl text-[#65702f]" />,
      questions: [
        {
          question: "What are the standard check-in and check-out times?",
          answer: "Check-in usually starts at 2:00 PM and check-out is until 11:00 AM. However, times may vary by hostel."
        },
        {
          question: "Can I check in late at night?",
          answer: "Many hostels offer 24/7 reception, but it's important to check the specific hostel's policies and inform them of late arrival."
        }
      ]
    },
    {
      category: "Facilities & Services",
      icon: <FaUserFriends className="text-2xl text-[#65702f]" />,
      questions: [
        {
          question: "What amenities are typically included?",
          answer: "Common amenities include Wi-Fi, lockers, common areas, kitchen facilities, and bed linens. Specific amenities vary by hostel."
        },
        {
          question: "Is breakfast included?",
          answer: "Some hostels offer complimentary breakfast while others may charge extra. This information is clearly stated in the hostel details."
        }
      ]
    },
    {
      category: "Security & Safety",
      icon: <FaShieldAlt className="text-2xl text-[#65702f]" />,
      questions: [
        {
          question: "How secure are the hostels?",
          answer: "Our partner hostels implement various security measures including 24/7 staff, security cameras, and personal lockers for valuables."
        },
        {
          question: "Do I need to bring my own lock?",
          answer: "While many hostels provide lockers, it's recommended to bring your own padlock or purchase one at the hostel."
        }
      ]
    }
  ];

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
    setActiveQuestion(null);
  };

  const toggleQuestion = (categoryIndex, questionIndex) => {
    setActiveQuestion(
      activeQuestion === `${categoryIndex}-${questionIndex}` 
        ? null 
        : `${categoryIndex}-${questionIndex}`
    );
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-[#fdf9e4] pb-4 pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h1>
            
            {/* FAQ Categories */}
            <div className="space-y-6">
            {faqData.map((category, categoryIndex) => (
                <div
                key={categoryIndex}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                >
                <button
                    onClick={() => toggleCategory(categoryIndex)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={activeCategory === categoryIndex}
                >
                    <div className="flex items-center space-x-3">
                    {category.icon}
                    <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                    </div>
                    <IoIosArrowDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${
                        activeCategory === categoryIndex ? "transform rotate-180" : ""
                    }`}
                    />
                </button>

                {/* Questions */}
                <div
                    className={`transition-all duration-300 ${
                    activeCategory === categoryIndex ? "block" : "hidden"
                    }`}
                >
                    {category.questions.map((item, questionIndex) => (
                    <div
                        key={questionIndex}
                        className="border-t border-gray-200"
                    >
                        <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200"
                        aria-expanded={activeQuestion === `${categoryIndex}-${questionIndex}`}
                        >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                            <IoIosArrowDown
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                activeQuestion === `${categoryIndex}-${questionIndex}` ? "transform rotate-180" : ""
                            }`}
                            />
                        </div>
                        </button>
                        <div
                        className={`transition-all duration-300 ${
                            activeQuestion === `${categoryIndex}-${questionIndex}`
                            ? "block px-6 py-4 bg-gray-50"
                            : "hidden"
                        }`}
                        >
                        <p className="text-gray-700">{item.answer}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
        <Footer/>
    </div>
    
  );
};

export default FAQ;