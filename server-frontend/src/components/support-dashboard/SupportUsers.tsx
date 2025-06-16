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
  Filter,
  ArrowUpDown,
  UserPlus,
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

  const handleUserClick = (userId: string) => {
    // Navigate to user details page
    console.log(`Navigating to user ${userId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Support Users</CardTitle>
          <CardDescription className="text-gray-400">
            Manage support team members and their assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
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
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 pb-2 border-b border-gray-700">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-1">Assigned</div>
              <div className="col-span-1">Resolved</div>
              <div className="col-span-2">Status</div>
            </div>

            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 items-center py-3 px-2 border border-gray-700 rounded-lg hover:bg-slate-700/50 cursor-pointer"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="col-span-3">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">ID: {user.id}</p>
                </div>
                <div className="col-span-3 text-gray-300">{user.email}</div>
                <div className="col-span-2">
                  <Badge className={`${getRoleColor(user.role)} text-white`}>
                    {user.role}
                  </Badge>
                </div>
                <div className="col-span-1 text-gray-300">
                  {user.totalTickets}
                </div>
                <div className="col-span-1 text-gray-300">
                  {user.openTickets}
                </div>
                <div className="col-span-2">
                  <Badge
                    className={`${getStatusColor(user.status)} text-white`}
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
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
