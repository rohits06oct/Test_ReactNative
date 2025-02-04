import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Footer from "./Footer";
import SignUpScreen from "./SignUpScreen";

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/registration/user/login" element={<LoginScreen />} />
      </Routes>

      <Routes>
        <Route path="/registration/user/signup" element={<SignUpScreen />} />
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
