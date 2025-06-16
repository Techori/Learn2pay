
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

const UserSupport = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Support</CardTitle>
          <CardDescription>Support for parents, students, and teachers</CardDescription>
        </CardHeader>
        <CardContent>
          <p>User support functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSupport;
