import React, { useState } from "react";
import Modal from "react-modal";

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventFormData) => void;
  selectedDate?: Date;
}

interface EventFormData {
  title: string;
  type: 'interview' | 'meeting' | 'deadline' | 'follow-up' | 'assessment';
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location?: string;
  description?: string;
  candidate?: string;
  job?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    type: 'meeting',
    startDate: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endDate: selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    endTime: '10:00',
    location: '',
    description: '',
    candidate: '',
    job: '',
    status: 'scheduled'
  });

  const eventTypeOptions = [
    { value: 'interview', label: 'Interview', color: '#166534' },
    { value: 'meeting', label: 'Meeting', color: '#1d4ed8' },
    { value: 'deadline', label: 'Deadline', color: '#dc2626' },
    { value: 'follow-up', label: 'Follow-up', color: '#92400e' },
    { value: 'assessment', label: 'Assessment', color: '#7c3aed' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      type: 'meeting',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endDate: new Date().toISOString().split('T')[0],
      endTime: '10:00',
      location: '',
      description: '',
      candidate: '',
      job: '',
      status: 'scheduled'
    });
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
      borderRadius: '16px',
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
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
      <div className="new-event-modal">
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} id="new-event-form">
            <div className="form-row">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Event Type *</label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  {eventTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-input"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  className="form-input"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-input"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-input"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Conference Room A, Online, etc."
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(formData.type === 'interview' || formData.type === 'assessment') && (
              <div className="form-row">
                <div className="form-group">
                  <label>Candidate</label>
                  <input
                    type="text"
                    name="candidate"
                    className="form-input"
                    value={formData.candidate}
                    onChange={handleInputChange}
                    placeholder="Candidate name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Job Position</label>
                  <input
                    type="text"
                    name="job"
                    className="form-input"
                    value={formData.job}
                    onChange={handleInputChange}
                    placeholder="Job position"
                  />
                </div>
              </div>
            )}

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event description, agenda, notes..."
                rows={4}
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="assign-btn" type="submit" onClick={handleSubmit}>
            <i className="fas fa-plus"></i> Create Event
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewEventModal;