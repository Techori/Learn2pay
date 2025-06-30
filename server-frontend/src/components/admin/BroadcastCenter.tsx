import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { MessageSquare, Send, Calendar, Eye, Users, Mail, Phone } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface BroadcastStat {
  type: string;
  sent: string;
  delivered: string;
  opened: string;
  cost: string;
}

interface Campaign {
  id: number;
  name: string;
  type: string;
  sent: string;
  delivered: string;
  openRate: string;
  date: string;
  status: string;
}

interface Template {
  id: number;
  name: string;
  type: string;
  usage: number;
}

interface BroadcastForm {
  channel: string;
  message: string;
  recipients: string;
}

interface BroadcastCenterProps {
  showScheduleDialog: boolean;
  setShowScheduleDialog: (value: boolean) => void;
  scheduleDate: string;
  setScheduleDate: (value: string) => void;
  showBroadcastDialog: boolean;
  setShowBroadcastDialog: (value: boolean) => void;
  broadcastForm: BroadcastForm;
  setBroadcastForm: (value: BroadcastForm) => void;
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
}

const BroadcastCenter: React.FC<BroadcastCenterProps> = ({
  showScheduleDialog,
  setShowScheduleDialog,
  scheduleDate,
  setScheduleDate,
  showBroadcastDialog,
  setShowBroadcastDialog,
  broadcastForm,
  setBroadcastForm,
  selectedTemplate,
  setSelectedTemplate
}) => {
  const { toast } = useToast();

  const broadcastStats: BroadcastStat[] = [
    { type: "SMS", sent: "12,450", delivered: "12,234", opened: "10,890", cost: "₹2,490" },
    { type: "Email", sent: "8,900", delivered: "8,756", opened: "6,234", cost: "₹890" },
    { type: "WhatsApp", sent: "5,670", delivered: "5,623", opened: "4,890", cost: "₹1,134" },
    { type: "Push", sent: "15,670", delivered: "15,234", opened: "12,456", cost: "Free" }
  ];

  const recentCampaigns: Campaign[] = [
    {
      id: 1,
      name: "Festival Offer Campaign",
      type: "SMS + Email",
      sent: "25,000",
      delivered: "24,567",
      openRate: "68%",
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: 2,
      name: "KYC Reminder",
      type: "WhatsApp",
      sent: "1,200",
      delivered: "1,189",
      openRate: "85%",
      date: "2024-01-14",
      status: "Completed"
    },
    {
      id: 3,
      name: "New Feature Announcement",
      type: "Push + Email",
      sent: "18,500",
      delivered: "18,234",
      openRate: "72%",
      date: "2024-01-13",
      status: "Completed"
    }
  ];

  const templates: Template[] = [
    { id: 1, name: "Subscription Renewal Reminder", type: "SMS", usage: 145 },
    { id: 2, name: "Welcome New Vendor", type: "Email", usage: 89 },
    { id: 3, name: "Event Invitation", type: "WhatsApp", usage: 67 },
    { id: 4, name: "Payment Confirmation", type: "SMS", usage: 234 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-success text-white';
      case 'In Progress': return 'bg-warning text-white';
      case 'Scheduled': return 'bg-secondary text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  // Handle actions
  const handleNewBroadcast = (channel: string) => {
    setBroadcastForm({ channel, message: '', recipients: '' });
    setShowBroadcastDialog(true);
  };

  const handleSendBroadcast = () => {
    if (!broadcastForm.message || !broadcastForm.recipients) {
      toast({
        title: "Broadcast Error",
        description: "Please enter a message and recipient list.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Broadcast Sent",
      description: `${broadcastForm.channel} broadcast sent to ${broadcastForm.recipients} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setShowBroadcastDialog(false);
    setBroadcastForm({ channel: '', message: '', recipients: '' });
  };

  const handleScheduleMessage = () => {
    if (!scheduleDate) {
      toast({
        title: "Scheduling Error",
        description: "Please select a schedule date.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Message Scheduled",
      description: `Message scheduled for ${scheduleDate} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setShowScheduleDialog(false);
    setScheduleDate('');
  };

  const handleUseTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
    const template = templates.find(t => t.name === templateName);
    if (template) {
      setBroadcastForm({
        channel: template.type,
        message: `Using template: ${template.name} - ${template.type} message`,
        recipients: broadcastForm.recipients
      });
    }
    setShowBroadcastDialog(true);
    toast({
      title: "Template Selected",
      description: `Using template "${templateName}" at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  const handleViewCampaign = (campaignName: string) => {
    toast({
      title: "View Campaign",
      description: `Viewing details for "${campaignName}" at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Broadcast Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {broadcastStats.map((stat, index) => (
          <Card key={index} className="bg-card-bg border-card-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-text-color">{stat.type}</h3>
                <MessageSquare className="h-4 w-4 text-secondary" />
              </div>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="text-text-secondary">Sent:</span> <span className="font-medium text-text-color">{stat.sent}</span>
                </div>
                <div className="text-sm">
                  <span className="text-text-secondary">Delivered:</span> <span className="font-medium text-text-color">{stat.delivered}</span>
                </div>
                <div className="text-sm">
                  <span className="text-text-secondary">Opened:</span> <span className="font-medium text-text-color">{stat.opened}</span>
                </div>
                <div className="text-sm">
                  <span className="text-text-secondary">Cost:</span> <span className="font-medium text-success">{stat.cost}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Broadcast Center */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color">Broadcast Center</CardTitle>
              <CardDescription className="text-text-secondary">Create and manage bulk notifications across all channels</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-secondary hover:bg-secondary text-white" onClick={() => handleNewBroadcast("Broadcast")}>
                <Send className="h-4 w-4 mr-2 text-white" />
                New Broadcast
              </Button>
              <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={() => setShowScheduleDialog(true)}>
                <Calendar className="h-4 w-4 mr-2 text-secondary" />
                Schedule Message
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Send Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color hover:bg-surface-hover text-text-color border-border-color" onClick={() => handleNewBroadcast("SMS")}>
              <Phone className="h-6 w-6 mb-2 text-secondary" />
              <span>Send SMS</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color hover:bg-surface-hover text-text-color border-border-color" onClick={() => handleNewBroadcast("Email")}>
              <Mail className="h-6 w-6 mb-2 text-secondary" />
              <span>Send Email</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color hover:bg-surface-hover text-text-color border-border-color" onClick={() => handleNewBroadcast("WhatsApp")}>
              <MessageSquare className="h-6 w-6 mb-2 text-secondary" />
              <span>WhatsApp</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center bg-surface-color hover:bg-surface-hover text-text-color border-border-color" onClick={() => handleNewBroadcast("Push")}>
              <Users className="h-6 w-6 mb-2 text-secondary" />
              <span>Push Notification</span>
            </Button>
          </div>

          {/* Recent Campaigns */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-color mb-3">Recent Campaigns</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-text-color">Campaign Name</TableHead>
                  <TableHead className="text-text-color">Type</TableHead>
                  <TableHead className="text-text-color">Sent/Delivered</TableHead>
                  <TableHead className="text-text-color">Open Rate</TableHead>
                  <TableHead className="text-text-color">Date</TableHead>
                  <TableHead className="text-text-color">Status</TableHead>
                  <TableHead className="text-text-color">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="hover:bg-surface-hover">
                    <TableCell className="font-medium text-text-color">{campaign.name}</TableCell>
                    <TableCell className="text-text-color">
                      <Badge variant="outline" className="border-border-color text-text-secondary">{campaign.type}</Badge>
                    </TableCell>
                    <TableCell className="text-text-color">
                      <div className="text-sm">
                        <div>{campaign.sent} sent</div>
                        <div className="text-text-secondary">{campaign.delivered} delivered</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-color">
                      <span className="font-medium text-success">{campaign.openRate}</span>
                    </TableCell>
                    <TableCell className="text-text-color">{campaign.date}</TableCell>
                    <TableCell className="text-text-color">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={() => handleViewCampaign(campaign.name)}>
                        <Eye className="h-3 w-3 text-secondary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Message Templates */}
          <div>
            <h3 className="text-lg font-semibold text-text-color mb-3">Message Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="bg-surface-color border-border-color cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-text-color">{template.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-border-color text-text-secondary">{template.type}</Badge>
                          <span className="text-sm text-text-secondary">Used {template.usage} times</span>
                        </div>
                      </div>
                      <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={() => handleUseTemplate(template.name)}>
                        Use
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BroadcastCenter;