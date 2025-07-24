// DashboardContent.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultDashboard from "../Components/Dashboard/DashboardWithData"; 

//Sidebar routes
import Admin from "../Components/Pages/Admin-dashboard/Admin-dashboard";
import Course from "../Components/Pages/Course-dashboard/Course-dashboard";

//Page routes

// Admin
import Admincreate from "../Components/Pages/Admin-dashboard/CreateAdmin";
import AdminDetails from "../Components/Pages/Admin-dashboard/Admindetail";
import Adminanalytics from "../Components/Pages/Admin-dashboard/Analyticsadmin";
import AdminEmails from "../Components/Pages/Admin-dashboard/Email";
import Profile from "../Components/Dashboard/Profile";
//user
import Userdashboard from "../Components/Pages/User-dashboard/A-user-dashboard";
import UserDetails from "../Components/Pages/User-dashboard/Alluser-details";
import Payment from "../Components/Pages/User-dashboard/Paymentdetails";
import EmiDetails from "../Components/Pages/User-dashboard/Emi-details";
// Courses
import Createcourses from "../Components/Pages/Course-dashboard/Course/Createcourses";
import CourseName from "../Components/Pages/Course-dashboard/Course/Viewcourse1";
import Coursedetails from "../Components/Pages/Course-dashboard/Course/Viewcourse2";
import Editcourse from "../Components/Pages/Course-dashboard/Course/Viewcourseedit3";
import Quectionuplode from "../Components/Pages/Course-dashboard/Question/Questionuplode";
import Quectionpapaer from "../Components/Pages/Course-dashboard/Question/Questionpages";
// Exam Answer Management
import ExamAnswerManagement from "../Components/Pages/User-dashboard/Examanswer/ExamAnswerManagement";
import ExamAnswerDashboard from "../Components/Pages/User-dashboard/Examanswer/ExamAnswerDashboard";
import UserExamStats from "../Components/Pages/User-dashboard/Examanswer/UserExamStats";
import CourseExamAnalytics from "../Components/Pages/User-dashboard/Examanswer/CourseExamAnalytics";
// BOS
import BOSdashboard from "../Components/Pages/BOS-dashboard/A-BOS-dashboard";
import BOSMembers from "../Components/Pages/BOS-dashboard/BOS-Members";
import BOSMeeting from "../Components/Pages/BOS-dashboard/BOS-Meeting";
import CourseProposalForm from "../Components/Pages/BOS-dashboard/CourseProposalForm";
import Coursedata from "../Components/Pages/BOS-dashboard/CourseProposal-data";
import CreateDecisionForm from "../Components/Pages/BOS-dashboard/uplodeRecentDecisions";
import DecisionsList from "../Components/Pages/BOS-dashboard/DecisionsList";
import CreateBOSMeeting from "../Components/Pages/BOS-dashboard/CreateMoM";
import ViewBOSMeeting from "../Components/Pages/BOS-dashboard/ViewMoM";
import AssignTask from "../Components/Pages/BOS-dashboard/AssignTask";
import TaskManagement from "../Components/Pages/BOS-dashboard/TaskManagement";

// Datamaintance
import Datamaintance from "../Components/Pages/Data-Maintenance/A-Data-dashboard";
import DirectMeetFeesManagement from "../Components/Pages/Data-Maintenance/DirectMeetFeesManagement";
import MonthlyFeesManagement from "../Components/Pages/Data-Maintenance/Monthlyfees-Record";
import DirectMeetStudyMaterial from "../Components/Pages/Data-Maintenance/DirectMeetStudyMaterialManagement";
import CourseCompletion from "../Components/Pages/Data-Maintenance/Course-Completion-Certificate";
import ParticipantCertificate from "../Components/Pages/Data-Maintenance/ParticipantCertificate";
import ExamMarkRecords from "../Components/Pages/Data-Maintenance/ExamMarkRecordsSystem";
import StaffDetailsManagement from "../Components/Pages/Data-Maintenance/Staff-Management";
import StudentComplaintRecords from "../Components/Pages/Data-Maintenance/StudentComplaint";

// DirectMeet Management
import DirectMeet from "../Components/Pages/DirectMeet-Management/A-DirectMeet-Dashboard";
import DirectMeetManagement from "../Components/Pages/DirectMeet-Management/CreateDirectMeet";
import ViewDirectMeets from "../Components/Pages/DirectMeet-Management/ViewDirectMeets";
import EditDirectMeet from "../Components/Pages/DirectMeet-Management/EditDirectMeet";
import DirectMeetDetails from "../Components/Pages/DirectMeet-Management/DirectMeetDetails";
import MeetingAnalytics from "../Components/Pages/DirectMeet-Management/MeetingAnalytics";
import ManageParticipants from "../Components/Pages/DirectMeet-Management/ManageParticipants";
import MeetingFees from "../Components/Pages/DirectMeet-Management/MeetingFees";

