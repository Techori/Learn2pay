import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/DropdownMenu";
import { Search, UserPlus, UserCheck, UserX, Eye, Filter as FilterIcon, Users } from "lucide-react"; // Added Users
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
    return status === "Active" ? "bg-green-600" : "bg-red-600";
  };

  const handleAction = (action: string, user: User) => {
    switch (action) {
      case "Assign Role":
        toast({ title: "Assign Role", description: `Assigning new role to ${user.name}.`, variant: "info" });
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
          toast({ title: "Reactivated", description: `${user.name} has been reactivated.`, variant: "success" });
        }
        break;
      case "View Profile":
        toast({ title: "View Profile", description: `Viewing profile of ${user.name}.`, variant: "info" });
        break;
    }
  };

  const handleAddUser = () => {
    toast({ title: "Add User", description: "User addition feature coming soon!", variant: "info" });
    // Add real implementation (e.g., dialog) as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white">
      <Card className="bg-[#1e293b]/80 border border-[#334155]/50 shadow-lg rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-white flex items-center">
            <Users className="h-8 w-8 mr-2 text-purple-400" /> User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#334155]/50 border border-[#475569]/50 text-white placeholder-gray-400 pl-10 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#475569]/50 text-gray-200 hover:bg-[#334155]/50 flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1e293b] border-[#475569]/50 text-white">
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
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900" onClick={handleAddUser}>
                <UserPlus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-[#334155]/50 border border-[#475569]/50 rounded-xl p-1 flex flex-wrap gap-2">
              {roles.map((role) => (
                <TabsTrigger
                  key={role}
                  value={role}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-800 data-[state=active]:text-white text-gray-300 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#475569]/50"
                >
                  {role}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            {roles.map((role) => (
              <TabsContent key={role} value={role} className="mt-4">
                <Table className="w-full bg-[#1e293b]/80 border border-[#475569]/50 rounded-lg">
                  <TableHeader className="bg-[#334155]">
                    <TableRow>
                      <TableHead className="text-gray-200 font-semibold">Name</TableHead>
                      <TableHead className="text-gray-200 font-semibold">Email</TableHead>
                      <TableHead className="text-gray-200 font-semibold">Role</TableHead>
                      <TableHead className="text-gray-200 font-semibold">Status</TableHead>
                      <TableHead className="text-gray-200 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.filter(user => user.role === role || role === "All").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-400">
                          No users found for {role}.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedUsers
                        .filter(user => user.role === role || role === "All")
                        .map((user) => (
                          <TableRow key={user.id} className="hover:bg-[#334155]/50 transition-colors">
                            <TableCell className="text-gray-200">{user.name}</TableCell>
                            <TableCell className="text-gray-200">{user.email}</TableCell>
                            <TableCell className="text-gray-200">{user.role}</TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(user.status)} text-white px-2 py-1 rounded-full`}>{user.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="border-[#475569]/50 text-gray-200 hover:bg-[#334155]/50 px-2 py-1">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#1e293b] border-[#475569]/50 text-white">
                                  <DropdownMenuItem onClick={() => handleAction("Assign Role", user)}>
                                    <UserCheck className="h-4 w-4 mr-2" /> Assign Role
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAction(user.status === "Active" ? "Deactivate" : "Reactivate", user)}>
                                    {user.status === "Active" ? <UserX className="h-4 w-4 mr-2" /> : <UserCheck className="h-4 w-4 mr-2" />}
                                    {user.status === "Active" ? "Deactivate" : "Reactivate"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAction("View Profile", user)}>
                                    <Eye className="h-4 w-4 mr-2" /> View Profile
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {filteredUsers.length > pageSize && (
                  <div className="flex justify-between items-center mt-4 text-gray-300">
                    <span>Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-[#475569]/50 hover:bg-[#334155]/50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#475569]/50 hover:bg-[#334155]/50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
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