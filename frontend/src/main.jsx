import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "./App.jsx";
import AnimatedAuth from "./Pages/AnimatedAuth.jsx";
import { AuthContext, AuthProvider } from "../Context/AuthContext.jsx";
import { Logout } from "./Pages/Logout.jsx";
import { Profile } from "./Pages/Profile.jsx";

const Root = () => {
  let { isLoggedIn, isLoading } = useContext(AuthContext);
  console.log(isLoggedIn)
  if(isLoading){
    console.log('wait')
    return "Wait"
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace/> : <AnimatedAuth page="login" />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <App /> : <AnimatedAuth page="signup" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route path="/logout" element={!isLoggedIn ? <App /> : <Logout />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);
