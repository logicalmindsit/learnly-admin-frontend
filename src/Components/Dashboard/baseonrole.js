import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, message, Tooltip } from "antd";
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
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../Utils/api";
import logo from "../../assets/logo.png";

const { Header, Sider } = Layout;

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
    roles: ["boscontroller", "superadmin"],
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
    path: "/learnly/DirectMeetManagement",
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
    label: "Certificate Maintenance",
    icon: <IdcardOutlined />,
    path: "/learnly/certificate-maintenance",
    roles: ["admin", "superadmin"],
  },
  {
    key: "11",
    label: "Vote",
    icon: <CheckCircleOutlined />,
    path: "/learnly/vote",
    roles: ["superadmin"],
  },
  {
    key: "12",
    label: "Notifications",
    icon: <BellOutlined />,
    path: "/learnly/notifications",
    roles: ["superadmin", "admin"],
  },
  {
    key: "13",
    label: "Feedback",
    icon: <FormOutlined />,
    path: "/learnly/feedback",
    roles: ["superadmin", "admin"],
  },
];

const LayoutHeaderSidebar = ({ collapsed, setCollapsed, children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const styleId = "scrollbar-hidden-style";
    if (!document.getElementById(styleId)) {
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
    }
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (name) setUserName(name);
    if (role) setUserRole(role);
    if (!token) setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const found = menuItems.find((item) => item.path === currentPath);
    if (found) setSelectedKey(found.key);
  }, [location]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (item) => {
    const selected = menuItems.find((menu) => menu.key === item.key);
    if (selected) {
      navigate(selected.path);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      await axios.post(
        "/adminlogout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.clear();
      setIsLoggedIn(false);
      message.success("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
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

  const pageTitle =
    menuItems.find((item) => item.key === selectedKey)?.label || "Dashboard";

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
            {menuItems
              .filter((item) => item.roles.includes(userRole))
              .map((item) => (
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
          <div style={{ display: "flex", alignItems: "center" }}>
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
              {pageTitle}
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
                <Avatar
                  style={{ backgroundColor: "#1890ff", marginRight: "10px" }}
                  icon={<UserOutlined />}
                />
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
