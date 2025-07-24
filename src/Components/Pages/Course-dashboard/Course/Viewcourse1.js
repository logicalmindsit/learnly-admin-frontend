import React, { useEffect, useState } from "react";
import axios from "../../../../Utils/api";
import { FaChartLine, FaFolderOpen } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Generate dynamic gradient header color using HSL
const getDynamicColor = (index) => {
  const hue = (index * 57) % 360;
  return `linear-gradient(to right, hsl(${hue}, 70%, 50%), hsl(${
    (hue + 30) % 360
  }, 70%, 60%))`;
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [navigating, setNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
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
      }
    };

    fetchCourses();
  }, []);

  if (navigating) {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px",
      fontSize: "18px",
      color: "#3498db"
    }}>
      Loading course details...
    </div>
  );
}

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "28px",
          color: "#2c3e50",
        }}
      >
        Courses - List
      </h2>

      {error && (
        <p
          style={{
            color: "#e74c3c",
            backgroundColor: "#f9d6d5",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {courses.map((course, index) => (
          <div
            key={course._id}
            onClick={() => {
              setNavigating(true);
              navigate(
                `/learnly/course-list/${encodeURIComponent(course.coursename)}`
              );
            }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: "220px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                background: getDynamicColor(index),
                padding: "16px",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                minHeight: "60px",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {course.coursename}
                </h3>
              </div>
              <BsThreeDotsVertical size={16} />
            </div>

            <div style={{ flex: 1, padding: "10px 16px" }}></div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 16px",
                gap: "10px",
                borderTop: "1px solid #eee",
              }}
            >
              <FaChartLine style={{ cursor: "pointer", color: "#7f8c8d" }} />
              <FaFolderOpen style={{ cursor: "pointer", color: "#7f8c8d" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
