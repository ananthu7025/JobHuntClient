/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views, Event, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.scss';
import NewEventModal from './NewEventModal';

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
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [selectedSlotDate, setSelectedSlotDate] = useState<Date | undefined>();

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
    let backgroundColor = '#1d4ed8';
    let borderColor = '#1d4ed8';
    
    switch (event.type) {
      case 'interview':
        backgroundColor = '#166534';
        borderColor = '#166534';
        break;
      case 'meeting':
        backgroundColor = '#1d4ed8';
        borderColor = '#1d4ed8';
        break;
      case 'deadline':
        backgroundColor = '#dc2626';
        borderColor = '#dc2626';
        break;
      case 'follow-up':
        backgroundColor = '#92400e';
        borderColor = '#92400e';
        break;
      case 'assessment':
        backgroundColor = '#7c3aed';
        borderColor = '#7c3aed';
        break;
    }

    if (event.status === 'completed') {
      backgroundColor = '#6b7280';
      borderColor = '#6b7280';
    } else if (event.status === 'cancelled') {
      backgroundColor = '#dc2626';
      borderColor = '#dc2626';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: 'white',
        border: `1px solid ${borderColor}`,
        borderRadius: '6px',
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

  const handleSelectSlot = ({ start }: { start: Date; end: Date }) => {
    setSelectedSlotDate(start);
    setIsNewEventModalOpen(true);
  };

  const handleNewEventClick = () => {
    setSelectedSlotDate(undefined);
    setIsNewEventModalOpen(true);
  };

  const handleCreateEvent = (eventData: any) => {
    // Create new event from form data
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      start: new Date(`${eventData.startDate}T${eventData.startTime}`),
      end: new Date(`${eventData.endDate}T${eventData.endTime}`),
      type: eventData.type,
      description: eventData.description,
      candidate: eventData.candidate,
      job: eventData.job,
      location: eventData.location,
      status: eventData.status
    };
    
    console.log('Creating new event:', newEvent);
    // Here you would typically add the event to your state/database
  };

  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    const newDate = new Date(date);
    if (action === 'PREV') {
      if (view === Views.MONTH) {
        newDate.setMonth(date.getMonth() - 1);
      } else if (view === Views.WEEK) {
        newDate.setDate(date.getDate() - 7);
      } else if (view === Views.DAY) {
        newDate.setDate(date.getDate() - 1);
      }
    } else if (action === 'NEXT') {
      if (view === Views.MONTH) {
        newDate.setMonth(date.getMonth() + 1);
      } else if (view === Views.WEEK) {
        newDate.setDate(date.getDate() + 7);
      } else if (view === Views.DAY) {
        newDate.setDate(date.getDate() + 1);
      }
    } else if (action === 'TODAY') {
      setDate(new Date());
      return;
    }
    setDate(newDate);
  };

  const formatDateLabel = () => {
    if (view === Views.MONTH) {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (view === Views.WEEK) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else if (view === Views.DAY) {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      return 'Agenda';
    }
  };

  return (
    <div className="calendar-container">
      <div className="header">
        <div>
          <h1>Calendar</h1>
          <p>Manage interviews, meetings, and important deadlines</p>
        </div>
        <div className="header-buttons">
          <div className="view-selector">
            <button 
              className={`view-toggle ${view === Views.MONTH ? 'active' : ''}`}
              onClick={() => setView(Views.MONTH)}
            >
              Month
            </button>
            <button 
              className={`view-toggle ${view === Views.WEEK ? 'active' : ''}`}
              onClick={() => setView(Views.WEEK)}
            >
              Week
            </button>
            <button 
              className={`view-toggle ${view === Views.DAY ? 'active' : ''}`}
              onClick={() => setView(Views.DAY)}
            >
              Day
            </button>
            <button 
              className={`view-toggle ${view === Views.AGENDA ? 'active' : ''}`}
              onClick={() => setView(Views.AGENDA)}
            >
              Agenda
            </button>
          </div>
          <button className="add-job-btn" onClick={handleNewEventClick}>
            <i className="fas fa-plus"></i> New Event
          </button>
        </div>
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

      <div className="calendar-navigation">
        <div className="nav-controls">
          <button className="nav-btn" onClick={() => handleNavigate('TODAY')}>Today</button>
          <button className="nav-btn" onClick={() => handleNavigate('PREV')}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="nav-btn" onClick={() => handleNavigate('NEXT')}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="calendar-title">
          <h2>{formatDateLabel()}</h2>
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
            toolbar: () => null, // Hide the default toolbar
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

      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={handleCreateEvent}
        selectedDate={selectedSlotDate}
      />
    </div>
  );
};

export default Calendar;