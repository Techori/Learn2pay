import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bell, ListChecks, BarChart2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { useToast } from '@/hooks/use-toast';

const mockLogs = [
  { id: 1, date: '2024-06-01', institute: 'ABC International School', status: 'Sent', responses: 42 },
  { id: 2, date: '2024-06-01', institute: 'XYZ Academy', status: 'Sent', responses: 30 },
  { id: 3, date: '2024-05-28', institute: 'Success Coaching Institute', status: 'Sent', responses: 18 },
];

interface SupportEmiRemindersProps {
  role?: string;
}

const SupportEmiReminders: React.FC<SupportEmiRemindersProps> = ({ role }) => {
  const [openBulk, setOpenBulk] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const { toast } = useToast();

  const handleSendBulk = () => {
    setOpenBulk(false);
    toast({
      title: 'Reminders Sent',
      description: 'Bulk EMI reminders have been sent to all premium institutes\' parents.',
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> EMI Collection Reminders
          </CardTitle>
          <CardDescription>
            Send reminders to parents about upcoming EMI payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              className="bg-white border-orange-500 border text-orange-500 hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-2" 
              onClick={() => setOpenBulk(true)}
            >
              <Bell className="h-5 w-5" /> Send Bulk Reminder
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-2" 
              onClick={() => setOpenLogs(true)}
            >
              <ListChecks className="h-5 w-5" /> View Reminder Logs
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-2" 
              onClick={() => setOpenAnalytics(true)}
            >
              <BarChart2 className="h-5 w-5" /> Effectiveness Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Reminder Dialog */}
      <Dialog open={openBulk} onOpenChange={setOpenBulk}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Bulk EMI Reminder</DialogTitle>
            <DialogDescription>Send reminders to all premium institutes' parents.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to send reminders to all premium institutes' parents?
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => setOpenBulk(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-white border-orange-500 border text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              onClick={handleSendBulk}
            >
              Send Reminders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reminder Logs Dialog */}
      <Dialog open={openLogs} onOpenChange={setOpenLogs}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reminder Logs</DialogTitle>
            <DialogDescription>View logs and response status for all sent reminders.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="border border-card-border rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-card-border bg-card-bg/50">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Institute</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Responses</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLogs.map(log => (
                    <tr key={log.id} className="border-b border-card-border">
                      <td className="py-2 px-3">{log.date}</td>
                      <td className="py-2 px-3">{log.institute}</td>
                      <td className="py-2 px-3">{log.status}</td>
                      <td className="py-2 px-3">{log.responses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Effectiveness Analytics Dialog */}
      <Dialog open={openAnalytics} onOpenChange={setOpenAnalytics}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Effectiveness Analytics</DialogTitle>
            <DialogDescription>Monitor the effectiveness of EMI reminders.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-2">Total Reminders Sent: <span className="font-bold">3</span></div>
            <div className="mb-2">Total Responses: <span className="font-bold">90</span></div>
            <div className="mb-2">Average Response Rate: <span className="font-bold text-success">68%</span></div>
            <div className="mt-4 text-sm text-text-secondary">(Mock analytics data)</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportEmiReminders; 