import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './Login';
import PostBooking from './PostBooking';
import ItemPage from './itemPage';
import About from './About';
import FAQ from './FAQ';
import Contact from './Contact';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './termsAndCon';
import SignUp from './signUp';
import Profile from './Profile';
import ListingPage from './ListingPage';
import BookingPage from './BookingPage';
import NotFound from './NotFound';
import ItemPageUni from './itemPageUni';
import BookingPageUni from './BookingPageUni';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/PostBooking" element={<PostBooking />} />
        <Route path="/itemPage/:id" element={<ItemPage />} />
        <Route path="/itemPageUni/:id" element={<ItemPageUni />} />
        <Route path="/About" element={<About />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsAndCon" element={<TermsConditions />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ListingPage/:id" element={<ListingPage />} />
        <Route path="/BookingPage/:id" element={<BookingPage />} />
        <Route path="/BookingPageUni/:id" element={<BookingPageUni />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;