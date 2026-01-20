'use server';

import {
  placementReadinessScore,
  type PlacementReadinessScoreInput,
  type PlacementReadinessScoreOutput,
} from '@/ai/flows/placement-readiness-score';

export async function runPlacementReadinessScore(
  input: PlacementReadinessScoreInput
): Promise<PlacementReadinessScoreOutput> {
  return await placementReadinessScore(input);
}
