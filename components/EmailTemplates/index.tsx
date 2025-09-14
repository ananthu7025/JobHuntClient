import React, { useState } from "react";
import CreateEmailTemplateModal from "./CreateEmailTemplateModal";
import EditEmailTemplateModal from "./EditEmailTemplateModal";
import DeleteConfirmationModal from "@/components/Common/DeleteConfirmationModal";

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

const EmailTemplates: React.FC = () => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Job Application Confirmation",
      subject: "Thank you for your application - {{jobTitle}}",
      category: "Application",
      htmlContent: "<p>Dear {{candidateName}},</p><p>Thank you for your interest in the {{jobTitle}} position at {{companyName}}. We have received your application and will review it carefully.</p><p>Best regards,<br/>{{hiringManagerName}}</p>",
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      usageCount: 45
    },
    {
      id: "2",
      name: "Interview Invitation",
      subject: "Interview Invitation - {{jobTitle}} Position",
      category: "Interview",
      htmlContent: "<p>Dear {{candidateName}},</p><p>We are pleased to invite you for an interview for the {{jobTitle}} position.</p><p><strong>Interview Details:</strong></p><ul><li>Date: {{interviewDate}}</li><li>Time: {{interviewTime}}</li><li>Location: {{interviewLocation}}</li></ul><p>Please confirm your availability.</p><p>Best regards,<br/>{{hiringManagerName}}</p>",
      isActive: true,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-25",
      usageCount: 32
    },
    {
      id: "3",
      name: "Job Rejection Notice",
      subject: "Update on your application for {{jobTitle}}",
      category: "Rejection",
      htmlContent: "<p>Dear {{candidateName}},</p><p>Thank you for your interest in the {{jobTitle}} position and for taking the time to interview with us.</p><p>After careful consideration, we have decided to move forward with another candidate whose background more closely matches our current needs.</p><p>We appreciate your time and wish you success in your job search.</p><p>Best regards,<br/>{{hiringManagerName}}</p>",
      isActive: true,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-18",
      usageCount: 28
    },
    {
      id: "4",
      name: "Job Offer Letter",
      subject: "Job Offer - {{jobTitle}} Position at {{companyName}}",
      category: "Offer",
      htmlContent: "<p>Dear {{candidateName}},</p><p>We are delighted to offer you the position of {{jobTitle}} at {{companyName}}.</p><p><strong>Offer Details:</strong></p><ul><li>Position: {{jobTitle}}</li><li>Start Date: {{startDate}}</li><li>Salary: {{salary}}</li><li>Benefits: {{benefits}}</li></ul><p>Please review the attached offer letter and let us know your decision by {{responseDeadline}}.</p><p>Welcome to the team!</p><p>Best regards,<br/>{{hiringManagerName}}</p>",
      isActive: true,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-22",
      usageCount: 15
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<EmailTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = ["all", "Application", "Interview", "Rejection", "Offer", "Follow-up", "Assessment"];
  const statusOptions = ["all", "active", "inactive"];

  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "active" && template.isActive) ||
                         (statusFilter === "inactive" && !template.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateTemplate = (templateData: Omit<EmailTemplate, "id" | "createdAt" | "updatedAt" | "usageCount">) => {
    const newTemplate: EmailTemplate = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };

    setEmailTemplates(prev => [...prev, newTemplate]);
    setIsCreateModalOpen(false);
  };

  const handleEditTemplate = (templateData: Omit<EmailTemplate, "id" | "createdAt" | "updatedAt" | "usageCount">) => {
    if (!editingTemplate) return;

    const updatedTemplate: EmailTemplate = {
      ...editingTemplate,
      ...templateData,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setEmailTemplates(prev =>
      prev.map(template => template.id === editingTemplate.id ? updatedTemplate : template)
    );
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = () => {
    if (!deletingTemplate) return;

    setEmailTemplates(prev => prev.filter(template => template.id !== deletingTemplate.id));
    setDeletingTemplate(null);
  };

  const toggleTemplateStatus = (templateId: string) => {
    setEmailTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, isActive: !template.isActive, updatedAt: new Date().toISOString().split('T')[0] }
          : template
      )
    );
  };

  const duplicateTemplate = (template: EmailTemplate) => {
    const duplicatedTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };

    setEmailTemplates(prev => [...prev, duplicatedTemplate]);
  };

  return (
    <div className="email-templates-content">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Email Templates</h1>
          <p>Manage and customize email templates for job postings, candidate communications, and notifications</p>
        </div>
        <div className="header-buttons">
          <button
            className="add-job-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <i className="fas fa-plus"></i>Add New Template
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="templates-filters">
        <div className="filter-group">
          <div className="search-input">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="templates-grid">
        {filteredTemplates.length === 0 ? (
          <div className="no-templates">
            <div className="no-templates-content">
              <i className="fas fa-envelope-open-text"></i>
              <h3>No templates found</h3>
              <p>
                {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "Create your first email template to get started."
                }
              </p>
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all" ? (
                <button
                  className="clear-filters-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  className="create-template-btn"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <i className="fas fa-plus"></i>
                  Create First Template
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <div className="template-title">
                  <h3>{template.name}</h3>
                  <span className={`status-badge ${template.isActive ? 'active' : 'inactive'}`}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="template-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => setEditingTemplate(template)}
                    title="Edit template"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-btn duplicate-btn"
                    onClick={() => duplicateTemplate(template)}
                    title="Duplicate template"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    className={`action-btn toggle-btn ${template.isActive ? 'deactivate' : 'activate'}`}
                    onClick={() => toggleTemplateStatus(template.id)}
                    title={template.isActive ? 'Deactivate template' : 'Activate template'}
                  >
                    <i className={`fas ${template.isActive ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => setDeletingTemplate(template)}
                    title="Delete template"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="template-content">
                <div className="template-meta">
                  <span className="category-tag">{template.category}</span>
                  <span className="usage-count">
                    <i className="fas fa-paper-plane"></i>
                    Used {template.usageCount} times
                  </span>
                </div>

                <div className="template-subject">
                  <label>Subject:</label>
                  <p>{template.subject}</p>
                </div>

                <div className="template-preview">
                  <label>Content Preview:</label>
                  <div
                    className="content-preview"
                    dangerouslySetInnerHTML={{
                      __html: template.htmlContent.substring(0, 150) + (template.htmlContent.length > 150 ? '...' : '')
                    }}
                  />
                </div>

                <div className="template-dates">
                  <small>
                    Created: {new Date(template.createdAt).toLocaleDateString()}
                    {template.updatedAt !== template.createdAt && (
                      <> | Updated: {new Date(template.updatedAt).toLocaleDateString()}</>
                    )}
                  </small>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      <CreateEmailTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTemplate}
      />

      {editingTemplate && (
        <EditEmailTemplateModal
          isOpen={true}
          onClose={() => setEditingTemplate(null)}
          onSubmit={handleEditTemplate}
          template={editingTemplate}
        />
      )}

      {deletingTemplate && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() => setDeletingTemplate(null)}
          onConfirm={handleDeleteTemplate}
          title="Delete Email Template"
          message={`Are you sure you want to delete the template "${deletingTemplate.name}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default EmailTemplates;