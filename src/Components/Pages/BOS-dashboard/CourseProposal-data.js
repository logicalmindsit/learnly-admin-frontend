import React, { useEffect, useState } from "react";
import axios from "../../../Utils/api";
import { Button, Spin, message, Tag } from "antd";

const ViewCourseProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await axios.get("/getproposal");
      setProposals(response.data);
    } catch (err) {
      message.error("Failed to fetch proposals.");
    } finally {
      setLoading(false);
    }
  };

  const openBase64PDF = (base64Data) => {
    const base64 = base64Data.replace(/^data:application\/pdf;base64,/, "");
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "#52c41a"; // green
      case "rejected":
        return "#f5222d"; // red
      case "pending":
        return "#faad14"; // yellow
      default:
        return "#1890ff"; // blue
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" tip="Loading proposals..." />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Course Proposals</h1>

      {proposals.length === 0 ? (
        <div style={styles.emptyState}>
          <img
            src="https://img.icons8.com/fluent/96/000000/document.png"
            alt="No proposals"
            style={styles.emptyImage}
          />
          <p style={styles.emptyText}>No course proposals found</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {proposals.map((proposal) => (
            <div key={proposal.Proposal_id} style={styles.cardContainer}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>
                 {proposal.Proposal_id}
                </h3>
                <Tag color={getStatusColor(proposal.status)} style={styles.tag}>
                  {proposal.status}
                </Tag>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.detailItem}>
                  <span style={styles.label}>Title:</span>
                  <span style={styles.value}>{proposal.title}</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.label}>Description:</span>
                  <span style={styles.value}>{proposal.description}</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.label}>Department:</span>
                  <span style={styles.value}>{proposal.department}</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.label}>Submitted By:</span>
                  <span style={styles.value}>{proposal.Proposal_by}</span>
                </div>

                <div style={styles.detailItem}>
                  <span style={styles.label}>document_link:</span>
                  <span style={styles.value}>
                    {proposal.document_link || "N/A"}
                  </span>
                </div>

                <div style={styles.buttonGroup}>
                  {proposal.document_link && (
                    <Button
                      type="primary"
                      shape="round"
                      style={styles.blueButton}
                      onClick={() =>
                        window.open(proposal.document_link, "_blank")
                      }
                    >
                      Open Document Link
                    </Button>
                  )}

                  {proposal.pdf_file && (
                    <Button
                      type="primary"
                      shape="round"
                      style={styles.pinkButton}
                      onClick={() => openBase64PDF(proposal.pdf_file)}
                    >
                      Open PDF
                    </Button>
                  )}
                </div>
              </div>

              <div style={styles.cardFooter}>
                <span style={styles.dateText}>
                  Submitted On:{" "}
                  {new Date(proposal.submited_on).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
     color: "#2c3e50",
      marginBottom: "1.5rem",
      fontSize: "1.8rem",
      fontWeight: "600",
      borderBottom: "2px solid #3498db",
      paddingBottom: "0.5rem",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  emptyImage: {
    marginBottom: "20px",
    opacity: "0.7",
  },
  emptyText: {
    fontSize: "1.2rem",
    color: "#6c757d",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "25px",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderTop: "4px solid #1890ff",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardHeader: {
    padding: "20px",
    borderBottom: "1px solid #f0f0f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafdff",
  },
  cardTitle: {
    margin: "0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2c3e50",
  },
  tag: {
    fontWeight: "600",
    fontSize: "0.8rem",
    padding: "4px 10px",
    borderRadius: "20px",
    marginLeft: "10px",
  },
  cardBody: {
    padding: "20px",
    flex: "1",
  },
  detailItem: {
    marginBottom: "12px",
  },
  label: {
    fontWeight: "600",
    color: "#1890ff",
    display: "inline-block",
    minWidth: "120px",
  },
  value: {
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  blueButton: {
    backgroundColor: "#1890ff",
    border: "none",
    fontWeight: "500",
  },
  pinkButton: {
    backgroundColor: "#ff69b4",
    border: "none",
    fontWeight: "500",
  },
  cardFooter: {
    padding: "15px 20px",
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #f0f0f0",
    textAlign: "right",
  },
  dateText: {
    fontSize: "0.8rem",
    color: "#888",
  },
};

export default ViewCourseProposals;
