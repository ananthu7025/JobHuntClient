/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputTextArea from "@/components/InputComponents/InputTextArea";
import InputCheckbox from "@/components/InputComponents/InputCheckbox";
import InputHtmlEditor from "@/components/InputComponents/InputHtmlEditor";
import { SelectItem } from "@/types";


interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'email' | 'job';
  // Email template fields
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  variables?: string[];
  // Job template fields
  fields?: Record<string, any>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface TemplateFormData {
  name: string;
  description: string;
  category: string;
  type: 'email' | 'job';
  subject?: string;
  htmlContent?: string;
  textContent?: string;
  isActive: boolean;
}

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({
  isOpen,
  onClose,
  template
}) => {
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');
  
  const hookForm = useForm<TemplateFormData>({
    defaultValues: {
      isActive: true,
      type: 'email',
      htmlContent: '',
      textContent: ''
    }
  });

  const { handleSubmit, reset, setValue, watch } = hookForm;

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

  // Watch form values for preview
  const htmlContent = watch('htmlContent');
  const textContent = watch('textContent');
  const subject = watch('subject');

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

  // Load template data when modal opens or template changes
  useEffect(() => {
    if (template && isOpen) {
      setValue('name', template.name);
      setValue('description', template.description);
      setValue('category', template.category);
      setValue('type', template.type);
      setValue('isActive', template.isActive);
      
      if (template.type === 'email') {
        setValue('subject', template.subject || '');
        setValue('htmlContent', template.htmlContent || '');
        setValue('textContent', template.textContent || '');
      }
    }
  }, [template, isOpen, setValue]);

  const onSubmit = (data: TemplateFormData) => {
    const updatedTemplate = {
      ...template,
      ...data,
      ...(data.type === 'email' && {
        variables: getAllVariables()
      }),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    console.log("Updating template:", updatedTemplate);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setPreviewMode('html');
    setViewMode('view');
    onClose();
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'view' ? 'edit' : 'view');
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

  if (!template) return null;

  const renderViewMode = () => (
    <div className="modal-body template-view-mode">
      <div className="template-info-section">
        <div className="info-grid">
          <div className="info-item">
            <label>Template Name:</label>
            <span>{template.name}</span>
          </div>
          <div className="info-item">
            <label>Category:</label>
            <span>{template.category}</span>
          </div>
          <div className="info-item">
            <label>Status:</label>
            <span className={`status-badge status-${template.isActive ? 'active' : 'inactive'}`}>
              {template.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="info-item">
            <label>Created By:</label>
            <span>{template.createdBy}</span>
          </div>
          <div className="info-item">
            <label>Created On:</label>
            <span>{template.createdAt}</span>
          </div>
          <div className="info-item">
            <label>Last Updated:</label>
            <span>{template.updatedAt}</span>
          </div>
        </div>
        <div className="info-item full-width">
          <label>Description:</label>
          <p>{template.description}</p>
        </div>
        <div className="info-item">
          <label>Template Type:</label>
          <span className="template-type-indicator">
            <i className={`fas ${template.type === 'email' ? 'fa-envelope' : 'fa-briefcase'}`}></i>
            {template.type === 'email' ? 'Email Template' : 'Job Template'}
          </span>
        </div>
        {template.type === 'email' && template.subject && (
          <div className="info-item full-width">
            <label>Email Subject:</label>
            <p>{template.subject}</p>
          </div>
        )}
      </div>

      {/* Email Content Section */}
      {template.type === 'email' && (
        <>
          <div className="template-content-section">
            <div className="preview-header">
              <h3>Email Content</h3>
              <div className="preview-controls">
                <button
                  type="button"
                  className={`preview-mode-btn ${previewMode === 'html' ? 'active' : ''}`}
                  onClick={() => setPreviewMode('html')}
                >
                  HTML Content
                </button>
                <button
                  type="button"
                  className={`preview-mode-btn ${previewMode === 'text' ? 'active' : ''}`}
                  onClick={() => setPreviewMode('text')}
                >
                  Text Content
                </button>
              </div>
            </div>

            <div className="email-content-view">
              {previewMode === 'html' ? (
                <div className="html-content-display">
                  <div 
                    className="html-content-preview"
                    dangerouslySetInnerHTML={{ __html: template.htmlContent || '' }}
                  />
                </div>
              ) : (
                <div className="text-content-display">
                  <pre className="text-content-preview">
                    {template.textContent || ''}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="template-variables-section">
            <h3>Template Variables ({template.variables?.length || 0})</h3>
            {!template.variables || template.variables.length === 0 ? (
              <div className="no-variables-message">
                <p>No variables configured for this template.</p>
              </div>
            ) : (
              <div className="variables-grid">
                {template.variables.map((variable) => (
                  <div key={variable} className="variable-tag">
                    <i className="fas fa-tag"></i>
                    {variable}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Job Template Section */}
      {template.type === 'job' && (
        <div className="job-template-section">
          <h3>Job Template Fields</h3>
          {template.fields && Object.keys(template.fields).length > 0 ? (
            <div className="job-fields-display">
              {Object.entries(template.fields).map(([key, value]) => (
                <div key={key} className="job-field-item">
                  <div className="field-label">{key}:</div>
                  <div className="field-value">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-job-fields-message">
              <p>No job fields configured for this template.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderEditMode = () => (
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
                field="category"
                label="Category"
                labelMandatory
                options={template.type === 'email' ? emailCategoryOptions : jobCategoryOptions}
                placeholder="Select category"
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

          {template.type === 'email' && (
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

          <div className="form-group">
            <InputCheckbox
              hookForm={hookForm}
              field="isActive"
              label="Make this template active"
            />
          </div>
        </div>

        {/* Email Content Section */}
        {template.type === 'email' && (
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
        )}

        {/* Job Template Section */}
        {template.type === 'job' && (
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
        )}

      </div>

      <div className="modal-footer">
        <button type="button" className="cancel-btn" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className="create-btn">
          Update Template
        </button>
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="create-job-modal">
        <div className="modal-header">
          <h2>
            {viewMode === 'view' ? 'View Email Template' : 'Edit Email Template'}: {template.name}
          </h2>
          <div className="modal-header-actions">
            <button 
              type="button" 
              className={`mode-toggle-btn ${viewMode === 'edit' ? 'active' : ''}`}
              onClick={toggleViewMode}
            >
              <i className={`fas ${viewMode === 'view' ? 'fa-edit' : 'fa-eye'}`}></i>
              {viewMode === 'view' ? 'Edit' : 'View'}
            </button>
            <button className="close-btn" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {viewMode === 'view' ? renderViewMode() : renderEditMode()}

        {viewMode === 'view' && (
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="create-btn" onClick={toggleViewMode}>
              Edit Template
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditTemplateModal;