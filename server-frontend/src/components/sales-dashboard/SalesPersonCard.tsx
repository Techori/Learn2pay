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
    <Card className="bg-gray-800/70 border-gray-700 rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {getInitials(member.name)}
          </div>
          <div>
            <h3 className="text-white font-semibold">{member.name}</h3>
            <p className="text-gray-400 text-sm">{member.email}</p>
            <p className="text-gray-400 text-sm">{member.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-gray-400 text-sm">Leads Assigned</div>
          <div className="text-white font-medium">{member.leadsAssigned}</div>
          <div className="text-gray-400 text-sm">Target %</div>
          <div className="text-white font-medium">{member.targetCompletion}%</div>
          <div className="text-gray-400 text-sm">Pending KYC</div>
          <div className="text-white font-medium">{member.kycPending}</div>
          <div className="text-gray-400 text-sm">KYC Completed</div>
          <div className="text-white font-medium">{member.kycCompleted}</div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-700 text-gray-200 hover:bg-gray-700"
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