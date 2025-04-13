import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails.js"

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

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
