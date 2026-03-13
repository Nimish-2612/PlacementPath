'use client';

import { useState } from 'react';
import { usePlacementData } from '@/context/placement-data-context';
import type { TargetRole, UserProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ROLES } from '@/lib/data';

export default function ProfilePage() {
  const { state, dispatch } = usePlacementData();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(state.userProfile);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profile });
    toast({
      title: 'Profile Updated',
      description: 'Your personal details have been saved.',
    });
  };

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
        <p className="text-muted-foreground">Manage your personal details and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>This information helps personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={profile.name} onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input id="branch" value={profile.branch} onChange={e => handleChange('branch', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" value={profile.year} onChange={e => handleChange('year', e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Select
                  value={profile.targetRole}
                  onValueChange={(value: TargetRole) => handleChange('targetRole', value)}
                >
                  <SelectTrigger id="targetRole">
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
          <div className="space-y-2">
            <Label htmlFor="companies">Preferred Companies</Label>
            <Input id="companies" value={profile.preferredCompanies} onChange={e => handleChange('preferredCompanies', e.target.value)} placeholder="e.g., Google, Microsoft, Amazon" />
          </div>
           <div className="flex items-center space-x-2 pt-2">
              <Switch id="resume-ready" checked={profile.resumeReady} onCheckedChange={(checked) => handleChange('resumeReady', checked)} />
              <Label htmlFor="resume-ready">My resume is ready for placements</Label>
            </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
