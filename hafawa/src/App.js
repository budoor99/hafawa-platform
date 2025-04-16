import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";

import DestinationDetails from "./pages/DestinationDetails.js";
import Profile from "./pages/Profile.js";
import TourGuide from "./pages/TourGuide.js"
import TourGuideProfile from "./pages/TourGuideProfile.js"
import RegisterTourGuide from "./pages/Apply";
import RegisterDetails from "./pages/ApplyDetails.js";
import DetailedHostProfile from "./pages/DetailedHostProfile.js";
import TourGuideDashboard from "./pages/TourGuideDashboard.js";
import AboutUs from "./pages/AboutUs.js";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/content" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tour-guides" element={<TourGuide />} />
            <Route path="/tour-guides/:id" element={<TourGuideProfile />} />
            <Route path="/apply" element={<RegisterTourGuide />} />
            <Route path="/apply/details" element={<RegisterDetails />} />
            <Route path="/dashboard" element={<TourGuideDashboard />} />
            <Route path="/host/:hostId" element={<DetailedHostProfile/>} />
            <Route path="/about" element={<AboutUs/>} />

            

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
