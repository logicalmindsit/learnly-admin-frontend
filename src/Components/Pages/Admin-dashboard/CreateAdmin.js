import React, { useState } from "react";
import axios from "../../../Utils/api";
import { FaEye, FaEyeSlash, FaUserShield, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
    conformpassword: "",
    gender: "male",
    role: "admin",
    bosDetails: {
      designation: "",
      joining_date: "",
      term_end: "",
    },
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    "superadmin",
    "admin",
    "boscontroller",
    "bosmembers",
    "datamaintenance",
    "coursecontroller",
    "markettingcontroller",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBOSChange = (e) => {
    setFormData({
      ...formData,
      bosDetails: {
        ...formData.bosDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.conformpassword) {
      return setError("Passwords do not match");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return setError("No auth token found. Please login.");
    }

    setLoading(true);

    try {
      const payload = { ...formData };

      if (!["bosmembers", "boscontroller"].includes(formData.role)) {
        delete payload.bosDetails;
      }

      const res = await axios.post("/createadmin", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        mobilenumber: "",
        password: "",
        conformpassword: "",
        role: "admin",
        bosDetails: {
          designation: "",
          joining_date: "",
          term_end: "",
        },
      });
      navigate("/learnly/admin-details");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Vibrant color theme styles
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f8ff 0%, #fff5f5 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    contentWrapper: {
      width: "100%",
      maxWidth: "1000px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      border: "2px solid #e0e7ff",
    },
    cardHeader: {
      background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
      color: "white",
      padding: "1.75rem 2rem",
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      borderBottom: "3px solid #fcd34d",
    },
    cardTitle: {
      fontSize: "1.75rem",
      fontWeight: "700",
      margin: 0,
      letterSpacing: "-0.5px",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    cardBody: {
      padding: "2.5rem",
      background: "linear-gradient(to bottom right, #f9fafb, #fdf2f8)",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1.75rem",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    formGroup: {
      marginBottom: "1.5rem",
      position: "relative",
    },
    label: {
      display: "block",
      fontSize: "0.9375rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.75rem",
      paddingLeft: "0.5rem",
      borderLeft: "3px solid #f59e0b",
    },
    input: {
      width: "100%",
      padding: "0.875rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid #e0e7ff",
      fontSize: "0.9375rem",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundColor: "#f8fafc",
      color: "#334155",
    },
    inputFocus: {
      outline: "none",
      borderColor: "#818cf8",
      boxShadow: "0 0 0 4px rgba(129, 140, 248, 0.15)",
      backgroundColor: "white",
    },
    select: {
      width: "100%",
      padding: "0.875rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid #e0e7ff",
      fontSize: "0.9375rem",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
      appearance: "none",
      backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 1rem center",
      backgroundSize: "1.25em",
    },
    passwordContainer: {
      position: "relative",
    },
    passwordToggle: {
      position: "absolute",
      right: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#94a3b8",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    passwordToggleHover: {
      color: "#ec4899",
    },
    submitButton: {
      width: "100%",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      border: "none",
      background: "linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)",
      color: "white",
      fontSize: "1.0625rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      marginTop: "1rem",
      boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(236, 72, 153, 0.2)",
    },
    submitButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(236, 72, 153, 0.3)",
    },
    submitButtonActive: {
      transform: "translateY(0)",
      boxShadow: "0 2px 4px 0px rgba(59, 130, 246, 0.3)",
    },
    submitButtonDisabled: {
      opacity: "0.8",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
      background: "linear-gradient(135deg, #93c5fd 0%, #f9a8d4 100%)",
    },
    spinner: {
      animation: "spin 1s linear infinite",
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    message: {
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      fontSize: "0.9375rem",
      marginTop: "1.5rem",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    successMessage: {
      backgroundColor: "rgba(187, 247, 208, 0.3)",
      color: "#065f46",
      border: "2px solid #6ee7b7",
    },
    errorMessage: {
      backgroundColor: "rgba(254, 202, 202, 0.3)",
      color: "#991b1b",
      border: "2px solid #fca5a5",
    },
    bosDetailsSection: {
      gridColumn: "1 / -1",
      borderTop: "2px dashed #e0e7ff",
      paddingTop: "1.75rem",
      marginTop: "1rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#3b82f6",
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    iconWrapper: {
      background: "#fef3c7",
      borderRadius: "50%",
      padding: "0.5rem",
      display: "inline-flex",
      color: "#d97706",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconWrapper}>
              <FaUserShield size={24} />
            </div>
            <h2 style={styles.cardTitle}>Create New Administrator</h2>
          </div>
          
          <div style={styles.cardBody}>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                {/* Name */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{...styles.input, ':focus': styles.inputFocus}}
                  />
                </div>

                {/* Email */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{...styles.input, ':focus': styles.inputFocus}}
                  />
                </div>

                {/* Mobile Number */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Mobile Number</label>
                  <input
                    name="mobilenumber"
                    placeholder="+91 0000000000"
                    value={formData.mobilenumber}
                    onChange={handleChange}
                    required
                    style={{...styles.input, ':focus': styles.inputFocus}}
                  />
                </div>

                {/* Gender */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    style={{...styles.select, ':focus': styles.inputFocus}}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Role */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{...styles.select, ':focus': styles.inputFocus}}
                  >
                    {roles.map((role) => (
                      <option value={role} key={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BOS Details Section */}
                {["bosmembers", "boscontroller"].includes(formData.role) && (
                  <div style={{...styles.bosDetailsSection}}>
                    <h3 style={styles.sectionTitle}>
                      <span style={styles.iconWrapper}>
                        <FaUserShield size={16} />
                      </span>
                      Board of Studies Details
                    </h3>
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Designation</label>
                        <input
                          name="designation"
                          placeholder="Professor / Industry Expert"
                          value={formData.bosDetails.designation}
                          onChange={handleBOSChange}
                          required
                          style={{...styles.input, ':focus': styles.inputFocus}}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Joining Date</label>
                        <input
                          type="date"
                          name="joining_date"
                          value={formData.bosDetails.joining_date}
                          onChange={handleBOSChange}
                          required
                          style={{...styles.input, ':focus': styles.inputFocus}}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Term End Date</label>
                        <input
                          type="date"
                          name="term_end"
                          value={formData.bosDetails.term_end}
                          onChange={handleBOSChange}
                          required
                          style={{...styles.input, ':focus': styles.inputFocus}}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Password */}
                <div style={{...styles.formGroup, ...styles.fullWidth}}>
                  <label style={styles.label}>Password</label>
                  <div style={styles.passwordContainer}>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{...styles.input, ':focus': styles.inputFocus}}
                    />
                    <span
                      style={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseEnter={(e) => e.target.style.color = styles.passwordToggleHover.color}
                      onMouseLeave={(e) => e.target.style.color = styles.passwordToggle.color}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div style={{...styles.formGroup, ...styles.fullWidth}}>
                  <label style={styles.label}>Confirm Password</label>
                  <div style={styles.passwordContainer}>
                    <input
                      name="conformpassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.conformpassword}
                      onChange={handleChange}
                      required
                      style={{...styles.input, ':focus': styles.inputFocus}}
                    />
                    <span
                      style={styles.passwordToggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseEnter={(e) => e.target.style.color = styles.passwordToggleHover.color}
                      onMouseLeave={(e) => e.target.style.color = styles.passwordToggle.color}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.submitButtonDisabled : {}),
                  ':hover': !loading ? styles.submitButtonHover : {},
                  ':active': !loading ? styles.submitButtonActive : {}
                }}
                disabled={loading}
                onMouseEnter={(e) => !loading && (e.target.style.transform = styles.submitButtonHover.transform)}
                onMouseLeave={(e) => !loading && (e.target.style.transform = 'none')}
                onMouseDown={(e) => !loading && (e.target.style.transform = styles.submitButtonActive.transform)}
                onMouseUp={(e) => !loading && (e.target.style.transform = styles.submitButtonHover.transform)}
              >
                {loading ? (
                  <>
                    <FaSpinner style={styles.spinner} /> Creating Admin...
                  </>
                ) : (
                  "Create Administrator"
                )}
              </button>

              {/* Feedback Messages */}
              {message && (
                <div style={{...styles.message, ...styles.successMessage}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#10B981"/>
                  </svg>
                  {message}
                </div>
              )}
              {error && (
                <div style={{...styles.message, ...styles.errorMessage}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#EF4444"/>
                  </svg>
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;