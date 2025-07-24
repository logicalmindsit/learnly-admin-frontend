import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Home
import Login from "./Components/Login/login";
import AdminDashboard from "./Routes/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Login />} />
           {/* All admin dashboard pages go under this layout */}
          <Route path="/learnly/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
