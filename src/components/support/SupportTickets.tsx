import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Ticket,
  Eye,
  ChevronDown,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  School,
  Mail,
  Users,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

const SupportTickets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    institute: '',
    category: '',
    priority: 'Medium',
  });

  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      title: "Fee collection not working",
      description: "Unable to process fee payments through the portal",
      institute: "ABC School",
      category: "Payment Issues",
      priority: "High",
      status: "In Progress",
      assignedTo: "John Doe",
      createdAt: "2024-03-15T10:30:00",
      updatedAt: "2024-03-15T11:45:00",
      lastResponse: "2 hours ago",
      responseTime: "1.5 hours",
      resolutionTime: "4 hours",
      customerSatisfaction: 4,
      attachments: 2,
      comments: 5
    },
    {
      id: "TKT-002",
      title: "Parent portal login issue",
      description: "Parents cannot access their dashboard",
      institute: "XYZ Academy",
      category: "Technical Issues",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Jane Smith",
      createdAt: "2024-06-05T10:30:00",
      updatedAt: "2024-06-05T10:30:00",
      lastResponse: "1 hour ago",
      responseTime: "1 hour",
      resolutionTime: "N/A",
      customerSatisfaction: 0,
      attachments: 0,
      comments: 0
    },
    {
      id: "TKT-003",
      title: "Payment gateway integration",
      description: "Need help setting up Razorpay integration",
      institute: "Success Institute",
      category: "Integration",
      priority: "Low",
      status: "Resolved",
      assignedTo: "Mike Johnson",
      createdAt: "2024-06-04T10:30:00",
      updatedAt: "2024-06-04T10:30:00",
      lastResponse: "1 day ago",
      responseTime: "1 day",
      resolutionTime: "2 days",
      customerSatisfaction: 5,
      attachments: 1,
      comments: 2
    }
  ]);

  const [summaryStats, setSummaryStats] = useState([
    {
      title: "Total Tickets",
      value: "156",
      change: "+12%",
      changeDirection: "up",
      icon: <Ticket className="h-5 w-5" />,
      color: "text-blue-500"
    },
    {
      title: "Open Tickets",
      value: "23",
      change: "-15%",
      changeDirection: "down",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-orange-500"
    },
    {
      title: "Avg Response Time",
      value: "2.3h",
      change: "-30min",
      changeDirection: "down",
      icon: <Clock className="h-5 w-5" />,
      color: "text-green-500"
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+2%",
      changeDirection: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500';
      case 'In Progress': return 'bg-orange-500';
      case 'Resolved': return 'bg-green-500';
      case 'Closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const handleCreateTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.institute || !newTicket.category) {
      alert('Please fill in all required fields');
      return;
    }

    const ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'New',
      assignedTo: 'Unassigned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastResponse: 'Just now',
      responseTime: '0',
      resolutionTime: '0',
      customerSatisfaction: 0,
      attachments: 0,
      comments: 0
    };

    setTickets(prevTickets => [ticket, ...prevTickets]);
    setNewTicket({
      title: '',
      description: '',
      institute: '',
      category: '',
      priority: 'Medium',
    });
    setIsCreateDialogOpen(false);
  };

  const handleNewTicketChange = (field: string, value: string) => {
    setNewTicket(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTicketAction = (ticketId: string, action: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    setSelectedTicket(ticket);
    setSelectedAction(action);
    setIsActionDialogOpen(true);
  };

  const confirmTicketAction = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        switch (selectedAction) {
          case 'assign':
            return { ...ticket, status: 'In Progress', assignedTo: 'John Doe' };
          case 'escalate':
            return { ...ticket, priority: 'High', status: 'In Progress' };
          case 'close':
            return { ...ticket, status: 'Closed', updatedAt: new Date().toISOString() };
          default:
            return ticket;
        }
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setIsActionDialogOpen(false);
    setSelectedTicket(null);
    setSelectedAction('');
  };

  const getActionDialogContent = () => {
    if (!selectedTicket) return null;

    switch (selectedAction) {
      case 'view':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Ticket Details - {selectedTicket.id}</DialogTitle>
              <DialogDescription>View complete ticket information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Title</h3>
                <p>{selectedTicket.title}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{selectedTicket.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Institute</h3>
                  <p>{selectedTicket.institute}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p>{selectedTicket.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Priority</h3>
                  <p>{selectedTicket.priority}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p>{selectedTicket.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Assigned To</h3>
                  <p>{selectedTicket.assignedTo}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Created</h3>
                  <p>{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </>
        );
      case 'assign':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Assign Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>Assign this ticket to a support agent</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Current Status</h3>
                <p>{selectedTicket.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Current Assignee</h3>
                <p>{selectedTicket.assignedTo}</p>
              </div>
              <div>
                <h3 className="font-semibold">New Assignee</h3>
                <Select defaultValue="John Doe">
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 'escalate':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Escalate Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>Escalate this ticket to high priority</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Current Priority</h3>
                <p>{selectedTicket.priority}</p>
              </div>
              <div>
                <h3 className="font-semibold">Current Status</h3>
                <p>{selectedTicket.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Reason for Escalation</h3>
                <Textarea placeholder="Enter reason for escalation..." />
              </div>
            </div>
          </>
        );
      case 'close':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Close Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>Are you sure you want to close this ticket?</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Resolution Summary</h3>
                <Textarea placeholder="Enter resolution summary..." />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.institute.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Support Tickets</CardTitle>
          <CardDescription>Manage and track all support requests</CardDescription>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Support Ticket</DialogTitle>
              <DialogDescription>Fill in the details to create a new support ticket</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTicket.title}
                  onChange={(e) => handleNewTicketChange('title', e.target.value)}
                  placeholder="Enter ticket title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newTicket.description}
                  onChange={(e) => handleNewTicketChange('description', e.target.value)}
                  placeholder="Enter ticket description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Institute</label>
                <Input
                  value={newTicket.institute}
                  onChange={(e) => handleNewTicketChange('institute', e.target.value)}
                  placeholder="Enter institute name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => handleNewTicketChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Payment Issues">Payment Issues</SelectItem>
                    <SelectItem value="Technical Issues">Technical Issues</SelectItem>
                    <SelectItem value="Account Issues">Account Issues</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => handleNewTicketChange('priority', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTicket}>
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets by ID, title, or institute..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Payment Issues">Payment Issues</SelectItem>
                  <SelectItem value="Technical Issues">Technical Issues</SelectItem>
                  <SelectItem value="Account Issues">Account Issues</SelectItem>
                  <SelectItem value="Integration">Integration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{ticket.id}</h3>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">{ticket.institute}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleTicketAction(ticket.id, 'view')}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTicketAction(ticket.id, 'assign')}>
                      Assign Ticket
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTicketAction(ticket.id, 'escalate')}>
                      Escalate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTicketAction(ticket.id, 'close')}>
                      Close Ticket
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{ticket.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{ticket.assignedTo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Response</p>
                  <p className="font-medium">{ticket.lastResponse}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeDirection === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={stat.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          {getActionDialogContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
              Cancel
            </Button>
            {selectedAction !== 'view' && (
              <Button onClick={confirmTicketAction}>
                {selectedAction === 'assign' ? 'Assign' :
                 selectedAction === 'escalate' ? 'Escalate' :
                 selectedAction === 'close' ? 'Close' : 'Confirm'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportTickets;
