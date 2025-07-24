import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import ExamAnswerDashboard from "./ExamAnswerDashboard";
import UserExamStats from "./UserExamStats";
import CourseExamAnalytics from "./CourseExamAnalytics";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`exam-tabpanel-${index}`}
      aria-labelledby={`exam-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `exam-tab-${index}`,
    "aria-controls": `exam-tabpanel-${index}`,
  };
}

const ExamAnswerManagement = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Exam Answer Management System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Comprehensive exam analysis and student performance tracking
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="exam answer management tabs"
          variant="fullWidth"
        >
          <Tab
            icon={<DashboardIcon />}
            label="All Exam Attempts"
            {...a11yProps(0)}
            sx={{ minHeight: 72 }}
          />
          <Tab
            icon={<PersonIcon />}
            label="Student Statistics"
            {...a11yProps(1)}
            sx={{ minHeight: 72 }}
          />
          <Tab
            icon={<SchoolIcon />}
            label="Course Analytics"
            {...a11yProps(2)}
            sx={{ minHeight: 72 }}
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ExamAnswerDashboard />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <UserExamStats />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <CourseExamAnalytics />
      </TabPanel>
    </Container>
  );
};

export default ExamAnswerManagement;
