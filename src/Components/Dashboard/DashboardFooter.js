import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../assets/logo.png";

const { Footer } = Layout;
const { Title, Text } = Typography;

const DashboardFooter = () => {
  return (
    <Footer
      style={{
        background: "#1a5f99",
        color: "white",
        padding: "48px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={24}>
          <Col span={6}>
            <Title level={4} style={{ color: "white" }}>
              About Learnly
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.85)" }}>
              Learnly is a platform dedicated to preserving and propagating
              traditional knowledge systems through modern technology.
            </Text>
            <div style={{ marginTop: 16, marginLeft: 50 }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }}
                onMouseEnter={(e) => {
                  const container = e.currentTarget;
                  const rays = container.querySelector('.sun-rays');
                  if (rays) {
                    rays.style.opacity = "1";
                    rays.style.transform = "rotate(360deg) scale(1)";
                  }
                  container.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.8)";
                  container.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  const container = e.currentTarget;
                  const rays = container.querySelector('.sun-rays');
                  if (rays) {
                    rays.style.opacity = "0";
                    rays.style.transform = "rotate(0deg) scale(0.8)";
                  }
                  container.style.boxShadow = "none";
                  container.style.transform = "scale(1)";
                }}
              >
                {/* Sun Rays */}
                <div
                  className="sun-rays"
                  style={{
                    position: "absolute",
                    width: "180px",
                    height: "180px",
                    opacity: 0,
                    transform: "rotate(0deg) scale(0.8)",
                    transition: "all 0.8s ease-in-out",
                    pointerEvents: "none",
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: "2px",
                        height: "40px",
                        background: "linear-gradient(to bottom, #FFD700, rgba(255, 215, 0, 0.3))",
                        borderRadius: "1px",
                        top: "0px",
                        left: "50%",
                        transformOrigin: "1px 90px",
                        transform: `translateX(-50%) rotate(${i * 45}deg)`,
                        boxShadow: "0 0 8px rgba(255, 215, 0, 0.6)",
                        filter: "blur(0.5px)",
                      }}
                    />
                  ))}
                  {/* Shorter rays between main rays */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`short-${i}`}
                      style={{
                        position: "absolute",
                        width: "1px",
                        height: "25px",
                        background: "linear-gradient(to bottom, #FFA500, rgba(255, 165, 0, 0.2))",
                        borderRadius: "0.5px",
                        top: "8px",
                        left: "50%",
                        transformOrigin: "0.5px 82px",
                        transform: `translateX(-50%) rotate(${i * 45 + 22.5}deg)`,
                        boxShadow: "0 0 6px rgba(255, 165, 0, 0.4)",
                        filter: "blur(0.3px)",
                      }}
                    />
                  ))}
                </div>
                <img
                  src={logo}
                  alt="Learnly Logo"
                  style={{
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                    borderRadius: "50%",
                    zIndex: 2,
                    position: "relative",
                  }}
                />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <Title level={4} style={{ color: "white" }}>
              Quick Links
            </Title>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {["Home", "Courses", "Instructors", "Pricing", "Blog"].map(
                (item, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <a 
                      href="/" 
                      style={{ 
                        color: "rgba(255,255,255,0.85)",
                        textDecoration: "none",
                        transition: "color 0.3s ease"
                      }}
                      onMouseOver={(e) => e.target.style.color = "#ff4444"}
                      onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.85)"}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </Col>
          <Col span={6}>
            <Title level={4} style={{ color: "white" }}>
              Support
            </Title>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {[
                "Help Center",
                "FAQ",
                "Privacy Policy",
                "Terms of Service",
                "Refund Policy",
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <a 
                    href="/" 
                    style={{ 
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      transition: "color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.color = "#ff4444"}
                    onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.85)"}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col span={6}>
            <Title level={4} style={{ color: "white" }}>
              Contact Us
            </Title>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <li style={{ marginBottom: 8 }}>Email: info@learnly.com</li>
              <li style={{ marginBottom: 8 }}>Phone: +(91) 95000 95000</li>
              <li style={{ marginBottom: 8 }}>
                Address: 123 Wisdom Lane, Knowledge City
              </li>
              <li style={{ marginTop: 16 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { icon: <FaFacebookF />, name: "Facebook", url: "https://facebook.com", color: "#1877F2" },
                    { icon: <FaTwitter />, name: "Twitter", url: "https://twitter.com", color: "#1DA1F2" },
                    { icon: <FaInstagram />, name: "Instagram", url: "https://instagram.com", color: "#E4405F" },
                    { icon: <FaYoutube />, name: "YouTube", url: "https://youtube.com", color: "#FF0000" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: 32,
                        height: 32,
                        background: social.color,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        opacity: 0.9,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = "1";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = "0.9";
                        e.target.style.transform = "scale(1)";
                      }}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default DashboardFooter;
