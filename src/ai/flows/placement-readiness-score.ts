'use server';

/**
 * @fileOverview A flow that calculates a placement readiness score based on multiple student metrics.
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
  weeklyConsistency: z
    .number()
    .min(0)
    .max(100)
    .describe('A score representing how consistently the student has studied in the last week (0-100).'),
  resumeReady: z
    .boolean()
    .describe('Whether the student has a placement-ready resume.'),
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
    .describe('A message indicating the student\'s readiness level and a key suggestion.'),
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
  prompt: `You are an expert placement advisor AI. Your task is to calculate a holistic Placement Readiness Score for a student based on several metrics.

  Apply the following formula to calculate the score:
  Readiness Score = (DSA Progress * 0.35) + (Project Score * 0.25) + (Core Subjects * 0.20) + (Weekly Consistency * 0.10) + (Resume Readiness * 0.10)

  Here are the student's metrics:
  - DSA Completion (Percentage): {{{dsaCompletion}}}
  - Core CS Coverage (Percentage): {{{coreCsCompletion}}}
  - Project Confidence: {{{projectConfidence}}} (Convert this to a score: Low=20, Medium=60, High=100)
  - Weekly Consistency (Percentage): {{{weeklyConsistency}}}
  - Resume Readiness: {{{resumeReady}}} (Convert this to a score: true=100, false=0)

  Calculate the final score, round it to the nearest whole number.

  Then, based on the final score and the input metrics, provide a concise, encouraging message. The message should identify the student's current standing (e.g., "On the right track," "Needs more focus," "Almost there!") and give one specific, actionable piece of advice for the most impactful area of improvement.

  For example:
  - If the score is low due to DSA, say: "You're at the beginning of your journey. A great next step is to focus on mastering DSA fundamentals."
  - If projects are the weak link, say: "You're making good progress. Building one more high-quality project could significantly boost your profile."
  - If the score is high, say: "Excellent work, you're nearly placement-ready! Fine-tuning your resume would be the perfect final touch."

  Output the final calculated score and the generated message in JSON format.
  `,
});

const placementReadinessScoreFlow = ai.defineFlow(
  {
    name: 'placementReadinessScoreFlow',
    inputSchema: PlacementReadinessScoreInputSchema,
    outputSchema: PlacementReadinessScoreOutputSchema,
    retry: {
      maxAttempts: 3,
      backoff: {
        delay: '1s',
        multiplier: 2,
      },
      errors: (e: Error) => /429|503/.test(e.message),
    },
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
