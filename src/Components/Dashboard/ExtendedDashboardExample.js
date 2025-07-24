import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardContent from "./DashboardContent";

/**
 * Extended Dashboard Example showing how to customize navigation paths
 * and add more interactive elements
 */
const ExtendedDashboardExample = () => {
  const navigate = useNavigate();

  // Custom navigation handlers (if you need more complex logic)
  const handleUserClick = () => {
    console.log("Navigating to users page...");
    navigate("/learnly/user-details");
  };

  const handleCourseClick = () => {
    console.log("Navigating to courses page...");
    navigate("/learnly/course-list");
  };

  // Example with custom data
  const customData = {
    totalUsers: 3500,
    totalCourses: 120,
    activeSubscriptions: 2800,
    completionRate: 94
  };

  return (
    <div>
      <h2>Extended Dashboard with Custom Navigation</h2>
      
      {/* Standard dashboard with built-in navigation */}
      <DashboardContent {...customData} />
      
      {/* Example of custom navigation buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        justifyContent: 'center',
        marginTop: '20px' 
      }}>
        <button 
          onClick={handleUserClick}
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Manage Users
        </button>
        
        <button 
          onClick={handleCourseClick}
          style={{
            padding: '12px 24px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Manage Courses
        </button>
      </div>
    </div>
  );
};

/**
 * Example showing how to programmatically navigate from parent components
 */
export const ProgrammaticNavigationExample = ({ onUserClick, onCourseClick }) => {
  return (
    <DashboardContent
      totalUsers={2500}
      totalCourses={95}
      activeSubscriptions={1800}
      completionRate={92}
    />
  );
};

export default ExtendedDashboardExample;
