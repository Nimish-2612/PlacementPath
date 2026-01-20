'use client';

import React, { createContext, useReducer, useContext, useMemo } from 'react';
import type { 
  PlacementDataState, 
  PlacementDataAction, 
  PlacementDataContextType, 
  DsaTopic,
  CoreCsTopic,
  Project,
  ProjectConfidence
} from '@/lib/types';
import { INITIAL_DSA_TOPICS, INITIAL_CORE_CS_TOPICS } from '@/lib/data';

const initialState: PlacementDataState = {
  dsaTopics: INITIAL_DSA_TOPICS,
  coreCsTopics: INITIAL_CORE_CS_TOPICS,
  projects: [
    { id: 'proj-1', name: 'My Portfolio Website', techStack: 'React, Next.js, TailwindCSS', confidence: 'High' },
    { id: 'proj-2', name: 'E-commerce Backend', techStack: 'Node.js, Express, MongoDB', confidence: 'Medium' },
  ],
};

const PlacementDataContext = createContext<PlacementDataContextType | undefined>(undefined);

function placementDataReducer(state: PlacementDataState, action: PlacementDataAction): PlacementDataState {
  switch (action.type) {
    case 'SET_DSA_STATUS':
      return {
        ...state,
        dsaTopics: state.dsaTopics.map(topic =>
          topic.id === action.payload.id ? { ...topic, status: action.payload.status } : topic
        ),
      };
    case 'SET_CS_STATUS':
      return {
        ...state,
        coreCsTopics: state.coreCsTopics.map(topic =>
          topic.id === action.payload.id ? { ...topic, completed: action.payload.completed } : topic
        ),
      };
    case 'ADD_PROJECT':
      const newProject: Project = { ...action.payload, id: `proj-${Date.now()}` };
      return {
        ...state,
        projects: [...state.projects, newProject],
      };
    case 'UPDATE_PROJECT':
        return {
            ...state,
            projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p)
        }
    case 'DELETE_PROJECT':
        return {
            ...state,
            projects: state.projects.filter(p => p.id !== action.payload.id)
        }
    default:
      return state;
  }
}

export function PlacementDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(placementDataReducer, initialState);

  const dsaCompletion = useMemo(() => {
    const confidentTopics = state.dsaTopics.filter(t => t.status === 'Confident').length;
    return Math.round((confidentTopics / state.dsaTopics.length) * 100);
  }, [state.dsaTopics]);

  const coreCsCompletion = useMemo(() => {
    const completedTopics = state.coreCsTopics.filter(t => t.completed).length;
    return Math.round((completedTopics / state.coreCsTopics.length) * 100);
  }, [state.coreCsTopics]);

  const projectsCompleted = useMemo(() => state.projects.length, [state.projects]);

  const projectConfidence: ProjectConfidence = useMemo(() => {
    if (state.projects.length === 0) return 'Low';
    const confidenceValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
    const totalConfidence = state.projects.reduce((acc, p) => acc + confidenceValues[p.confidence], 0);
    const avgConfidence = totalConfidence / state.projects.length;

    if (avgConfidence >= 2.5) return 'High';
    if (avgConfidence >= 1.5) return 'Medium';
    return 'Low';
  }, [state.projects]);

  const value = { state, dispatch, dsaCompletion, coreCsCompletion, projectsCompleted, projectConfidence };

  return <PlacementDataContext.Provider value={value}>{children}</PlacementDataContext.Provider>;
}

export function usePlacementData() {
  const context = useContext(PlacementDataContext);
  if (context === undefined) {
    throw new Error('usePlacementData must be used within a PlacementDataProvider');
  }
  return context;
}
