/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import DeleteConfirmationModal from "../../Common/DeleteConfirmationModal";

const InterviewsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roundFilter, setRoundFilter] = useState("All Rounds");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState<any>(null);

  const interviews = [
    {
      id: 1,
      candidateName: "John Smith",
      round: "Technical",
      interviewers: ["Sarah Johnson", "Mike Chen"],
      date: "1/20/2024",
      time: "10:00 AM",
      status: "Scheduled",
      avatar: "👤"
    },
    {
      id: 2,
      candidateName: "Emily Davis",
      round: "Screening",
      interviewers: ["Aaron Brown"],
      date: "1/19/2024",
      time: "02:30 PM",
      status: "Completed",
      avatar: "👤"
    },
    {
      id: 3,
      candidateName: "Michael Johnson",
      round: "HR",
      interviewers: ["Lisa Wilson"],
      date: "1/18/2024",
      time: "11:00 AM",
      status: "Feedback Pending",
      avatar: "👤",
      note: "Conference Room A"
    },
    {
      id: 4,
      candidateName: "Sarah Chen",
      round: "Final",
      interviewers: ["David Kim", "Jennifer Lee"],
      date: "1/22/2024",
      time: "03:00 PM",
      status: "Scheduled",
      avatar: "👤"
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'status-scheduled';
      case 'completed':
        return 'status-completed';
      case 'feedback pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  const getRoundBadgeClass = (round: string) => {
    switch (round.toLowerCase()) {
      case 'technical':
        return 'round-technical';
      case 'screening':
        return 'round-screening';
      case 'hr':
        return 'round-hr';
      case 'final':
        return 'round-final';
      default:
        return 'round-default';
    }
  };

  const handleDeleteInterview = (interview: any) => {
    setInterviewToDelete(interview);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setInterviewToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (interviewToDelete) {
      console.log('Deleting interview for candidate:', interviewToDelete.candidateName);
      // Add your delete logic here
    }
  };

  return (
    <div className="interviews-tab">
      <div className="interviews-header">
        <div className="interviews-title-section">
          <h2>Interviews</h2>
          <p>Manage interview scheduling and feedback</p>
        </div>
        <button className="add-job-btn">
            <i className="fas fa-plus"></i>   Schedule Interview
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
          value={roundFilter}
          onChange={(e) => setRoundFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Rounds</option>
          <option>Technical</option>
          <option>Screening</option>
          <option>HR</option>
          <option>Final</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Status</option>
          <option>Scheduled</option>
          <option>Completed</option>
          <option>Feedback Pending</option>
        </select>
      </div>

      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Interview Round</th>
              <th>Interviewer(s)</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td>
                  <div className="candidate-info">
                    <span className="candidate-avatar">{interview.avatar}</span>
                    <span className="candidate-name">{interview.candidateName}</span>
                  </div>
                </td>
                <td>
                  <span className={`round-badge ${getRoundBadgeClass(interview.round)}`}>
                    {interview.round}
                  </span>
                </td>
                <td>
                  <div className="interviewers-list">
                    {interview.interviewers.map((interviewer, index) => (
                      <span key={index} className="interviewer-name">
                        {interviewer}
                        {index < interview.interviewers.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="date-time-info">
                    <div className="interview-date">
                      <i className="fas fa-calendar"></i>
                      {interview.date}
                    </div>
                    <div className="interview-time">
                      <i className="fas fa-clock"></i>
                      {interview.time}
                    </div>
                    {interview.note && (
                      <div className="interview-note">
                        <i className="fas fa-map-marker-alt"></i>
                        {interview.note}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(interview.status)}`}>
                    {interview.status}
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
                    <button 
                      className="action-btn delete-btn" 
                      title="Delete"
                      onClick={() => handleDeleteInterview(interview)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Interview"
        message="Are you sure you want to delete this interview? This will permanently remove the interview schedule and all associated information."
        itemName={interviewToDelete ? `${interviewToDelete.candidateName} - ${interviewToDelete.round} Round` : ""}
        confirmButtonText="Delete Interview"
      />
    </div>
  );
};

export default InterviewsTab;
