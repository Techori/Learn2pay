import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Users,
  UserCheck,
  UserCog,
  UserX,
  Plus,
  Eye,
  Pencil,
  ShieldOff,
  Ban,
  Search,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface InstituteUser {
  _id: string;
  name: string;
  email: string;
  contact?: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
  createdAt: string;
  permissions: string;
}

interface NewUser {
  name: string;
  email: string;
  contact: string;
  password: string;
  role: string;
  permissions: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showViewUserDialog, setShowViewUserDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<InstituteUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "",
    permissions: "",
  });

  const [systemUsersData, setSystemUsersData] = useState<InstituteUser[]>([]);

  // Fetch institute users on component mount
  useEffect(() => {
    fetchInstituteUsers();
  }, []);

  const fetchInstituteUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/institute-users`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setSystemUsersData(response.data.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch institute users",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching institute users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch institute users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const userSummary = [
    {
      icon: Users,
      title: "Total Users",
      value: systemUsersData.length.toString(),
      color: "text-blue-400",
    },
    {
      icon: UserCheck,
      title: "Active Users",
      value: systemUsersData
        .filter((user) => user.status === "Active")
        .length.toString(),
      color: "text-green-400",
    },
    {
      icon: UserCog,
      title: "Admin Roles",
      value: systemUsersData
        .filter((user) => user.role === "Principal")
        .length.toString(),
      color: "text-purple-400",
    },
    {
      icon: UserX,
      title: "Inactive Users",
      value: systemUsersData
        .filter((user) => user.status === "Inactive")
        .length.toString(),
      color: "text-orange-400",
    },
  ];

  const validateUserData = (user: NewUser): boolean => {
    console.log("validateUserData: Validating user:", user);
    if (!user.name || !user.email || !user.contact || !user.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      console.log("validateUserData: Missing required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      console.log("validateUserData: Invalid email address.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(user.contact)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      console.log("validateUserData: Invalid phone number.");
      return false;
    }

    console.log("validateUserData: Validation successful.");
    return true;
  };

  const handleAddUser = async () => {
    console.log("handleAddUser called.");
    console.log("handleAddUser: Current newUser state:", newUser);

    if (!validateUserData(newUser)) {
      console.log("handleAddUser: Validation failed, returning.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/institute-users`, {
        name: newUser.name,
        email: newUser.email,
        contact: newUser.contact,
        password: newUser.password,
        role: newUser.role,
        permissions: newUser.permissions || "Basic Access",
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        await fetchInstituteUsers(); // Refresh the list
        setShowAddUserDialog(false);
        setNewUser({ name: "", email: "", contact: "", password: "", role: "", permissions: "" });
        
        toast({
          title: "Success", 
          description: "User added successfully",
        });
        console.log("handleAddUser: User added successfully:", response.data.data);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to add user",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
      const errorMessage = error.response?.data?.message || "Failed to add user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("handleAddUser: Loading state set to false.");
    }
  };

  const handleEditUser = (user: InstituteUser) => {
    console.log("handleEditUser: Editing user:", user);
    setSelectedUser(user);
    setShowEditUserDialog(true);
  };

  const handleViewUser = (user: InstituteUser) => {
    console.log("handleViewUser: Viewing user:", user);
    setSelectedUser(user);
    setShowViewUserDialog(true);
  };

  const handleManagePermissions = (user: InstituteUser) => {
    console.log(
      "handleManagePermissions: Managing permissions for user:",
      user
    );
    setSelectedUser(user);
    setShowPermissionsDialog(true);
  };

  const handleDeleteUser = (user: InstituteUser) => {
    console.log("handleDeleteUser: Deleting user:", user);
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDeleteUser = async () => {
    console.log("confirmDeleteUser: Confirming delete for user:", selectedUser);
    if (!selectedUser) {
      console.log("confirmDeleteUser: No user selected for deletion.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/institute-users/${selectedUser._id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        await fetchInstituteUsers(); // Refresh the list
        setShowDeleteDialog(false);
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        console.log("confirmDeleteUser: User deleted successfully:", selectedUser);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to delete user",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.message || "Failed to delete user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (user: InstituteUser) => {
    console.log("handleToggleUserStatus: Toggling status for user:", user);
    if (!user) {
      console.log("handleToggleUserStatus: No user provided.");
      return;
    }

    try {
      setIsLoading(true);
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/institute-users/${user._id}/status`, {
        status: newStatus
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        await fetchInstituteUsers(); // Refresh the list
        toast({
          title: "Success",
          description: `User ${user.status === "Active" ? "deactivated" : "activated"} successfully`,
        });
        console.log(`handleToggleUserStatus: User ${user._id} status toggled to ${newStatus}`);
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to update user status",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("handleToggleUserStatus: Failed to update user status:", error);
      const errorMessage = error.response?.data?.message || "Failed to update user status";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log("handleToggleUserStatus: Loading state set to false.");
    }
  };

  const filteredUsers = systemUsersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" ? true : user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-400">
            Manage system users and their permissions
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
          onClick={() => {
            console.log("UI: Add New User button clicked.");
            setShowAddUserDialog(true);
            setNewUser({
              name: "",
              email: "",
              contact: "",
              password: "",
              role: "",
              permissions: "",
            });
          }}
          disabled={isLoading}
        >
          <Plus className="h-5 w-5" />
          <span>Add New User</span>
        </Button>
      </div>

      {/* User Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {userSummary.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md"
          >
            <CardContent className="p-5 flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${item.color.replace(
                  "text",
                  "bg"
                )}/20`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold ">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Users Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg">System Users</CardTitle>
            <p className="text-gray-400 text-sm">
              Manage all users with access to the system
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                type="text"
                placeholder="Search users by name, email, or role..."
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 pl-10"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
            <div className="flex space-x-2">
              <Select
                value={roleFilter}
                onValueChange={(value: string) => setRoleFilter(value)}
              >
                <SelectTrigger className="w-[180px] bg-white text-gray-900  dark:bg-gray-900 dark:text-white border-gray-700">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Accountant">Accountant</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Office Staff">Office Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value: string) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px] bg-white text-gray-900  dark:bg-gray-900 dark:text-white border-gray-700">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-400 dark:bg-gray-900">
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Last Login
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      Loading institute users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700"
                  >
                    <td className="px-4 py-3 text-sm ">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm ">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm ">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : "destructive"
                        }
                        className="capitalize"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm ">
                      {user.lastLogin}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                          className="text-gray-400 "
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-gray-400 "
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleManagePermissions(user)}
                          className="text-gray-400 "
                        >
                          <ShieldOff className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleUserStatus(user)}
                          className="text-gray-400 "
                        >
                          {user.status === "Active" ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to add a new user to the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Enter full name"
                value={newUser.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={newUser.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Contact
              </label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter contact number"
                value={newUser.contact}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, contact: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Role</label>
              <Select 
                value={newUser.role}
                onValueChange={(value: string) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger className="bg-white text-gray-900 border-gray-700 dark:bg-gray-900 dark:text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                  <SelectItem value="Principal">Principal</SelectItem>
                  <SelectItem value="Accountant">Accountant</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Office Staff">Office Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Permissions
              </label>
              <Select
                value={newUser.permissions}
                onValueChange={(value: string) =>
                  setNewUser({ ...newUser, permissions: value })
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Fee Management, Reports">
                    Fee Management, Reports
                  </SelectItem>
                  <SelectItem value="Student Management, Attendance">
                    Student Management, Attendance
                  </SelectItem>
                  <SelectItem value="Basic Access">Basic Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Add User dialog Cancel button clicked.");
                setShowAddUserDialog(false);
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Add User dialog Add User button clicked.");
                handleAddUser();
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={showViewUserDialog} onOpenChange={setShowViewUserDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Name</p>
                  <p className="text-white">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Contact</p>
                  <p className="text-white">{selectedUser.contact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Role</p>
                  <p className="text-white">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Status</p>
                  <Badge
                    variant={
                      selectedUser.status === "Active"
                        ? "default"
                        : "destructive"
                    }
                    className="capitalize"
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    Last Login
                  </p>
                  <p className="text-white">{selectedUser.lastLogin}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-400">
                    Permissions
                  </p>
                  <p className="text-white">{selectedUser.permissions}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("View User dialog Close button clicked.");
                setShowViewUserDialog(false);
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Delete User dialog Cancel button clicked.");
                setShowDeleteDialog(false);
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Delete User dialog Delete User button clicked.");
                confirmDeleteUser();
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Edit the details of the selected user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Name
                </label>
                <Input
                  id="edit-name"
                  type="text"
                  value={selectedUser.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 "
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Contact
                </label>
                <Input
                  id="edit-contact"
                  type="tel"
                  value={selectedUser.contact}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedUser({
                      ...selectedUser,
                      contact: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 "
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Role
                </label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value: string) =>
                    setSelectedUser({ ...selectedUser, role: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Accountant">Accountant</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Office Staff">Office Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Permissions
                </label>
                <Select
                  value={selectedUser.permissions}
                  onValueChange={(value: string) =>
                    setSelectedUser({ ...selectedUser, permissions: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Access">Full Access</SelectItem>
                    <SelectItem value="Fee Management, Reports">
                      Fee Management, Reports
                    </SelectItem>
                    <SelectItem value="Student Management, Attendance">
                      Student Management, Attendance
                    </SelectItem>
                    <SelectItem value="Basic Access">Basic Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Edit User dialog Cancel button clicked.");
                setShowEditUserDialog(false);
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Edit User dialog Save Changes button clicked.");
                if (selectedUser) {
                  setIsLoading(true);
                  try {
                    setSystemUsersData(
                      systemUsersData.map((u) =>
                        u._id === selectedUser._id ? selectedUser : u
                      )
                    );
                    setShowEditUserDialog(false);
                    toast({
                      title: "Success",
                      description: "User updated successfully",
                    });
                    console.log(
                      "Edit User: User updated successfully:",
                      selectedUser
                    );
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to update user",
                      variant: "destructive",
                    });
                    console.error("Edit User: Failed to update user:", error);
                  } finally {
                    setIsLoading(false);
                    console.log("Edit User: Loading state set to false.");
                  }
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Permissions Dialog */}
      <Dialog
        open={showPermissionsDialog}
        onOpenChange={setShowPermissionsDialog}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update permissions for the selected user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  User:
                </label>
                <p className="text-white font-semibold">
                  {selectedUser.name} ({selectedUser.role})
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Current Permissions:
                </label>
                <Select
                  value={selectedUser.permissions}
                  onValueChange={(value: string) =>
                    setSelectedUser({ ...selectedUser, permissions: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Access">Full Access</SelectItem>
                    <SelectItem value="Fee Management, Reports">
                      Fee Management, Reports
                    </SelectItem>
                    <SelectItem value="Student Management, Attendance">
                      Student Management, Attendance
                    </SelectItem>
                    <SelectItem value="Basic Access">Basic Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Manage Permissions dialog Cancel button clicked.");
                setShowPermissionsDialog(false);
              }}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(
                  "Manage Permissions dialog Update Permissions button clicked."
                );
                if (selectedUser) {
                  setIsLoading(true);
                  try {
                    setSystemUsersData(
                      systemUsersData.map((u) =>
                        u._id === selectedUser._id ? selectedUser : u
                      )
                    );
                    setShowPermissionsDialog(false);
                    toast({
                      title: "Success",
                      description: "Permissions updated successfully",
                    });
                    console.log(
                      "Manage Permissions: Permissions updated successfully:",
                      selectedUser
                    );
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to update permissions",
                      variant: "destructive",
                    });
                    console.error(
                      "Manage Permissions: Failed to update permissions:",
                      error
                    );
                  } finally {
                    setIsLoading(false);
                    console.log(
                      "Manage Permissions: Loading state set to false."
                    );
                  }
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Permissions"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
