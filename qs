interface ICandidate {
  _id: ObjectId;
  // NOTE: Removed companyId - candidates can apply to multiple companies

  // Personal Info
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string; // globally unique across all companies
    phone: string;
    location: string;
    nationality?: string;
  };

  // Professional Info
  experience: string; // e.g., "5+ years"
  currentPosition?: string;
  currentCompany?: string;
  expectedSalary?: {
    min: number;
    max: number;
    currency: string;
  };

  // Resume & Documents
  resume: {
    fileId: ObjectId; // GridFS file ID
    fileName: string;
    uploadDate: Date;
    base64?: string; // for PDF display
  };
  additionalDocuments: {
    fileId: ObjectId;
    fileName: string;
    documentType: string;
    uploadDate: Date;
  }[];

  // AI-Powered Resume Analysis
  aiAnalysis: {
    resumeParsed: boolean;
    parsedData: {
      skills: {
        technical: string[];
        soft: string[];
        certifications: string[];
        languages: string[];
      };
      workHistory: {
        company: string;
        position: string;
        duration: string;
        responsibilities: string[];
        achievements: string[];
      }[];
      education: {
        institution: string;
        degree: string;
        field: string;
        graduationYear?: number;
      }[];
      profileSummary: string; // AI-generated concise summary
    };
    skillsConfidence: {
      skill: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      confidence: number; // 0-1
    }[];
    careerProgression: {
      seniorityLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
      careerGrowth: 'declining' | 'stable' | 'growing' | 'accelerating';
      industryExperience: string[];
    };
    lastAnalyzed: Date;
  };

  // Job Applications - Track all applications across multiple companies
  applications: {
    applicationId: ObjectId; // unique application ID
    companyId: ObjectId;     // ref to Company (which company they applied to)
    jobId: ObjectId;         // ref to Job (which specific job)
    jobTitle: string;        // job title for easy reference
    companyName: string;     // company name for easy reference

    // Application Status & Timeline
    status: 'applied' | 'screening' | 'phone_interview' | 'technical_interview' | 'onsite_interview' | 'final_interview' | 'offered' | 'hired' | 'rejected' | 'withdrawn';
    currentWorkflowStage?: string; // current stage in company's workflow
    appliedDate: Date;
    lastUpdated: Date;

    // Status History - Full timeline of application
    statusHistory: {
      previousStatus?: string;
      newStatus: string;
      date: Date;
      notes?: string;
      updatedBy: ObjectId; // which recruiter/HR person updated
      reason?: string; // reason for status change
    }[];

    // Application Source & Details
    applicationSource: 'job_board' | 'referral' | 'company_website' | 'recruiter' | 'linkedin' | 'direct_application' | 'other';
    referralSource?: string;
    coverLetter?: string;
    customResponses?: { // responses to company-specific application questions
      question: string;
      answer: string;
    }[];

    // Related Records for this Specific Application
    interviews: ObjectId[];  // references to Interview documents for this job
    assessments: ObjectId[]; // references to Assessment documents for this job

    // AI-Enhanced Job Match Scoring
    aiScoring: {
      overallScore: number; // 0-100 overall match score for this specific job
      breakdown: {
        skillsMatch: number; // 0-100
        experienceMatch: number; // 0-100
        educationMatch: number; // 0-100
        locationMatch: number; // 0-100
        salaryMatch: number; // 0-100
        cultureFitMatch: number; // 0-100
      };
      matchReasons: string[]; // Why this candidate is a good fit for this specific job
      missingSkills: string[]; // Skills candidate lacks for this job
      overqualifications: string[]; // Areas where candidate exceeds requirements
      riskFactors: string[]; // Potential concerns (salary expectations, overqualified, etc.)
      improvementRecommendations: string[]; // How candidate could improve for this role
      scoreConfidence: number; // 0-1 confidence in the scoring
      lastScored: Date;
    };

    // Communication Log for this Application
    communications: {
      communicationId: ObjectId;
      type: 'email' | 'phone_call' | 'message' | 'meeting' | 'automated_email';
      date: Date;
      subject?: string;
      content: string;
      direction: 'inbound' | 'outbound';
      fromUser: ObjectId; // which user/system initiated
      isRead: boolean;
      attachments?: string[];
    }[];

    // Internal Notes for this Application (company-specific)
    internalNotes: {
      noteId: ObjectId;
      content: string;
      createdBy: ObjectId; // which recruiter/HR person
      createdAt: Date;
      isPrivate: boolean; // visible only to internal company team
      noteType: 'general' | 'interview_feedback' | 'reference_check' | 'background_check' | 'hiring_decision';
      tags?: string[];
    }[];

    // Application Performance Metrics
    metrics?: {
      timeToFirstResponse: number; // hours from application to first company response
      timeInCurrentStage: number; // days in current stage
      totalApplicationTime: number; // days from applied to current status
      interviewsCompleted: number;
      assessmentsCompleted: number;
      responseRate: number; // candidate's response rate to communications
    };
  }[];

  // Global Candidate Preferences (across all applications)
  preferences: {
    jobTypes: ('fulltime' | 'parttime' | 'contract' | 'internship')[];
    workModes: ('remote' | 'hybrid' | 'onsite')[];
    preferredLocations: string[];
    industries: string[];
    communicationPreferences: {
      email: boolean;
      phone: boolean;
      sms: boolean;
      preferredTime: string; // e.g., "9am-5pm EST"
    };
  };

  // AI-Powered Job Rediscovery
  talentRediscovery: {
    suggestedForJobs: {
      jobId: ObjectId;
      matchScore: number; // 0-100
      reasoning: string;
      suggestedAt: Date;
      wasContacted: boolean;
      contactedAt?: Date;
    }[];
    lastRediscoveryRun: Date;
  };

  // Assessment Results
  assessments: {
    assessmentId: ObjectId;
    completedDate?: Date;
    score?: number;
    status: 'pending' | 'in_progress' | 'completed';
    results?: any;
  }[];

  // AI-Enhanced Communication History
  communications: {
    type: 'email' | 'phone' | 'meeting' | 'note';
    subject?: string;
    content: string;
    date: Date;
    userId: ObjectId; // who made the communication

    // AI Communication Features
    aiGenerated: boolean; // Was this communication AI-generated
    personalizedElements?: string[]; // Elements AI personalized based on candidate profile
    sentimentAnalysis?: {
      tone: 'positive' | 'neutral' | 'negative';
      confidence: number;
      keyEmotions: string[];
    };
  }[];

  // Soft Delete
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: ObjectId;

  // Audit
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}