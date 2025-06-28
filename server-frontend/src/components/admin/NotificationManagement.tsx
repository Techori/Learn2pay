import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Bell, Send, Plus, Eye, Edit, Trash2, MessageSquare, Mail, Smartphone, Calendar, Users, Phone } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";
import BroadcastCenter from './BroadcastCenter'; // Importing BroadcastCenter component

// Define interfaces for TypeScript
interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  audience: string;
  status: string;
  sentDate: string | null;
  delivered: number;
  opened: number;
  clicked: number;
}

interface Template {
  id?: number; // Optional for notification templates
  title: string;
  description: string | null; // Nullable for broadcast templates
  type: string;
  usage?: number; // Optional for broadcast templates
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

const NotificationManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({ type: 'all', status: 'all', audience: 'all' });
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [newNotification, setNewNotification] = useState<Notification>({
    id: 0,
    title: '',
    message: '',
    type: 'Email',
    audience: 'All Students',
    status: 'Draft',
    sentDate: null,
    delivered: 0,
    opened: 0,
    clicked: 0
  });
  const [showScheduleDialog, setShowScheduleDialog] = useState<boolean>(false);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [showBroadcastDialog, setShowBroadcastDialog] = useState<boolean>(false);
  const [broadcastForm, setBroadcastForm] = useState<BroadcastForm>({ channel: '', message: '', recipients: '' });
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Fee Payment Reminder",
      message: "Your quarterly fee payment is due in 3 days",
      type: "Email",
      audience: "All Students",
      status: "Sent",
      sentDate: "2024-01-20 14:30:25",
      delivered: 1234,
      opened: 987,
      clicked: 234
    },
    {
      id: 2,
      title: "New Course Launch",
      message: "Exciting new AI & Machine Learning course starting next month",
      type: "Push",
      audience: "All Institutes",
      status: "Scheduled",
      sentDate: "2024-01-22 09:00:00",
      delivered: 0,
      opened: 0,
      clicked: 0
    },
    {
      id: 3,
      title: "System Maintenance Alert",
      message: "Platform will be under maintenance on Sunday 2-4 AM",
      type: "SMS",
      audience: "Admin Users",
      status: "Draft",
      sentDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0
    },
    {
      id: 4,
      title: "KYC Document Approval",
      message: "Your institute KYC documents have been approved",
      type: "Email",
      audience: "Pending KYC",
      status: "Sent",
      sentDate: "2024-01-19 16:45:12",
      delivered: 23,
      opened: 19,
      clicked: 12
    }
  ];

  const templates: Template[] = [
    { title: "Fee Reminder", description: "Monthly fee payment reminder", type: "Email" },
    { title: "Welcome Message", description: "Welcome new institutes", type: "Email" },
    { title: "System Alert", description: "Maintenance or system updates", type: "SMS" },
    { title: "Event Announcement", description: "New events or webinars", type: "Push" },
    { title: "KYC Status", description: "KYC approval/rejection updates", type: "Email" },
    { title: "Holiday Wishes", description: "Festival and holiday greetings", type: "Push" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-500 text-white';
      case 'Scheduled': return 'bg-blue-500 text-white';
      case 'Draft': return 'bg-gray-500 text-white';
      case 'Failed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'SMS': return <MessageSquare className="h-4 w-4" />;
      case 'Push': return <Smartphone className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  // Filtered notifications
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications);
  useEffect(() => {
    let filtered = [...notifications];
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.audience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.type !== 'all') {
      filtered = filtered.filter(notification => notification.type === filters.type);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(notification => notification.status === filters.status);
    }
    if (filters.audience !== 'all') {
      filtered = filtered.filter(notification => notification.audience === filters.audience);
    }
    setFilteredNotifications(filtered);
  }, [searchTerm, filters]);

  // Handle actions
  const handleView = (notification: Notification) => {
    toast({
      title: "View Notification",
      description: `Viewing details for "${notification.title}".`
    });
  };

  const handleEdit = (notification: Notification) => {
    setNewNotification(notification);
    setShowCreateDialog(true);
  };

  const handleDelete = (notification: Notification) => {
    toast({
      title: "Notification Deleted",
      description: `${notification.title} has been deleted.`
    });
    // In a real app, remove from state or API
  };

  const handleSend = (notification: Notification) => {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ');
    const updatedNotification = { ...notification, status: 'Sent', sentDate: now, delivered: 0, opened: 0, clicked: 0 };
    toast({
      title: "Notification Sent",
      description: `${notification.title} has been sent at ${now}.`
    });
    // In a real app, update state or API
    setShowCreateDialog(false);
  };

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotification.title || !newNotification.message || !newNotification.type || !newNotification.audience) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    const notification: Notification = {
      ...newNotification,
      id: notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1,
      status: 'Draft',
      sentDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0
    };
    toast({
      title: "Notification Created",
      description: `${notification.title} has been created as a draft.`
    });
    setShowCreateDialog(false);
    setNewNotification({
      id: 0,
      title: '',
      message: '',
      type: 'Email',
      audience: 'All Students',
      status: 'Draft',
      sentDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0
    });
  };

  const handleUseTemplate = (template: Template) => {
    setNewNotification({
      id: 0,
      title: template.title,
      message: template.description || '',
      type: template.type,
      audience: 'All Students',
      status: 'Draft',
      sentDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0
    });
    setShowCreateDialog(true);
    toast({
      title: "Template Applied",
      description: `${template.title} template has been applied.`
    });
  };

  const handleQuickAction = (type: string) => {
    setNewNotification({
      id: 0,
      title: `${type === 'Email' ? 'Email Campaign' : type === 'SMS' ? 'SMS Alert' : 'Push Notification'}`,
      message: `Default ${type} message`,
      type,
      audience: 'All Users',
      status: 'Draft',
      sentDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0
    });
    setShowCreateDialog(true);
    toast({
      title: `${type} Campaign Started`,
      description: `Started creating a ${type} campaign at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  return (
    <div className="space-y-6 bg-[#0B0F1A] p-6 text-white min-h-screen">
      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-gray-400">Total Sent</div>
            <div className="text-xs text-green-400">+23 this week</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">89.5%</div>
            <div className="text-sm text-gray-400">Delivery Rate</div>
            <div className="text-xs text-green-400">Above average</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">67.2%</div>
            <div className="text-sm text-gray-400">Open Rate</div>
            <div className="text-xs text-blue-400">Good engagement</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-400">Scheduled</div>
            <div className="text-xs text-yellow-400">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start p-6" onClick={() => handleQuickAction('Email')}>
          <Mail className="h-5 w-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Send Email Campaign</div>
            <div className="text-sm opacity-90">Create and send bulk emails</div>
          </div>
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white justify-start p-6" onClick={() => handleQuickAction('SMS')}>
          <MessageSquare className="h-5 w-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Send SMS Alert</div>
            <div className="text-sm opacity-90">Quick SMS to users</div>
          </div>
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white justify-start p-6" onClick={() => handleQuickAction('Push')}>
          <Smartphone className="h-5 w-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">Push Notification</div>
            <div className="text-sm opacity-90">Mobile app notifications</div>
          </div>
        </Button>
      </div>

      {/* Notification Management Panel */}
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">
                <Bell className="h-5 w-5 mr-2 text-blue-400" />
                Notification Management
              </CardTitle>
              <CardDescription className="text-gray-400">Create, schedule, and track all platform notifications</CardDescription>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">Type</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push">Push</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Sent">Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Draft">Draft</option>
                <option value="Failed">Failed</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.audience}
                onChange={(e) => setFilters({ ...filters, audience: e.target.value })}
              >
                <option value="all">Audience</option>
                <option value="All Students">All Students</option>
                <option value="All Institutes">All Institutes</option>
                <option value="Admin Users">Admin Users</option>
                <option value="Pending KYC">Pending KYC</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Notifications Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200">Notification Details</TableHead>
                <TableHead className="text-gray-200">Type & Audience</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
                <TableHead className="text-gray-200">Performance</TableHead>
                <TableHead className="text-gray-200">Date</TableHead>
                <TableHead className="text-gray-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id} className="hover:bg-[#2A2F3A]">
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-gray-400 max-w-xs truncate">{notification.message}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(notification.type)}
                      <div>
                        <div className="font-medium">{notification.type}</div>
                        <div className="text-sm text-gray-400">{notification.audience}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <Badge className={getStatusColor(notification.status)}>
                      {notification.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    {notification.status === 'Sent' ? (
                      <div className="text-sm">
                        <div>Delivered: {notification.delivered}</div>
                        <div>Opened: {notification.opened}</div>
                        <div>Clicked: {notification.clicked}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    <div className="text-sm">
                      {notification.sentDate || 'Not sent'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={() => handleView(notification)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={() => handleEdit(notification)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      {notification.status === 'Draft' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleSend(notification)}>
                          <Send className="h-3 w-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-white border-red-500 hover:bg-red-500" onClick={() => handleDelete(notification)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notification Templates */}
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <CardTitle className="text-white">Quick Templates</CardTitle>
          <CardDescription className="text-gray-400">Pre-built notification templates for common scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow bg-[#232b45]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{template.title}</h4>
                    <Badge variant="outline" className="text-gray-300 border-gray-600">{template.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <Button size="sm" variant="outline" className="w-full text-white border-blue-500 hover:bg-blue-500" onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Broadcast Center Section */}
      <BroadcastCenter
        showScheduleDialog={showScheduleDialog}
        setShowScheduleDialog={setShowScheduleDialog}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
        showBroadcastDialog={showBroadcastDialog}
        setShowBroadcastDialog={setShowBroadcastDialog}
        broadcastForm={broadcastForm}
        setBroadcastForm={setBroadcastForm}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      {/* Create Notification Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-[#1A1F2B] border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{newNotification.id ? 'Edit Notification' : 'Create Notification'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {newNotification.id ? 'Update the existing notification details.' : 'Create a new notification for your audience.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={newNotification.id ? handleSend : handleCreateNotification} className="space-y-4 py-4">
            <Input
              placeholder="Title"
              required
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white"
            />
            <Input
              placeholder="Message"
              required
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white"
            />
            <select
              className="w-full pl-10 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
              value={newNotification.type}
              onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
            >
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="Push">Push</option>
            </select>
            <select
              className="w-full pl-10 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
              value={newNotification.audience}
              onChange={(e) => setNewNotification({ ...newNotification, audience: e.target.value })}
            >
              <option value="All Students">All Students</option>
              <option value="All Institutes">All Institutes</option>
              <option value="Admin Users">Admin Users</option>
              <option value="Pending KYC">Pending KYC</option>
            </select>
            <DialogFooter>
              <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                {newNotification.id ? 'Send' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationManagement;