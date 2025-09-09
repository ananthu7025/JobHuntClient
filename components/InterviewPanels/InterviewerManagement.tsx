import React, { useState } from 'react';

const InterviewerManagement: React.FC = () => {
  const [interviewers, setInterviewers] = useState([
    {
      id: 'SK',
      name: 'Sarah Kim',
      role: 'Senior Engineering Manager',
      expertise: ['JavaScript', 'React'],
      timezone: 'PST',
      currentLoad: 2,
      maxPerDay: 4,
      availability: 'Available',
      availabilityStatus: 'available',
      nextAvailable: '2024-01-16 09:00',
      avatarColor: 'bg-blue-100',
      email: 'sarah.kim@company.com'
    },
    {
      id: 'MC',
      name: 'Mike Chen',
      role: 'Technical Lead',
      expertise: ['Python', 'System Design'],
      timezone: 'EST',
      currentLoad: 3,
      maxPerDay: 3,
      availability: 'Fully Booked',
      availabilityStatus: 'busy',
      nextAvailable: '2024-01-17 14:00',
      avatarColor: 'bg-orange-100',
      email: 'mike.chen@company.com'
    },
    {
      id: 'LW',
      name: 'Lisa Wong',
      role: 'Product Manager',
      expertise: ['Product Strategy', 'User Research'],
      timezone: 'PST',
      currentLoad: 1,
      maxPerDay: 5,
      availability: 'Available',
      availabilityStatus: 'available',
      nextAvailable: '2024-01-16 10:00',
      avatarColor: 'bg-green-100',
      email: 'lisa.wong@company.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const toggleAvailability = (interviewerId: string) => {
    setInterviewers(prev => prev.map(interviewer => {
      if (interviewer.id === interviewerId && interviewer.availabilityStatus !== 'unavailable') {
        const newStatus = interviewer.availabilityStatus === 'available' ? 'busy' : 'available';
        return {
          ...interviewer,
          availabilityStatus: newStatus,
          availability: newStatus === 'available' ? 'Available' : 'Fully Booked'
        };
      }
      return interviewer;
    }));
  };

  const filteredInterviewers = interviewers.filter(interviewer => {
    const matchesSearch = interviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interviewer.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === 'All Status' || interviewer.availability === availabilityFilter;
    
    return matchesSearch && matchesAvailability;
  });

  // Pagination calculations
  const totalItems = filteredInterviewers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterviewers = filteredInterviewers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, availabilityFilter]);

  const availableCount = interviewers.filter(i => i.availabilityStatus === 'available').length;
  const totalCount = interviewers.length;

  return (
    <div className="interviewer-management-section">
      <div className="main-table-section">
        <div className="interviewer-profiles">
          <div className="interviews-header">
            <div className="interviews-title-section">
              <h2>Interviews</h2>
              <p>Manage interview scheduling and feedback</p>
            </div>
            <button className="add-job-btn">
              <i className="fas fa-plus"></i>Add Interviewer
            </button>
          </div>

          <div className="availability-stats-row">
            <div className="stat-card available-stat">
              <div className="stat-icon">
                <i className="fas fa-user-check"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{availableCount}</div>
                <div className="stat-label">Available Now</div>
              </div>
            </div>
            <div className="stat-card busy-stat">
              <div className="stat-icon">
                <i className="fas fa-user-clock"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{interviewers.filter(i => i.availabilityStatus === 'busy').length}</div>
                <div className="stat-label">Fully Booked</div>
              </div>
            </div>
            <div className="stat-card total-stat">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{totalCount}</div>
                <div className="stat-label">Total Interviewers</div>
              </div>
            </div>
          </div>

          <div className="filters">
            <div className="filters-row">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search by name, role, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="filter-select"
              >
                <option>All Status</option>
                <option>Available</option>
                <option>Fully Booked</option>
              </select>
              <button className="reset-btn" onClick={() => {setSearchTerm(''); setAvailabilityFilter('All Status');}}>
                Reset Filters
              </button>
            </div>
            <div className="results-row">
              <span className="results-count">
                Showing {filteredInterviewers.length} of {totalCount} interviewers
              </span>
            </div>
          </div>
          
          <div className="jobs-table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Interviewer</th>
                  <th>Expertise</th>
                  <th>Availability Status</th>
                  <th>Next Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInterviewers.map((interviewer) => (
                  <tr key={interviewer.id}>
                    <td>
                      <div className="interviewer-info-enhanced">
                        <div className={`interviewer-avatar ${interviewer.avatarColor}`}>
                        </div>
                        <div className="interviewer-details-enhanced">
                          <div className="interviewer-name-row">
                            <span className="candidate-name">{interviewer.name}</span>
                            {interviewer.availabilityStatus === 'available' && (
                              <span className="availability-indicator online">
                                <i className="fas fa-circle"></i>
                              </span>
                            )}
                          </div>
                          <div className="candidate-role">{interviewer.role}</div>
                        
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="expertise-compact">
                        <div className="primary-skill">
                          <span className="skill-tag primary">{interviewer.expertise[0]}</span>
                        </div>
                        <div className="skill-summary">
                          <span className="skill-count">+{interviewer.expertise.length - 1} skills</span>
                          <div className="skills-tooltip">
                            {interviewer.expertise.slice(1).map((skill, index) => (
                              <span key={index} className="tooltip-skill">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="availability-compact">
                        <div className={`status-indicator ${interviewer.availabilityStatus}`}>
                          <span className="status-dot"></span>
                          <span className="status-text">{interviewer.availabilityStatus === 'available' ? 'Available' : 'Busy'}</span>
                        </div>
                        <button 
                          className={`toggle-compact ${interviewer.availabilityStatus === 'available' ? 'toggle-on' : 'toggle-off'}`}
                          onClick={() => toggleAvailability(interviewer.id)}
                          title={interviewer.availabilityStatus === 'available' ? 'Mark as Busy' : 'Mark as Available'}
                        >
                          <i className={`fas ${interviewer.availabilityStatus === 'available' ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="next-available-section">
                        <div className="next-time">
                          <i className="fas fa-clock"></i>
                          <span className="time-text">{interviewer.nextAvailable}</span>
                        </div>
                       
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <div className="action-dropdown">
                          <button className="action-btn dropdown-toggle" title="Actions">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <i className="fas fa-calendar"></i> Schedule Interview
                            </button>
                            <button className="dropdown-item">
                              <i className="fas fa-edit"></i> Edit Profile
                            </button>
                            <button className="dropdown-item">
                              <i className="fas fa-envelope"></i> Send Email
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-section">
            <div className="pagination-info">
              <span>Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} interviewers</span>
            </div>
            <div className="pagination-controls">
              <button 
                className="pagination-btn" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>
              
              <div className="pagination-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button 
                className="pagination-btn" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="enhanced-sidebar">
        <div className="sidebar-widget">
          <div className="widget-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="enhanced-actions-list">
            <button className="enhanced-action-btn primary">
              <div className="action-icon">
                <i className="fas fa-calendar-plus"></i>
              </div>
              <div className="action-content">
                <span className="action-title">Bulk Schedule</span>
                <span className="action-subtitle">Schedule multiple interviews</span>
              </div>
            </button>
            <button className="enhanced-action-btn">
              <div className="action-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <div className="action-content">
                <span className="action-title">Sync Calendars</span>
                <span className="action-subtitle">Update availability from external calendars</span>
              </div>
            </button>
            <button className="enhanced-action-btn">
              <div className="action-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="action-content">
                <span className="action-title">Send Reminders</span>
                <span className="action-subtitle">Notify interviewers about updates</span>
              </div>
            </button>
            <button className="enhanced-action-btn">
              <div className="action-icon">
                <i className="fas fa-download"></i>
              </div>
              <div className="action-content">
                <span className="action-title">Export Report</span>
                <span className="action-subtitle">Download availability data</span>
              </div>
            </button>
          </div>
        </div>

        <div className="sidebar-widget">
          <div className="widget-header">
            <h3>Upcoming Schedule</h3>
          </div>
          <div className="upcoming-list">
            <div className="upcoming-item">
              <div className="upcoming-time">
                <span className="time">10:00 AM</span>
                <span className="date">Today</span>
              </div>
              <div className="upcoming-content">
                <span className="upcoming-interviewer">Sarah Kim</span>
                <span className="upcoming-candidate">Frontend Dev Interview</span>
              </div>
            </div>
            <div className="upcoming-item">
              <div className="upcoming-time">
                <span className="time">2:00 PM</span>
                <span className="date">Tomorrow</span>
              </div>
              <div className="upcoming-content">
                <span className="upcoming-interviewer">Mike Chen</span>
                <span className="upcoming-candidate">Backend Dev Interview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerManagement;