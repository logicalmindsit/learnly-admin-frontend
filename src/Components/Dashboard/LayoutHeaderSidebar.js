import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, message } from "antd";
import io from "socket.io-client";
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  AuditOutlined,
  IdcardOutlined,
  CheckCircleOutlined,
  BellOutlined,
  FormOutlined,
  CrownOutlined,
  SnippetsOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import axios from "../../Utils/api";
import logo from "../../assets/logo.png";
import { Tooltip } from "antd";
import { Badge } from "antd";
import { hasAccess } from "../../Utils/roleBasedAccess";

const { Header, Sider } = Layout;

// Define menu items with role-based access
const menuItems = [
  {
    key: "1",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/learnly",
    roles: [
      "superadmin",
      "admin", 
      "boscontroller",
      "bosmembers",
      "datamaintenance",
      "coursecontroller",
      "markettingcontroller",
    ],
  },
  {
    key: "2",
    label: "Admin Users",
    icon: <CrownOutlined />,
    path: "/learnly/admin-users",
    roles: ["superadmin"],
  },
  {
    key: "3",
    label: "Users",
    icon: <UserOutlined />,
    path: "/learnly/users",
    roles: ["admin", "superadmin"],
  },
  {
    key: "4",
    label: "Courses",
    icon: <BookOutlined />,
    path: "/learnly/courses",
    roles: ["coursecontroller", "admin", "superadmin"],
  },
  {
    key: "5",
    label: "BOS (Board of Studies)",
    icon: <TeamOutlined />,
    path: "/learnly/bos",
    roles: ["boscontroller", "bosmembers", "superadmin"],
  },
  {
    key: "6",
    label: "Data Maintenance",
    icon: <DatabaseOutlined />,
    path: "/learnly/data-maintenance",
    roles: ["datamaintenance", "superadmin"],
  },
  {
    key: "7",
    label: "Institutional Board",
    icon: <AuditOutlined />,
    path: "/learnly/institutional-board",
    roles: ["superadmin"],
  },
  {
    key: "8",
    label: "DirectMeet Management",
    icon: <SnippetsOutlined />,
    path: "/learnly/direct-meet-management",
    roles: ["superadmin"],
  },
  {
    key: "9",
    label: "Document Verification",
    icon: <FileTextOutlined />,
    path: "/learnly/document-verification",
    roles: ["admin", "superadmin"],
  },
  {
    key: "10",
    label: "Marketing",
    icon: <ShoppingOutlined />,
    path: "/learnly/marketing-dashboard",
    roles: ["markettingcontroller", "superadmin"],
  },
  {
    key: "11",
    label: "Certificate Maintenance",
    icon: <IdcardOutlined />,
    path: "/learnly/certificate-maintenance",
    roles: ["admin", "superadmin"],
  },
  {
    key: "12",
    label: "Vote",
    icon: <CheckCircleOutlined />,
    path: "/learnly/vote",
    roles: ["boscontroller", "bosmembers", "superadmin"],
  },
  {
    key: "13",
    label: "Notifications",
    icon: <BellOutlined />,
    path: "/learnly/notifications",
    roles: ["superadmin", "admin", "boscontroller", "bosmembers", "datamaintenance", "coursecontroller", "markettingcontroller"],
  },
  {
    key: "14",
    label: "Feedback",
    icon: <FormOutlined />,
    path: "/learnly/feedback",
    roles: ["superadmin", "admin"],
  },
];

