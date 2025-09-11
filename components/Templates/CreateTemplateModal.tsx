/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputTextArea from "@/components/InputComponents/InputTextArea";
import InputCheckbox from "@/components/InputComponents/InputCheckbox";
import InputHtmlEditor from "@/components/InputComponents/InputHtmlEditor";
import { SelectItem } from "@/types";

interface TemplateFormData {
  name: string;
  description: string;
  category: string;
  type: 'email' | 'job';
  // Email fields
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  // Job fields
  fields?: Record<string, any>;
  isActive: boolean;
}

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  isOpen,
  onClose
}) => {
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  
  const hookForm = useForm<TemplateFormData>({
    defaultValues: {
      isActive: true,
      type: 'email',
      htmlContent: '',
      textContent: ''
    }
  });

  const { handleSubmit, reset, watch,  } = hookForm;

  const emailCategoryOptions: SelectItem[] = [
    { value: "Interview", label: "Interview" },
    { value: "Application", label: "Application" },
    { value: "Offer", label: "Offer" },
    { value: "Rejection", label: "Rejection" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Onboarding", label: "Onboarding" },
    { value: "General", label: "General" },
    { value: "Other", label: "Other" }
  ];

  const jobCategoryOptions: SelectItem[] = [
    { value: "Engineering", label: "Engineering" },
    { value: "Product", label: "Product" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Design", label: "Design" },
    { value: "Operations", label: "Operations" },
    { value: "HR", label: "Human Resources" },
    { value: "Other", label: "Other" }
  ];

  const templateTypeOptions: SelectItem[] = [
    { value: "email", label: "Email Template" },
    { value: "job", label: "Job Template" }
  ];

  // Watch form values for preview
  const htmlContent = watch('htmlContent');
  const textContent = watch('textContent');
  const subject = watch('subject');
  const templateType = watch('type');

  // Extract variables from content
  const extractVariables = (content: string): string[] => {
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  };

  // Get all extracted variables from both HTML and text content
  const getAllVariables = (): string[] => {
    const htmlVars = extractVariables(htmlContent || '');
    const textVars = extractVariables(textContent || '');
    const subjectVars = extractVariables(subject || '');
    const allVars = [...new Set([...htmlVars, ...textVars, ...subjectVars])];
    return allVars.sort();
  };

  const onSubmit = (data: TemplateFormData) => {
    const templateData = {
      ...data,
      ...(data.type === 'email' && {
        variables: getAllVariables()
      }),
      id: `template_${Date.now()}`,
      createdBy: "Current User", // Replace with actual user
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    console.log("Creating template:", templateData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setPreviewMode('html');
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
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '95vh',
      overflow: 'auto'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000
    }
  };

  const renderEmailContent = () => {
    if (templateType !== 'email') return null;

    return (
      <>
        <div className="form-section">
          <h3>Email Content</h3>
        
          <div className="form-group full-width">
            <InputHtmlEditor
              hookForm={hookForm}
              field="htmlContent"
              label="HTML Content"
              labelMandatory
            />
          </div>

          <div className="form-group full-width">
            <InputTextArea
              hookForm={hookForm}
              field="textContent"
              label="Plain Text Content"
              labelMandatory
              placeholder="Enter plain text version of your email content. Use {{variableName}} for dynamic content."
              rows={8}
            />
          </div>
        </div>

        {/* Variables Section */}
        <div className="form-section">
          <h3>Template Variables</h3>
          <div className="variables-info">
            <p>Variables are automatically detected from your content. Available variables:</p>
            <div className="variables-list">
              {getAllVariables().length === 0 ? (
                <div className="no-variables">
                  <p>No variables found. Use {`{{variableName}}`} syntax in your content.</p>
                </div>
              ) : (
                <div className="variables-grid">
                  {getAllVariables().map((variable) => (
                    <div key={variable} className="variable-tag">
                      <i className="fas fa-tag"></i>
                      {variable}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="variables-help">
              <h4>Common Variables:</h4>
              <div className="common-variables">
                <span className="variable-example">{`{{candidateName}}`}</span>
                <span className="variable-example">{`{{position}}`}</span>
                <span className="variable-example">{`{{company}}`}</span>
                <span className="variable-example">{`{{recruiterName}}`}</span>
                <span className="variable-example">{`{{interviewDate}}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="form-section">
          <div className="preview-header">
            <h3>Email Preview</h3>
            <div className="preview-controls">
              <button
                type="button"
                className={`preview-mode-btn ${previewMode === 'html' ? 'active' : ''}`}
                onClick={() => setPreviewMode('html')}
              >
                HTML Preview
              </button>
              <button
                type="button"
                className={`preview-mode-btn ${previewMode === 'text' ? 'active' : ''}`}
                onClick={() => setPreviewMode('text')}
              >
                Text Preview
              </button>
            </div>
          </div>
          
          <div className="email-preview">
            <div className="preview-subject">
              <strong>Subject:</strong> {subject || 'No subject entered'}
            </div>
            
            {previewMode === 'html' ? (
              <div className="html-preview">
                {htmlContent ? (
                  <div 
                    className="html-content-preview"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                ) : (
                  <div className="empty-preview">No HTML content entered</div>
                )}
              </div>
            ) : (
              <div className="text-preview">
                <pre className="text-content-preview">
                  {textContent || 'No text content entered'}
                </pre>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderJobTemplate = () => {
    if (templateType !== 'job') return null;

    return (
      <div className="form-section">
        <h3>Job Template Configuration</h3>
        <div className="job-template-info">
          <p>Job templates allow you to pre-configure common job posting fields and requirements.</p>
          <div className="job-fields-placeholder">
            <div className="placeholder-content">
              <i className="fas fa-briefcase"></i>
              <h4>Job Template Fields</h4>
              <p>Configure job-specific fields like job type, work mode, experience level, salary ranges, and requirements.</p>
              <p><em>Job template field configuration will be implemented in a future update.</em></p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="create-job-modal">
        <div className="modal-header">
          <h2>Create New Template</h2>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            
            {/* Basic Template Information */}
            <div className="form-section">
              <h3>Template Information</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="name"
                    label="Template Name"
                    labelMandatory
                    placeholder="Enter template name"
                  />
                </div>
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="type"
                    label="Template Type"
                    labelMandatory
                    options={templateTypeOptions}
                    placeholder="Select template type"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="category"
                    label="Category"
                    labelMandatory
                    options={templateType === 'email' ? emailCategoryOptions : jobCategoryOptions}
                    placeholder="Select category"
                  />
                </div>
                <div className="form-group half-width">
                  <InputCheckbox
                    hookForm={hookForm}
                    field="isActive"
                    label="Make this template active"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="description"
                  label="Description"
                  labelMandatory
                  placeholder="Enter template description..."
                  rows={3}
                />
              </div>

              {templateType === 'email' && (
                <div className="form-group full-width">
                  <InputText
                    hookForm={hookForm}
                    field="subject"
                    label="Email Subject"
                    labelMandatory
                    placeholder="Enter email subject (use {{variableName}} for dynamic content)"
                  />
                </div>
              )}
            </div>

            {/* Email Content Section */}
            {renderEmailContent()}

            {/* Job Template Section */}
            {renderJobTemplate()}

          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Template
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTemplateModal;