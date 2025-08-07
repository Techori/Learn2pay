import React, { useState, useEffect } from "react";
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
import {
  getAllTickets,
  createTicket,
  updateTicketStatus,
  assignTicket,
  getAllInstitutes,
  getTicketStats,
} from "@/services/ticketsApi";

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    avgResponseTime: "0h",
    resolutionRate: 0,
  });
  const [institutes, setInstitutes] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Load tickets data from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (priorityFilter !== "all") params.append("priority", priorityFilter);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      if (searchQuery) params.append("search", searchQuery);

      const response = await getAllTickets(Object.fromEntries(params));

      if (response.success && response.data) {
        // Map MongoDB _id to id for frontend compatibility
        const mappedTickets = response.data.map((ticket: any) => ({
          ...ticket,
          id: ticket._id || ticket.id,
          time: ticket.createdAt
            ? new Date(ticket.createdAt).toLocaleDateString()
            : "N/A",
          assignee: ticket.assignedTo || "Unassigned",
        }));
        setTickets(mappedTickets);
        setError("");

        // Update stats based on fetched tickets
        const openTickets = mappedTickets.filter(
          (ticket: any) =>
            ticket.status === "New" ||
            ticket.status === "Open" ||
            ticket.status === "In Progress"
        );
        const resolvedTickets = mappedTickets.filter(
          (ticket: any) => ticket.status === "Resolved"
        );

        setStats({
          total: mappedTickets.length,
          open: openTickets.length,
          avgResponseTime: "2.3h", // This could be calculated from real data
          resolutionRate:
            mappedTickets.length > 0
              ? Math.round(
                  (resolvedTickets.length / mappedTickets.length) * 100
                )
              : 0,
        });
      } else {
        setError(response.error || "Failed to fetch tickets");
        setTickets([]);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to fetch tickets. Please try again.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle ticket click navigation
  const handleTicketClick = (ticketId: string) => {
    console.log("Navigating to ticket", ticketId);
    // TODO: Implement ticket detail navigation
    // For now, just log the ticket ID
    if (!ticketId) {
      console.error("No ticket ID provided");
      return;
    }
    // You can add navigation logic here, e.g.:
    // navigate(`/support/tickets/${ticketId}`);
  };

  // Fetch institutes for dropdown
  const fetchInstitutes = async () => {
    try {
      console.log("Fetching institutes...");
      const response = await getAllInstitutes();
      console.log("Institutes API response:", response);

      if (response.success && response.data) {
        // Handle different possible response structures
        const instituteData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        console.log("Institute data:", instituteData);

        const mappedInstitutes = instituteData.map((inst: any) => ({
          id: inst._id || inst.id,
          name: inst.name || inst.instituteName || "Unknown Institute",
        }));

        console.log("Mapped institutes:", mappedInstitutes);
        setInstitutes(mappedInstitutes);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where success field is missing but data is present
        console.log("Direct institute data:", response.data);
        const mappedInstitutes = response.data.map((inst: any) => ({
          id: inst._id || inst.id,
          name: inst.name || inst.instituteName || "Unknown Institute",
        }));

        console.log("Mapped institutes (direct):", mappedInstitutes);
        setInstitutes(mappedInstitutes);
      } else {
        console.log("No institutes found or API error:", response);
        // Set some default institutes if API fails
        setInstitutes([
          { id: "1", name: "Default Institute" },
          { id: "2", name: "Sample School" },
          { id: "3", name: "Test Academy" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching institutes:", error);
      // Set default institutes on error
      setInstitutes([
        { id: "1", name: "Default Institute" },
        { id: "2", name: "Sample School" },
        { id: "3", name: "Test Academy" },
      ]);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchTickets();
  }, [statusFilter, priorityFilter, categoryFilter, searchQuery]);

  // Fetch institutes only once on component mount
  useEffect(() => {
    fetchInstitutes();
  }, []);

  // Summary stats will be calculated from real data
  const summaryStats = [
    {
      title: "Total Tickets",
      value: stats.total.toString(),
      change: "+12%",
      icon: <Ticket className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: "Open Tickets",
      value: stats.open.toString(),
      change: "-8%",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-orange-600",
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime,
      change: "-30min",
      icon: <Clock className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: "Resolution Rate",
      value: `${stats.resolutionRate}%`,
      change: "+2%",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-600",
    },
  ];

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

  const handleCreateTicket = async () => {
    // Set default values for optional fields to avoid validation issues
    const ticketData = {
      title: newTicket.title || "Support Request",
      message: newTicket.description || "No description provided",
      category: newTicket.category || "General",
      priority: newTicket.priority || "Medium",
      institute: newTicket.institute || null,
    };

    try {
      setLoading(true);
      const response = await createTicket({
        title: ticketData.title,
        message: ticketData.message,
        category: ticketData.category,
        priority: ticketData.priority,
        institute: ticketData.institute || undefined,
      });

      if (response.success) {
        // Refresh the tickets list to show the new ticket
        await fetchTickets();

        // Reset form
        setNewTicket({
          title: "",
          description: "",
          institute: "",
          category: "",
          priority: "Medium",
        });
        setIsCreateDialogOpen(false);
      } else {
        console.error("Error creating ticket:", response.error);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
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

  const confirmTicketAction = async () => {
    if (!selectedTicket) return;

    try {
      let response;

      switch (selectedAction) {
        case "assign":
          response = await assignTicket(selectedTicket.id, assignTo);
          break;
        case "escalate":
          response = await updateTicketStatus(selectedTicket.id, "In Progress");
          break;
        case "close":
          response = await updateTicketStatus(selectedTicket.id, "Resolved");
          break;
        default:
          return;
      }

      if (response.error) {
        alert(`Error updating ticket: ${response.error}`);
        return;
      }

      // Refresh the tickets list
      await fetchTickets();

      setIsActionDialogOpen(false);
      setSelectedTicket(null);
      setSelectedAction("");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket. Please try again.");
    }
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
    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesCategory &&
      matchesAssignee
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Support Tickets</h2>
          <p className="text-text-secondary">
            Manage and respond to support requests from institutes
          </p>
        </div>
        <Button
          onClick={() => {
            setIsCreateDialogOpen(true);
            // Ensure institutes are loaded when opening the dialog
            if (institutes.length === 0) {
              fetchInstitutes();
            }
          }}
          className="bg-white border-orange-500 border text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Ticket
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="flex items-center">
                {stat.change.startsWith("+") ? (
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
            <div className="grid grid-cols-12 gap-4 p-3 bg-card-bg/80">
              <div className="col-span-1 flex items-center">#</div>
              <div className="col-span-4 flex items-center">
                Title
                <ArrowUpDown className="ml-2 h-3 w-3" />
              </div>
              <div className="col-span-1 flex items-center">Priority</div>
              <div className="col-span-2 flex items-center">Status</div>
              <div className="col-span-2 flex items-center">Assignee</div>
              <div className="col-span-1 flex items-center">Time</div>
              <div className="col-span-1 flex items-center text-right">
                Actions
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <p className="mt-2 text-text-secondary">Loading tickets...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="p-8 text-center">
                <div className="text-red-500 mb-2">
                  <AlertTriangle className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-red-600 font-medium">
                  Error loading tickets
                </p>
                <p className="text-text-secondary text-sm mt-1">{error}</p>
                <Button
                  onClick={fetchTickets}
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredTickets.length === 0 && (
              <div className="p-8 text-center">
                <Ticket className="h-12 w-12 mx-auto text-text-secondary mb-4" />
                <p className="text-text-secondary font-medium">
                  No tickets found
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Try adjusting your filters or create a new ticket
                </p>
              </div>
            )}

            {/* Ticket rows */}
            {!loading &&
              !error &&
              filteredTickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="grid grid-cols-12 gap-4 p-3 border-t border-card-border hover:bg-card-bg/50 cursor-pointer"
                  onClick={() => handleTicketClick(ticket.id)}
                >
                  <div className="col-span-1 flex items-center font-mono text-sm">
                    {index + 1}
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
                onChange={(e) => handleNewTicketChange("title", e.target.value)}
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
                    {institutes.length > 0 ? (
                      institutes.map((institute) => (
                        <SelectItem key={institute.id} value={institute.name}>
                          {institute.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading institutes...
                      </SelectItem>
                    )}
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
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-white border-orange-500 border text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              onClick={handleCreateTicket}
            >
              Create Ticket
            </Button>
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
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
              onClick={() => setIsActionDialogOpen(false)}
            >
              Cancel
            </Button>
            {selectedAction !== "view" && (
              <Button
                className="bg-white border-orange-500 border text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                onClick={confirmTicketAction}
              >
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
