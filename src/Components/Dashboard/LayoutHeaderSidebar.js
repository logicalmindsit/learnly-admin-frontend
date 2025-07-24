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
import axios from "../../Utils/api";
import logo from "../../assets/logo.png";
import { Tooltip } from "antd";
import { Badge } from "antd";

const { Header, Sider } = Layout;

const LayoutHeaderSidebar = ({ collapsed, setCollapsed, children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedName) setUserName(storedName);
    if (storedRole) setUserRole(storedRole);
    if (!storedToken) setIsLoggedIn(false);
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
      "/learnly/marketing": "10",
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
      const token = localStorage.getItem("token");
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

      // Clear local storage and state
      localStorage.clear();
      setIsLoggedIn(false);
      message.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      // Even if API fails, force local logout
      localStorage.clear();
      setIsLoggedIn(false);
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
    const routes = {
      1: "/learnly",
      2: "/learnly/admin-users",
      3: "/learnly/users",
      4: "/learnly/courses",
      5: "/learnly/bos",
      6: "/learnly/data-maintenance",
      7: "/learnly/institutional-board",
      8: "/learnly/direct-meet-management",
      9: "/learnly/document-verification",
      10: "/learnly/marketing",
      11: "/learnly/certificate-maintenance",
      12: "/learnly/vote",
      13: "/learnly/notifications",
      14: "/learnly/feedback",

      //cot
      //directmeet
    };
    navigate(routes[item.key]);
  };

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
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<CrownOutlined />}>
              Admin Users
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Users
            </Menu.Item>
            <Menu.Item key="4" icon={<BookOutlined />}>
              Courses
            </Menu.Item>
            <Menu.Item key="5" icon={<TeamOutlined />}>
              BOS (Board of Studies)
            </Menu.Item>
            <Menu.Item key="6" icon={<DatabaseOutlined />}>
              Data Maintenance
            </Menu.Item>
            <Menu.Item key="7" icon={<AuditOutlined />}>
              Institutional Board
            </Menu.Item>
            <Menu.Item key="8" icon={<SnippetsOutlined />}>
              DirectMeet Management
            </Menu.Item>
            <Menu.Item key="9" icon={<FileTextOutlined />}>
              Document Verification
            </Menu.Item>
            <Menu.Item key="10" icon={<ShoppingOutlined />}>
              Marketing
            </Menu.Item>
            <Menu.Item key="11" icon={<IdcardOutlined />}>
              Certificate Maintenance
            </Menu.Item>
            <Menu.Item key="12" icon={<CheckCircleOutlined />}>
              Vote
            </Menu.Item>
            <Menu.Item key="13" icon={<BellOutlined />}>
              Notifications
            </Menu.Item>
            <Menu.Item key="14" icon={<FormOutlined />}>
              Feedback
            </Menu.Item>
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
                const titles = {
                  1: "Dashboard",
                  2: "Admin Users",
                  3: "Users",
                  4: "Courses",
                  5: "BOS (Board of Studies)",
                  6: "Data Maintenance",
                  7: "Institutional Board",
                  8: "DirectMeet Management",
                  9: "Document Verification",
                  10: "Marketing",
                  11: "Certificate Maintenance",
                  12: "Vote",
                  13: "Notifications",
                  14: "Feedback",
                };
                return titles[selectedKey] || "Dashboard";
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
            {isLoggedIn ? (
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
                        onClick={() => navigate("/learnly/notifications")}
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
                  {userName} - {userRole}
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
