import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/Dialog";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend  } from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  leadsAssigned: number;
  targetCompletion: number;
  kycPending: number;
  kycCompleted: number;
}

const MySalesTeam: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Amit Sharma', email: 'amit.sharma@company.com', phone: '+91-98765-43210', targetCompletion: 75, leadsAssigned: 15, kycPending: 2, kycCompleted: 10 },
    { id: '2', name: 'Priya Patel', email: 'priya.patel@company.com', phone: '+91-87654-32109', targetCompletion: 60, leadsAssigned: 10, kycPending: 1, kycCompleted: 7 },
    { id: '3', name: 'Rohan Singh', email: 'rohan.singh@company.com', phone: '+91-76543-21098', targetCompletion: 90, leadsAssigned: 20, kycPending: 3, kycCompleted: 15 },
  ]);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const handleViewPerformance = (member: TeamMember) => {
    setSelectedMember(member);
    console.log(`Viewing performance for ${member.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true })}`);
  };

  const getRingChartData = (member: TeamMember | null) => {
    if (!member) return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    return {
      labels: ['KYC Completed', 'Pending KYC'],
      datasets: [{
        data: [member.kycCompleted, member.kycPending],
        backgroundColor: ['var(--success)', 'var(--danger)'],
        borderWidth: 1,
      }],
    };
  };

  const ringChartOptions: Partial<ChartOptions<"doughnut">> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: 'var(--text-color)' },
      },
      title: { display: false },
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Sales Team</CardTitle>
        </CardHeader>
        <CardContent>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-text-secondary text-sm">{member.email}</p>
                        <p className="text-text-secondary text-sm">{member.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Leads Assigned</span>
                        <span>{member.leadsAssigned}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Target Completion</span>
                        <span>{member.targetCompletion}%</span>
                      </div>
                      <Progress value={member.targetCompletion} className={getColorClass(member.targetCompletion)} />
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Pending KYC</span>
                        <span>{member.kycPending}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleViewPerformance(member)}
                      >
                        View Performance
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-text-secondary py-10">
              No team members assigned yet. Add members to get started!
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMember?.name}'s Performance</DialogTitle>
            <DialogDescription>View detailed performance metrics including KYC completion ratio.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <p>Email: {selectedMember?.email}</p>
              <p>Phone: {selectedMember?.phone}</p>
            </div>
            <div>
              <p>Leads Assigned: {selectedMember?.leadsAssigned}</p>
              <p>Target Completion: {selectedMember?.targetCompletion}%</p>
              <p>Pending KYC: {selectedMember?.kycPending}</p>
              <p>KYC Completed: {selectedMember?.kycCompleted}</p>
            </div>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={getRingChartData(selectedMember)} options={ringChartOptions} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MySalesTeam;