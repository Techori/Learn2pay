import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Plus, Download, Upload, Send, Calendar, Users, CreditCard, FileText, MessageSquare } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { jsPDF } from "jspdf";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  role: string;
}

const QuickActions = ({ role }: QuickActionsProps) => {
  const { toast } = useToast();

  const getActionsForRole = (userRole: string): QuickAction[] => {
    const commonActions = [
      {
        id: 'download-report',
        title: 'Download Report',
        description: 'Export current data',
        icon: Download,
        color: 'text-blue-600',
        onClick: () => {
          console.log('Generating quick report PDF');
          const doc = new jsPDF();
          doc.text("Quick Report Data", 10, 10);
          doc.text("This is a sample report generated from Quick Actions.", 10, 20);
          doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 30);
          // You could add more dynamic data here if QuickActions had access to it
          
          doc.save("quick-report.pdf");
          toast({ title: "Report Downloaded", description: "Your quick report has been downloaded." });
        }
      },
      {
        id: 'send-notification',
        title: 'Send Notification',
        description: 'Broadcast message',
        icon: Send,
        color: 'text-green-600',
        onClick: () => toast({ title: "Notification Sent", description: "Message broadcasted successfully." })
      }
    ];

    switch (userRole) {
      case 'institute-admin':
        return [
          {
            id: 'add-student',
            title: 'Add Student',
            description: 'Register new student',
            icon: Plus,
            color: 'text-indigo-600',
            onClick: () => toast({ title: "Add Student", description: "Opening student registration form." })
          },
          {
            id: 'generate-invoice',
            title: 'Generate Invoice',
            description: 'Create fee invoice',
            icon: FileText,
            color: 'text-purple-600',
            onClick: () => toast({ title: "Invoice Generated", description: "New invoice created successfully." })
          },
          ...commonActions
        ];
      
      case 'teacher':
        return [
          {
            id: 'mark-attendance',
            title: 'Mark Attendance',
            description: 'Record student attendance',
            icon: Users,
            color: 'text-orange-600',
            onClick: () => toast({ title: "Attendance", description: "Opening attendance marking interface." })
          },
          {
            id: 'schedule-exam',
            title: 'Schedule Exam',
            description: 'Create new exam',
            icon: Calendar,
            color: 'text-red-600',
            onClick: () => toast({ title: "Exam Scheduled", description: "New exam has been scheduled." })
          },
          ...commonActions
        ];
      
      case 'student':
        return [
          {
            id: 'pay-fees',
            title: 'Pay Fees',
            description: 'Make fee payment',
            icon: CreditCard,
            color: 'text-green-600',
            onClick: () => toast({ title: "Payment", description: "Redirecting to payment gateway." })
          },
          {
            id: 'view-results',
            title: 'View Results',
            description: 'Check exam results',
            icon: FileText,
            color: 'text-blue-600',
            onClick: () => toast({ title: "Results", description: "Opening results dashboard." })
          }
        ];
      
      case 'parent':
        return [
          {
            id: 'contact-teacher',
            title: 'Contact Teacher',
            description: 'Send message to teacher',
            icon: MessageSquare,
            color: 'text-purple-600',
            onClick: () => toast({ title: "Message", description: "Opening messaging interface." })
          },
          {
            id: 'pay-fees',
            title: 'Pay Child\'s Fees',
            description: 'Make fee payment',
            icon: CreditCard,
            color: 'text-green-600',
            onClick: () => toast({ title: "Payment", description: "Redirecting to payment gateway." })
          }
        ];
      
      case 'admin':
        return [
          {
            id: 'add-institute',
            title: 'Add Institute',
            description: 'Register new institute',
            icon: Plus,
            color: 'text-indigo-600',
            onClick: () => toast({ title: "Add Institute", description: "Opening institute registration form." })
          },
          {
            id: 'bulk-upload',
            title: 'Bulk Upload',
            description: 'Import data from file',
            icon: Upload,
            color: 'text-orange-600',
            onClick: () => toast({ title: "Bulk Upload", description: "Opening file upload interface." })
          },
          ...commonActions
        ];
      
      default:
        return commonActions;
    }
  };

  const actions = getActionsForRole(role);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all"
              onClick={action.onClick}
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <div className="text-center">
                <div className="text-xs font-medium">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
