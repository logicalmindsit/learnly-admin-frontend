import React from "react";
import { useNavigate } from "react-router-dom";

const dataMaintenanceTools = [
  {
    name: "Direct Meet Fees Record",
    description: "Track and manage fees collected during direct meet sessions.",
    icon: "💰",
    path: "/learnly/direct-meet-fees",
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Monthly Meet Fees Record",
    description: "Manage monthly subscription fees for regular meet sessions.",
    icon: "📅",
    path: "/learnly/monthly-fees",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Direct Meet Study Material",
    description: "Organize and distribute study materials for direct meets.",
    icon: "📚",
    path: "/learnly/meet-materials",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "Course Completion Certificate",
    description: "Generate and manage course completion certificates.",
    icon: "🏆",
    path: "/learnly/completion-certificates",
    color: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
  },
  {
    name: "Participant Certificate",
    description: "Create and track participant certificates for events.",
    icon: "📜",
    path: "/learnly/participant-certificates",
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "Exam Mark Record",
    description: "Maintain and analyze student examination results.",
    icon: "📊",
    path: "/learnly/exam-marks-records",
    color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
  {
    name: "Staff Management",
    description: "Manage faculty and staff records and assignments.",
    icon: "👨‍🏫",
    path: "/learnly/staff-management",
    color: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    name: "Student Complaint",
    description: "Record and resolve student complaints and feedback.",
    icon: "📢",
    path: "/learnly/student-complaints",
    color: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
  },
  {
    name: "Student Info",
    description: "Comprehensive database of student profiles and details.",
    icon: "👨‍🎓",
    path: "/learnly/student-details-management",
    color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  },
  {
    name: "Direct Meet Practical Class Record",
    description: "Track practical sessions conducted in direct meets.",
    icon: "🔬",
    path: "/learnly/practical-classes",
    color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  }
];

const DataMaintenanceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "2rem 1rem",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <header
            style={{
              marginBottom: "3rem",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                fontWeight: 800,
                color: "#1e293b",
                marginBottom: "1.5rem",
                marginTop: "1rem",
                lineHeight: 1.2,
              }}
            >
              Data Maintenance Dashboard
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#64748b",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Central hub for managing all institutional records and data
            </p>
          </header>

          {/* Main Content */}
          <main>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                padding: "0 1rem",
              }}
            >
              {dataMaintenanceTools.map((tool, index) => (
                <div
                  key={index}
                  onClick={() => navigate(tool.path)}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid #e2e8f0",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      borderColor: "#cbd5e1",
                    },
                  }}
                >
                  {/* Color accent */}
                  <div
                    style={{
                      height: "8px",
                      background: tool.color,
                      width: "100%",
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      padding: "1.75rem",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                        marginBottom: "1.5rem",
                        boxShadow:
                          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                      }}
                    >
                      {tool.icon}
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <h2
                        style={{
                          color: "#1e293b",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          margin: "0 0 0.75rem 0",
                          lineHeight: 1.3,
                        }}
                      >
                        {tool.name}
                      </h2>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {tool.description}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 500,
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ marginRight: "6px" }}
                        >
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 8l.01 0"></path>
                          <path d="M11 12l1 0l4 0"></path>
                        </svg>
                        Data Module
                      </span>
                      <button
                        style={{
                          background: "transparent",
                          color: "#334155",
                          border: "1px solid #cbd5e1",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          ":hover": {
                            background: "#f1f5f9",
                            borderColor: "#94a3b8",
                          },
                        }}
                      >
                        Open
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ marginLeft: "6px" }}
                        >
                          <path d="M5 12h14"></path>
                          <path d="M13 18l6 -6"></path>
                          <path d="M13 6l6 6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DataMaintenanceDashboard;