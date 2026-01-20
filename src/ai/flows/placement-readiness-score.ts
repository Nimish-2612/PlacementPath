'use server';

/**
 * @fileOverview A flow that calculates a placement readiness score based on DSA progress, core CS knowledge, and project confidence.
 *
 * - placementReadinessScore - A function that generates the placement readiness score.
 * - PlacementReadinessScoreInput - The input type for the placementReadinessScore function.
 * - PlacementReadinessScoreOutput - The return type for the placementReadinessScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlacementReadinessScoreInputSchema = z.object({
  dsaCompletion: z
    .number()
    .min(0)
    .max(100)
    .describe('The percentage of DSA topics completed (0-100).'),
  coreCsCompletion: z
    .number()
    .min(0)
    .max(100)
    .describe('The percentage of core CS topics covered (0-100).'),
  projectConfidence: z
    .string()
    .describe(
      'The overall confidence level in the projects, can be Low, Medium, or High.'
    ),
});
export type PlacementReadinessScoreInput = z.infer<
  typeof PlacementReadinessScoreInputSchema
>;

const PlacementReadinessScoreOutputSchema = z.object({
  score: z
    .number()
    .min(0)
    .max(100)
    .describe('The overall placement readiness score (0-100).'),
  message: z
    .string()
    .describe('A message indicating the student\'s readiness level.'),
});
export type PlacementReadinessScoreOutput = z.infer<
  typeof PlacementReadinessScoreOutputSchema
>;

export async function placementReadinessScore(
  input: PlacementReadinessScoreInput
): Promise<PlacementReadinessScoreOutput> {
  return placementReadinessScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'placementReadinessScorePrompt',
  input: {schema: PlacementReadinessScoreInputSchema},
  output: {schema: PlacementReadinessScoreOutputSchema},
  prompt: `You are an expert placement advisor. You are helping students gauge their placement readiness.

  Based on the following information, generate a placement readiness score (0-100) and a short message indicating the student's readiness level.

  DSA Completion: {{{dsaCompletion}}}%
  Core CS Coverage: {{{coreCsCompletion}}}%
  Project Confidence: {{{projectConfidence}}}

  Consider all three factors to generate the score and message. The projectConfidence can be 'Low', 'Medium', or 'High'.

  The message should be encouraging and provide specific guidance based on the score. For example, if the score is low, suggest focusing on DSA. If the score is high, suggest practicing interview questions.

  Ensure that the score reflects an intelligent and well-reasoned combination of the three input metrics.

  Output in JSON format.
  `,
});

const placementReadinessScoreFlow = ai.defineFlow(
  {
    name: 'placementReadinessScoreFlow',
    inputSchema: PlacementReadinessScoreInputSchema,
    outputSchema: PlacementReadinessScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
