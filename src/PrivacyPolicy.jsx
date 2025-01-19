import React from "react";
import Navbar from './ui/navbar';
import Footer from './ui/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#fdf9e4] py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">
            What personal data we collect and why we collect it
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
            <p className="text-gray-600">
              When visitors leave comments on the site we collect the data shown in the
              comments form, and also the visitor's IP address and browser user agent
              string to help spam detection.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Contact Forms</h3>
            <p className="text-gray-600">
              When you contact us using our contact forms, we collect and store the information
              you provide, including your name, email address, and message content. This information
              is used solely for the purpose of responding to your inquiries and maintaining a record
              of our communications.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Cookies</h3>
            <p className="text-gray-600">
              We use cookies to enhance your browsing experience. These cookies help us
              analyze site traffic and understand where our visitors come from.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Embedded Content from Other Websites
            </h3>
            <p className="text-gray-600">
              Articles on this site may include embedded content (e.g. videos, images,
              articles, etc.). Embedded content from other websites behaves in the exact
              same way as if the visitor has visited the other website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Who we share your data with
            </h2>
            <p className="text-gray-600">
              We ensure your data is protected and only share it with trusted partners
              when necessary for providing our services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              How long we retain your data
            </h2>
            <p className="text-gray-600">
              We retain your personal data only for as long as necessary to fulfill the
              purposes for which we collected it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              What rights you have over your data
            </h2>
            <p className="text-gray-600">
              You can request to receive a file of the personal data we hold about you,
              including any data you have provided to us. You can also request that we
              erase any personal data we hold about you.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;