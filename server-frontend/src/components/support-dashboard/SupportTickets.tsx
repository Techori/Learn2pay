import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
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
  Plus,
  Filter,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDailog";
import { Textarea } from "@/components/ui/Textarea";

// Add Ticket interface for full ticket shape
interface Ticket {
  id: string;
  title: string;
  institute: string;
  priority: string;
  status: string;
  time: string;
  assignee: string;
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  lastResponse?: string;
  responseTime?: string;
  resolutionTime?: string;
  customerSatisfaction?: number;
  attachments?: number;
  comments?: number;
}

interface SupportTicketsProps {
  role?: string;
  user?: { name: string };
}

const SupportTickets = ({ role = "lead", user }: SupportTicketsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [assignTo, setAssignTo] = useState<string>("");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    institute: "",
    category: "",
    priority: "Medium",
  });

  // Annotate tickets state to use Ticket[]
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      title: "Fee collection not working",
      institute: "ABC School",
      priority: "High",
      status: "In Progress",
      time: "2 hours ago",
      assignee: "Rahul Sharma",
    },
    {
      id: "TKT-002",
      title: "Parent portal login issue",
      institute: "XYZ Academy",
      priority: "Medium",
      status: "New",
      time: "4 hours ago",
      assignee: "Unassigned",
    },
    {
      id: "TKT-003",
      title: "Payment gateway integration",
      institute: "Success Institute",
      priority: "Low",
      status: "Resolved",
      time: "1 day ago",
      assignee: "Priya Singh",
    },
    {
      id: "TKT-004",
      title: "Student data import failed",
      institute: "Global School",
      priority: "High",
      status: "New",
      time: "1 hour ago",
      assignee: "Unassigned",
    },
    {
      id: "TKT-005",
      title: "Attendance module error",
      institute: "New Horizon Academy",
      priority: "Medium",
      status: "In Progress",
      time: "5 hours ago",
      assignee: "Vikram Patel",
    },
    // Added for team member filtering test
    {
      id: "TKT-006",
      title: "Test ticket for team member",
      institute: "Test Institute",
      priority: "Medium",
      status: "Open",
      time: "Just now",
      assignee: "Support Team Member",
    },
  ]);

  const [summaryStats, setSummaryStats] = useState([
    {
      title: "Total Tickets",
      value: "156",
      change: "+12%",
      changeDirection: "up",
      icon: <Ticket className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: "Open Tickets",
      value: "23",
      change: "-15%",
      changeDirection: "down",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-orange-500",
    },
    {
      title: "Avg Response Time",
      value: "2.3h",
      change: "-30min",
      changeDirection: "down",
      icon: <Clock className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+2%",
      changeDirection: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-secondary";
      case "In Progress":
      case "Open":
        return "bg-primary";
      case "Resolved":
        return "bg-success";
      case "Escalated":
        return "bg-danger";
      default:
        return "bg-secondary";
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
    if (
      !newTicket.title ||
      !newTicket.description ||
      !newTicket.institute ||
      !newTicket.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const ticket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      title: newTicket.title,
      description: newTicket.description,
      institute: newTicket.institute,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "New",
      time: "Just now",
      assignee: "Unassigned",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastResponse: "Just now",
      responseTime: "0",
      resolutionTime: "0",
      customerSatisfaction: 0,
      attachments: 0,
      comments: 0,
    };

    setTickets((prevTickets) => [ticket, ...prevTickets]);
    setNewTicket({
      title: "",
      description: "",
      institute: "",
      category: "",
      priority: "Medium",
    });
    setIsCreateDialogOpen(false);
  };

  const handleNewTicketChange = (field: string, value: string) => {
    setNewTicket((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTicketAction = (ticketId: string, action: string) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    setSelectedTicket(ticket);
    setSelectedAction(action);
    // initialize assignTo for assign action
    if (action === "assign") setAssignTo(ticket.assignee);
    setIsActionDialogOpen(true);
  };

  const confirmTicketAction = () => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        switch (selectedAction) {
          case "assign":
            return { ...ticket, status: "In Progress", assignee: assignTo };
          case "escalate":
            return { ...ticket, priority: "High", status: "In Progress" };
          case "close":
            return {
              ...ticket,
              status: "Closed",
              updatedAt: new Date().toISOString(),
            };
          default:
            return ticket;
        }
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setIsActionDialogOpen(false);
    setSelectedTicket(null);
    setSelectedAction("");
  };

  const getActionDialogContent = () => {
    if (!selectedTicket) return null;

    switch (selectedAction) {
      case "view":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Ticket Details - {selectedTicket.id}</DialogTitle>
              <DialogDescription>
                View complete ticket information
              </DialogDescription>
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
                  <p>{selectedTicket.assignee}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Created</h3>
                  <p>{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </>
        );
      case "assign":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Assign Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>
                Assign this ticket to a support agent
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Current Status</h3>
                <p>{selectedTicket.status}</p>
              </div>
              <div>
                <h3 className="font-semibold">Current Assignee</h3>
                <p>{selectedTicket.assignee}</p>
              </div>
              <div>
                <h3 className="font-semibold">New Assignee</h3>
                <Select
                  value={assignTo}
                  onValueChange={(value) => setAssignTo(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent">
                      {assignTo}
                    </SelectValue>
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
      case "escalate":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Escalate Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>
                Escalate this ticket to high priority
              </DialogDescription>
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
      case "close":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Close Ticket - {selectedTicket.id}</DialogTitle>
              <DialogDescription>
                Are you sure you want to close this ticket?
              </DialogDescription>
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

  // Filtering logic for team members
  let filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.institute.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;
    let matchesAssignee = true;
    if (role === "member" && user?.name) {
      matchesAssignee = ticket.assignee === user.name;
    }
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignee;
  });

  const handleTicketClick = (ticketId: string) => {
    // Navigate to ticket details page
    console.log(`Navigating to ticket ${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Support Tickets</h2>
          <p className="text-text-secondary">
            Manage and respond to support requests from institutes
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center">
                {stat.changeDirection === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-success mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-success mr-1" />
                )}
                <p className="text-xs text-text-secondary">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={handlePriorityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Priority: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <CardTitle>Tickets</CardTitle>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-card-border rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-card-bg/80">
              <div className="col-span-1 flex items-center">ID</div>
              <div className="col-span-4 flex items-center">
                Title
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </div>
              <div className="col-span-1 flex items-center">Priority</div>
              <div className="col-span-2 flex items-center">Status</div>
              <div className="col-span-2 flex items-center">Assignee</div>
              <div className="col-span-1 flex items-center">Time</div>
              <div className="col-span-1 flex items-center text-right">Actions</div>
            </div>

            {/* Ticket rows */}
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-12 gap-2 p-3 border-t border-card-border hover:bg-card-bg/50 cursor-pointer"
                onClick={() => handleTicketClick(ticket.id)}
              >
                <div className="col-span-1 flex items-center font-mono text-sm">
                  {ticket.id}
                </div>
                <div className="col-span-4 flex items-center font-medium">
                  {ticket.title}
                </div>
                <div className="col-span-1">
                  <Badge className={`${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <Badge className={`${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </Badge>
                </div>
                <div className="col-span-2 flex items-center text-text-secondary">
                  {ticket.assignee}
                </div>
                <div className="col-span-1 flex items-center text-sm text-text-secondary">
                  {ticket.time}
                </div>
                <div className="col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTicketAction(ticket.id, "view");
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTicketAction(ticket.id, "assign");
                        }}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTicketAction(ticket.id, "escalate");
                        }}
                        className="text-danger"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Escalate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create ticket dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Create a new support ticket for an institute
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newTicket.title}
                onChange={(e) =>
                  handleNewTicketChange("title", e.target.value)
                }
                placeholder="Brief description of the issue"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={newTicket.description}
                onChange={(e) =>
                  handleNewTicketChange("description", e.target.value)
                }
                placeholder="Detailed explanation of the problem"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="institute" className="text-sm font-medium">
                  Institute
                </label>
                <Select
                  value={newTicket.institute}
                  onValueChange={(value) =>
                    handleNewTicketChange("institute", value)
                  }
                >
                  <SelectTrigger id="institute">
                    <SelectValue placeholder="Select institute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABC School">ABC School</SelectItem>
                    <SelectItem value="XYZ Academy">XYZ Academy</SelectItem>
                    <SelectItem value="Success Institute">
                      Success Institute
                    </SelectItem>
                    <SelectItem value="Global School">Global School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) =>
                    handleNewTicketChange("priority", value)
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTicket}>Create Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAction === "view"
                ? "Ticket Details"
                : selectedAction === "assign"
                ? "Assign Ticket"
                : "Escalate Ticket"}
            </DialogTitle>
          </DialogHeader>
          {getActionDialogContent()}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsActionDialogOpen(false)}
            >
              Cancel
            </Button>
            {selectedAction !== "view" && (
              <Button onClick={confirmTicketAction}>
                {selectedAction === "assign" ? "Assign" : "Escalate"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportTickets;
