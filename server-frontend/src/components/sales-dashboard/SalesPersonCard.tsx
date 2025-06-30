import React from 'react';
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  targetCompletion: number;
  leadsAssigned: number;
  kycPending: number;
  kycCompleted: number;
}

interface SalesPersonCardProps {
  member: TeamMember;
  onViewPerformance: (member: TeamMember) => void;
}

const SalesPersonCard: React.FC<SalesPersonCardProps> = ({ member, onViewPerformance }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            {getInitials(member.name)}
          </div>
          <div>
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-text-secondary text-sm">{member.email}</p>
            <p className="text-text-secondary text-sm">{member.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-text-secondary text-sm">Leads Assigned</div>
          <div className="font-medium">{member.leadsAssigned}</div>
          <div className="text-text-secondary text-sm">Target %</div>
          <div className="font-medium">{member.targetCompletion}%</div>
          <div className="text-text-secondary text-sm">Pending KYC</div>
          <div className="font-medium">{member.kycPending}</div>
          <div className="text-text-secondary text-sm">KYC Completed</div>
          <div className="font-medium">{member.kycCompleted}</div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onViewPerformance(member)}
          >
            View Performance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesPersonCard;