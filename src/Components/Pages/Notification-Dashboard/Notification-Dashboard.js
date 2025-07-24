import React, { useEffect, useState, useCallback } from "react";
import axios from "../../../Utils/api";
import { FaCheck, FaBell, FaRegBell } from "react-icons/fa";
import { Spin, message } from "antd";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const userRole = localStorage.getItem("role");

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/notifications?role=${userRole}`);
      setNotifications(res.data);
    } catch (err) {
      message.error("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      message.error("Failed to mark as read.");
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`/notifications/mark-all-read?role=${userRole}`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      message.success("All notifications marked as read");
    } catch (err) {
      message.error("Failed to mark all as read.");
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.isRead;
    if (activeTab === "read") return notification.isRead;
    return true;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerIconWrapper}>
            <FaBell style={styles.headerIcon} />
            {notifications.some((n) => !n.isRead) && (
              <div style={styles.unreadBadge}>
                {notifications.filter((n) => !n.isRead).length}
              </div>
            )}
          </div>
          <h2 style={styles.headerTitle}>Notifications</h2>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "all" && styles.activeTab),
            }}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "unread" && styles.activeTab),
            }}
            onClick={() => setActiveTab("unread")}
          >
            Unread
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === "read" && styles.activeTab),
            }}
            onClick={() => setActiveTab("read")}
          >
            Read
          </button>
          <button
            style={styles.markAllButton}
            onClick={markAllAsRead}
            disabled={!notifications.some((n) => !n.isRead)}
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div style={styles.emptyState}>
            <FaRegBell style={styles.emptyIcon} />
            <p style={styles.emptyText}>
              {activeTab === "unread"
                ? "No unread notifications"
                : activeTab === "read"
                ? "No read notifications"
                : "No notifications yet"}
            </p>
          </div>
        ) : (
          <div style={styles.notificationsList}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                style={{
                  ...styles.notificationItem,
                  ...(!notification.isRead && styles.unreadNotification),
                }}
              >
                <div style={styles.notificationDot}></div>
                <div style={styles.notificationContent}>
                  <div style={styles.notificationHeader}>
                    <h3 style={styles.notificationTitle}>
                      {notification.title}
                    </h3>
                    <span style={styles.notificationTime}>
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p style={styles.notificationMessage}>
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      style={styles.readButton}
                    >
                      <FaCheck style={styles.readIcon} />
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    padding: "24px",
    borderBottom: "1px solid #f0f0f0",
    backgroundColor: "#f9fafb",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  },
  headerIconWrapper: {
    position: "relative",
    display: "inline-block",
    marginRight: "12px",
  },
  headerIcon: {
    fontSize: "24px",
    color: "#4f46e5",
  },
  unreadBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    backgroundColor: "#EF4444",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    minWidth: "18px",
    height: "18px",
    padding: "0 5px",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 2px white",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
    margin: "0",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "4px",
  },
  tabButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "transparent",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  activeTab: {
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
  },
  markAllButton: {
    marginLeft: "auto",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  content: {
    padding: "16px 0",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 0",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "48px",
    color: "#d1d5db",
    marginBottom: "16px",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: "16px",
    margin: "0",
  },
  notificationsList: {
    maxHeight: "600px",
    overflowY: "auto",
  },
  notificationItem: {
    display: "flex",
    padding: "16px 24px",
    transition: "background-color 0.2s ease",
  },
  unreadNotification: {
    backgroundColor: "#f5f3ff",
  },
  notificationDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    marginTop: "8px",
    marginRight: "16px",
    flexShrink: "0",
  },
  notificationContent: {
    flex: "1",
  },
  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px",
  },
  notificationTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    margin: "0",
  },
  notificationTime: {
    fontSize: "13px",
    color: "#9ca3af",
    whiteSpace: "nowrap",
    marginLeft: "12px",
  },
  notificationMessage: {
    fontSize: "14px",
    color: "#4b5563",
    margin: "0 0 12px 0",
    lineHeight: "1.5",
  },
  readButton: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    color: "#4b5563",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
  },
  readIcon: {
    fontSize: "12px",
    marginRight: "6px",
    color: "#4f46e5",
  },
};

export default Notifications;
