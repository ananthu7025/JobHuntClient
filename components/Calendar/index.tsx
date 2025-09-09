"use client";

import React, { useState, useMemo } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views, Event, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'interview' | 'meeting' | 'deadline' | 'follow-up' | 'assessment';
  description?: string;
  candidate?: string;
  job?: string;
  location?: string;
  status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

const Calendar: React.FC = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Sample calendar events
  const events: CalendarEvent[] = useMemo(() => [
    {
      id: '1',
      title: 'Interview - John Doe',
      start: new Date(2025, 8, 10, 10, 0),
      end: new Date(2025, 8, 10, 11, 0),
      type: 'interview',
      candidate: 'John Doe',
      job: 'Senior Frontend Developer',
      location: 'Conference Room A',
      status: 'scheduled',
      description: 'Technical interview for Senior Frontend Developer position'
    },
    {
      id: '2',
      title: 'Team Meeting - Sprint Planning',
      start: new Date(2025, 8, 9, 14, 0),
      end: new Date(2025, 8, 9, 15, 30),
      type: 'meeting',
      location: 'Main Conference Room',
      status: 'confirmed',
      description: 'Sprint planning for the next development cycle'
    },
    {
      id: '3',
      title: 'Interview - Sarah Smith',
      start: new Date(2025, 8, 12, 9, 0),
      end: new Date(2025, 8, 12, 10, 30),
      type: 'interview',
      candidate: 'Sarah Smith',
      job: 'Product Manager',
      location: 'Online - Zoom',
      status: 'confirmed',
      description: 'Product management interview and case study presentation'
    },
    {
      id: '4',
      title: 'Application Deadline - Marketing Role',
      start: new Date(2025, 8, 15, 23, 59),
      end: new Date(2025, 8, 15, 23, 59),
      type: 'deadline',
      job: 'Marketing Specialist',
      status: 'scheduled',
      description: 'Final deadline for Marketing Specialist applications'
    },
    {
      id: '5',
      title: 'Follow-up Call - Mike Johnson',
      start: new Date(2025, 8, 11, 16, 0),
      end: new Date(2025, 8, 11, 16, 30),
      type: 'follow-up',
      candidate: 'Mike Johnson',
      job: 'Backend Developer',
      status: 'scheduled',
      description: 'Follow-up discussion about salary expectations'
    },
    {
      id: '6',
      title: 'Assessment - Lisa Wong',
      start: new Date(2025, 8, 13, 11, 0),
      end: new Date(2025, 8, 13, 13, 0),
      type: 'assessment',
      candidate: 'Lisa Wong',
      job: 'UX Designer',
      location: 'Design Lab',
      status: 'scheduled',
      description: 'Design assessment and portfolio review'
    },
    {
      id: '7',
      title: 'Interview - Alex Chen',
      start: new Date(2025, 8, 14, 15, 0),
      end: new Date(2025, 8, 14, 16, 0),
      type: 'interview',
      candidate: 'Alex Chen',
      job: 'DevOps Engineer',
      location: 'Conference Room B',
      status: 'confirmed',
      description: 'Technical interview for DevOps Engineer position'
    }
  ], []);

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3174ad';
    let borderColor = '#3174ad';
    
    switch (event.type) {
      case 'interview':
        backgroundColor = '#28a745';
        borderColor = '#28a745';
        break;
      case 'meeting':
        backgroundColor = '#007bff';
        borderColor = '#007bff';
        break;
      case 'deadline':
        backgroundColor = '#dc3545';
        borderColor = '#dc3545';
        break;
      case 'follow-up':
        backgroundColor = '#ffc107';
        borderColor = '#ffc107';
        break;
      case 'assessment':
        backgroundColor = '#6610f2';
        borderColor = '#6610f2';
        break;
    }

    if (event.status === 'completed') {
      backgroundColor = '#6c757d';
      borderColor = '#6c757d';
    } else if (event.status === 'cancelled') {
      backgroundColor = '#dc3545';
      borderColor = '#dc3545';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: 'white',
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        fontSize: '12px'
      }
    };
  };

  const EventComponent = ({ event }: { event: CalendarEvent }) => (
    <div className="calendar-event">
      <div className="event-title">{event.title}</div>
      {event.location && (
        <div className="event-location">
          <i className="fas fa-map-marker-alt"></i> {event.location}
        </div>
      )}
    </div>
  );

  const handleSelectEvent = (event: CalendarEvent) => {
    alert(`Event: ${event.title}\nType: ${event.type}\nDescription: ${event.description || 'No description'}`);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      console.log('New event:', { title, start, end });
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-controls">
          <div className="view-selector">
            <button 
              className={`btn ${view === Views.MONTH ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView(Views.MONTH)}
            >
              Month
            </button>
            <button 
              className={`btn ${view === Views.WEEK ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView(Views.WEEK)}
            >
              Week
            </button>
            <button 
              className={`btn ${view === Views.DAY ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView(Views.DAY)}
            >
              Day
            </button>
            <button 
              className={`btn ${view === Views.AGENDA ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setView(Views.AGENDA)}
            >
              Agenda
            </button>
          </div>
          <button className="btn btn-success">
            <i className="fas fa-plus"></i> New Event
          </button>
        </div>
        
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-color interview"></span>
            Interviews
          </div>
          <div className="legend-item">
            <span className="legend-color meeting"></span>
            Meetings
          </div>
          <div className="legend-item">
            <span className="legend-color deadline"></span>
            Deadlines
          </div>
          <div className="legend-item">
            <span className="legend-color follow-up"></span>
            Follow-ups
          </div>
          <div className="legend-item">
            <span className="legend-color assessment"></span>
            Assessments
          </div>
        </div>
      </div>

      <div className="calendar-wrapper">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          components={{
            event: EventComponent,
          }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          showMultiDayTimes
          step={30}
          timeslots={2}
          defaultView={Views.MONTH}
        />
      </div>
    </div>
  );
};

export default Calendar;