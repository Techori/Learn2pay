import React, { useRef } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Plus, Download, Upload, Send, Calendar, Users, CreditCard, FileText, MessageSquare } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getActionsForRole = (userRole: string): QuickAction[] => {
    const commonActions = [
      {
        id: 'download-report',
        title: 'Download Report',
        description: 'Export current data',
        icon: Download,
        color: 'text-secondary',
        onClick: () => {
          console.log('Generating comprehensive report PDF');
          const doc = new jsPDF();
          
          // Set title
          doc.setFontSize(16);
          doc.text("Learn2Pay System Report", 14, 22);
          
          // Add timestamp
          doc.setFontSize(11);
          doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
          
          // Add system overview
          doc.setFontSize(13);
          doc.text("System Overview", 14, 40);
          
          // Create table for system metrics
          autoTable(doc, {
            startY: 45,
            head: [['Metric', 'Value', 'Change']],
            body: [
              ['Total Institutes', '1,247', '+5'],
              ['Total Users', '45,290', '+128'],
              ['Total Revenue', '₹1.25 Cr', '+8.5%'],
              ['Pending KYC', '89', '-12'],
              ['Open Support Tickets', '45', '-5'],
              ['Fraud Alerts', '12', '+2']
            ],
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] }
          });
          
          // Add recent activity section
          const finalY = (doc as any).lastAutoTable.finalY + 10;
          doc.text("Recent Activities", 14, finalY);
          
          autoTable(doc, {
            startY: finalY + 5,
            head: [['Date', 'Activity', 'User', 'Status']],
            body: [
              ['2023-11-15 14:32', 'Payment Received', 'ABC International School', 'Completed'],
              ['2023-11-15 13:15', 'New User Registration', 'XYZ Academy', 'Pending Verification'],
              ['2023-11-15 11:45', 'KYC Document Upload', 'Global Institute', 'Under Review'],
              ['2023-11-15 10:20', 'Support Ticket Created', 'Priya Sharma', 'Open'],
              ['2023-11-15 09:05', 'Fee Structure Updated', 'Delhi Public School', 'Completed']
            ],
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185] }
          });
          
          doc.save("learn2pay-report.pdf");
          toast({ title: "Report Downloaded", description: "Comprehensive system report has been generated and downloaded." });
        }
      },
      {
        id: 'send-notification',
        title: 'Send Notification',
        description: 'Broadcast message',
        icon: Send,
        color: 'text-success',
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
            color: 'text-secondary',
            onClick: () => toast({ title: "Add Student", description: "Opening student registration form." })
          },
          {
            id: 'generate-invoice',
            title: 'Generate Invoice',
            description: 'Create fee invoice',
            icon: FileText,
            color: 'text-primary',
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
            color: 'text-primary',
            onClick: () => toast({ title: "Attendance", description: "Opening attendance marking interface." })
          },
          {
            id: 'schedule-exam',
            title: 'Schedule Exam',
            description: 'Create new exam',
            icon: Calendar,
            color: 'text-warning',
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
            color: 'text-success',
            onClick: () => toast({ title: "Payment", description: "Redirecting to payment gateway." })
          },
          {
            id: 'view-results',
            title: 'View Results',
            description: 'Check exam results',
            icon: FileText,
            color: 'text-secondary',
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
            color: 'text-secondary',
            onClick: () => toast({ title: "Message", description: "Opening messaging interface." })
          },
          {
            id: 'pay-fees',
            title: 'Pay Child\'s Fees',
            description: 'Make fee payment',
            icon: CreditCard,
            color: 'text-success',
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
            color: 'text-secondary',
            onClick: () => toast({ title: "Add Institute", description: "Opening institute registration form." })
          },
          {
            id: 'bulk-upload',
            title: 'Bulk Upload',
            description: 'Import data from file',
            icon: Upload,
            color: 'text-primary',
            onClick: () => {
              // Trigger hidden file input
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }
          },
          ...commonActions
        ];
      
      default:
        return commonActions;
    }
  };

  const actions = getActionsForRole(role);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would handle the file upload to a server
      // For now, we'll just show a success toast
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['csv', 'xlsx', 'xls'];
      
      if (validExtensions.includes(fileExtension || '')) {
        toast({ 
          title: "File Uploaded Successfully", 
          description: `${file.name} (${Math.round(file.size / 1024)} KB) has been uploaded.` 
        });
      } else {
        toast({ 
          title: "Invalid File Format", 
          description: "Please upload a CSV or Excel file.",
          variant: "destructive"
        });
      }
    }
    
    // Reset the input
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-text-color">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-sm transition-all"
              onClick={action.onClick}
            >
              <action.icon className={`h-6 w-6 ${action.color}`} />
              <div className="text-center">
                <div className="text-xs font-medium text-text-color">{action.title}</div>
                <div className="text-xs text-text-secondary">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {/* Hidden file input for bulk upload */}
        <input 
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </CardContent>
    </Card>
  );
};

export default QuickActions;
