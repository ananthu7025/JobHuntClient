"use client";

import React, { useState } from 'react';
import CalendarView from '@/components/InterviewPanels/CalendarView';
import InterviewerManagement from '@/components/InterviewPanels/InterviewerManagement';
import InterviewSchedule from '@/components/InterviewPanels/InterviewSchedule';

const InterviewPanelsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Interviewer Management');

  const tabs = [
    { id: 'Calendar View', label: 'Calendar View' },
    { id: 'Interviewer Management', label: 'Interviewer Management' },
    { id: 'Interview Schedule', label: 'Interview Schedule' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Calendar View':
        return <CalendarView />;
      case 'Interviewer Management':
        return <InterviewerManagement />;
      case 'Interview Schedule':
        return <InterviewSchedule />;
      default:
        return <InterviewerManagement />;
    }
  };

  return (
    <div className="main-content">
      <div className="header">
        <div>
          <h1>Interview Panel Availability</h1>
          <p>Manage interviewer schedules and optimize interview scheduling</p>
        </div>
       
      </div>

      {/* Tab Navigation */}
      <div className="job-detail-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="interview-panels-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InterviewPanelsPage;