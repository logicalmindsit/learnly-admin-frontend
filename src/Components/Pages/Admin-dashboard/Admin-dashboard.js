import React from "react";
import { useNavigate } from "react-router-dom";

const adminTools = [
  {
    name: "Add Admin",
    description:
      "Create and manage administrator accounts with full system privileges.",
    icon: "👨‍💼",
    path: "/learnly/create-admin",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Get Admin",
    description:
      "View and manage existing administrator profiles and permissions.",
    icon: "👥",
    path: "/learnly/admin-details",
    color: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
  },
  {
    name: "Admin Analytics",
    description: "Monitor and analyze system performance metrics and logs.",
    icon: "📊",
    path: "/learnly/admin-analytics",
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "Admin Emails",
    description: "Manage and view all administrator email communications.",
    icon: "📧",
    path: "/learnly/admin-emails",
    color: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
  },
];

const Admindashboard = () => {
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
                marginTop:"1rem",
                lineHeight: 1.2,
              }}
            >
              Admin Dashboard
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
              Powerful tools to manage your system efficiently
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
              {adminTools.map((tool, index) => (
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
                        Admin Feature
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

export default Admindashboard;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Mock data for dashboard stats - replace with actual API calls
// const dashboardStats = [
//   {
//     title: "Total Admins",
//     value: "24",
//     change: "+12%",
//     changeType: "positive",
//     icon: "👨‍💼",
//     color: "#3b82f6",
//     bgColor: "rgba(59, 130, 246, 0.1)",
//   },
//   {
//     title: "Active Sessions",
//     value: "18",
//     change: "+5%",
//     changeType: "positive", 
//     icon: "🟢",
//     color: "#10b981",
//     bgColor: "rgba(16, 185, 129, 0.1)",
//   },
//   {
//     title: "System Alerts",
//     value: "3",
//     change: "-2",
//     changeType: "negative",
//     icon: "⚠️",
//     color: "#f59e0b",
//     bgColor: "rgba(245, 158, 11, 0.1)",
//   },
//   {
//     title: "Email Queue",
//     value: "127",
//     change: "+23%",
//     changeType: "positive",
//     icon: "📧",
//     color: "#8b5cf6",
//     bgColor: "rgba(139, 92, 246, 0.1)",
//   },
// ];

// const quickActions = [
//   {
//     name: "Add New Admin",
//     description: "Create administrator account with custom permissions",
//     icon: "➕",
//     path: "/learnly/create-admin",
//     color: "#3b82f6",
//     priority: "high",
//   },
//   {
//     name: "View All Admins",
//     description: "Manage existing administrator profiles",
//     icon: "👥",
//     path: "/learnly/admin-details",
//     color: "#10b981",
//     priority: "medium",
//   },
//   {
//     name: "System Analytics",
//     description: "Monitor performance metrics and usage",
//     icon: "📊",
//     path: "/learnly/admin-analytics",
//     color: "#f59e0b",
//     priority: "medium",
//   },
//   {
//     name: "Email Management",
//     description: "Handle admin communications and notifications",
//     icon: "📧",
//     path: "/learnly/admin-emails",
//     color: "#8b5cf6",
//     priority: "low",
//   },
// ];

// const recentActivities = [
//   {
//     user: "John Smith",
//     action: "Created new admin account",
//     time: "2 minutes ago",
//     type: "create",
//   },
//   {
//     user: "Sarah Johnson",
//     action: "Updated system permissions",
//     time: "15 minutes ago", 
//     type: "update",
//   },
//   {
//     user: "System",
//     action: "Automated backup completed",
//     time: "1 hour ago",
//     type: "system",
//   },
//   {
//     user: "Mike Wilson",
//     action: "Sent notification emails",
//     time: "2 hours ago",
//     type: "email",
//   },
// ];

// const Admindashboard = () => {
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'create': return '➕';
//       case 'update': return '✏️';
//       case 'system': return '⚙️';
//       case 'email': return '📧';
//       default: return '📋';
//     }
//   };

//   const getActivityColor = (type) => {
//     switch (type) {
//       case 'create': return '#10b981';
//       case 'update': return '#3b82f6';
//       case 'system': return '#6b7280';
//       case 'email': return '#8b5cf6';
//       default: return '#64748b';
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//     }}>
//       {/* Top Navigation Bar */}
//       <nav style={{
//         background: "white",
//         borderBottom: "1px solid #e2e8f0",
//         padding: "1rem 2rem",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      
//         top: 0,
//         zIndex: 100,
//       }}>
//         <div style={{
//           maxWidth: "1440px",
//           margin: "0 auto",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <div style={{
//               width: "40px",
//               height: "40px",
//               background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
//               borderRadius: "8px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               marginRight: "1rem",
//             }}>
//               <span style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>L</span>
//             </div>
//             <div>
//               <h1 style={{
//                 fontSize: "1.5rem",
//                 fontWeight: 700,
//                 color: "#1e293b",
//                 margin: 0,
//               }}>
//                 Learnly Admin
//               </h1>
//               <p style={{
//                 fontSize: "0.875rem",
//                 color: "#64748b",
//                 margin: 0,
//               }}>
//                 System Administration Panel
//               </p>
//             </div>
//           </div>
          
//           <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
//             <div style={{ textAlign: "right" }}>
//               <div style={{
//                 fontSize: "1.125rem",
//                 fontWeight: 600,
//                 color: "#1e293b",
//                 fontFamily: "monospace",
//               }}>
//                 {formatTime(currentTime)}
//               </div>
//               <div style={{
//                 fontSize: "0.75rem",
//                 color: "#64748b",
//               }}>
//                 {formatDate(currentTime)}
//               </div>
//             </div>
            
//             <div style={{
//               width: "40px",
//               height: "40px",
//               background: "linear-gradient(135deg, #f59e0b, #d97706)",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//             }}>
//               <span style={{ color: "white", fontWeight: "bold" }}>A</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div style={{
//         maxWidth: "1440px",
//         margin: "0 auto",
//         padding: "2rem",
//         display: "grid",
//         gap: "2rem",
//       }}>
//         {/* Welcome Section */}
//         <section style={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           borderRadius: "16px",
//           padding: "2rem",
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//         }}>
//           <div style={{
//             position: "absolute",
//             top: "-50px",
//             right: "-50px",
//             width: "200px",
//             height: "200px",
//             background: "rgba(255,255,255,0.1)",
//             borderRadius: "50%",
//           }} />
//           <div style={{
//             position: "absolute",
//             bottom: "-30px",
//             left: "-30px",
//             width: "150px",
//             height: "150px",
//             background: "rgba(255,255,255,0.08)",
//             borderRadius: "50%",
//           }} />
          
//           <div style={{ position: "relative", zIndex: 2 }}>
//             <h2 style={{
//               fontSize: "2rem",
//               fontWeight: 800,
//               margin: "0 0 0.5rem 0",
//             }}>
//               Welcome back, Administrator! 👋
//             </h2>
//             <p style={{
//               fontSize: "1.1rem",
//               opacity: 0.9,
//               margin: "0 0 1.5rem 0",
//               maxWidth: "600px",
//             }}>
//               Your system is running smoothly. Here's what's happening in your admin panel today.
//             </p>
//             <div style={{
//               display: "flex",
//               gap: "1rem",
//               flexWrap: "wrap",
//             }}>
//               <button
//                 onClick={() => navigate("/learnly/create-admin")}
//                 style={{
//                   background: "rgba(255,255,255,0.2)",
//                   border: "1px solid rgba(255,255,255,0.3)",
//                   color: "white",
//                   padding: "0.75rem 1.5rem",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontWeight: 600,
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 Quick Add Admin
//               </button>
//               <button
//                 onClick={() => navigate("/learnly/admin-analytics")}
//                 style={{
//                   background: "transparent",
//                   border: "1px solid rgba(255,255,255,0.3)",
//                   color: "white",
//                   padding: "0.75rem 1.5rem",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontWeight: 600,
//                 }}
//               >
//                 View Analytics
//               </button>
//             </div>
//           </div>
//         </section>
//         {/* Dashboard Stats */}
//         <section>
//           <h3 style={{
//             fontSize: "1.25rem",
//             fontWeight: 700,
//             color: "#1e293b",
//             marginBottom: "1.5rem",
//             display: "flex",
//             alignItems: "center",
//           }}>
//             📊 System Overview
//           </h3>
//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//             gap: "1.5rem",
//             marginBottom: "2rem",
//           }}>
//             {dashboardStats.map((stat, index) => (
//               <div
//                 key={index}
//                 style={{
//                   background: "white",
//                   borderRadius: "12px",
//                   padding: "1.5rem",
//                   boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                   border: "1px solid #e2e8f0",
//                   transition: "all 0.2s ease",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-2px)";
//                   e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "flex-start",
//                   marginBottom: "1rem",
//                 }}>
//                   <div style={{
//                     width: "48px",
//                     height: "48px",
//                     background: stat.bgColor,
//                     borderRadius: "10px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "1.5rem",
//                   }}>
//                     {stat.icon}
//                   </div>
//                   <div style={{
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "0.25rem 0.75rem",
//                     borderRadius: "20px",
//                     background: stat.changeType === 'positive' ? '#dcfce7' : '#fef2f2',
//                     color: stat.changeType === 'positive' ? '#16a34a' : '#dc2626',
//                     fontSize: "0.875rem",
//                     fontWeight: 600,
//                   }}>
//                     {stat.changeType === 'positive' ? '↗️' : '↘️'} {stat.change}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 style={{
//                     fontSize: "2rem",
//                     fontWeight: 800,
//                     color: stat.color,
//                     margin: "0 0 0.5rem 0",
//                   }}>
//                     {stat.value}
//                   </h4>
//                   <p style={{
//                     fontSize: "0.875rem",
//                     color: "#64748b",
//                     margin: 0,
//                     fontWeight: 500,
//                   }}>
//                     {stat.title}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Quick Actions & Recent Activity */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "2fr 1fr",
//           gap: "2rem",
//           alignItems: "start",
//         }}>
//           {/* Quick Actions */}
//           <section>
//             <h3 style={{
//               fontSize: "1.25rem",
//               fontWeight: 700,
//               color: "#1e293b",
//               marginBottom: "1.5rem",
//               display: "flex",
//               alignItems: "center",
//             }}>
//               ⚡ Quick Actions
//             </h3>
//             <div style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: "1.5rem",
//             }}>
//               {quickActions.map((action, index) => (
//                 <div
//                   key={index}
//                   onClick={() => navigate(action.path)}
//                   style={{
//                     background: "white",
//                     borderRadius: "12px",
//                     padding: "1.5rem",
//                     boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//                     border: "1px solid #e2e8f0",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                     position: "relative",
//                     overflow: "hidden",
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = "translateY(-2px)";
//                     e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = "translateY(0)";
//                     e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
//                   }}
//                 >
//                   <div style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: "4px",
//                     height: "100%",
//                     background: action.color,
//                   }} />
                  
//                   <div style={{
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "space-between",
//                     marginBottom: "1rem",
//                   }}>
//                     <div style={{
//                       width: "48px",
//                       height: "48px",
//                       background: `${action.color}15`,
//                       borderRadius: "10px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "1.5rem",
//                     }}>
//                       {action.icon}
//                     </div>
//                     <div style={{
//                       padding: "0.25rem 0.75rem",
//                       borderRadius: "12px",
//                       background: action.priority === 'high' ? '#fef3c7' : 
//                                   action.priority === 'medium' ? '#dbeafe' : '#f3f4f6',
//                       color: action.priority === 'high' ? '#92400e' : 
//                              action.priority === 'medium' ? '#1e40af' : '#374151',
//                       fontSize: "0.75rem",
//                       fontWeight: 600,
//                       textTransform: "uppercase",
//                     }}>
//                       {action.priority}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h4 style={{
//                       fontSize: "1.125rem",
//                       fontWeight: 700,
//                       color: "#1e293b",
//                       margin: "0 0 0.5rem 0",
//                     }}>
//                       {action.name}
//                     </h4>
//                     <p style={{
//                       fontSize: "0.875rem",
//                       color: "#64748b",
//                       margin: "0 0 1rem 0",
//                       lineHeight: 1.5,
//                     }}>
//                       {action.description}
//                     </p>
//                     <div style={{
//                       display: "flex",
//                       alignItems: "center",
//                       color: action.color,
//                       fontSize: "0.875rem",
//                       fontWeight: 600,
//                     }}>
//                       Access Now →
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Recent Activity */}
//           <section>
//             <h3 style={{
//               fontSize: "1.25rem",
//               fontWeight: 700,
//               color: "#1e293b",
//               marginBottom: "1.5rem",
//               display: "flex",
//               alignItems: "center",
//             }}>
//               🕒 Recent Activity
//             </h3>
//             <div style={{
//               background: "white",
//               borderRadius: "12px",
//               boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               border: "1px solid #e2e8f0",
//               overflow: "hidden",
//             }}>
//               {recentActivities.map((activity, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     padding: "1rem 1.5rem",
//                     borderBottom: index < recentActivities.length - 1 ? "1px solid #f1f5f9" : "none",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "1rem",
//                   }}
//                 >
//                   <div style={{
//                     width: "32px",
//                     height: "32px",
//                     background: `${getActivityColor(activity.type)}15`,
//                     borderRadius: "8px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "1rem",
//                     flexShrink: 0,
//                   }}>
//                     {getActivityIcon(activity.type)}
//                   </div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <p style={{
//                       fontSize: "0.875rem",
//                       fontWeight: 600,
//                       color: "#1e293b",
//                       margin: "0 0 0.25rem 0",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                     }}>
//                       {activity.user}
//                     </p>
//                     <p style={{
//                       fontSize: "0.75rem",
//                       color: "#64748b",
//                       margin: "0 0 0.25rem 0",
//                     }}>
//                       {activity.action}
//                     </p>
//                     <p style={{
//                       fontSize: "0.75rem",
//                       color: "#94a3b8",
//                       margin: 0,
//                     }}>
//                       {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
              
//               <div style={{
//                 padding: "1rem 1.5rem",
//                 textAlign: "center",
//                 background: "#f8fafc",
//               }}>
//                 <button
//                   onClick={() => navigate("/learnly/activity-log")}
//                   style={{
//                     background: "transparent",
//                     border: "none",
//                     color: "#3b82f6",
//                     fontSize: "0.875rem",
//                     fontWeight: 600,
//                     cursor: "pointer",
//                   }}
//                 >
//                   View All Activity →
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* System Status Footer */}
//         <section style={{
//           background: "white",
//           borderRadius: "12px",
//           padding: "1.5rem",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           border: "1px solid #e2e8f0",
//           marginTop: "2rem",
//         }}>
//           <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "1rem",
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//               <div style={{
//                 width: "12px",
//                 height: "12px",
//                 background: "#10b981",
//                 borderRadius: "50%",
//                 animation: "pulse 2s infinite",
//               }} />
//               <span style={{
//                 fontSize: "0.875rem",
//                 color: "#64748b",
//                 fontWeight: 500,
//               }}>
//                 System Status: All services operational
//               </span>
//             </div>
            
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "2rem",
//               fontSize: "0.875rem",
//               color: "#64748b",
//             }}>
//               <span>Server Load: 23%</span>
//               <span>Memory: 1.2GB/4GB</span>
//               <span>Uptime: 99.9%</span>
//             </div>
//           </div>
//         </section>
//       </div>

//       <style>
//         {`
//           @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//           }
          
//           @media (max-width: 768px) {
//             nav {
//               padding: 1rem !important;
//             }
//             .dashboard-grid {
//               grid-template-columns: 1fr !important;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Admindashboard;
