/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const OverviewTab = ({ recentActivities }: any) => {
  return (
    <div className="job-detail-overview">
      <div className="job-description-section">
        <h3>Job Description</h3>
        <p>We are looking for a skilled Frontend Developer to join our dynamic team.</p>

        <h4>Role & Responsibilities:</h4>
        <ul>
          <li>Develop and maintain high-quality web applications using React and TypeScript</li>
          <li>Collaborate with designers and backend engineers to implement user interfaces</li>
          <li>Optimize applications for maximum speed and scalability</li>
          <li>Write clean, maintainable, and well-documented code</li>
          <li>Participate in code reviews and contribute to engineering standards</li>
        </ul>

        <h4>Qualifications:</h4>
        <ul>
          <li>5+ years of experience in frontend development</li>
          <li>Strong proficiency in React, TypeScript, HTML5, and CSS3</li>
          <li>Experience with modern build tools (Webpack, Vite) and version control (Git)</li>
          <li>Knowledge of RESTful APIs and GraphQL</li>
          <li>Experience with testing frameworks (Jest, React Testing Library)</li>
          <li>Bachelor's degree in Computer Science or equivalent experience</li>
        </ul>
      </div>

      <div className="recent-activity-section">
        <h3><i className="fas fa-bolt"></i> Recent Activity</h3>
        <div className="activity-list">
          {recentActivities.map((activity: any, index: number) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${activity.color}`}>
                <i className={activity.icon}></i>
              </div>
              <div className="activity-content">
                <span className="activity-text">{activity.text}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
