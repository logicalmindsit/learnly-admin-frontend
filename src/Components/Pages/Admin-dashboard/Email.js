// import React, { useEffect, useState } from "react";
// import axios from "../../../Utils/api";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const AdminEmails = () => {
//   const [adminEmails, setAdminEmails] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     fetchAdminEmails();
//   }, []);

//   const fetchAdminEmails = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       showSnackbar("Authentication token missing. Please login.", "error");
//       return;
//     }

//     try {
//       const response = await axios.get("/get-admins", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAdminEmails(response.data.map(admin => admin.email));
//     } catch (err) {
//       showSnackbar(
//         err.response?.data?.message || "Error fetching admin emails.",
//         "error"
//       );
//     }
//   };

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const styles = {
//     container: {
//       padding: "2rem",
//       maxWidth: "800px",
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     },
//     header: {
//       color: "#2c3e50",
//       marginBottom: "1.5rem",
//       fontSize: "1.8rem",
//       fontWeight: "600",
//       borderBottom: "2px solid #3498db",
//       paddingBottom: "0.5rem",
//     },
//     emailList: {
//       backgroundColor: "white",
//       borderRadius: "8px",
//       boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     emailItem: {
//       padding: "1rem",
//       borderBottom: "1px solid #e0e0e0",
//       color: "#34495e",
//       transition: "background-color 0.2s",
//     },
//     loading: {
//       color: "#7f8c8d",
//       textAlign: "center",
//       marginTop: "2rem",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>Admin Email List</h2>

//       {adminEmails.length > 0 ? (
//         <div style={styles.emailList}>
//           {adminEmails.map((email, index) => (
//             <div key={index} style={styles.emailItem}>
//               {email}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p style={styles.loading}>Loading admin emails...</p>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AdminEmails;
