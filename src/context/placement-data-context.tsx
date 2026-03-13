'use client';

import React, { createContext, useReducer, useContext, useMemo } from 'react';
import type { 
  PlacementDataState, 
  PlacementDataAction, 
  PlacementDataContextType, 
  DsaTopic,
  CoreCsTopic,
  Project,
  ProjectConfidence,
  UserProfile,
  WeeklyActivityItem,
  Feedback
} from '@/lib/types';
import { INITIAL_DSA_TOPICS, INITIAL_CORE_CS_TOPICS } from '@/lib/data';
import { format } from 'date-fns';

const initialState: PlacementDataState = {
  dsaTopics: INITIAL_DSA_TOPICS,
  coreCsTopics: INITIAL_CORE_CS_TOPICS,
  projects: [
    { id: 'proj-1', name: 'My Portfolio Website', techStack: 'React, Next.js, TailwindCSS', confidence: 'High' },
    { id: 'proj-2', name: 'E-commerce Backend', techStack: 'Node.js, Express, MongoDB', confidence: 'Medium' },
  ],
  userProfile: {
    name: 'Student',
    branch: 'Computer Science',
    year: 'Final Year',
    targetRole: 'Software Engineer',
    preferredCompanies: 'Google, Amazon, Meta',
    resumeReady: false
  },
  weeklyActivity: [
    { date: '2024-07-22', dsaProblems: 2, studyHours: 2, topicsCompleted: 1 },
    { date: '2024-07-23', dsaProblems: 3, studyHours: 1, topicsCompleted: 0 },
    { date: '2024-07-24', dsaProblems: 1, studyHours: 3, topicsCompleted: 1 },
    { date: '2024-07-26', dsaProblems: 5, studyHours: 2, topicsCompleted: 0 },
  ],
  feedback: [],
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
        };
    case 'DELETE_PROJECT':
        return {
            ...state,
            projects: state.projects.filter(p => p.id !== action.payload.id)
        };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        userProfile: { ...state.userProfile, ...action.payload }
      };
    case 'LOG_ACTIVITY':
      const today = format(new Date(), 'yyyy-MM-dd');
      const existingEntryIndex = state.weeklyActivity.findIndex(a => a.date === today);

      if (existingEntryIndex !== -1) {
        const updatedActivity = [...state.weeklyActivity];
        const existingEntry = updatedActivity[existingEntryIndex];
        updatedActivity[existingEntryIndex] = {
          ...existingEntry,
          dsaProblems: existingEntry.dsaProblems + action.payload.dsaProblems,
          studyHours: existingEntry.studyHours + action.payload.studyHours,
          topicsCompleted: existingEntry.topicsCompleted + action.payload.topicsCompleted
        };
        return { ...state, weeklyActivity: updatedActivity };
      } else {
        const newActivity: WeeklyActivityItem = { ...action.payload, date: today };
        return { ...state, weeklyActivity: [...state.weeklyActivity, newActivity] };
      }
    case 'ADD_FEEDBACK':
      const newFeedback: Feedback = { 
        ...action.payload, 
        id: `fb-${Date.now()}`,
        timestamp: Date.now()
      };
      return {
        ...state,
        feedback: [...state.feedback, newFeedback]
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

  const weakestDsaCategory = useMemo(() => {
    const categoryConfidence: { [key: string]: { confident: number, total: number } } = {};
    state.dsaTopics.forEach(topic => {
      if (!categoryConfidence[topic.category]) {
        categoryConfidence[topic.category] = { confident: 0, total: 0 };
      }
      categoryConfidence[topic.category].total++;
      if (topic.status === 'Confident') {
        categoryConfidence[topic.category].confident++;
      }
    });

    let weakestCategory: string | null = null;
    let minRatio = Infinity;

    for (const category in categoryConfidence) {
      const { confident, total } = categoryConfidence[category];
      const ratio = total > 0 ? confident / total : 1;
      if (ratio < minRatio) {
        minRatio = ratio;
        weakestCategory = category;
      }
    }
    return weakestCategory;
  }, [state.dsaTopics]);

  const weeklyConsistency = useMemo(() => {
    const recentActivity = state.weeklyActivity.filter(a => {
      const activityDate = new Date(a.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return activityDate >= sevenDaysAgo;
    });
    const activeDays = new Set(recentActivity.map(a => a.date)).size;
    return Math.round((activeDays / 7) * 100);
  }, [state.weeklyActivity]);

  const suggestions = useMemo(() => {
    const s = [];
    if (weakestDsaCategory) {
      s.push(`Your weakest area is ${weakestDsaCategory}. Focus on practicing those topics.`);
    }
    if (state.projects.length < 3) {
      s.push(`Complete ${3 - state.projects.length} more project(s) to strengthen your portfolio.`);
    }
    if (weeklyConsistency < 50) {
      s.push('Try to study more consistently each week to build momentum.');
    }
    if (!state.userProfile.resumeReady) {
      s.push('Prepare and upload your resume to improve your readiness score.');
    }
    return s.slice(0, 3); // Max 3 suggestions
  }, [weakestDsaCategory, state.projects.length, weeklyConsistency, state.userProfile.resumeReady]);

  const feedbackSummary = useMemo(() => {
    const count = state.feedback.length;
    if (count === 0) return { count: 0, averageRating: 0 };
    const totalRating = state.feedback.reduce((sum, f) => sum + f.rating, 0);
    const averageRating = totalRating / count;
    return { count, averageRating: parseFloat(averageRating.toFixed(1)) };
  }, [state.feedback]);

  const value = { 
    state, 
    dispatch, 
    dsaCompletion, 
    coreCsCompletion, 
    projectsCompleted, 
    projectConfidence,
    weakestDsaCategory,
    suggestions,
    weeklyConsistency,
    feedbackSummary
  };

  return <PlacementDataContext.Provider value={value}>{children}</PlacementDataContext.Provider>;
}

export function usePlacementData() {
  const context = useContext(PlacementDataContext);
  if (context === undefined) {
    throw new Error('usePlacementData must be used within a PlacementDataProvider');
  }
  return context;
}
