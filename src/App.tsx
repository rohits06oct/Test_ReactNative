import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Footer from "./Footer";

const AppContent = () => {
  const location = useLocation();
  
  return (
    <>
      <Routes>
        <Route path="/registration/user/login" element={<LoginScreen />} />
      </Routes>
      
      {/* Show Footer only on home ("/") route */}
      {location.pathname === "/" && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
