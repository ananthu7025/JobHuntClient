/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputHTMLEditor from "@/components/InputComponents/InputHtmlEditor";
import { SelectItem } from "@/types";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  htmlContent: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

interface EmailTemplateFormData {
  name: string;
  subject: string;
  category: SelectItem | null;
  htmlContent: string;
  isActive: boolean;
}

interface EditEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EmailTemplateFormData, 'category'> & { category: string }) => void;
  template: EmailTemplate;
}

const EditEmailTemplateModal: React.FC<EditEmailTemplateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  template
}) => {
  const [showVariablesHelp, setShowVariablesHelp] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const hookForm = useForm<EmailTemplateFormData>({
    defaultValues: {
      name: template.name,
      subject: template.subject,
      category: { value: template.category, label: template.category },
      htmlContent: template.htmlContent,
      isActive: template.isActive
    }
  });

  const { handleSubmit, reset, watch, formState: { isDirty } } = hookForm;

  const categoryOptions: SelectItem[] = [
    { value: "Application", label: "Application" },
    { value: "Interview", label: "Interview" },
    { value: "Rejection", label: "Rejection" },
    { value: "Offer", label: "Offer" },
    { value: "Follow-up", label: "Follow-up" },
    { value: "Assessment", label: "Assessment" },
    { value: "Onboarding", label: "Onboarding" },
    { value: "General", label: "General" }
  ];

  const availableVariables = [
    { variable: "{{candidateName}}", description: "Candidate's full name" },
    { variable: "{{firstName}}", description: "Candidate's first name" },
    { variable: "{{lastName}}", description: "Candidate's last name" },
    { variable: "{{jobTitle}}", description: "Job position title" },
    { variable: "{{companyName}}", description: "Company name" },
    { variable: "{{hiringManagerName}}", description: "Hiring manager's name" },
    { variable: "{{interviewDate}}", description: "Interview date" },
    { variable: "{{interviewTime}}", description: "Interview time" },
    { variable: "{{interviewLocation}}", description: "Interview location/link" },
    { variable: "{{salary}}", description: "Salary amount" },
    { variable: "{{startDate}}", description: "Job start date" },
    { variable: "{{benefits}}", description: "Job benefits" },
    { variable: "{{responseDeadline}}", description: "Response deadline date" },
    { variable: "{{applicationDate}}", description: "Application submission date" },
    { variable: "{{department}}", description: "Department name" },
    { variable: "{{contactEmail}}", description: "Contact email address" },
    { variable: "{{contactPhone}}", description: "Contact phone number" }
  ];

  // Update form when template changes
  useEffect(() => {
    if (template) {
      reset({
        name: template.name,
        subject: template.subject,
        category: { value: template.category, label: template.category },
        htmlContent: template.htmlContent,
        isActive: template.isActive
      });
      setHasUnsavedChanges(false);
    }
  }, [template, reset]);

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty]);

  const insertVariable = (variable: string) => {
    const currentContent = hookForm.getValues("htmlContent");
    hookForm.setValue("htmlContent", currentContent + variable + " ", { shouldDirty: true });
  };

  const onFormSubmit = (data: EmailTemplateFormData) => {
    if (!data.category) return;

    const submissionData = {
      name: data.name,
      subject: data.subject,
      category: data.category.value,
      htmlContent: data.htmlContent,
      isActive: data.isActive
    };

    // onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close without saving?"
      );
      if (!confirmClose) return;
    }

    reset();
    setShowVariablesHelp(false);
    setHasUnsavedChanges(false);
    onClose();
  };

  const handleResetTemplate = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all changes? This will restore the template to its last saved state."
    );

    if (confirmReset) {
      reset({
        name: template.name,
        subject: template.subject,
        category: { value: template.category, label: template.category },
        htmlContent: template.htmlContent,
        isActive: template.isActive
      });
      setHasUnsavedChanges(false);
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="edit-email-template-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>Edit Email Template</h2>
            {hasUnsavedChanges && (
              <div className="unsaved-changes-indicator">
                <i className="fas fa-circle"></i>
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="modal-body">

            {/* Template Info */}
            <div className="form-section">
              <div className="template-info-banner">
                <div className="info-content">
                  <div className="info-item">
                    <label>Template ID:</label>
                    <span>{template.id}</span>
                  </div>
                  <div className="info-item">
                    <label>Usage Count:</label>
                    <span>{template.usageCount} times</span>
                  </div>
                  <div className="info-item">
                    <label>Created:</label>
                    <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <label>Last Updated:</label>
                    <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {hasUnsavedChanges && (
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={handleResetTemplate}
                    title="Reset to last saved version"
                  >
                    <i className="fas fa-undo"></i>
                    Reset Changes
                  </button>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
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
                    options={categoryOptions}
                    placeholder="Select category"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <InputText
                  hookForm={hookForm}
                  field="subject"
                  label="Email Subject Line"
                  labelMandatory
                  placeholder="Enter email subject (you can use variables like {{jobTitle}})"
                />
              </div>
            </div>

            {/* Email Content */}
            <div className="form-section">
              <div className="content-header">
                <h3>Email Content</h3>
                <button
                  type="button"
                  className="variables-help-btn"
                  onClick={() => setShowVariablesHelp(!showVariablesHelp)}
                >
                  <i className="fas fa-question-circle"></i>
                  Variables Help
                </button>
              </div>

              {showVariablesHelp && (
                <div className="variables-help-panel">
                  <h4>Available Variables</h4>
                  <p>Click any variable to insert it into your template:</p>
                  <div className="variables-grid">
                    {availableVariables.map((item, index) => (
                      <div
                        key={index}
                        className="variable-item"
                        onClick={() => insertVariable(item.variable)}
                      >
                        <code>{item.variable}</code>
                        <small>{item.description}</small>
                      </div>
                    ))}
                  </div>
                  <div className="variables-note">
                    <p><strong>Note:</strong> Variables will be automatically replaced with actual values when emails are sent.</p>
                  </div>
                </div>
              )}

              <div className="form-group full-width">
                <InputHTMLEditor
                  hookForm={hookForm}
                  field="htmlContent"
                  label="Email Content"
                  labelMandatory
                />
              </div>
            </div>

            {/* Template Settings */}
            <div className="form-section">
              <h3>Template Settings</h3>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="form-check-input"
                    {...hookForm.register("isActive")}
                  />
                  <label htmlFor="isActive" className="form-check-label">
                    <strong>Active Template</strong>
                    <small>Active templates are available for use in email campaigns</small>
                  </label>
                </div>
              </div>

              {template.usageCount > 0 && (
                <div className="usage-warning">
                  <div className="warning-content">
                    <i className="fas fa-exclamation-triangle"></i>
                    <div>
                      <strong>Template in Use</strong>
                      <p>This template has been used {template.usageCount} times. Changes will only affect future emails.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="form-section">
              <h3>Live Preview</h3>
              <div className="email-preview">
                <div className="preview-header">
                  <div className="preview-subject">
                    <strong>Subject:</strong> {watch("subject") || "Preview will appear here..."}
                  </div>
                </div>
                <div className="preview-content">
                  {watch("htmlContent") ? (
                    <div
                      className="preview-html"
                      dangerouslySetInnerHTML={{ __html: watch("htmlContent") }}
                    />
                  ) : (
                    <div className="preview-placeholder">
                      Email content preview will appear here as you type...
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <div className="footer-actions">
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              {hasUnsavedChanges && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={handleResetTemplate}
                >
                  <i className="fas fa-undo"></i>
                  Reset
                </button>
              )}
              <button
                type="submit"
                className="save-btn"
                disabled={!hasUnsavedChanges}
              >
                <i className="fas fa-save"></i>
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditEmailTemplateModal;