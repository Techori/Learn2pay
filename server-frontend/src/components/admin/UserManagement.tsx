import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/DropdownMenu";
import { Search, UserPlus, UserCheck, UserX, Eye, Filter as FilterIcon, Users, Edit, Ban } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  city?: string;
  joinDate?: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({ status: "All", city: "All" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const initialUsers: User[] = [
    { id: 1, name: "Raj Kumar", email: "raj@email.com", role: "Sales Manager", status: "Active", city: "Mumbai", joinDate: "2024-01-15" },
    { id: 2, name: "Priya Sharma", email: "priya@email.com", role: "Sales Team", status: "Active", city: "Delhi", joinDate: "2024-01-10" },
    { id: 3, name: "Amit Singh", email: "amit@email.com", role: "Support Manager", status: "Inactive", city: "Bangalore", joinDate: "2024-01-05" },
    { id: 4, name: "Lakshmi Nair", email: "lakshmi@email.com", role: "Support Team", status: "Active", city: "Chennai", joinDate: "2024-01-20" },
    { id: 5, name: "Rahul Verma", email: "rahul@email.com", role: "Referral Partner", status: "Inactive", city: "Pune", joinDate: "2024-01-18" },
    { id: 6, name: "Sneha Patel", email: "sneha@email.com", role: "Institute Admin", status: "Active", city: "Hyderabad", joinDate: "2024-02-01" },
    { id: 7, name: "Vikram Singh", email: "vikram@email.com", role: "Student", status: "Inactive", city: "Kolkata", joinDate: "2024-02-10" },
  ];
  const [users, setUsers] = useState<User[]>(initialUsers);

  const roles = ["All", "Sales Manager", "Sales Team", "Support Manager", "Support Team", "Referral Partner", "Institute Admin", "Student"];

  // Filter and sort users
  const filteredUsers = users.filter((user) => {
    const matchesRole = activeTab === "All" || user.role === activeTab;
    const matchesSearch = !searchTerm || user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === "All" || user.status === filters.status;
    const matchesCity = !user.city || filters.city === "All" || user.city === filters.city;
    return matchesRole && matchesSearch && matchesStatus && matchesCity;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Inactive': return 'bg-warning text-white';
      case 'Suspended': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  };

  const handleAction = (action: string, user: User) => {
    switch (action) {
      case "Assign Role":
        toast({ title: "Assign Role", description: `Assigning new role to ${user.name}.` });
        break;
      case "Deactivate":
        if (user.status === "Active") {
          setUsers(users.map(u => u.id === user.id ? { ...u, status: "Inactive" } : u));
          toast({ title: "Deactivated", description: `${user.name} has been deactivated.`, variant: "destructive" });
        }
        break;
      case "Reactivate":
        if (user.status === "Inactive") {
          setUsers(users.map(u => u.id === user.id ? { ...u, status: "Active" } : u));
          toast({ title: "Reactivated", description: `${user.name} has been reactivated.` });
        }
        break;
      case "View Profile":
        toast({ title: "View Profile", description: `Viewing profile of ${user.name}.` });
        break;
      case "Ban":
        if (user.status === "Active") {
          setUsers(users.map(u => u.id === user.id ? { ...u, status: "Suspended" } : u));
          toast({ title: "Suspended", description: `${user.name} has been suspended.`, variant: "destructive" });
        } else if (user.status === "Suspended") {
          setUsers(users.map(u => u.id === user.id ? { ...u, status: "Active" } : u));
          toast({ title: "Reactivated", description: `${user.name} has been reactivated.` });
        }
        break;
    }
  };

  const handleAddUser = () => {
    toast({ title: "Add User", description: "User addition feature coming soon!" });
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-text-color">
                <Users className="h-5 w-5 mr-2 text-orange-400" />
                User Management
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Manage all platform users
              </CardDescription>
            </div>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleAddUser}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Actions */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white"
                  >
                    <FilterIcon className="h-4 w-4 mr-2" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, status: "All" })}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, status: "Active" })}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, status: "Inactive" })}>
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, city: "All" })}>
                    All Cities
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, city: "Mumbai" })}>
                    Mumbai
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilters({ ...filters, city: "Delhi" })}>
                    Delhi
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-input-bg border border-card-border rounded-xl p-1 flex flex-wrap gap-2">
              {roles.map((role) => (
                <TabsTrigger
                  key={role}
                  value={role}
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-text-color"
                >
                  {role}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {roles.map((role) => (
              <TabsContent key={role} value={role} className="mt-4">
                <div className="rounded-md border border-card-border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-card-bg">
                      <TableRow className="hover:bg-card-hover border-card-border">
                        <TableHead className="text-text-secondary">Name</TableHead>
                        <TableHead className="text-text-secondary">Email</TableHead>
                        <TableHead className="text-text-secondary">Role</TableHead>
                        <TableHead className="text-text-secondary">Status</TableHead>
                        <TableHead className="text-text-secondary">City</TableHead>
                        <TableHead className="text-text-secondary">Join Date</TableHead>
                        <TableHead className="text-text-secondary">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.filter(user => user.role === role || role === "All").length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-text-secondary">
                            No users found for {role}.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedUsers
                          .filter(user => user.role === role || role === "All")
                          .map((user) => (
                            <TableRow key={user.id} className="hover:bg-card-hover border-card-border">
                              <TableCell>
                                <div className="text-text-secondary">{user.name}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-text-secondary">{user.email}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-text-secondary">{user.role}</div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(user.status)}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-text-secondary">{user.city}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-text-secondary">{user.joinDate}</div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-orange-500 text-text-color hover:bg-warning"
                                    onClick={() => handleAction("View Profile", user)}
                                  >
                                    <Eye className="h-4 w-4 text-text-secondary hover:text-white" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-orange-500 text-text-color hover:bg-warning"
                                    onClick={() => handleAction("Assign Role", user)}
                                  >
                                    <Edit className="h-4 w-4 text-text-secondary hover:text-white" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-orange-500 text-text-color hover:bg-warning"
                                    onClick={() => handleAction("Ban", user)}
                                  >
                                    {user.status === "Active" ? 
                                      <Ban className="h-4 w-4 text-text-secondary hover:text-white" /> : 
                                      <UserCheck className="h-4 w-4 text-text-secondary hover:text-white" />
                                    }
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > pageSize && (
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-text-secondary">
                      Showing {paginatedUsers.length} of {filteredUsers.length} users
                      {filteredUsers.length !== users.length && ` (filtered from ${users.length} total)`}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;