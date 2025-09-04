import React, { useState } from "react";
import Modal from "react-modal";

interface AddStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStage: (stageData: any) => void;
}

const AddStageModal: React.FC<AddStageModalProps> = ({
  isOpen,
  onClose,
  onAddStage
}) => {
  const [stageName, setStageName] = useState("");
  const [stageType, setStageType] = useState("");
  const [automations, setAutomations] = useState([
    { id: 1, type: "email", label: "Send Email", enabled: false, condition: "" }
  ]);

  const stageTypes = [
    "Custom Step",
    "Screening",
    "Interview", 
    "Technical Test",
    "Background Check",
    "Reference Check",
    "Offer",
    "Onboarding"
  ];

  const handleAddAutomation = () => {
    const newAutomation = {
      id: Date.now(),
      type: "email",
      label: "Send Email",
      enabled: false,
      condition: ""
    };
    setAutomations([...automations, newAutomation]);
  };

  const handleToggleAutomation = (id: number) => {
    setAutomations(automations.map(auto => 
      auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
    ));
  };

  const handleDeleteAutomation = (id: number) => {
    setAutomations(automations.filter(auto => auto.id !== id));
  };

  const handleConditionChange = (id: number, condition: string) => {
    setAutomations(automations.map(auto => 
      auto.id === id ? { ...auto, condition } : auto
    ));
  };

  const handleSubmit = () => {
    if (!stageName.trim() || !stageType) {
      return;
    }

    const enabledAutomations = automations.filter(auto => auto.enabled);
    
    const newStage = {
      id: Date.now(),
      title: stageName,
      type: stageType.toLowerCase().replace(' ', ''),
      automations: enabledAutomations.map(auto => ({
        id: auto.id,
        type: auto.type,
        label: auto.label,
        status: "auto",
        condition: auto.condition
      }))
    };

    onAddStage(newStage);
    
    // Reset form
    setStageName("");
    setStageType("");
    setAutomations([
      { id: 1, type: "email", label: "Send Email", enabled: false, condition: "" }
    ]);
    
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
      borderRadius: '16px',
      width: '500px',
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
      <div className="add-stage-modal">
        <div className="modal-header">
          <h2>Add New Stage</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group full-width">
              <label>Stage Name</label>
              <input
                type="text"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                className="form-input"
                placeholder="Enter stage name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Stage Type</label>
              <select
                value={stageType}
                onChange={(e) => setStageType(e.target.value)}
                className="form-select"
              >
                <option value="">Select stage type...</option>
                {stageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="automations-section">
            <div className="automations-header">
              <label>Automations</label>
              <button 
                type="button"
                className="add-automation-btn"
                onClick={handleAddAutomation}
              >
                <i className="fas fa-plus"></i>
                Add
              </button>
            </div>

            <div className="automations-list">
              {automations.map((automation) => (
                <div key={automation.id} className="automation-item">
                  <div className="automation-main">
                    <div className="automation-info">
                      <span className="automation-label">{automation.label}</span>
                    </div>
                    <div className="automation-controls">
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={automation.enabled}
                          onChange={() => handleToggleAutomation(automation.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <button
                        type="button"
                        className="delete-automation-btn"
                        onClick={() => handleDeleteAutomation(automation.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  {automation.enabled && (
                    <div className="automation-condition">
                      <input
                        type="text"
                        value={automation.condition}
                        onChange={(e) => handleConditionChange(automation.id, e.target.value)}
                        className="condition-input"
                        placeholder="Condition (optional)"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="add-stage-btn" 
            onClick={handleSubmit}
            disabled={!stageName.trim() || !stageType}
          >
            Add Stage
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddStageModal;