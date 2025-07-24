import React, { useEffect, useState } from "react";
import axios from "../../../../Utils/api";
import { FaChartLine, FaFolderOpen, FaChevronLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/getcoursesname", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses. Please check your token or server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const fetchQuestions = async (coursename, chapterTitle) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/exam-question", {
        params: { coursename, chapterTitle },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExamData({
        course: coursename,
        chapter: chapterTitle,
        questions: response.data.exams[0]?.examQuestions || [],
        examinationName: response.data.exams[0]?.examinationName || "",
        subject: response.data.exams[0]?.subject || "",
        totalMarks: response.data.exams[0]?.totalMarks || 0,
      });
    } catch (error) {
      console.error("Error fetching exam questions:", error);
      setExamData({
        course: coursename,
        chapter: chapterTitle,
        questions: [],
        error: "No exam questions.",
      });
    } finally {
      setLoading(false);
    }
  };

  // CSS Styles
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#2d3748",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#718096",
    },
    error: {
      backgroundColor: "#fff5f5",
      color: "#e53e3e",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "1.5rem",
      textAlign: "center",
      borderLeft: "4px solid #e53e3e",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      overflow: "hidden",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
    cardHeader: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "1.25rem",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTitle: {
      margin: "0",
      fontSize: "1.125rem",
      fontWeight: "600",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "80%",
    },
    cardBody: {
      padding: "1.25rem",
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#4a5568",
    },
    cardFooter: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "0.75rem 1.25rem",
      gap: "1rem",
      borderTop: "1px solid #edf2f7",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#edf2f7",
      color: "#4a5568",
      border: "none",
      borderRadius: "0.375rem",
      cursor: "pointer",
      marginBottom: "1.5rem",
      "&:hover": {
        backgroundColor: "#e2e8f0",
      },
    },
    chapterCard: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      padding: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
    questionList: {
      marginTop: "2rem",
    },
    questionItem: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "1.25rem",
      marginBottom: "1rem",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      color: "#718096",
    },
  };

  // Dynamic header color using HSL
  const getDynamicColor = (index) => {
    const hue = (index * 57) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 50%) 0%, hsl(${
      (hue + 30) % 360
    }, 70%, 60%) 100%)`;
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div style={styles.container}>
        <button
          onClick={() => {
            setSelectedCourse(null);
            setExamData(null);
          }}
          style={styles.backButton}
        >
          <FaChevronLeft /> Back to Courses
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>{selectedCourse.coursename}</h1>
          <p style={styles.subtitle}>Select a chapter to view questions</p>
        </div>

        <div style={styles.grid}>
          {(selectedCourse.chapters || []).map((chapterTitle, index) => (
            <div
              key={index}
              onClick={() =>
                fetchQuestions(selectedCourse.coursename, chapterTitle)
              }
              style={{
                ...styles.card,
                ...styles.chapterCard,
                background: getDynamicColor(index),
                color: "white",
              }}
            >
              <h3 style={{ margin: "0", fontWeight: "600" }}>{chapterTitle}</h3>
            </div>
          ))}
        </div>

        {examData && (
          <div style={styles.questionList}>
            <h2 style={{ color: "#2d3748", marginBottom: "1rem" }}>
              Questions for <strong style={{color:"red"}}>{examData.chapter}</strong> (Total Marks: <strong>{examData.totalMarks}</strong>) (Subject: <strong>{examData.subject}</strong>)
            </h2>
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ color: "#2d3748", margin: 0 }}>
                Exam: <strong>{examData.examinationName}</strong>
              </h2>
            </div>

            {examData.questions.length === 0 ? (
              <div style={{ ...styles.questionItem, textAlign: "center" }}>
                {examData.error || "No questions found for this chapter."}
              </div>
            ) : (
              examData.questions.map((q, index) => (
                <div key={index} style={styles.questionItem}>
                  <h3 style={{ marginTop: "0", color: "green" }}>
                    Q{index + 1}: {q.question}
                  </h3>
                  <ul style={{ marginBottom: "1rem", paddingLeft: "1.5rem" }}>
                    {q.options.map((opt, i) => (
                      <li key={i} style={{ marginBottom: "0.25rem" }}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Answer:{" "}
                      </span>
                      <span style={{ fontWeight: "600", color: "red" }}>
                        {q.correctAnswer}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Marks:{" "}
                      </span>
                      <span style={{ fontWeight: "600", color: "red" }}>
                        {q.marks}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Course List</h1>
        <p style={styles.subtitle}>Select a course to view chapters</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        {courses.map((course, index) => (
          <div
            key={index}
            onClick={() => setSelectedCourse(course)}
            style={styles.card}
          >
            <div
              style={{
                ...styles.cardHeader,
                background: getDynamicColor(index),
              }}
            >
              <h3 style={styles.cardTitle}>{course.coursename}</h3>
              <BsThreeDotsVertical size={16} />
            </div>
            <div style={styles.cardBody}>
              {course.chapters?.length || 0} chapters available
            </div>
            <div style={styles.cardFooter}>
              <FaChartLine />
              <FaFolderOpen />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
