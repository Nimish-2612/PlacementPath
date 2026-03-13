'use client';

import { usePlacementData } from '@/context/placement-data-context';
import { ROLES } from '@/lib/data';
import type { TargetRole, Role } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import { useMemo } from 'react';

export default function SkillGapPage() {
  const { state, dispatch } = usePlacementData();
  const { targetRole } = state.userProfile;

  const handleRoleChange = (role: TargetRole) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { targetRole: role } });
  };

  const analysis = useMemo(() => {
    const roleData = ROLES.find(r => r.name === targetRole);
    if (!roleData) return { completedDsa: [], missingDsa: [], completedCs: [], missingCs: [], recommendation: null };

    const confidentDsa = new Set(state.dsaTopics.filter(t => t.status === 'Confident').map(t => t.name));
    const completedCs = new Set(state.coreCsTopics.filter(t => t.completed).map(t => t.name));

    const completedDsaSkills = roleData.requiredDsa.filter(skill => confidentDsa.has(skill));
    const missingDsaSkills = roleData.requiredDsa.filter(skill => !confidentDsa.has(skill));
    
    const completedCsSubjects = roleData.requiredCs.filter(subject => completedCs.has(subject));
    const missingCsSubjects = roleData.requiredCs.filter(subject => !completedCs.has(subject));
    
    const nextTopic = missingDsaSkills[0] || missingCsSubjects[0] || null;

    return {
      completedDsa: completedDsaSkills,
      missingDsa: missingDsaSkills,
      completedCs: completedCsSubjects,
      missingCs: missingCsSubjects,
      recommendation: nextTopic
    };
  }, [targetRole, state.dsaTopics, state.coreCsTopics]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Skill Gap Analyzer</h2>
          <p className="text-muted-foreground">Identify your strengths and weaknesses for your target role.</p>
        </div>
        <div className="w-64">
          <Select value={targetRole} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select target role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map(role => (
                <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>DSA Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Completed Skills</h3>
              <ul className="space-y-1">
                {analysis.completedDsa.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {skill}
                  </li>
                ))}
                 {analysis.completedDsa.length === 0 && <p className="text-sm text-muted-foreground">No required DSA skills mastered yet.</p>}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Missing Skills</h3>
              <ul className="space-y-1">
                {analysis.missingDsa.map(skill => (
                  <li key={skill} className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" /> {skill}
                  </li>
                ))}
                {analysis.missingDsa.length === 0 && <p className="text-sm text-muted-foreground">All required DSA skills mastered!</p>}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core CS Subjects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Completed Subjects</h3>
              <ul className="space-y-1">
                {analysis.completedCs.map(subject => (
                  <li key={subject} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {subject}
                  </li>
                ))}
                 {analysis.completedCs.length === 0 && <p className="text-sm text-muted-foreground">No required CS subjects completed yet.</p>}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Missing Subjects</h3>
              <ul className="space-y-1">
                {analysis.missingCs.map(subject => (
                  <li key={subject} className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" /> {subject}
                  </li>
                ))}
                {analysis.missingCs.length === 0 && <p className="text-sm text-muted-foreground">All required CS subjects completed!</p>}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {analysis.recommendation && (
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Recommendation</CardTitle>
                    <CardDescription>Your suggested next area of focus.</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-semibold">
                    Focus on <span className="text-primary">{analysis.recommendation}</span> next to fill your skill gap.
                </p>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
