"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JobHuntPlatform = () => {
  const [activeView, setActiveView] = useState("grid");

  const handleViewToggle = (view: React.SetStateAction<string>) => {
    setActiveView(view);
  };

  const jobs = [
    {
      id: 1,
      status: "active",
      date: "2024-01-15",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "fulltime",
      department: "Engineering",
      applications: 24,
    },
    {
      id: 2,
      status: "active",
      date: "2024-01-10",
      title: "Backend Engineer",
      company: "InnovateTech",
      location: "New York, NY",
      salary: "$100,000 - $130,000",
      type: "fulltime",
      department: "Engineering",
      applications: 18,
    },
    {
      id: 3,
      status: "active",
      date: "2024-01-08",
      title: "UI/UX Designer",
      company: "Creative Studio",
      location: "Los Angeles, CA",
      salary: "$80,000 - $100,000",
      type: "contract",
      department: "Design",
      applications: 12,
    },
    {
      id: 4,
      status: "active",
      date: "2024-01-12",
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$110,000 - $140,000",
      type: "fulltime",
      department: "Engineering",
      applications: 8,
    },
    {
      id: 5,
      status: "active",
      date: "2024-01-14",
      title: "Data Scientist",
      company: "DataDriven Inc",
      location: "Boston, MA",
      salary: "$90,000 - $120,000",
      type: "fulltime",
      department: "Data",
      applications: 15,
    },
    {
      id: 6,
      status: "draft",
      date: "2024-01-16",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Austin, TX",
      salary: "$95,000 - $125,000",
      type: "fulltime",
      department: "Product",
      applications: 22,
    },
  ];
  const router = useRouter();
  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h1>Job Listings</h1>
          <p>Manage your job postings and track applications</p>
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
          <button className="add-job-btn">
            <i className="fas fa-plus"></i>Add New Job
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filters-row">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by title, company, or location..."
            />
          </div>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Draft</option>
          </select>
          <select className="filter-select">
            <option>All Types</option>
            <option>Full-Time</option>
            <option>Contract</option>
          </select>
          <select className="filter-select">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
          </select>
        </div>
        <div className="results-row">
          <div className="results-count">{jobs.length} jobs found</div>
          <button className="reset-btn">Reset</button>
        </div>
      </div>

      {activeView === "grid" ? (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <span className={`status-badge status-${job.status}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
                <span className="job-date">{job.date}</span>
              </div>
              <h3 className="job-title">{job.title}</h3>
              <p className="company-name">{job.company}</p>
              <div className="job-details">
                <div className="job-detail">
                  <span className="job-detail-label">Location:</span>
                  <span className="job-detail-value">{job.location}</span>
                </div>
                <div className="job-detail">
                  <span className="job-detail-label">Salary:</span>
                  <span className="job-detail-value">{job.salary}</span>
                </div>
              </div>
              <div className="job-footer">
                <div className="job-type-and-apps">
                  <span className={`job-type-badge type-${job.type}`}>
                    {job.type === "fulltime" ? "Full-Time" : "Contract"}
                  </span>
                  <span className="applications-count">
                    {job.applications} applications
                  </span>
                </div>
                <div className="job-actions">
                  <button
                    onClick={() => router.push(`/jobs/${job.id}`)}
                    className="btn-view"
                  >
                    <i className="fas fa-eye"></i>View Details
                  </button>
                  <button className="btn-edit">
                    <i className="fas fa-edit"></i>Edit
                  </button>
                  <button className="btn-delete">
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
                <th>Job Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="job-title-cell">
                      <div className="job-title-main">{job.title}</div>
                      <div className="job-company">{job.company}</div>
                    </div>
                  </td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>
                    <span className={`job-type-badge type-${job.type}`}>
                      {job.type === "fulltime" ? "Full-Time" : "Contract"}
                    </span>
                  </td>
                  <td>{job.applications}</td>
                  <td>
                    <span className={`status-badge status-${job.status}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => router.push(`/jobs/${job.id}`)}
                        className="action-btn view-btn"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-btn edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="action-btn delete-btn">
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
    </div>
  );
};

export default JobHuntPlatform;
