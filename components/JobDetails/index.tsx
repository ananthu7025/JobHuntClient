"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OverviewTab from "./OverviewTab";
import CandidatesTab from "./CandidatesTab";
import InterviewsTab from "./InterviewsTab";
import AssessmentsTab from "./AssessmentsTab";
import WorkflowTab from "./WorkflowTab";
import NotesTab from "./NotesTab";

const JobDetail = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const jobData = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    status: "active",
    jobId: "#1",
    location: "San Francisco, CA",
    recruiter: "Aaron Brown",
    postedDate: "2024-01-15",
    territory: "North America - West Coast",
    totalApplications: 24,
    activeSince: 12,
    totalInterviews: 8,
    avgResumeScore: 85,
  };

  const recentActivities = [
    {
      type: "candidate",
      icon: "fas fa-user",
      text: "New candidate applied: John Smith",
      time: "2 hours ago",
      color: "blue",
    },
    {
      type: "interview",
      icon: "fas fa-calendar",
      text: "Interview scheduled with Sarah Johnson",
      time: "1 day ago",
      color: "green",
    },
    {
      type: "assessment",
      icon: "fas fa-file-alt",
      text: "Coding assessment completed by Mike Chen",
      time: "2 days ago",
      color: "purple",
    },
    {
      type: "candidate",
      icon: "fas fa-user",
      text: "New candidate applied: Emily Davis",
      time: "3 days ago",
      color: "blue",
    },
  ];

  const forecastDetails = {
    numberOfPositions: 1,
    revenuePerPosition: "$0.00",
    expectedRevenue: "$0.00",
    actualRevenue: "-",
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="job-detail-header">
        <button className="back-button" onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i> Back to Jobs
        </button>
      </div>

      {/* Title Section */}
      <div className="job-detail-title-section">
        <div className="job-title-info">
          <h1 className="job-detail-title">{jobData.title}</h1>
          <p className="job-detail-company">{jobData.company}</p>
        </div>
        <div className="job-header-right">
          <span className={`status-badge status-${jobData.status}`}>
            {jobData.status.charAt(0).toUpperCase() + jobData.status.slice(1)}
          </span>
          <span className="job-id">Job ID: {jobData.jobId}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="job-detail-tabs">
        {[
          "overview",
          "candidates",
          "interviews",
          "assessments",
          "workflow",
          "notes",
        ].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="job-detail-content">
        <div className="job-detail-left">
          {activeTab === "overview" && (
            <OverviewTab
              jobData={jobData}
              recentActivities={recentActivities}
            />
          )}
          {activeTab === "candidates" && <CandidatesTab />}
          {activeTab === "interviews" && <InterviewsTab />}
          {activeTab === "assessments" && <AssessmentsTab />}
          {activeTab === "workflow" && <WorkflowTab />}
          {activeTab === "notes" && <NotesTab />}
        </div>
{activeTab === 'overview' && (
        <div className="job-detail-right">
          {/* Keep stats & forecast always visible */}
          <div className="job-stats-card">
            <div className="stat-item applications">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{jobData.totalApplications}</span>
                <span className="stat-label">Total Applications</span>
              </div>
            </div>
            <div className="stat-item active-since">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{jobData.activeSince} days</span>
                <span className="stat-label">Active Since</span>
              </div>
            </div>
            <div className="stat-item interviews">
              <div className="stat-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{jobData.totalInterviews}</span>
                <span className="stat-label">Total Interviews</span>
              </div>
            </div>
            <div className="stat-item resume-score">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{jobData.avgResumeScore}%</span>
                <span className="stat-label">Avg Resume Score</span>
              </div>
            </div>
          </div>

          <div className="forecast-details-card">
            <h3>Forecast Details</h3>
            <div className="forecast-item">
              <span className="forecast-label">Number of Positions</span>
              <span className="forecast-value">
                {forecastDetails.numberOfPositions}
              </span>
            </div>
            <div className="forecast-item">
              <span className="forecast-label">Revenue per Position</span>
              <span className="forecast-value">
                {forecastDetails.revenuePerPosition}
              </span>
            </div>
            <div className="forecast-item">
              <span className="forecast-label">Expected Revenue</span>
              <span className="forecast-value">
                {forecastDetails.expectedRevenue}
              </span>
            </div>
            <div className="forecast-item">
              <span className="forecast-label">Actual Revenue</span>
              <span className="forecast-value">
                {forecastDetails.actualRevenue}
              </span>
            </div>
          </div>
        </div>
)}
      </div>
    </div>
  );
};

export default JobDetail;
