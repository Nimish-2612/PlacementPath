export type DsaStatus = 'Not Started' | 'In Progress' | 'Confident';

export type DsaTopic = {
  id: string;
  name: string;
  status: DsaStatus;
  category: 'Arrays' | 'Strings' | 'Recursion' | 'Trees' | 'Graphs' | 'DP';
};

export type CoreCsTopic = {
  id: string;
  name: 'OOPS' | 'DBMS' | 'OS' | 'CN';
  completed: boolean;
};

export type ProjectConfidence = 'Low' | 'Medium' | 'High';

export type Project = {
  id: string;
  name: string;
  techStack: string;
  confidence: ProjectConfidence;
};

// New types
export type TargetRole = 'Software Engineer' | 'Backend Developer' | 'Data Scientist' | 'ML Engineer';

export type Role = {
  name: TargetRole;
  requiredDsa: string[];
  requiredCs: string[];
}

export type UserProfile = {
  name: string;
  branch: string;
  year: string;
  targetRole: TargetRole;
  preferredCompanies: string;
  resumeReady: boolean;
}

export type WeeklyActivityItem = {
  date: string; // "YYYY-MM-DD"
  dsaProblems: number;
  studyHours: number;
  topicsCompleted: number;
}

export type Feedback = {
  id: string;
  name: string;
  year: string;
  rating: number;
  feature: string;
  improvement: string;
  timestamp: number;
}

export type Milestone = {
    name: string;
    readinessThreshold: number; // Score required to reach this milestone
    topics: string[]; // DSA topics related to this milestone
    estimatedTime: string;
};

export type PlacementDataState = {
  dsaTopics: DsaTopic[];
  coreCsTopics: CoreCsTopic[];
  projects: Project[];
  userProfile: UserProfile;
  weeklyActivity: WeeklyActivityItem[];
  feedback: Feedback[];
};

export type PlacementDataAction =
  | { type: 'SET_DSA_STATUS'; payload: { id: string; status: DsaStatus } }
  | { type: 'SET_CS_STATUS'; payload: { id:string; completed: boolean } }
  | { type: 'ADD_PROJECT'; payload: Omit<Project, 'id'> }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: { id: string } }
  | { type: 'UPDATE_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'LOG_ACTIVITY'; payload: Omit<WeeklyActivityItem, 'date'> }
  | { type: 'ADD_FEEDBACK'; payload: Omit<Feedback, 'id' | 'timestamp'> };

export type PlacementDataContextType = {
  state: PlacementDataState;
  dispatch: React.Dispatch<PlacementDataAction>;
  dsaCompletion: number;
  coreCsCompletion: number;
  projectsCompleted: number;
  projectConfidence: ProjectConfidence;
  // New calculated values
  weakestDsaCategory: string | null;
  suggestions: string[];
  weeklyConsistency: number;
  feedbackSummary: {
    count: number;
    averageRating: number;
  };
};
