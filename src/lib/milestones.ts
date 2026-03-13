import type { Milestone } from './types';

export const MILESTONES: Milestone[] = [
  {
    name: 'Start',
    readinessThreshold: 0,
    topics: [],
    estimatedTime: 'N/A',
  },
  {
    name: 'Arrays & Strings',
    readinessThreshold: 20,
    topics: ['Introduction to Arrays', 'Two Pointers', 'Sliding Window', 'Basic String Manipulation', 'String Matching (KMP)'],
    estimatedTime: '2-3 weeks',
  },
  {
    name: 'Recursion',
    readinessThreshold: 35,
    topics: ['Introduction to Recursion', 'Backtracking'],
    estimatedTime: '1-2 weeks',
  },
  {
    name: 'Trees',
    readinessThreshold: 50,
    topics: ['Binary Trees & Traversals', 'Binary Search Trees', 'Heaps & Priority Queues'],
    estimatedTime: '3-4 weeks',
  },
  {
    name: 'Graphs',
    readinessThreshold: 70,
    topics: ['Graph Traversals (BFS, DFS)', 'Shortest Path Algorithms', 'Topological Sort'],
    estimatedTime: '3-4 weeks',
  },
  {
    name: 'Dynamic Programming',
    readinessThreshold: 85,
    topics: ['Introduction to DP', 'Knapsack Problem', 'Longest Common Subsequence'],
    estimatedTime: '4-5 weeks',
  },
  {
    name: 'Placement Ready',
    readinessThreshold: 100,
    topics: ['All topics mastered!', 'Advanced Algorithms', 'System Design'],
    estimatedTime: 'Final Polish',
  },
];
