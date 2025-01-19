import React from "react";
import Navbar from './ui/navbar';
import Footer from './ui/Footer';

const TermsConditions = () => {
  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-[#fdf9e4] pb-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Terms and Conditions
            </h1>
            <p className="text-gray-600 mb-8">
                Please read these terms and conditions carefully before using our services.
            </p>
            </div>

            <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Definitions</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>"Service" refers to the services provided through our website</li>
                <li>"User" refers to any person accessing or using our services</li>
                <li>"Content" refers to all materials and information available on our website</li>
                <li>"Account" refers to the registered user profile on our platform</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Use of the Website</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Users must be at least 18 years old to use our services</li>
                <li>Users are responsible for maintaining their account security</li>
                <li>We reserve the right to modify or discontinue services without notice</li>
                <li>Users must provide accurate and complete information when using our services</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Booking Process</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All bookings are subject to availability</li>
                <li>Confirmation will be sent via email upon successful booking</li>
                <li>Users must provide valid contact information for booking</li>
                <li>Modifications to bookings may be subject to additional charges</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Prices and Payments</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All prices are listed in the specified currency</li>
                <li>Payments must be made through approved payment methods</li>
                <li>Prices may change without prior notice</li>
                <li>Additional fees may apply for specific services</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 5. Cancellations and Refunds</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Cancellation policies vary by service type</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>Some bookings may be non-refundable</li>
                <li>Processing times for refunds may vary</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 6. User Responsibilities</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Users must comply with all applicable laws and regulations</li>
                <li>Users are responsible for their account activities</li>
                <li>Content posted must be accurate and appropriate</li>
                <li>Users must respect other users' privacy and rights</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 7. Prohibited Activities</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>No unauthorized access to our systems</li>
                <li>No distribution of malicious content</li>
                <li>No impersonation of others</li>
                <li>No interference with service operations</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 8. Intellectual Property</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All content is protected by copyright laws</li>
                <li>Users may not reproduce content without permission</li>
                <li>Trademarks and logos are property of the company</li>
                <li>User-generated content rights are specified in our policies</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 9. Limitation of Liability</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>We are not liable for indirect damages</li>
                <li>Service interruptions may occur without notice</li>
                <li>No warranty for third-party services</li>
                <li>Users assume risks of online transactions</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 10. Indemnification</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Users must indemnify us against third-party claims</li>
                <li>Legal fees coverage in case of violations</li>
                <li>Cooperation required in legal proceedings</li>
                <li>Immediate notification of potential claims required</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 11. Changes to these Terms</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Terms may be updated without prior notice</li>
                <li>Users will be notified of significant changes</li>
                <li>Continued use implies acceptance of changes</li>
                <li>Regular review of terms is recommended</li>
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Seaction 12. Governing Law</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Terms governed by applicable local laws</li>
                <li>Disputes subject to exclusive jurisdiction</li>
                <li>Invalid provisions shall be replaced</li>
                <li>Legal notices must be in writing</li>
                </ul>
            </div>
            </div>
        </div>
        </div>
        <Footer></Footer>
    </>
  );
};

export default TermsConditions;
