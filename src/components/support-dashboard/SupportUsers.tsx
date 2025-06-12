import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
// Adding Textarea for potential use in notes/comments
import {
  Search,
  Users as UsersIcon, // Renamed to avoid conflict with User component
  FileText,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Ticket,
  AlertTriangle,
  LockKeyhole,

  CheckCircle,

  Building,
  MoreVertical,
  Eye,

  KeyRound,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    institute: "",
    status: "Active",
    role: "Parent",
  });

  const [users, setUsers] = useState([
    {
      id: "USR-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 9876543210",
      location: "Mumbai, Maharashtra",
      joinedDate: "2024-01-15",
      lastLogin: "2024-06-06",
      institute: "ABC International School",
      status: "Active",
      role: "Parent",
      totalTickets: 3,
      openTickets: 1,
      accountIssues: 0,
      paymentIssues: 1,
    },
    {
      id: "USR-002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543211",
      location: "Delhi, India",
      joinedDate: "2024-02-20",
      lastLogin: "2024-06-05",
      institute: "XYZ Academy",
      status: "Active",
      role: "Teacher",
      totalTickets: 1,
      openTickets: 0,
      accountIssues: 0,
      paymentIssues: 1,
    },
    {
      id: "USR-003",
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+91 9876543212",
      location: "Bangalore, Karnataka",
      joinedDate: "2024-03-10",
      lastLogin: "2024-05-28",
      institute: "Success Coaching Institute",
      status: "Inactive",
      role: "Student",
      totalTickets: 5,
      openTickets: 2,
      accountIssues: 1,
      paymentIssues: 1,
    },
    {
      id: "USR-004",
      name: "Dr. Sunita Desai",
      email: "sunita.desai@email.com",
      phone: "+91 9876543213",
      location: "Pune, Maharashtra",
      joinedDate: "2024-01-05",
      lastLogin: "2024-06-06",
      institute: "Modern School",
      status: "Active",
      role: "Institute Admin",
      totalTickets: 2,
      openTickets: 0,
      accountIssues: 1,
      paymentIssues: 0,
    },
  ]);

  const [summaryStats, setSummaryStats] = useState([
    {
      title: "Total Users",
      value: "4",
      icon: <UsersIcon className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: "Active Users",
      value: "3",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "Open User Tickets",
      value: "3",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "text-orange-500",
    },
    {
      title: "Account Issues",
      value: "1",
      icon: <LockKeyhole className="h-5 w-5" />,
      color: "text-red-500",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Parent":
        return "bg-blue-500";
      case "Teacher":
        return "bg-purple-500";
      case "Student":
        return "bg-teal-500";
      case "Institute Admin":
        return "bg-yellow-600";
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

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleNewUserChange = (field: string, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.institute ||
      !newUser.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId = `USR-${String(users.length + 1).padStart(3, "0")}`;
    const user = {
      id: newId,
      ...newUser,
      joinedDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
      totalTickets: 0,
      openTickets: 0,
      accountIssues: 0,
      paymentIssues: 0,
    };

    setUsers((prevUsers) => [user, ...prevUsers]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      location: "",
      institute: "",
      status: "Active",
      role: "Parent",
    });
    setIsCreateDialogOpen(false);
  };

  const handleUserAction = (user: any, action: string) => {
    setSelectedUser(user);
    setSelectedAction(action);
    setIsActionDialogOpen(true);
  };

  const confirmUserAction = () => {
    if (!selectedUser) return;

    switch (selectedAction) {
      case "reset-password":
        toast({
          title: "Password Reset",
          description: `Password reset link sent to ${selectedUser.email}`,
        });
        break;
      default:
        break;
    }

    setIsActionDialogOpen(false);
    setSelectedUser(null);
    setSelectedAction("");
  };

  const getActionDialogContent = () => {
    if (!selectedUser) return null;

    switch (selectedAction) {
      case "view":
        return (
          <>
            <DialogHeader>
              <DialogTitle>User Details - {selectedUser.name}</DialogTitle>
              <DialogDescription>
                Full information about the user
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-semibold">ID:</span> {selectedUser.id}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedUser.phone}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {selectedUser.location}
              </div>
              <div>
                <span className="font-semibold">Institute:</span>{" "}
                {selectedUser.institute}
              </div>
              <div>
                <span className="font-semibold">Role:</span> {selectedUser.role}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedUser.status}
              </div>
              <div>
                <span className="font-semibold">Joined Date:</span>{" "}
                {selectedUser.joinedDate}
              </div>
              <div>
                <span className="font-semibold">Last Login:</span>{" "}
                {selectedUser.lastLogin}
              </div>
              <div>
                <span className="font-semibold">Total Tickets:</span>{" "}
                {selectedUser.totalTickets}
              </div>
              <div>
                <span className="font-semibold">Open Tickets:</span>{" "}
                {selectedUser.openTickets}
              </div>
              <div>
                <span className="font-semibold">Account Issues:</span>{" "}
                {selectedUser.accountIssues}
              </div>
              <div>
                <span className="font-semibold">Payment Issues:</span>{" "}
                {selectedUser.paymentIssues}
              </div>
            </div>
          </>
        );
      case "reset-password":
        return (
          <DialogHeader>
            <DialogTitle>Reset Password - {selectedUser.name}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to send a password reset link to{" "}
              {selectedUser.email}?
            </DialogDescription>
          </DialogHeader>
        );
      default:
        return null;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleExportUsers = () => {
    // Convert users data to CSV format
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Location",
      "Institute",
      "Role",
      "Status",
      "Joined Date",
      "Last Login",
      "Total Tickets",
      "Open Tickets",
      "Account Issues",
      "Payment Issues",
    ];
    const csvData = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.location,
      user.institute,
      user.role,
      user.status,
      user.joinedDate,
      user.lastLogin,
      user.totalTickets,
      user.openTickets,
      user.accountIssues,
      user.paymentIssues,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `users_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "User data has been exported to CSV file.",
    });
  };

  const handleViewTickets = (user: any) => {
    toast({
      title: "Viewing Tickets",
      description: `Opening tickets for ${user.name}`,
    });
    // In a real application, this would navigate to a tickets view filtered by user
    console.log(`Viewing tickets for user: ${user.name} (${user.id})`);
  };

  const handleSendEmail = (user: any) => {
    toast({
      title: "Email Client",
      description: `Opening email client for ${user.email}`,
    });
    // In a real application, this would open the default email client
    window.location.href = `mailto:${user.email}`;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">User Support</CardTitle>
          <CardDescription>
            Support for parents, students, teachers, and administrators
          </CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleExportUsers}
          >
            <FileText className="mr-2 h-4 w-4" />
            Export Users
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new user to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      handleNewUserChange("name", e.target.value)
                    }
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      handleNewUserChange("email", e.target.value)
                    }
                    placeholder="e.g., jane.doe@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) =>
                      handleNewUserChange("phone", e.target.value)
                    }
                    placeholder="e.g., +91 9876543210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    id="location"
                    value={newUser.location}
                    onChange={(e) =>
                      handleNewUserChange("location", e.target.value)
                    }
                    placeholder="e.g., Mumbai, Maharashtra"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Institute</label>
                  <Input
                    id="institute"
                    value={newUser.institute}
                    onChange={(e) =>
                      handleNewUserChange("institute", e.target.value)
                    }
                    placeholder="e.g., ABC International School"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) =>
                      handleNewUserChange("role", value)
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Institute Admin">
                        Institute Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value) =>
                      handleNewUserChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users by name, email, institute, or ID..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select value={roleFilter} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Teacher">Teacher</SelectItem>
            <SelectItem value="Student">Student</SelectItem>
            <SelectItem value="Institute Admin">Institute Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {/* Placeholder for user icon/avatar */}
                      <UsersIcon className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <Badge
                          className={`${getStatusColor(
                            user.status
                          )} text-white`}
                        >
                          {user.status}
                        </Badge>
                        <Badge
                          className={`${getRoleColor(user.role)} text-white`}
                        >
                          {user.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          ID: {user.id}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Joined: {user.joinedDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>Last Login: {user.lastLogin}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-1 mt-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>Institute: {user.institute}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                    <Card className="p-3 space-y-1">
                      <div className="text-xl font-bold text-blue-600">
                        {user.totalTickets}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Tickets
                      </div>
                    </Card>
                    <Card className="p-3 space-y-1">
                      <div className="text-xl font-bold text-orange-600">
                        {user.openTickets}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Open Tickets
                      </div>
                    </Card>
                    <Card className="p-3 space-y-1">
                      <div className="text-xl font-bold text-red-600">
                        {user.accountIssues}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Account Issues
                      </div>
                    </Card>
                    <Card className="p-3 space-y-1">
                      <div className="text-xl font-bold text-yellow-600">
                        {user.paymentIssues}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Payment Issues
                      </div>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                      onClick={() => handleViewTickets(user)}
                    >
                      <Ticket className="h-4 w-4" />
                      View Tickets
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                      onClick={() => handleSendEmail(user)}
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="lg:col-span-1 flex flex-col items-end justify-between space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleUserAction(user, "view")}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUserAction(user, "reset-password")}
                      >
                        <KeyRound className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
            {selectedAction === "reset-password" && (
              <Button onClick={confirmUserAction}>Send Reset Link</Button>
            )}
            {selectedAction === "view" && (
              <Button onClick={() => setIsActionDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportUsers;
