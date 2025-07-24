import React, { useState } from "react";

const ParticipantCertificate = () => {
  const [formData, setFormData] = useState({
    participantName: "Priya Sharma",
    participantId: "PART2023001",
    eventId: "EVT101",
    eventName: "Siddha Healing Workshop",
    eventDate: "2023-06-15",
    organizerName: "Learnly Academy",
    directorName: "Abubakar Siddhik",
  });

  const events = [
    { id: "SID101", name: "Siddha Healing Workshop" },
    { id: "AYUR101", name: "Ayurvedic Wellness Seminar" },
    { id: "YOGA101", name: "Yoga Therapy Conference" },
    { id: "VARMA101", name: "Varma Kalai Demonstration" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEventChange = (e) => {
    const selectedEvent = events.find((event) => event.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      eventId: e.target.value,
      eventName: selectedEvent ? selectedEvent.name : "",
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f8f9fa",
    },
    formContainer: {
      flex: 1,
      minWidth: "300px",
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      border: "2px solid #4cc9f0",
    },
    formGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#4361ee",
      fontSize: "14px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      boxSizing: "border-box",
      backgroundColor: "#f8f9fa",
      fontSize: "14px",
    },
    certificateContainer: {
      flex: 2,
      minWidth: "500px",
    },
    certificate: {
      position: "relative",
      background: "white",
      padding: "50px",
      border: "15px double transparent",
      borderImage:
        "linear-gradient(45deg, #4361ee, #4cc9f0, #f72585, #ffd166) 1",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
      marginBottom: "20px",
      textAlign: "center",
      backgroundImage:
        "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.95)), radial-gradient(circle at bottom right, rgba(76,201,240,0.15) 0%, rgba(255,209,102,0.15) 50%, rgba(247,37,133,0.15) 100%)",
    },
    header: {
      marginBottom: "30px",
      position: "relative",
    },
    headerH1: {
      background: "linear-gradient(90deg, #4361ee, #f72585)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "36px",
      marginBottom: "12px",
      fontWeight: "700",
      letterSpacing: "1px",
    },
    headerSubtitle: {
      color: "#6c757d",
      fontSize: "16px",
      marginBottom: "20px",
    },
    intro: {
      fontSize: "18px",
      marginBottom: "10px",
      color: "#4361ee",
      fontWeight: "500",
    },
    participantName: {
      background: "linear-gradient(90deg, #f72585, #4cc9f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "42px",
      margin: "25px 0",
      fontWeight: "600",
      textDecoration: "underline dotted #ffd166",
      textUnderlineOffset: "8px",
    },
    details: {
      fontSize: "16px",
      margin: "12px 0",
      color: "#495057",
      lineHeight: "1.6",
    },
    eventName: {
      color: "#f72585",
      fontSize: "28px",
      margin: "25px 0",
      fontWeight: "600",
    },
    participationText: {
      fontSize: "18px",
      color: "#4361ee",
      fontStyle: "italic",
      margin: "25px 0",
      padding: "15px",
      borderLeft: "4px solid #ffd166",
      background: "rgba(255,209,102,0.1)",
      textAlign: "left",
    },
    eventDate: {
      fontSize: "16px",
      margin: "20px 0",
      color: "#4cc9f0",
      fontWeight: "600",
    },
    signatures: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "60px",
      background:
        "linear-gradient(90deg, rgba(67,97,238,0.05), rgba(255,209,102,0.05))",
      padding: "25px",
      borderRadius: "10px",
    },
    signature: {
      textAlign: "center",
    },
    signatureLine: {
      width: "180px",
      height: "2px",
      background: "linear-gradient(90deg, #4361ee, #f72585)",
      margin: "0 auto 12px",
    },
    seal: {
      position: "absolute",
      right: "40px",
      bottom: "40px",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, white 40%, transparent 41%), linear-gradient(45deg, transparent 45%, #4361ee 46%, #4361ee 54%, transparent 55%), linear-gradient(-45deg, transparent 45%, #f72585 46%, #f72585 54%, transparent 55%)",
      border: "2px dashed #ffd166",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sealText: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#4361ee",
      textAlign: "center",
    },
    footer: {
      marginTop: "40px",
      fontSize: "12px",
      color: "#6c757d",
      borderTop: "1px dashed #adb5bd",
      paddingTop: "12px",
    },
    printButton: {
      display: "block",
      width: "100%",
      padding: "14px",
      background: "linear-gradient(90deg, #4361ee, #4cc9f0)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "15px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.formContainer}>
        <h2 style={{ color: "#4361ee", marginBottom: "20px" }}>
          Certificate Generator
        </h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Participant Name:</label>
          <input
            type="text"
            name="participantName"
            value={formData.participantName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Participant ID:</label>
          <input
            type="text"
            name="participantId"
            value={formData.participantId}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Event:</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleEventChange}
            style={styles.input}
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.id})
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Event Date:</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Organizer Name:</label>
          <input
            type="text"
            name="organizerName"
            value={formData.organizerName}
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
            <h1 style={styles.headerH1}>Certificate of Participation</h1>
            <p style={styles.headerSubtitle}>
              This certificate is awarded to recognize active participation
            </p>
          </div>

          <p style={styles.intro}>This is to certify that</p>

          <h2 style={styles.participantName}>{formData.participantName}</h2>

          <p style={styles.details}>
            (Participant ID: {formData.participantId}) has successfully
            participated in
          </p>

          <h3 style={styles.eventName}>{formData.eventName}</h3>

          <p style={styles.details}>(Event ID: {formData.eventId})</p>

          <div style={styles.participationText}>
            For demonstrating exceptional engagement and enthusiasm throughout
            the event, contributing valuable insights to the discussions and
            activities.
          </div>

          <p style={styles.eventDate}>
            Held on{" "}
            {new Date(formData.eventDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div style={styles.signatures}>
            <div style={styles.signature}>
              <div style={styles.signatureLine}></div>
              <p style={styles.details}>{formData.directorName}</p>
              <p style={{ ...styles.details, fontWeight: "600" }}>Director</p>
              <p style={styles.details}>{formData.organizerName}</p>
            </div>
          </div>

          <div style={styles.seal}>
            <div style={styles.sealText}>
              <div>OFFICIAL</div>
              <div>SEAL</div>
              <div>
                {formData.organizerName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
            </div>
          </div>

          <div style={styles.footer}>
            <p>
              Certificate ID: {formData.participantId}-{formData.eventId}-
              {formData.eventDate.replace(/-/g, "")}
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

export default ParticipantCertificate;