const LayoutHeaderSidebar = ({ collapsed, setCollapsed, children }) => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem("token");
    const baseSocketURL = axios.defaults.baseURL;

    const socket = io(baseSocketURL, {
      auth: {
        token: token,
      },
      transports: ["websocket", "polling"], // allow fallback to polling
    });

    // Listen for new notifications
    socket.on("newNotification", () => {
      fetchUnreadNotifications();
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchUnreadNotifications = async () => {
    try {
      const role = localStorage.getItem("role");
      const res = await axios.get(`/notifications?role=${role}`);
      const unread = res.data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();

    // Set up polling every 30 seconds to check for new notifications
    const interval = setInterval(() => {
      fetchUnreadNotifications();
    }, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Add global style to hide scrollbars
  useEffect(() => {
    const styleId = "scrollbar-hidden-style";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      .scrollbar-hidden::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hidden {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const routeKeys = {
      "/learnly": "1",
      "/learnly/admin-users": "2",
      "/learnly/users": "3",
      "/learnly/courses": "4",
      "/learnly/bos": "5",
      "/learnly/data-maintenance": "6",
      "/learnly/institutional-board": "7",
      "/learnly/direct-meet-management": "8",
      "/learnly/document-verification": "9",
      "/learnly/marketing-dashboard": "10",
      "/learnly/certificate-maintenance": "11",
      "/learnly/vote": "12",
      "/learnly/notifications": "13",
      "/learnly/feedback": "14",
    };

    const path = location.pathname;
    const key = routeKeys[path] || "1";
    setSelectedKey(key);
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Call logout API
      await axios.post(
        "/adminlogout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Use AuthProvider logout function
      logout();
      message.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API fails, force local logout using AuthProvider
      logout();
      navigate("/");

      message.error(
        error.response?.data?.message ||
          "Logout completed locally. Server session might not be recorded."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleMenuClick = (item) => {
    const selected = menuItems.find((menu) => menu.key === item.key);
    if (selected) {
      navigate(selected.path);
    }
  };

  // Get user role for filtering menu items
  const userRole = user?.role || localStorage.getItem("role");

  // Filter menu items based on user role using utility function
  const accessibleMenuItems = menuItems.filter((item) => 
    hasAccess(userRole, item.roles)
  );

  // Debug: Log role and accessible items (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('User Role:', userRole);
      console.log('Accessible Menu Items:', accessibleMenuItems.map(item => item.label));
    }
  }, [userRole, accessibleMenuItems]);

  // If user has no accessible menu items, show only dashboard
  const finalMenuItems = accessibleMenuItems.length > 0 ? accessibleMenuItems : [menuItems[0]];

  // Check if current route is accessible to user
  useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.path === currentPath);
    
    if (currentMenuItem && !hasAccess(userRole, currentMenuItem.roles)) {
      // User doesn't have access to current route, redirect to dashboard
      console.warn(`Access denied to ${currentPath} for role ${userRole}`);
      navigate("/learnly");
    }
  }, [location.pathname, userRole, navigate]);

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: "#fff",
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
          height: "100vh",
          position: "fixed",
          left: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
        }}
      >
        {/* Fixed Logo Section */}
        <div
          onClick={() => navigate("/learnly")}
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            background: "#001529",
            color: "white",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="Learnly Logo"
            style={{ width: "40px", marginRight: collapsed ? 0 : "10px" }}
          />
          {!collapsed && (
            <span
              style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}
            >
              Learnly Admin
            </span>
          )}
        </div>

        {/* Scrollable Menu Container */}
        <div
          className="scrollbar-hidden"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            height: "calc(100vh - 64px)",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{ borderRight: 0 }}
          >
            {finalMenuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            background: "#001529",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 90,
            height: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggleSidebar,
                style: { color: "#fff", fontSize: "18px" },
              }
            )}
            <span
              style={{
                color: "white",
                marginLeft: "16px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {(() => {
                const currentItem = finalMenuItems.find(item => item.key === selectedKey);
                return currentItem ? currentItem.label : "Dashboard";
              })()}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            {user ? (
              <>
                <Tooltip title="Notifications">
                  <div style={{ position: "relative", marginRight: "10px" }}>
                    <Badge
                      count={unreadCount}
                      size="small"
                      offset={[-2, 2]} // Adjust badge position slightly
                      style={{
                        backgroundColor: "#ef4444", // Tailwind's red-500
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "bold",
                        boxShadow: "0 0 0 1px white", // white border
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#1890ff",
                          cursor: "pointer",
                        }}
                        icon={<BellOutlined />}
                        onClick={() => {
                          // Check if user has access to notifications
                          const notificationsItem = menuItems.find(item => item.path === "/learnly/notifications");
                          if (notificationsItem && hasAccess(userRole, notificationsItem.roles)) {
                            navigate("/learnly/notifications");
                          }
                        }}
                      />
                    </Badge>
                  </div>
                </Tooltip>

                <Tooltip title="View Profile">
                  <Avatar
                    style={{ 
                      backgroundColor: "#1890ff", 
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                    icon={<UserOutlined />}
                    onClick={() => navigate("/learnly/profile")}
                  />
                </Tooltip>

                <span style={{ marginRight: "8px" }}>
                  {user?.name} - {user?.role}
                </span>

                <Tooltip title="Logout">
                  <LogoutOutlined
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    style={{
                      color: isLoggingOut ? "#ccc" : "#fff",
                      marginLeft: "20px",
                      cursor: isLoggingOut ? "not-allowed" : "pointer",
                      fontSize: "16px",
                    }}
                  />
                </Tooltip>
              </>
            ) : (
              <a href="/login" style={{ color: "white" }}>
                Login
              </a>
            )}
          </div>
        </Header>

        <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
      </Layout>
    </>
  );
};

export default LayoutHeaderSidebar;
