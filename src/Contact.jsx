import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import Navbar from './ui/navbar';
import Footer from './ui/Footer';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const messageBody = `
        Customer Details:
        - Name: ${formData.name}
        - Email: ${formData.email}
        ${formData.message ? `\nMessage: ${formData.message}` : ''}
      `;
  
      // Prepare template parameters matching the template structure
        const templateParams = {
          to_name: `${formData.name}`,
          from_name: "MyDormie Customer",
          message: messageBody
        };
    
        // Send email
        await emailjs.send(
          'mydormie',
          'template_828b37i',
          templateParams,
          'cinZEkDx68C3Vqf8-'
        );
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-[#fdf9e4] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8  p-8 rounded-xl  transform transition-all duration-300 ">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#65702f] mb-4">Thank You!</h2>
            <p className="text-gray-600">Your message has been sent successfully.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 bg-[#65702f] text-white px-6 py-2 rounded-lg hover:bg-[#555e2a] transition-colors duration-300"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold text-gray-800">
                Contact Us
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Do you have any questions? Don't wory ask away<br></br>You can also contact via our mail mydormie@gmail.com or at +921345678
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 ${errors.name ? "border-red-500" : ""}`}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="name-error"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="email-error"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300 ${errors.message ? "border-red-500" : ""}`}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="message-error"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#65702f] hover:bg-[#555e2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555e2a] transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <BiMailSend
                        className="h-5 w-5 mr-2"
                        aria-hidden="true"
                      />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Contact;
