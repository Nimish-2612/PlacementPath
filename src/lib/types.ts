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

export type PlacementDataState = {
  dsaTopics: DsaTopic[];
  coreCsTopics: CoreCsTopic[];
  projects: Project[];
};

export type PlacementDataAction =
  | { type: 'SET_DSA_STATUS'; payload: { id: string; status: DsaStatus } }
  | { type: 'SET_CS_STATUS'; payload: { id:string; completed: boolean } }
  | { type: 'ADD_PROJECT'; payload: Omit<Project, 'id'> }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: { id: string } };

export type PlacementDataContextType = {
  state: PlacementDataState;
  dispatch: React.Dispatch<PlacementDataAction>;
  dsaCompletion: number;
  coreCsCompletion: number;
  projectsCompleted: number;
  projectConfidence: ProjectConfidence;
};