// institutional-board
import InstitutionalDashboard from "../Components/Pages/Institutional-dashboard/Institutional-dashboard";
// document-verification
import DocumentVerificationDashboard from "../Components/Pages/Document-Verification/Document-Verification";
// certificate-maintenance
import CertificateMaintenanceDashboard from "../Components/Pages/Certificate-Maintenance/Certificate-Maintenance";
// vote
import VotingSystemDemo from "../Components/Pages/Voting-Dashboard/VotingSystemDemo";
import VoteDashboard from "../Components/Pages/Voting-Dashboard/A-Voting-Dashboard";
import CreateVoteSystem from "../Components/Pages/Voting-Dashboard/CreateVoteSystem";
import PollingSystem from "../Components/Pages/Voting-Dashboard/PollingSystem";
import ResultsDashboard from "../Components/Pages/Voting-Dashboard/ResultsDashboard";
import TotalVoteSystem from "../Components/Pages/Voting-Dashboard/TotalVoteSystem";
import LiveResultsDashboard from "../Components/Pages/Voting-Dashboard/LiveResultsDashboard";
// notifications
import NotificationDashboard from "../Components/Pages/Notification-Dashboard/Notification-Dashboard";
// feedback
import FeedbackDashboard from "../Components/Pages/Feedback-Dashboard/Feedback-Dashboard";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Sidebar routes */}
      <Route path="/" element={<DefaultDashboard />} />
      <Route path="admin-users" element={<Admin />} />
      <Route path="courses" element={<Course />} />

      {/* Page routs Admin */}
      <Route path="create-admin" element={<Admincreate />} />
      <Route path="admin-details" element={<AdminDetails />} />
      <Route path="admin-analytics" element={<Adminanalytics />} />
      <Route path="admin-emails" element={<AdminEmails />} />
      <Route path="profile" element={<Profile />} />

      {/* Page routs User */}
      <Route path="users" element={<Userdashboard />} />
      <Route path="user-details" element={<UserDetails />} />
      <Route path="Payment-record" element={<Payment />} />
      <Route path="emi-details" element={<EmiDetails />} />

      {/* Page routes Courses */}
      <Route path="add-course" element={<Createcourses />} />
      <Route path="course-list" element={<CourseName />} />
      <Route path="course-list/:coursename" element={<Coursedetails />} />
      <Route path="edit-course/:coursename" element={<Editcourse />} />

      {/* BOS Routes */}
      <Route path="add-question-paper" element={<Quectionuplode />} />
      <Route path="view-question-papers" element={<Quectionpapaer />} />

      {/* Exam Answer Management Routes */}
      <Route path="exam-answers" element={<ExamAnswerManagement />} />
      <Route path="exam-dashboard" element={<ExamAnswerDashboard />} />
      <Route path="student-stats" element={<UserExamStats />} />
      <Route path="course-analytics" element={<CourseExamAnalytics />} />

      {/* Page routes BOS */}
      <Route path="bos" element={<BOSdashboard />} />
      <Route path="bos-members" element={<BOSMembers />} />
      <Route path="create-meeting" element={<BOSMeeting />} />
      <Route path="submit-course-proposal" element={<CourseProposalForm />} />
      <Route path="pending-proposals" element={<Coursedata />} />
      <Route path="create-decision" element={<CreateDecisionForm />} />
      <Route path="recent-decision" element={<DecisionsList />} />
      <Route path="create-bos-meeting" element={<CreateBOSMeeting />} />
      <Route path="view-bos-meeting" element={<ViewBOSMeeting />} />
      <Route path="assign-task" element={<AssignTask />} />
      <Route path="task-status" element={<TaskManagement />} />

      {/* Page routes Datamaintance */}
      <Route path="data-maintenance" element={<Datamaintance />} />
      <Route path="direct-meet-fees" element={<DirectMeetFeesManagement />} />
      <Route path="monthly-fees" element={<MonthlyFeesManagement />} />
      <Route path="meet-materials" element={<DirectMeetStudyMaterial />} />
      <Route path="completion-certificates" element={<CourseCompletion />} />
      <Route path="participant-certificates"element={<ParticipantCertificate />} />
      <Route path="exam-marks-records" element={<ExamMarkRecords />} />
      <Route path="staff-management" element={<StaffDetailsManagement />} />
      <Route path="student-complaints" element={<StudentComplaintRecords />} />

      {/* DirectMeet Management */}
      <Route path="direct-meet-management" element={<DirectMeet />} />
      <Route path="schedule-meeting" element={<DirectMeetManagement />} />
      <Route path="view-meetings" element={<ViewDirectMeets />} />
      <Route path="edit-meeting/:id" element={<EditDirectMeet />} />
      <Route path="meeting-details/:id" element={<DirectMeetDetails />} />
      <Route path="meeting-analytics" element={<MeetingAnalytics />} />
      <Route path="manage-participants" element={<ManageParticipants />} />
      <Route path="meeting-fees" element={<MeetingFees />} />


      {/* Page routes Institutional-board */}
      <Route path="institutional-board" element={<InstitutionalDashboard />} />
      
      {/* Page routes document-verification */}
      <Route
        path="document-verification"
        element={<DocumentVerificationDashboard />}
      />
      {/* Page routes certificate-maintenance */}
      <Route
        path="certificate-maintenance"
        element={<CertificateMaintenanceDashboard />}
      />
      {/* Page routes vote */}
      <Route path="demo" element={<VotingSystemDemo />} />
      <Route path="vote" element={<VoteDashboard />} />
      <Route path="create" element={<CreateVoteSystem />} />
      <Route path="polling" element={<PollingSystem />} />
      <Route path="results" element={<ResultsDashboard />} />
      <Route path="total" element={<TotalVoteSystem />} />
      <Route path="live-results" element={<LiveResultsDashboard />} />
      {/* Page routes notifications */}
      <Route path="notifications" element={<NotificationDashboard />} />

      {/* Page routes feedback */}
      <Route path="feedback" element={<FeedbackDashboard />} />
    </Routes>
  );
};

export default PageRoutes;
