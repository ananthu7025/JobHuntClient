/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AddStageModal from "./AddStageModal";
import WorkflowLibraryModal from "./WorkflowLibraryModal";

const WorkflowTab = () => {
  const [workflowStages, setWorkflowStages] = useState([
    {
      id: 1,
      title: "Application Review",
      type: "screening",
      automations: [
        { id: 1, type: "email", label: "Email", status: "auto" },
        { id: 2, type: "notify", label: "Notify Recruiter", status: "auto" }
      ]
    },
    {
      id: 2,
      title: "Final Interview",
      type: "interview",
      automations: []
    },
    {
      id: 3,
      title: "Offer",
      type: "offer",
      automations: [
        { id: 1, type: "email", label: "Email", status: "auto" }
      ]
    }
  ]);

  const [draggedStage, setDraggedStage] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

  const handleAddStage = (stageData: any) => {
    setWorkflowStages([...workflowStages, stageData]);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenLibraryModal = () => {
    setIsLibraryModalOpen(true);
  };

  const handleCloseLibraryModal = () => {
    setIsLibraryModalOpen(false);
  };

  const handleApplyTemplate = (templateStages: any[]) => {
    setWorkflowStages(templateStages);
  };

  const handleDeleteStage = (stageId: number) => {
    setWorkflowStages(workflowStages.filter(stage => stage.id !== stageId));
  };

  const handleResetWorkflow = () => {
    setWorkflowStages([
      {
        id: 1,
        title: "Application Review",
        type: "screening",
        automations: [
          { id: 1, type: "email", label: "Email", status: "auto" },
          { id: 2, type: "notify", label: "Notify Recruiter", status: "auto" }
        ]
      }
    ]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, stageId: number, index: number) => {
  setDraggedStage(stageId);
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", e.currentTarget.outerHTML);
  (e.currentTarget as HTMLDivElement).style.opacity = "0.5";
};

const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  (e.currentTarget as HTMLDivElement).style.opacity = "1";
  setDraggedStage(null);
  setDragOverIndex(null);
};


  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedStage === null) return;
    
    const draggedIndex = workflowStages.findIndex(stage => stage.id === draggedStage);
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;
    
    const newStages = [...workflowStages];
    const draggedStageData = newStages[draggedIndex];
    
    // Remove dragged stage from its current position
    newStages.splice(draggedIndex, 1);
    
    // Insert at new position
    newStages.splice(dropIndex, 0, draggedStageData);
    
    setWorkflowStages(newStages);
    setDraggedStage(null);
    setDragOverIndex(null);
  };

  const getStageIcon = (type: string) => {
    switch (type) {
      case "screening":
        return "fas fa-star";
      case "interview":
        return "fas fa-calendar";
      case "offer":
        return "fas fa-envelope";
      default:
        return "fas fa-circle";
    }
  };

  const getStageColor = (type: string) => {
    switch (type) {
      case "screening":
        return "screening";
      case "interview":
        return "interview";
      case "offer":
        return "offer";
      default:
        return "custom";
    }
  };

  return (
    <div className="workflow-tab">
      <div className="workflow-header">
        <div className="workflow-title-section">
          <h2>Workflow Builder</h2>
          <p>Design your custom hiring pipeline with automation</p>
        </div>
        <div className="workflow-actions">
          <button className="workflow-btn secondary" onClick={handleOpenLibraryModal}>
            Workflow Library
          </button>
          <button className="workflow-btn secondary" onClick={handleResetWorkflow}>
            <i className="fas fa-redo"></i>
            Reset Workflow
          </button>
          <button className="workflow-btn primary" onClick={handleOpenAddModal}>
            <i className="fas fa-plus"></i>
            Add Stage
          </button>
          <button className="workflow-btn primary">
            <i className="fas fa-save"></i>
            Save Workflow
          </button>
        </div>
      </div>

      <div className="workflow-builder">
        <div className="workflow-stages">
          {workflowStages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div 
                className={`workflow-stage stage-${getStageColor(stage.type)} ${
                  dragOverIndex === index ? 'drag-over' : ''
                } ${draggedStage === stage.id ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, stage.id, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="stage-header">
                  <div className="stage-drag-handle">
                    <i className="fas fa-grip-vertical"></i>
                  </div>
                  <div className="stage-icon">
                    <i className={getStageIcon(stage.type)}></i>
                  </div>
                  <div className="stage-title">
                    <h4>{stage.title}</h4>
                  </div>
                  <div className="stage-actions">
                    <button className="stage-action-btn" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="stage-action-btn" 
                      title="Delete"
                      onClick={() => handleDeleteStage(stage.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <div className="stage-content">
                  <div className="stage-badge">
                    {stage.type === "screening" && "Screening"}
                    {stage.type === "interview" && "Interview"}
                    {stage.type === "offer" && "Offer"}
                    {stage.type === "custom" && "Custom"}
                  </div>

                  <div className="stage-automations">
                    {stage.automations.length > 0 ? (
                      stage.automations.map((automation) => (
                        <div key={automation.id} className="automation-item">
                          <div className="automation-icon">
                            <i className={automation.type === "email" ? "fas fa-envelope" : "fas fa-user"}></i>
                          </div>
                          <span className="automation-label">{automation.label}</span>
                          <span className="automation-status">{automation.status}</span>
                        </div>
                      ))
                    ) : (
                      <div className="no-automations">
                        <span>No automations</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {index < workflowStages.length - 1 && (
                <div className="workflow-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AddStageModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddStage={handleAddStage}
      />

      <WorkflowLibraryModal
        isOpen={isLibraryModalOpen}
        onClose={handleCloseLibraryModal}
        onApplyTemplate={handleApplyTemplate}
      />
    </div>
  );
};

export default WorkflowTab;
