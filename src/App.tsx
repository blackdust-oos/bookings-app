import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchFlights from "./pages/SearchFlights";
import SearchHotels from "./pages/hotels/SearchHotels";
import SearchActivities from "./pages/SearchActivities";
import Layout from "./Layout";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="flights" element={<SearchFlights />} />
          <Route path="hotels/*" element={<SearchHotels />} >

          </Route>
          <Route path="activities" element={<SearchActivities />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
