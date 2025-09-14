/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import InputText from "@/components/InputComponents/InputText";
import InputDropDown from "@/components/InputComponents/InputDropDown";
import InputDatePicker from "@/components/InputComponents/InputDatePicker";
import InputTextArea from "@/components/InputComponents/InputTextArea";
// import InputCheckbox from "@/components/InputComponents/InputCheckbox";
// import InputCreatableDropDown from "@/components/InputComponents/InputCreatableDropDown";
import { SelectItem } from "@/types";

interface CustomField {
  id: string;
  type: 'text' | 'textarea' | 'dropdown' | 'date' | 'checkbox' | 'number';
  label: string;
  value: any;
  options?: SelectItem[];
  required?: boolean;
}

interface JobTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: Record<string, any>;
}

interface JobFormData {
  jobTitle: string;
  jobId: string;
  hiringManager: string;
  department: string;
  jobType: SelectItem | null;
  jobStatus: SelectItem | null;
  dateOpened: string;
  targetClosingDate: string;
  clientName: string;
  accountManager: string;
  contactPerson: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  workMode: SelectItem | null;
  workExperience: SelectItem | null;
  educationRequirement: string;
  skillsRequired: string;
  salaryMin: number;
  salaryMax: number;
  payRate: SelectItem | null;
  benefits: string;
  employmentType: SelectItem | null;
  jobSummary: string;
  jobDescription: string;
  requirements: string;
  preferredSkills: string;
  expectedRevenue: number;
  probabilityOfClosure: SelectItem | null;
  numberOfOpenings: number;
  notes: string;
  tags: string;
}

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose
}) => {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<JobTemplate | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const hookForm = useForm<JobFormData>({
    defaultValues: {
      jobType: null,
      jobStatus: null,
      workMode: null,
      workExperience: null,
      payRate: null,
      employmentType: null,
      probabilityOfClosure: null,
      numberOfOpenings: 1,
    }
  });

  const { handleSubmit, reset, setValue } = hookForm;

  const jobTypeOptions: SelectItem[] = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ];

  const jobStatusOptions: SelectItem[] = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "onhold", label: "On Hold" },
    { value: "draft", label: "Draft" }
  ];

  const workModeOptions: SelectItem[] = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" }
  ];

  const workExperienceOptions: SelectItem[] = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-10", label: "5-10 years" },
    { value: "10+", label: "10+ years" }
  ];

  const payRateOptions: SelectItem[] = [
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "annual", label: "Annual" }
  ];

  const employmentTypeOptions: SelectItem[] = [
    { value: "permanent", label: "Permanent" },
    { value: "temporary", label: "Temporary" },
    { value: "freelance", label: "Freelance" }
  ];

  const probabilityOptions: SelectItem[] = [
    { value: "high", label: "High (80-100%)" },
    { value: "medium", label: "Medium (50-79%)" },
    { value: "low", label: "Low (0-49%)" }
  ];

  // Sample job templates
  const jobTemplates: JobTemplate[] = [
    {
      id: "software-engineer",
      name: "Software Engineer",
      description: "Standard software engineering position template",
      category: "Engineering",
      fields: {
        jobType: { value: "fulltime", label: "Full-time" },
        department: "Engineering",
        workMode: { value: "hybrid", label: "Hybrid" },
        workExperience: { value: "3-5", label: "3-5 years" },
        employmentType: { value: "permanent", label: "Permanent" },
        skillsRequired: "JavaScript, React, Node.js, TypeScript, Git, Agile methodologies",
        jobSummary: "We are seeking a talented Software Engineer to join our growing engineering team.",
        jobDescription: "As a Software Engineer, you will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to our technical architecture decisions.",
        requirements: "• Bachelor's degree in Computer Science or related field\n• Strong proficiency in modern JavaScript frameworks\n• Experience with backend development\n• Knowledge of database design and management\n• Excellent problem-solving skills",
        benefits: "• Competitive salary and equity package\n• Health, dental, and vision insurance\n• Flexible work arrangements\n• Professional development opportunities\n• Company-provided equipment"
      }
    },
    {
      id: "product-manager",
      name: "Product Manager",
      description: "Product management role template",
      category: "Product",
      fields: {
        jobType: { value: "fulltime", label: "Full-time" },
        department: "Product",
        workMode: { value: "hybrid", label: "Hybrid" },
        workExperience: { value: "5-10", label: "5-10 years" },
        employmentType: { value: "permanent", label: "Permanent" },
        skillsRequired: "Product strategy, User research, Analytics, Agile, Stakeholder management",
        jobSummary: "Join our product team to drive product strategy and deliver exceptional user experiences.",
        jobDescription: "The Product Manager will own the product roadmap, work closely with engineering and design teams, and ensure we're building the right features for our users.",
        requirements: "• 5+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with user research and data analysis\n• Excellent communication and leadership abilities\n• Technical background preferred",
        benefits: "• Competitive compensation package\n• Comprehensive healthcare benefits\n• Stock options\n• Flexible PTO policy\n• Learning and development budget"
      }
    },
    {
      id: "marketing-specialist",
      name: "Marketing Specialist",
      description: "Digital marketing specialist template",
      category: "Marketing",
      fields: {
        jobType: { value: "fulltime", label: "Full-time" },
        department: "Marketing",
        workMode: { value: "remote", label: "Remote" },
        workExperience: { value: "1-3", label: "1-3 years" },
        employmentType: { value: "permanent", label: "Permanent" },
        skillsRequired: "Digital marketing, Content creation, SEO/SEM, Social media, Analytics, Email marketing",
        jobSummary: "We're looking for a creative Marketing Specialist to help grow our brand and drive customer acquisition.",
        jobDescription: "The Marketing Specialist will develop and execute marketing campaigns, create compelling content, manage social media presence, and analyze campaign performance to optimize results.",
        requirements: "• Bachelor's degree in Marketing, Communications, or related field\n• Experience with digital marketing tools and platforms\n• Strong writing and communication skills\n• Knowledge of SEO, SEM, and social media marketing\n• Analytical mindset with attention to detail",
        benefits: "• Competitive salary with performance bonuses\n• Remote work flexibility\n• Health and wellness benefits\n• Professional development opportunities\n• Creative and collaborative work environment"
      }
    }
  ];

  // Sample custom field definitions
  const availableCustomFields: Omit<CustomField, 'value'>[] = [
    { id: 'security_clearance', type: 'dropdown', label: 'Security Clearance Required', options: [
      { value: 'none', label: 'None' },
      { value: 'confidential', label: 'Confidential' },
      { value: 'secret', label: 'Secret' },
      { value: 'top_secret', label: 'Top Secret' }
    ]},
    { id: 'travel_required', type: 'checkbox', label: 'Travel Required' },
    { id: 'languages_required', type: 'textarea', label: 'Languages Required' },
    { id: 'certification_needed', type: 'text', label: 'Certifications Needed' },
    { id: 'start_date', type: 'date', label: 'Expected Start Date' },
    { id: 'budget_code', type: 'text', label: 'Budget/Cost Center Code' },
    { id: 'reports_to', type: 'text', label: 'Reports To' },
    { id: 'team_size', type: 'number', label: 'Team Size' },
    { id: 'overtime_expected', type: 'checkbox', label: 'Overtime Expected' },
    { id: 'company_vehicle', type: 'checkbox', label: 'Company Vehicle Provided' }
  ];

  const applyTemplate = (template: JobTemplate) => {
    // Apply template values to form
    const currentValues = hookForm.getValues();
    Object.entries(template.fields).forEach(([key, value]) => {
      if (key in currentValues) {
        // Use the form's setValue method with proper typing
        (setValue as any)(key, value);
      }
    });
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
  };

  const addCustomField = (fieldDef: Omit<CustomField, 'value'>) => {
    const newField: CustomField = {
      ...fieldDef,
      value: fieldDef.type === 'checkbox' ? false : fieldDef.type === 'number' ? 0 : ''
    };
    setCustomFields(prev => [...prev, newField]);
  };

  const removeCustomField = (fieldId: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const updateCustomFieldValue = (fieldId: string, value: any) => {
    setCustomFields(prev => 
      prev.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    );
  };

  const onSubmit = (data: JobFormData) => {
    const formDataWithCustomFields = {
      ...data,
      customFields: customFields,
      templateUsed: selectedTemplate?.id || null
    };
    console.log("Job data with custom fields:", formDataWithCustomFields);
    onClose();
    reset();
    setCustomFields([]);
    setSelectedTemplate(null);
  };

  const handleClose = () => {
    reset();
    setCustomFields([]);
    setSelectedTemplate(null);
    setShowTemplateSelector(false);
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
      width: '900px',
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
      <div className="create-job-modal">
        <div className="modal-header">
          <h2>Create New Job</h2>
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            
            {/* Template Selector Section */}
            <div className="form-section">
              <div className="template-section-header">
                <h3>Job Templates</h3>
                <button
                  type="button"
                  className="template-toggle-btn"
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                >
                  <i className="fas fa-clipboard-list"></i>
                  {showTemplateSelector ? 'Hide Templates' : 'Use Template'}
                </button>
              </div>
              
              {showTemplateSelector && (
                <div className="template-selector">
                  <p className="template-description">
                    Choose a template to prefill common job details and save time.
                  </p>
                  <div className="template-grid">
                    {jobTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                        onClick={() => applyTemplate(template)}
                      >
                        <div className="template-header">
                          <h4>{template.name}</h4>
                          <span className="template-category">{template.category}</span>
                        </div>
                        <p className="template-desc">{template.description}</p>
                        {selectedTemplate?.id === template.id && (
                          <div className="template-selected-indicator">
                            <i className="fas fa-check-circle"></i>
                            Applied
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTemplate && (
                <div className="selected-template-info">
                  <div className="selected-template-badge">
                    <i className="fas fa-check-circle"></i>
                    Using template: <strong>{selectedTemplate.name}</strong>
                    <button
                      type="button"
                      className="clear-template-btn"
                      onClick={() => {
                        setSelectedTemplate(null);
                        reset();
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Information Section */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="jobTitle"
                    label="Job Title"
                    labelMandatory
                    placeholder="Enter job title"
                  />
                </div>
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="jobId"
                    label="Job ID / Reference Number"
                    placeholder="Auto-generated or manual entry"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="hiringManager"
                    label="Hiring Manager / Recruiter"
                    labelMandatory
                    placeholder="Enter hiring manager name"
                  />
                </div>
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="department"
                    label="Department / Business Unit"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="jobType"
                    label="Job Type"
                    labelMandatory
                    options={jobTypeOptions}
                    placeholder="Select job type"
                  />
                </div>
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="jobStatus"
                    label="Job Status"
                    labelMandatory
                    options={jobStatusOptions}
                    placeholder="Select job status"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <InputDatePicker
                    hookForm={hookForm}
                    field="dateOpened"
                    label="Date Opened"
                    labelMandatory
                  />
                </div>
                <div className="form-group half-width">
                  <InputDatePicker
                    hookForm={hookForm}
                    field="targetClosingDate"
                    label="Target Closing Date"
                  />
                </div>
              </div>
            </div>

            {/* Client / Company Info Section */}
            <div className="form-section">
              <h3>Client / Company Information</h3>
              <div className="form-row">
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="clientName"
                    label="Client / Company Name"
                    placeholder="Enter client name"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="accountManager"
                    label="Account Manager"
                    placeholder="Enter account manager"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="contactPerson"
                    label="Contact Person"
                    placeholder="Enter contact person"
                  />
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="form-section">
              <h3>Job Details</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="industry"
                    label="Industry / Domain"
                    placeholder="Enter industry"
                  />
                </div>
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="workMode"
                    label="Work Mode"
                    options={workModeOptions}
                    placeholder="Select work mode"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="country"
                    label="Country"
                    placeholder="Enter country"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="state"
                    label="State"
                    placeholder="Enter state"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="city"
                    label="City"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="workExperience"
                    label="Work Experience Required"
                    options={workExperienceOptions}
                    placeholder="Select experience level"
                  />
                </div>
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="educationRequirement"
                    label="Education Requirement"
                    placeholder="Enter education requirements"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="skillsRequired"
                  label="Skills Required (technical & soft skills)"
                  placeholder="List required skills..."
                  rows={3}
                />
              </div>
            </div>

            {/* Compensation Section */}
            <div className="form-section">
              <h3>Compensation & Benefits</h3>
              <div className="form-row">
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="salaryMin"
                    label="Minimum Salary"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="salaryMax"
                    label="Maximum Salary"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="form-group third-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="payRate"
                    label="Pay Rate"
                    options={payRateOptions}
                    placeholder="Select pay rate"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <InputTextArea
                    hookForm={hookForm}
                    field="benefits"
                    label="Benefits / Perks"
                    placeholder="List benefits and perks..."
                    rows={2}
                  />
                </div>
                <div className="form-group half-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="employmentType"
                    label="Employment Type"
                    options={employmentTypeOptions}
                    placeholder="Select employment type"
                  />
                </div>
              </div>
            </div>

            {/* Description & Requirements Section */}
            <div className="form-section">
              <h3>Description & Requirements</h3>
              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="jobSummary"
                  label="Job Summary"
                  labelMandatory
                  placeholder="Enter a brief job summary..."
                  rows={3}
                />
              </div>

              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="jobDescription"
                  label="Job Description"
                  labelMandatory
                  placeholder="Enter detailed job description, responsibilities, duties..."
                  rows={5}
                />
              </div>

              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="requirements"
                  label="Requirements / Qualifications"
                  labelMandatory
                  placeholder="Enter job requirements and qualifications..."
                  rows={4}
                />
              </div>

              <div className="form-group full-width">
                <InputTextArea
                  hookForm={hookForm}
                  field="preferredSkills"
                  label="Preferred Skills (Optional)"
                  placeholder="Enter preferred skills..."
                  rows={3}
                />
              </div>
            </div>

            {/* Forecasting / Internal Fields Section */}
            <div className="form-section">
              <h3>Forecasting & Internal Fields</h3>
              <div className="form-row">
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="expectedRevenue"
                    label="Expected Revenue"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="form-group third-width">
                  <InputDropDown
                    hookForm={hookForm}
                    field="probabilityOfClosure"
                    label="Probability of Closure"
                    options={probabilityOptions}
                    placeholder="Select probability"
                  />
                </div>
                <div className="form-group third-width">
                  <InputText
                    hookForm={hookForm}
                    field="numberOfOpenings"
                    label="Number of Openings"
                    labelMandatory
                    type="number"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>

            {/* Additional Options Section */}
            <div className="form-section">
              <h3>Additional Options</h3>
              <div className="form-row">
                <div className="form-group half-width">
                  <InputTextArea
                    hookForm={hookForm}
                    field="notes"
                    label="Notes / Internal Comments"
                    placeholder="Add internal notes..."
                    rows={3}
                  />
                </div>
                <div className="form-group half-width">
                  <InputText
                    hookForm={hookForm}
                    field="tags"
                    label="Tags / Keywords"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="form-section">
              <h3>Attachments</h3>
              <div className="form-group full-width">
                <label className="form-control-label">Upload Job Description Document</label>
                <div className="upload-area">
                  <div className="upload-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag & drop files here or <span className="browse-link">click to browse</span></p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="file-input"
                      style={{ display: 'none' }}
                      id="job-file-upload"
                    />
                    <label htmlFor="job-file-upload" className="file-upload-label"></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Fields Section */}
            <div className="form-section">
              <div className="custom-fields-header">
                <h3>Custom Fields</h3>
                <div className="custom-fields-controls">
                  <select
                    className="add-field-select"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        const fieldDef = availableCustomFields.find(f => f.id === e.target.value);
                        if (fieldDef && !customFields.some(cf => cf.id === fieldDef.id)) {
                          addCustomField(fieldDef);
                        }
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Add Custom Field...</option>
                    {availableCustomFields
                      .filter(field => !customFields.some(cf => cf.id === field.id))
                      .map((field) => (
                        <option key={field.id} value={field.id}>
                          {field.label}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              
              {customFields.length === 0 ? (
                <div className="no-custom-fields">
                  <p>No custom fields added. Use the dropdown above to add business-specific fields.</p>
                </div>
              ) : (
                <div className="custom-fields-list">
                  {customFields.map((field) => (
                    <div key={field.id} className="custom-field-item">
                      <div className="custom-field-header">
                        <label className="custom-field-label">
                          {field.label}
                          {field.required && <span className="text-danger">*</span>}
                        </label>
                        <button
                          type="button"
                          className="remove-field-btn"
                          onClick={() => removeCustomField(field.id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      
                      <div className="custom-field-input">
                        {field.type === 'text' && (
                          <input
                            type="text"
                            className="form-control"
                            value={field.value}
                            onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        
                        {field.type === 'textarea' && (
                          <textarea
                            className="form-control"
                            value={field.value}
                            onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            rows={3}
                          />
                        )}
                        
                        {field.type === 'number' && (
                          <input
                            type="number"
                            className="form-control"
                            value={field.value}
                            onChange={(e) => updateCustomFieldValue(field.id, parseInt(e.target.value) || 0)}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                        
                        {field.type === 'date' && (
                          <input
                            type="date"
                            className="form-control"
                            value={field.value}
                            onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                          />
                        )}
                        
                        {field.type === 'checkbox' && (
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={field.value}
                              onChange={(e) => updateCustomFieldValue(field.id, e.target.checked)}
                            />
                            <label className="form-check-label">
                              Yes, this field applies
                            </label>
                          </div>
                        )}
                        
                        {field.type === 'dropdown' && field.options && (
                          <select
                            className="form-control"
                            value={field.value}
                            onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                          >
                            <option value="">Select {field.label.toLowerCase()}</option>
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Job
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateJobModal;