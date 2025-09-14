import React from "react";
import Modal from "react-modal";

interface InterviewData {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  interviewers: string;
  status: string;
}

interface ViewInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: InterviewData | null;
}

const ViewInterviewModal: React.FC<ViewInterviewModalProps> = ({
  isOpen,
  onClose,
  interview
}) => {
  if (!interview) return null;

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

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      borderRadius: '12px',
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      overflow: 'auto'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="create-email-template-modal">
        <div className="modal-header">
          <h2>Interview Details</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {/* Candidate Information */}
          <div className="form-section">
            <h3>Candidate Information</h3>
            <div className="interview-detail-row">
              <div className="detail-item">
                <label>Candidate Name:</label>
                <span className="detail-value">{interview.candidate}</span>
              </div>
              <div className="detail-item">
                <label>Position:</label>
                <span className="detail-value">{interview.position}</span>
              </div>
            </div>
          </div>

          {/* Interview Schedule */}
          <div className="form-section">
            <h3>Interview Schedule</h3>
            <div className="interview-detail-row">
              <div className="detail-item">
                <label>Date:</label>
                <span className="detail-value">
                  <i className="fas fa-calendar"></i>
                  {new Date(interview.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="detail-item">
                <label>Time:</label>
                <span className="detail-value">
                  <i className="fas fa-clock"></i>
                  {interview.time}
                </span>
              </div>
            </div>
            <div className="interview-detail-row">
              <div className="detail-item">
                <label>Duration:</label>
                <span className="detail-value">
                  <i className="fas fa-hourglass-half"></i>
                  {interview.duration}
                </span>
              </div>
              <div className="detail-item">
                <label>Interview Type:</label>
                <span className="detail-value">
                  <i className={getTypeIcon(interview.type)}></i>
                  {interview.type}
                </span>
              </div>
            </div>
          </div>

          {/* Interview Panel */}
          <div className="form-section">
            <h3>Interview Panel</h3>
            <div className="detail-item">
              <label>Interviewers:</label>
              <span className="detail-value">
                <i className="fas fa-users"></i>
                {interview.interviewers}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="form-section">
            <h3>Status</h3>
            <div className="detail-item">
              <label>Current Status:</label>
              <span className={`status-badge ${getStatusBadgeClass(interview.status)}`}>
                {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
              </span>
            </div>
          </div>

        </div>

        <div className="modal-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .interview-detail-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-item label {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .detail-value {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
          padding: 8px 12px;
          background-color: #f9fafb;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }

        .detail-value i {
          color: #9ca3af;
        }

        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .action-detail-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #d1d5db;
          background-color: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
          transition: all 0.2s ease;
        }

        .action-detail-btn:hover {
          background-color: #f3f4f6;
          border-color: #9ca3af;
        }

        .action-detail-btn.primary {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .action-detail-btn.primary:hover {
          background-color: #2563eb;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-completed {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-scheduled {
          background-color: #dbeafe;
          color: #1d4ed8;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        @media (max-width: 768px) {
          .interview-detail-row,
          .action-buttons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Modal>
  );
};

export default ViewInterviewModal;