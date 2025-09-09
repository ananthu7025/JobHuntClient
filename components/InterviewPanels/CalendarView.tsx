import React from 'react';

const CalendarView: React.FC = () => {
  return (
    <div className="calendar-view-section">
      <div className="calendar-placeholder">
        <i className="fas fa-calendar-alt" style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }}></i>
        <h3 style={{ color: '#374151', marginBottom: '8px' }}>Calendar View</h3>
        <p style={{ color: '#6b7280', margin: 0 }}>Interactive calendar view for managing interview schedules will be displayed here.</p>
      </div>
    </div>
  );
};

export default CalendarView;