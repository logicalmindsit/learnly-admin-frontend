import React, { useState } from "react";

const CourseCompletionCertificate = () => {
  const [formData, setFormData] = useState({
    studentName: "Raja Kumar",
    studentId: "STU2023001",
    courseId: "AYUR101",
    courseName: "Ayurveda Basics",
    completionDate: "2023-06-15",
    instituteName: "Learnly Academy",
    directorName: "Abubakar Siddhik",
  });

  const courses = [
    { id: "SID101", name: "Siddha Fundamentals" },
    { id: "AYUR101", name: "Ayurveda Basics" },
    { id: "YOGA101", name: "Yoga Therapy" },
    { id: "VARMA101", name: "Varma Kalai Techniques" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = courses.find(
      (course) => course.id === e.target.value
    );
    setFormData((prev) => ({
      ...prev,
      courseId: e.target.value,
      courseName: selectedCourse ? selectedCourse.name : "",
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Styles
  const styles = {
    app: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Times New Roman', serif",
      background: "#f8f9fa",
    },
    formContainer: {
      flex: 1,
      minWidth: "300px",
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      border: "2px solid #4cc9f0",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#4361ee",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      boxSizing: "border-box",
      backgroundColor: "#f8f9fa",
    },
    certificateContainer: {
      flex: 2,
      minWidth: "500px",
    },
    certificate: {
      position: "relative",
      background: "white",
      padding: "40px",
      border: "15px double",
      borderImage:
        "linear-gradient(45deg, #4361ee, #4cc9f0, #f72585, #ffd166) 1",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
      marginBottom: "20px",
      textAlign: "center",
      backgroundImage:
        "linear-gradient(to bottom, rgba(255,209,102,0.1), rgba(76,201,240,0.1))",
    },
    header: {
      marginBottom: "30px",
    },
    headerH1: {
      background: "linear-gradient(90deg, #4361ee, #f72585)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "32px",
      marginBottom: "10px",
      borderBottom: "2px solid #ffd166",
      paddingBottom: "10px",
    },
    intro: {
      fontSize: "18px",
      marginBottom: "10px",
      color: "#4361ee",
    },
    studentName: {
      background: "linear-gradient(90deg, #f72585, #4cc9f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "36px",
      margin: "20px 0",
      textDecoration: "underline wavy #ffd166",
    },
    details: {
      fontSize: "16px",
      margin: "10px 0",
      color: "#4361ee",
    },
    courseName: {
      color: "#f72585",
      fontSize: "26px",
      margin: "20px 0",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    completionDate: {
      fontSize: "16px",
      margin: "20px 0",
      fontStyle: "italic",
      color: "#4cc9f0",
      fontWeight: "bold",
    },
    signatures: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "50px",
      background:
        "linear-gradient(90deg, rgba(255,209,102,0.2), rgba(76,201,240,0.2))",
      padding: "20px",
      borderRadius: "8px",
    },
    signature: {
      textAlign: "center",
    },
    signatureLine: {
      width: "200px",
      height: "2px",
      background: "linear-gradient(90deg, #4361ee, #f72585)",
      margin: "0 auto 10px",
    },
    footer: {
      marginTop: "40px",
      fontSize: "14px",
      color: "#4361ee",
      borderTop: "1px dashed #ffd166",
      paddingTop: "10px",
    },
    printButton: {
      display: "block",
      width: "100%",
      padding: "12px",
      background: "linear-gradient(90deg, #4361ee, #4cc9f0)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "linear-gradient(90deg, #f72585, #ffd166)",
      },
    },
    "@media print": {
      formContainer: {
        display: "none",
      },
      printButton: {
        display: "none",
      },
      certificate: {
        border: "none",
        boxShadow: "none",
        padding: "0",
        margin: "0",
        width: "100%",
        height: "100%",
        backgroundImage: "none",
      },
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.formContainer}>
        <h2>Certificate Generator</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Course:</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleCourseChange}
            style={styles.input}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.id})
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Completion Date:</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Institute Name:</label>
          <input
            type="text"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Director Name:</label>
          <input
            type="text"
            name="directorName"
            value={formData.directorName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.certificateContainer}>
        <div style={styles.certificate}>
          <div style={styles.header}>
            <h1 style={styles.headerH1}>Course Completion Certificate</h1>
          </div>
          <div>
            <p style={styles.intro}>This is to certify that</p>
            <h2 style={styles.studentName}>{formData.studentName}</h2>
            <p style={styles.details}>
              (Student ID: {formData.studentId}) has successfully completed the
              course
            </p>
            <h3 style={styles.courseName}>{formData.courseName}</h3>
            <p style={styles.details}>(Course ID: {formData.courseId})</p>
            <p style={styles.completionDate}>
              on{" "}
              {new Date(formData.completionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div style={styles.signatures}>
              <div style={styles.signature}>
                <div style={styles.signatureLine}></div>
                <p>Director</p>
                <p>{formData.directorName}</p>
              </div>
              <div style={styles.signature}>
                <div style={styles.signatureLine}></div>
                <p>Institute Seal</p>
                <p>{formData.instituteName}</p>
              </div>
            </div>
          </div>
          <div style={styles.footer}>
            <p>
              Certificate ID: {formData.studentId}-{formData.courseId}-
              {formData.completionDate.replace(/-/g, "")}
            </p>
          </div>
        </div>
        <button onClick={handlePrint} style={styles.printButton}>
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default CourseCompletionCertificate;
