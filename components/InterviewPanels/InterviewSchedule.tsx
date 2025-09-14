/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import ViewInterviewModal from './ViewInterviewModal';

const InterviewSchedule: React.FC = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Senior Frontend Developer",
      date: "2024-01-15",
      time: "14:00",
      duration: "60 minutes",
      type: "Video",
      interviewers: "SI MC",
      status: "confirmed"
    },
    {
      id: 2,
      candidate: "Michael Rodriguez",
      position: "Backend Developer",
      date: "2024-01-16",
      time: "10:00",
      duration: "45 minutes",
      type: "Phone",
      interviewers: "MC",
      status: "scheduled"
    },
    {
      id: 3,
      candidate: "Emily Chen",
      position: "UX Designer",
      date: "2024-01-16",
      time: "15:00",
      duration: "90 minutes",
      type: "In-Person",
      interviewers: "LW",
      status: "confirmed"
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-completed';
      case 'scheduled':
        return 'status-scheduled';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return 'fas fa-video';
      case 'phone':
        return 'fas fa-phone';
      case 'in-person':
        return 'fas fa-map-marker-alt';
      default:
        return 'fas fa-calendar';
    }
  };

  const handleViewInterview = (interview: any) => {
    setSelectedInterview(interview);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedInterview(null);
  };

  return (
    <div className="interview-schedule-section">
      <div className="upcoming-interviews">
        <h3>Upcoming Interviews</h3>
        
        <div className="jobs-table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Position</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Interviewers</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingInterviews.map((interview) => (
                <tr key={interview.id}>
                  <td>
                    <div className="candidate-info">
                      <span className="candidate-name">{interview.candidate}</span>
                    </div>
                  </td>
                  <td>
                    <span className="position-title">{interview.position}</span>
                  </td>
                  <td>
                    <div className="date-time-info">
                      <div className="interview-date">
                        <i className="fas fa-calendar"></i>
                        {interview.date} at {interview.time}
                      </div>
                      <div className="interview-duration">
                        {interview.duration}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="interview-type">
                      <i className={getTypeIcon(interview.type)}></i>
                      <span>{interview.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className="interviewers-list">
                      <span className="interviewer-name">{interview.interviewers}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(interview.status)}`}>
                      {interview.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn view-btn"
                        title="View"
                        onClick={() => handleViewInterview(interview)}
                      >
                        <i className="fas fa-eye"></i>
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
      </div>

      {/* View Interview Modal */}
      <ViewInterviewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        interview={selectedInterview}
      />
    </div>
  );
};

export default InterviewSchedule;