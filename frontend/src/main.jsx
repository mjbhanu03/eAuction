import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import App from "./App.jsx";
import SignUpPage from "./Pages/SignUp.jsx";
import AnimatedAuth from "./Pages/AnimatedAuth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<AnimatedAuth page="login" />} />
        <Route path="/signup" element={<AnimatedAuth page="signup" />} />
        {/* <Route path="/auth" element={<AnimatedAuth />} /> */}
      </Routes>
    </Router>
  </StrictMode>
);
