import type { DsaTopic, CoreCsTopic } from './types';

export const INITIAL_DSA_TOPICS: DsaTopic[] = [
  // Arrays
  { id: 'dsa-1', name: 'Introduction to Arrays', status: 'Not Started', category: 'Arrays' },
  { id: 'dsa-2', name: 'Two Pointers', status: 'Not Started', category: 'Arrays' },
  { id: 'dsa-3', name: 'Sliding Window', status: 'Not Started', category: 'Arrays' },
  // Strings
  { id: 'dsa-4', name: 'Basic String Manipulation', status: 'Not Started', category: 'Strings' },
  { id: 'dsa-5', name: 'String Matching (KMP)', status: 'Not Started', category: 'Strings' },
  // Recursion
  { id: 'dsa-6', name: 'Introduction to Recursion', status: 'Not Started', category: 'Recursion' },
  { id: 'dsa-7', name: 'Backtracking', status: 'Not Started', category: 'Recursion' },
  // Trees
  { id: 'dsa-8', name: 'Binary Trees & Traversals', status: 'Not Started', category: 'Trees' },
  { id: 'dsa-9', name: 'Binary Search Trees', status: 'Not Started', category: 'Trees' },
  { id: 'dsa-10', name: 'Heaps & Priority Queues', status: 'Not Started', category: 'Trees' },
  // Graphs
  { id: 'dsa-11', name: 'Graph Traversals (BFS, DFS)', status: 'Not Started', category: 'Graphs' },
  { id: 'dsa-12', name: 'Shortest Path Algorithms', status: 'Not Started', category: 'Graphs' },
  { id: 'dsa-13', name: 'Topological Sort', status: 'Not Started', category: 'Graphs' },
  // Dynamic Programming
  { id: 'dsa-14', name: 'Introduction to DP', status: 'Not Started', category: 'DP' },
  { id: 'dsa-15', name: 'Knapsack Problem', status: 'Not Started', category: 'DP' },
  { id: 'dsa-16', name: 'Longest Common Subsequence', status: 'Not Started', category: 'DP' },
];

export const INITIAL_CORE_CS_TOPICS: CoreCsTopic[] = [
  { id: 'cs-1', name: 'OOPS', completed: false },
  { id: 'cs-2', name: 'DBMS', completed: false },
  { id: 'cs-3', name: 'OS', completed: false },
  { id: 'cs-4', name: 'CN', completed: false },
];
