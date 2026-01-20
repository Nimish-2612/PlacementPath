'use client';

import { usePlacementData } from '@/context/placement-data-context';
import type { DsaStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DsaTrackerPage() {
  const { state, dispatch } = usePlacementData();
  const statuses: DsaStatus[] = ['Not Started', 'In Progress', 'Confident'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">DSA Tracker</h2>
        <p className="text-muted-foreground">Update your confidence level for each topic.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Topics</CardTitle>
          <CardDescription>A complete list of all DSA topics in your roadmap.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[200px] text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.dsaTopics.map(topic => (
                <TableRow key={topic.id}>
                  <TableCell className="font-medium">{topic.name}</TableCell>
                  <TableCell className="text-muted-foreground">{topic.category}</TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={topic.status}
                      onValueChange={(value: DsaStatus) =>
                        dispatch({ type: 'SET_DSA_STATUS', payload: { id: topic.id, status: value } })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Set status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
