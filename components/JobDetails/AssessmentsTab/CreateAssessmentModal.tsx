import React, { useState } from "react";
import Modal from "react-modal";

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAssessmentModal: React.FC<CreateAssessmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [candidate, setCandidate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assessmentType, setAssessmentType] = useState("");
  const [assessment, setAssessment] = useState("");
  const [instructions, setInstructions] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const candidates = [
    "John Smith",
    "Emily Davis", 
    "Michael Johnson",
    "Sarah Chen"
  ];

  const assessmentTypes = [
    "Technical Skills",
    "Machine Test",
    "Cognitive Assessment",
    "Communication"
  ];

  const assessments = [
    "React/JavaScript",
    "Python/Django",
    "Pair Programming",
    "Problem Solving",
    "Video Assessment"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      candidate,
      deadline,
      assessmentType,
      assessment,
      instructions,
      uploadedFiles
    });
    onClose();
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
      <div className="create-assessment-modal">
        <div className="modal-header">
          <h2>Assign Assessment</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Candidate</label>
              <select
                value={candidate}
                onChange={(e) => setCandidate(e.target.value)}
                className="form-select"
              >
                <option value="">Select candidate...</option>
                {candidates.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="form-input"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Assessment Type</label>
              <select
                value={assessmentType}
                onChange={(e) => setAssessmentType(e.target.value)}
                className="form-select"
              >
                <option value="">Select type...</option>
                {assessmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Assessment</label>
              <select
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="form-select"
              >
                <option value="">Select assessment...</option>
                {assessments.map((assess) => (
                  <option key={assess} value={assess}>
                    {assess}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Instructions/Notes</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="form-textarea"
              placeholder="Add special instructions for the candidate..."
              rows={3}
            />
          </div>

          <div className="form-group full-width">
            <label>Upload Requirements</label>
            <div
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="upload-content">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop files here or <span className="browse-link">click to browse</span></p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="file-input"
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-upload-label"></label>
              </div>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <i className="fas fa-file"></i>
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="assign-btn" onClick={handleSubmit}>
            Assign Assessment
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAssessmentModal;