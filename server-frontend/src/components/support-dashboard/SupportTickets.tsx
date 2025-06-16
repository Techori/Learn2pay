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
} from "@/components/ui/dropdown-menu";
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

const SupportTickets = () => {
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
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "In Progress":
        return "bg-orange-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
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
                <p>{selectedTicket.assignedTo}</p>
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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.institute.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleTicketClick = (ticketId: string) => {
    // Navigate to ticket details page
    console.log(`Navigating to ticket ${ticketId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Support Tickets</CardTitle>
          <CardDescription className="text-gray-400">
            Manage and respond to support requests from institutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                className="pl-10 bg-gray-800 border-gray-700 text-gray-200 focus:border-orange-500"
              />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
              >
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
              >
                <ArrowUpDown className="h-4 w-4 mr-2 text-gray-400" />
                Sort
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-400" />
                Advanced
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 pb-2 border-b border-gray-700">
              <div className="col-span-1">ID</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Institute</div>
              <div className="col-span-1">Priority</div>
              <div className="col-span-2">Assignee</div>
              <div className="col-span-2">Status</div>
            </div>

            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-12 items-center py-3 px-2 border border-gray-700 rounded-lg hover:bg-slate-700/50 cursor-pointer"
                onClick={() => handleTicketClick(ticket.id)}
              >
                <div className="col-span-1 font-medium text-gray-200">
                  {ticket.id}
                </div>
                <div className="col-span-4">
                  <p className="font-medium text-white">{ticket.title}</p>
                  <p className="text-xs text-gray-400">{ticket.time}</p>
                </div>
                <div className="col-span-2 text-gray-300">
                  {ticket.institute}
                </div>
                <div className="col-span-1">
                  <Badge
                    className={`${getPriorityColor(
                      ticket.priority
                    )} text-white`}
                  >
                    {ticket.priority}
                  </Badge>
                </div>
                <div className="col-span-2 text-gray-300">
                  {ticket.assignee === "Unassigned" ? (
                    <span className="text-gray-400">Unassigned</span>
                  ) : (
                    ticket.assignee
                  )}
                </div>
                <div className="col-span-2">
                  <Badge
                    className={`${getStatusColor(ticket.status)} text-white`}
                  >
                    {ticket.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.changeDirection === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    stat.changeDirection === "up"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
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
            <Button
              variant="outline"
              onClick={() => setIsActionDialogOpen(false)}
            >
              Cancel
            </Button>
            {selectedAction !== "view" && (
              <Button onClick={confirmTicketAction}>
                {selectedAction === "assign"
                  ? "Assign"
                  : selectedAction === "escalate"
                  ? "Escalate"
                  : selectedAction === "close"
                  ? "Close"
                  : "Confirm"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportTickets;
