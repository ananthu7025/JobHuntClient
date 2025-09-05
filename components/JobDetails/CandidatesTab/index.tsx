import React, { useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the PDF viewer to avoid SSR issues
const PDFViewerModal = dynamic(() => import('./PDFViewerModal'), { 
  ssr: false,
  loading: () => <div>Loading PDF viewer...</div>
});

interface Candidate {
  id: number;
  name: string;
  phone: string;
  email: string;
  jobTitle: string;
  resumeScore: number;
  appliedDate: string;
  status: string;
  avatar: string;
  location: string;
  experience: string;
  resumeBase64: string; // Base64 encoded PDF
}

const CandidatesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [scoreFilter, setScoreFilter] = useState("All Scores");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  // Sample candidate data with base64 PDF (you would get this from your API)
  const candidates: Candidate[] = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      jobTitle: "Senior Frontend Developer",
      resumeScore: 92,
      appliedDate: "2024-01-15",
      status: "Under Review",
      avatar: "👨‍💻",
      location: "San Francisco, CA",
      experience: "5+ years",
      resumeBase64: "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFs0IDAgUiA2IDAgUl0NCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSDQo+Pg0KL1Byb2NTZXQgOCAwIFINCj4+DQovTWVkaWFCb3ggWzAgMCA2MTIuMDAwMCA3OTIuMDAwMF0NCi9Db250ZW50cyA1IDAgUg0KPj4NCmVuZG9iag0KDQo1IDAgb2JqDQo8PA0KL0xlbmd0aCA0NA0KPj4NCnN0cmVhbQ0KQlQNCi9GMSAxMiBUZg0KNzIgNzIwIFRkDQooU2FtcGxlIFBERikgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo2IDAgb2JqDQo8PA0KL1R5cGUgL1BhZ2UNCi9QYXJlbnQgMyAwIFINCi9SZXNvdXJjZXMgPDwNCi9Gb250IDw8DQovRjEgOSAwIFINCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8DQovTGVuZ3RoIDQ0DQo+Pg0Kc3RyZWFtDQpCVA0KL0YxIDEyIFRmDQo3MiA3MjAgVGQNCihTYW1wbGUgUERGKSBUag0KEVQNCA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KOCAwIG9iag0KWy9QREYgL1RleHRdDQplbmRvYmoNCg0KOSAwIG9iag0KPDwNCi9UeXBlIC9Gb250DQovU3VidHlwZSAvVHlwZTENCi9OYW1lIC9GMQ0KL0Jhc2VGb250IC9IZWx2ZXRpY2ENCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nDQo+Pg0KZW5kb2JqDQoNCjEwIDAgb2JqDQo8PA0KL0NyZWF0b3IgKFJhdmUgXChodHRwOi8vd3d3Lm5ldmVycGFpbnQuY29tXCkpDQovUHJvZHVjZXIgKFJhdmUgXChodHRwOi8vd3d3Lm5ldmVycGFpbnQuY29tXCkpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDE3MyAwMDAwMCBuDQowMDAwMDAwMzAxIDAwMDAwIG4NCjAwMDAwMDAzODAgMDAwMDAgbg0KMDAwMDAwMDU3OSAwMDAwMCBuDQowMDAwMDAwNjg4IDAwMDAwIG4NCjAwMDAwMDA4ODcgMDAwMDAgbg0KMDAwMDAwMDk5NiAwMDAwMCBuDQowMDAwMDAxMDI3IDAwMDAwIG4NCjAwMDAwMDExMzAgMDAwMDAgbg0KdHJhaWxlcg0KPDwNCi9TaXplIDExDQovUm9vdCAxIDAgUg0KL0luZm8gMTAgMCBSDQo+Pg0Kc3RhcnR4cmVmDQoxMjY3DQolJUVPRg=="
    },
    {
      id: 2,
      name: "Emily Davis",
      phone: "+1 (555) 234-5678",
      email: "emily.davis@email.com",
      jobTitle: "Senior Frontend Developer",
      resumeScore: 88,
      appliedDate: "2024-01-12",
      status: "Interview Scheduled",
      avatar: "👩‍💼",
      location: "New York, NY",
      experience: "4+ years",
      resumeBase64: "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg=="
    },
    {
      id: 3,
      name: "Michael Johnson",
      phone: "+1 (555) 345-6789",
      email: "michael.johnson@email.com",
      jobTitle: "Senior Frontend Developer",
      resumeScore: 95,
      appliedDate: "2024-01-10",
      status: "Shortlisted",
      avatar: "👨‍🔬",
      location: "Austin, TX",
      experience: "6+ years",
      resumeBase64: "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg=="
    },
    {
      id: 4,
      name: "Sarah Chen",
      phone: "+1 (555) 456-7890",
      email: "sarah.chen@email.com",
      jobTitle: "Senior Frontend Developer",
      resumeScore: 82,
      appliedDate: "2024-01-08",
      status: "Rejected",
      avatar: "👩‍💻",
      location: "Seattle, WA",
      experience: "3+ years",
      resumeBase64: "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg=="
    },
    {
      id: 5,
      name: "David Kim",
      phone: "+1 (555) 567-8901",
      email: "david.kim@email.com",
      jobTitle: "Senior Frontend Developer",
      resumeScore: 90,
      appliedDate: "2024-01-14",
      status: "New Application",
      avatar: "👨‍💼",
      location: "Los Angeles, CA",
      experience: "5+ years",
      resumeBase64: "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg=="
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new application':
        return 'status-active';
      case 'under review':
        return 'status-pending';
      case 'interview scheduled':
        return 'status-scheduled';
      case 'shortlisted':
        return 'status-completed';
      case 'rejected':
        return 'status-draft';
      default:
        return 'status-default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 80) return 'score-good';
    if (score >= 70) return 'score-average';
    return 'score-poor';
  };

  const handleViewResume = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsPDFModalOpen(true);
  };

  const handleDeleteCandidate = (candidateId: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      // Handle delete logic here
      console.log('Deleting candidate:', candidateId);
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "All Status" || candidate.status === statusFilter;
    
    const matchesScore = scoreFilter === "All Scores" ||
      (scoreFilter === "90+" && candidate.resumeScore >= 90) ||
      (scoreFilter === "80-89" && candidate.resumeScore >= 80 && candidate.resumeScore < 90) ||
      (scoreFilter === "70-79" && candidate.resumeScore >= 70 && candidate.resumeScore < 80) ||
      (scoreFilter === "Below 70" && candidate.resumeScore < 70);

    return matchesSearch && matchesStatus && matchesScore;
  });

  return (
    <div className="interviews-tab">
      <div className="interviews-header">
        <div className="interviews-title-section">
          <h2>Candidates</h2>
          <p>Manage job applicants and their resumes</p>
        </div>
        <button className="add-job-btn">
          <i className="fas fa-plus"></i>Add Candidate
        </button>
      </div>

      <div className="interviews-filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Status</option>
          <option>New Application</option>
          <option>Under Review</option>
          <option>Interview Scheduled</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
        </select>

        <select
          value={scoreFilter}
          onChange={(e) => setScoreFilter(e.target.value)}
          className="filter-select"
        >
          <option>All Scores</option>
          <option>90+</option>
          <option>80-89</option>
          <option>70-79</option>
          <option>Below 70</option>
        </select>
      </div>

      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Contact Info</th>
              <th>Job Applied</th>
              <th>Resume Score</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <div className="candidate-info">
                    <span className="candidate-avatar">{candidate.avatar}</span>
                    <div className="candidate-details">
                      <span className="candidate-name">{candidate.name}</span>
                      <span className="candidate-location">{candidate.location}</span>
                      <span className="candidate-experience">{candidate.experience}</span>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span>{candidate.email}</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span>{candidate.phone}</span>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="job-info">
                    <span className="job-title">{candidate.jobTitle}</span>
                  </div>
                </td>
                
                <td>
                  <div className="score-info">
                    <span className={`score-badge ${getScoreColor(candidate.resumeScore)}`}>
                      {candidate.resumeScore}
                    </span>
                  </div>
                </td>
                
                <td>
                  <div className="date-info">
                    <i className="fas fa-calendar"></i>
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </div>
                </td>
                
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </td>
                
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-btn view-btn" 
                      title="View Resume"
                      onClick={() => handleViewResume(candidate)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-btn edit-btn" title="Edit Candidate">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      title="Delete Candidate"
                      onClick={() => handleDeleteCandidate(candidate.id)}
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

      {/* PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPDFModalOpen}
        onClose={() => {
          setIsPDFModalOpen(false);
          setSelectedCandidate(null);
        }}
        pdfBase64={selectedCandidate?.resumeBase64 || ""}
        candidateName={selectedCandidate?.name || ""}
        fileName="Resume"
      />
    </div>
  );
};

export default CandidatesTab;
