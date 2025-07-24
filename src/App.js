import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Home
import Login from "./Components/Login/login";
import AdminDashboard from "./Routes/AdminDashboard";

// Auth Components
import { AuthProvider, useAuth } from "./Components/Auth/AuthProvider";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import PublicRoute from "./Components/Auth/PublicRoute";
import AuthLoading from "./Components/Auth/AuthLoading";

const AppContent = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoading />;
  }

  return (
    <Routes>
      {/* Public Route - Login page */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* Protected Route - Admin dashboard pages */}
      <Route 
        path="/learnly/*" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
