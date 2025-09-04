import React, { useState } from "react";
import CreateAssessmentModal from "./CreateAssessmentModal";

const AssessmentsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assessments = [
    {
      id: 1,
      candidateName: "John Smith",
      assessmentType: "Technical Skills",
      technology: "React/JavaScript",
      date: "1/20/2024",
      duration: "45 minutes",
      status: "Completed",
      score: "85%",
      avatar: "👤"
    },
    {
      id: 2,
      candidateName: "Emily Davis",
      assessmentType: "Cognitive Assessment",
      technology: "Problem Solving",
      date: "1/19/2024",
      duration: "30 minutes",
      status: "In Progress",
      score: "-",
      avatar: "👤"
    },
    {
      id: 3,
      candidateName: "Michael Johnson",
      assessmentType: "Technical Skills",
      technology: "Python/Django",
      date: "1/18/2024",
      duration: "60 minutes",
      status: "Pending",
      score: "-",
      avatar: "👤"
    },
    {
      id: 4,
      candidateName: "Sarah Chen",
      assessmentType: "Communication",
      technology: "Video Assessment",
      date: "1/22/2024",
      duration: "20 minutes",
      status: "Completed",
      score: "92%",
      avatar: "👤"
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-pending';
      case 'pending':
        return 'status-scheduled';
      default:
        return 'status-default';
    }
  };

  const getAssessmentBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'technical skills':
        return 'assessment-technical';
      case 'cognitive assessment':
        return 'assessment-cognitive';
      case 'communication':
        return 'assessment-communication';
      default:
        return 'assessment-default';
    }
  };

  return (
    <div className="interviews-tab">
      <div className="interviews-header">
        <div className="interviews-title-section">
          <h2>Pre-Screening Assessments</h2>
          <p>Manage candidate assessments and evaluations</p>
        </div>
        <button className="add-job-btn" onClick={() => setIsModalOpen(true)}>
          <i className="fas fa-plus"></i>Create Assessment
        </button>
      </div>

      <div className="interviews-filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Types</option>
          <option>Technical Skills</option>
          <option>Cognitive Assessment</option>
          <option>Communication</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Status</option>
          <option>Completed</option>
          <option>In Progress</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Assessment Type</th>
              <th>Technology/Focus</th>
              <th>Date & Duration</th>
              <th>Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>
                  <div className="candidate-info">
                    <span className="candidate-avatar">{assessment.avatar}</span>
                    <span className="candidate-name">{assessment.candidateName}</span>
                  </div>
                </td>
                <td>
                  <span className={`assessment-badge ${getAssessmentBadgeClass(assessment.assessmentType)}`}>
                    {assessment.assessmentType}
                  </span>
                </td>
                <td>
                  <div className="technology-info">
                    <span className="technology-name">{assessment.technology}</span>
                  </div>
                </td>
                <td>
                  <div className="date-time-info">
                    <div className="interview-date">
                      <i className="fas fa-calendar"></i>
                      {assessment.date}
                    </div>
                    <div className="interview-time">
                      <i className="fas fa-clock"></i>
                      {assessment.duration}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="score-info">
                    {assessment.score !== "-" ? (
                      <span className="score-value">{assessment.score}</span>
                    ) : (
                      <span className="score-pending">-</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-btn view-btn" title="View">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-btn edit-btn" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete-btn" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateAssessmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AssessmentsTab;
