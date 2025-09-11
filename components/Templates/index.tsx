/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CreateTemplateModal from "./CreateTemplateModal";
import EditTemplateModal from "./EditTemplateModal";
import DeleteConfirmationModal from "../Common/DeleteConfirmationModal";

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

const TemplateManagement: React.FC = () => {
  const [activeView, setActiveView] = useState("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sample template data - mix of email and job templates
  const templates: Template[] = [
    // Email Templates
    {
      id: "interview-invitation",
      name: "Interview Invitation",
      description: "Template for inviting candidates to interviews",
      category: "Interview",
      type: "email",
      subject: "Interview Invitation - {{position}} at {{company}}",
      htmlContent: `<h2>Hello {{candidateName}},</h2>
        <p>We are pleased to invite you for an interview for the <strong>{{position}}</strong> position at {{company}}.</p>
        <p><strong>Interview Details:</strong></p>
        <ul>
          <li>Date: {{interviewDate}}</li>
          <li>Time: {{interviewTime}}</li>
          <li>Location: {{interviewLocation}}</li>
          <li>Duration: {{duration}}</li>
        </ul>
        <p>Please confirm your availability by replying to this email.</p>
        <p>Best regards,<br>{{recruiterName}}</p>`,
      textContent: `Hello {{candidateName}},
        
        We are pleased to invite you for an interview for the {{position}} position at {{company}}.
        
        Interview Details:
        - Date: {{interviewDate}}
        - Time: {{interviewTime}}
        - Location: {{interviewLocation}}
        - Duration: {{duration}}
        
        Please confirm your availability by replying to this email.
        
        Best regards,
        {{recruiterName}}`,
      variables: ["candidateName", "position", "company", "interviewDate", "interviewTime", "interviewLocation", "duration", "recruiterName"],
      createdBy: "John Doe",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      isActive: true
    },
    {
      id: "job-application-confirmation",
      name: "Application Confirmation",
      description: "Confirmation email for received job applications",
      category: "Application",
      type: "email",
      subject: "Application Received - {{position}} at {{company}}",
      htmlContent: `<h2>Thank you for your application!</h2>
        <p>Dear {{candidateName}},</p>
        <p>We have successfully received your application for the <strong>{{position}}</strong> position at {{company}}.</p>
        <p><strong>Application Details:</strong></p>
        <ul>
          <li>Position: {{position}}</li>
          <li>Application ID: {{applicationId}}</li>
          <li>Submitted: {{submissionDate}}</li>
        </ul>
        <p>Our team will review your application and get back to you within {{reviewPeriod}}.</p>
        <p>Best regards,<br>{{company}} HR Team</p>`,
      textContent: `Thank you for your application!
        
        Dear {{candidateName}},
        
        We have successfully received your application for the {{position}} position at {{company}}.
        
        Application Details:
        - Position: {{position}}
        - Application ID: {{applicationId}}
        - Submitted: {{submissionDate}}
        
        Our team will review your application and get back to you within {{reviewPeriod}}.
        
        Best regards,
        {{company}} HR Team`,
      variables: ["candidateName", "position", "company", "applicationId", "submissionDate", "reviewPeriod"],
      createdBy: "Jane Smith",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      isActive: true
    },
    // Job Templates  
    {
      id: "software-engineer",
      name: "Software Engineer",
      description: "Standard software engineering position template",
      category: "Engineering",
      type: "job",
      createdBy: "John Doe",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      isActive: true,
      fields: {
        jobType: { value: "fulltime", label: "Full-time" },
        department: "Engineering",
        workMode: { value: "hybrid", label: "Hybrid" },
        workExperience: { value: "3-5", label: "3-5 years" },
        skillsRequired: "JavaScript, React, Node.js, TypeScript"
      }
    },
    {
      id: "product-manager",
      name: "Product Manager", 
      description: "Product management role template",
      category: "Product",
      type: "job",
      createdBy: "Jane Smith",
      createdAt: "2024-01-10", 
      updatedAt: "2024-01-18",
      isActive: true,
      fields: {
        jobType: { value: "fulltime", label: "Full-time" },
        department: "Product",
        workMode: { value: "hybrid", label: "Hybrid" },
        workExperience: { value: "5-10", label: "5-10 years" },
        skillsRequired: "Product strategy, User research, Analytics"
      }
    }
  ];

  const categories = Array.from(new Set(templates.map(template => template.category)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleDeleteTemplate = (template: Template) => {
    setTemplateToDelete(template);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTemplate(null);
    setTemplateToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (templateToDelete) {
      console.log("Deleting template:", templateToDelete.name);
      // Add your delete logic here
    }
  };

  const handleViewToggle = (view: string) => {
    setActiveView(view);
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <span className={`status-badge status-${isActive ? 'active' : 'inactive'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h1>Template Management</h1>
          <p>Create, edit, and manage email and job templates for consistent processes</p>
        </div>
        <div className="header-buttons">
          <button
            className={`view-toggle ${activeView === "grid" ? "active" : ""}`}
            onClick={() => handleViewToggle("grid")}
          >
            <i className="fas fa-th"></i>
          </button>
          <button
            className={`view-toggle ${activeView === "list" ? "active" : ""}`}
            onClick={() => handleViewToggle("list")}
          >
            <i className="fas fa-list"></i>
          </button>
          <button className="add-job-btn" onClick={handleCreateTemplate}>
            <i className="fas fa-plus"></i>New Template
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filters-row">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search templates by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="results-row">
          <div className="results-count">{filteredTemplates.length} templates found</div>
          <button 
            className="reset-btn"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {activeView === "grid" ? (
        <div className="jobs-grid">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="job-card template-card">
              <div className="job-card-header">
                {getStatusBadge(template.isActive)}
                <span className="template-category">{template.category}</span>
              </div>
              <h3 className="job-title">{template.name}</h3>
              <p className="template-description">{template.description}</p>
              <div className="job-details">
                <div className="job-detail">
                  <span className="job-detail-label">Created by:</span>
                  <span className="job-detail-value">{template.createdBy}</span>
                </div>
                <div className="job-detail">
                  <span className="job-detail-label">Updated:</span>
                  <span className="job-detail-value">{template.updatedAt}</span>
                </div>
              </div>
              <div className="template-fields-preview">
                <div className="template-type-badge">
                  <i className={`fas ${template.type === 'email' ? 'fa-envelope' : 'fa-briefcase'}`}></i>
                  {template.type === 'email' ? 'Email Template' : 'Job Template'}
                </div>
                {template.type === 'email' && template.variables && (
                  <div className="template-variables-count">
                    <i className="fas fa-tags"></i>
                    {template.variables.length} variables
                  </div>
                )}
                {template.type === 'job' && template.fields && (
                  <div className="template-field-count">
                    <i className="fas fa-cogs"></i>
                    {Object.keys(template.fields).length} fields configured
                  </div>
                )}
                {template.type === 'email' && template.subject && (
                  <div className="template-subject-preview">
                    <i className="fas fa-envelope"></i>
                    Subject: {template.subject}
                  </div>
                )}
              </div>
              <div className="job-footer">
                <div className="job-actions">
                  <button
                    className="btn-view"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <i className="fas fa-eye"></i>View/Edit
                  </button>
                  <button 
                    className="btn-edit"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <i className="fas fa-edit"></i>Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteTemplate(template)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="jobs-table-container">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id}>
                  <td>
                    <div className="template-title-cell">
                      <div className="template-title-main">{template.name}</div>
                      <div className="template-type-indicator">
                        <i className={`fas ${template.type === 'email' ? 'fa-envelope' : 'fa-briefcase'}`}></i>
                        {template.type === 'email' ? 'Email Template' : 'Job Template'}
                      </div>
                      {template.type === 'email' && template.variables && (
                        <div className="template-variables-count">
                          {template.variables.length} variables
                        </div>
                      )}
                      {template.type === 'job' && template.fields && (
                        <div className="template-field-count">
                          {Object.keys(template.fields).length} fields
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{template.category}</td>
                  <td>
                    <div className="template-description-cell">
                      {template.description}
                    </div>
                  </td>
                  <td>{template.createdBy}</td>
                  <td>{template.updatedAt}</td>
                  <td>
                    {getStatusBadge(template.isActive)}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditTemplate(template)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteTemplate(template)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h3>No templates found</h3>
          <p>No templates match your current search criteria.</p>
          <button className="add-job-btn" onClick={handleCreateTemplate}>
            <i className="fas fa-plus"></i>Create New Template
          </button>
        </div>
      )}

      <CreateTemplateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModals}
      />

      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        template={selectedTemplate}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        title="Delete Template"
        message="Are you sure you want to delete this template?"
        itemName={templateToDelete?.name}
        confirmButtonText="Delete Template"
      />
    </div>
  );
};

export default TemplateManagement;