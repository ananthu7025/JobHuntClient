/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "react-modal";

interface WorkflowLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: any) => void;
}

const WorkflowLibraryModal: React.FC<WorkflowLibraryModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const workflowTemplates = [
    {
      id: "standard-hiring",
      name: "Standard Hiring",
      description: "Basic hiring process for most roles",
      stages: [
        { name: "Application Review", type: "screening" },
        { name: "Phone Screening", type: "screening" },
        { name: "Interview", type: "interview" },
        { name: "Offer", type: "offer" }
      ]
    },
    {
      id: "tech-hiring",
      name: "Tech Hiring",
      description: "Technical roles with coding assessments",
      stages: [
        { name: "Application Review", type: "screening" },
        { name: "Technical Assessment", type: "technical" },
        { name: "Technical Interview", type: "interview" },
        { name: "HR Interview", type: "interview" },
        { name: "Offer", type: "offer" }
      ]
    },
    {
      id: "design-hiring",
      name: "Design Hiring",
      description: "Design roles with portfolio review",
      stages: [
        { name: "Application Review", type: "screening" },
        { name: "Portfolio Review", type: "review" },
        { name: "Design Challenge", type: "assessment" },
        { name: "Design Interview", type: "interview" },
        { name: "Offer", type: "offer" }
      ]
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(selectedTemplate === templateId ? null : templateId);
  };

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = workflowTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const workflowStages = template.stages.map((stage, index) => ({
      id: Date.now() + index,
      title: stage.name,
      type: stage.type,
      automations: stage.type === "screening" ? [
        { id: 1, type: "email", label: "Email", status: "auto" },
        { id: 2, type: "notify", label: "Notify Recruiter", status: "auto" }
      ] : []
    }));

    onApplyTemplate(workflowStages);
    setSelectedTemplate(null);
    onClose();
  };

  const getStageTypeColor = (type: string) => {
    switch (type) {
      case "screening":
        return "stage-screening";
      case "interview":
        return "stage-interview";
      case "offer":
        return "stage-offer";
      case "technical":
        return "stage-technical";
      case "assessment":
        return "stage-assessment";
      case "review":
        return "stage-review";
      default:
        return "stage-default";
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
      borderRadius: '16px',
      width: '700px',
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
      <div className="workflow-library-modal">
        <div className="modal-header">
          <h2>Workflow Templates</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="templates-list">
            {workflowTemplates.map((template) => (
              <div 
                key={template.id} 
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-header">
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                </div>

                <div className="template-stages">
                  {template.stages.map((stage, index) => (
                    <React.Fragment key={index}>
                      <div className={`template-stage ${getStageTypeColor(stage.type)}`}>
                        <span>{stage.name}</span>
                      </div>
                      {index < template.stages.length - 1 && (
                        <div className="stage-arrow">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {selectedTemplate === template.id && (
                  <div className="template-selected-indicator">
                    <i className="fas fa-check-circle"></i>
                    <span>Selected</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="apply-template-btn" 
            onClick={handleApplyTemplate}
            disabled={!selectedTemplate}
          >
            Apply Template
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WorkflowLibraryModal;