import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import ResponseScreen from "./ResponseScreen";
import Footer from "./Footer";
import SignUpScreen from "./SignUpScreen";
import HomeScreen from "./HomeScreen";

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/registration/user/login" element={<LoginScreen />} />
        <Route path="/registration/user/signup" element={<SignUpScreen />} />
        <Route path="/registration/user/homescreen" element={<HomeScreen />} />
        <Route path="/registration/user/responsescreen" element={<ResponseScreen />} />
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
