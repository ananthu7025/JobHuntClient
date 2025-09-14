import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputHTMLEditor from "@/components/InputComponents/InputHtmlEditor";
import { SelectItem } from "@/types";

interface EmailTemplateFormData {
  name: string;
  subject: string;
  category: SelectItem | null;
  htmlContent: string;
  isActive: boolean;
}

interface CreateEmailTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EmailTemplateFormData, 'category'> & { category: string }) => void;
}

const CreateEmailTemplateModal: React.FC<CreateEmailTemplateModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [showVariablesHelp, setShowVariablesHelp] = useState(false);

  const hookForm = useForm<EmailTemplateFormData>({
    defaultValues: {
      name: "",
      subject: "",
      category: null,
      htmlContent: "",
      isActive: true
    }
  });

  const { handleSubmit, reset, watch } = hookForm;

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

  const predefinedTemplates = [
    {
      name: "Application Acknowledgment",
      subject: "Thank you for your application - {{jobTitle}}",
      category: "Application",
      content: `<p>Dear {{candidateName}},</p>

<p>Thank you for your interest in the <strong>{{jobTitle}}</strong> position at {{companyName}}. We have successfully received your application submitted on {{applicationDate}}.</p>

<p>Our hiring team will carefully review your qualifications and experience. If your background matches our requirements, we will contact you within the next 5-7 business days to discuss the next steps.</p>

<p>In the meantime, feel free to explore our company website to learn more about our culture and values.</p>

<p>Thank you again for considering {{companyName}} as your potential employer.</p>

<p>Best regards,<br/>
{{hiringManagerName}}<br/>
{{department}} Department<br/>
{{contactEmail}}</p>`
    },
    {
      name: "Interview Invitation",
      subject: "Interview Invitation - {{jobTitle}} Position",
      category: "Interview",
      content: `<p>Dear {{candidateName}},</p>

<p>Congratulations! We were impressed with your application for the <strong>{{jobTitle}}</strong> position and would like to invite you for an interview.</p>

<p><strong>Interview Details:</strong></p>
<ul>
  <li><strong>Date:</strong> {{interviewDate}}</li>
  <li><strong>Time:</strong> {{interviewTime}}</li>
  <li><strong>Location:</strong> {{interviewLocation}}</li>
  <li><strong>Duration:</strong> Approximately 60 minutes</li>
</ul>

<p><strong>What to expect:</strong></p>
<ul>
  <li>Discussion about your experience and qualifications</li>
  <li>Overview of the role and company</li>
  <li>Opportunity to ask questions</li>
</ul>

<p>Please confirm your availability by replying to this email. If the scheduled time doesn't work for you, please let us know your preferred alternatives.</p>

<p>We look forward to meeting you!</p>

<p>Best regards,<br/>
{{hiringManagerName}}<br/>
{{contactEmail}} | {{contactPhone}}</p>`
    },
    {
      name: "Job Offer Letter",
      subject: "Job Offer - {{jobTitle}} Position at {{companyName}}",
      category: "Offer",
      content: `<p>Dear {{candidateName}},</p>

<p>We are delighted to extend an offer of employment for the position of <strong>{{jobTitle}}</strong> at {{companyName}}.</p>

<p><strong>Position Details:</strong></p>
<ul>
  <li><strong>Position:</strong> {{jobTitle}}</li>
  <li><strong>Department:</strong> {{department}}</li>
  <li><strong>Start Date:</strong> {{startDate}}</li>
  <li><strong>Salary:</strong> {{salary}}</li>
  <li><strong>Benefits:</strong> {{benefits}}</li>
</ul>

<p>This offer is contingent upon:</p>
<ul>
  <li>Successful completion of background check</li>
  <li>Verification of employment eligibility</li>
  <li>Signing of employment agreement</li>
</ul>

<p>Please review the attached detailed offer letter and employment agreement. To accept this offer, please sign and return the documents by <strong>{{responseDeadline}}</strong>.</p>

<p>We are excited about the possibility of you joining our team and contributing to our continued success.</p>

<p>Please don't hesitate to reach out if you have any questions.</p>

<p>Congratulations and welcome to {{companyName}}!</p>

<p>Best regards,<br/>
{{hiringManagerName}}<br/>
{{contactEmail}} | {{contactPhone}}</p>`
    }
  ];

  const insertVariable = (variable: string) => {
    const currentContent = hookForm.getValues("htmlContent");
    hookForm.setValue("htmlContent", currentContent + variable + " ");
  };

  const useTemplate = (template: typeof predefinedTemplates[0]) => {
    hookForm.setValue("name", template.name);
    hookForm.setValue("subject", template.subject);
    hookForm.setValue("category", { value: template.category, label: template.category });
    hookForm.setValue("htmlContent", template.content);
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

    onSubmit(submissionData);
    handleClose();
  };

  const handleClose = () => {
    reset();
    setShowVariablesHelp(false);
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="create-email-template-modal">
        <div className="modal-header">
          <h2>Create Email Template</h2>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="modal-body">

            {/* Quick Templates Section */}
            <div className="form-section">
              <h3>Quick Start Templates</h3>
              <div className="predefined-templates">
                <p className="template-description">
                  Choose a predefined template to get started quickly, then customize as needed.
                </p>
                <div className="template-options">
                  {predefinedTemplates.map((template, index) => (
                    <button
                      key={index}
                      type="button"
                      className="template-option-btn"
                      onClick={() => useTemplate(template)}
                    >
                      <div className="template-icon">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div className="template-info">
                        <h4>{template.name}</h4>
                        <span className="template-category">{template.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
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

export default CreateEmailTemplateModal;