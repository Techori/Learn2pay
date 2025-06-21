import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, UserPlus, Ban, MessageSquare, Eye, Edit, Trash2, Users, UserCheck, UserX, Download, Upload } from 'lucide-react';
import SearchAndFilter from "../shared/SearchAndFilter";
import { useToast } from "../../hooks/use-toast";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/Dialog";
import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/Textarea";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  status: string;
  joinDate: string;
  referredBy: string;
  lastLogin: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  referredBy: string;
}

interface BulkNotifyData {
  title: string;
  message: string;
  userRoles: string[];
  includeSMS: boolean;
  includeEmail: boolean;
  includeApp: boolean;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Raj Kumar",
      email: "raj@email.com",
      phone: "9876543210",
      role: "Customer",
      city: "Mumbai",
      status: "Active",
      joinDate: "2024-01-15",
      referredBy: "Priya Sharma",
      lastLogin: "2 hours ago"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "9876543211",
      role: "Vendor",
      city: "Delhi",
      status: "Suspicious",
      joinDate: "2024-01-10",
      referredBy: "Direct",
      lastLogin: "1 day ago"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@email.com",
      phone: "9876543212",
      role: "Franchise",
      city: "Bangalore",
      status: "Blacklisted",
      joinDate: "2024-01-05",
      referredBy: "Rakesh Kumar",
      lastLogin: "5 days ago"
    },
    {
      id: 4,
      name: "Lakshmi Nair",
      email: "lakshmi@email.com",
      phone: "9876543213",
      role: "Customer",
      city: "Chennai",
      status: "Active",
      joinDate: "2024-01-20",
      referredBy: "Direct",
      lastLogin: "5 hours ago"
    },
    {
      id: 5,
      name: "Rahul Verma",
      email: "rahul@email.com",
      phone: "9876543214",
      role: "Institute",
      city: "Pune",
      status: "Active",
      joinDate: "2024-01-18",
      referredBy: "Amit Singh",
      lastLogin: "12 hours ago"
    }
  ]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isBulkNotifyOpen, setIsBulkNotifyOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
    city: '',
    referredBy: 'Direct'
  });
  const [bulkNotifyData, setBulkNotifyData] = useState<BulkNotifyData>({
    title: '',
    message: '',
    userRoles: ['Customer', 'Vendor', 'Franchise', 'Institute'],
    includeSMS: true,
    includeEmail: true,
    includeApp: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [fileUploadRef] = useState(React.createRef<HTMLInputElement>());
  
  // Update filtered users when search term or filters change
  useEffect(() => {
    let filtered = [...users];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }
    
    // Apply other filters
    if (filters.role && filters.role !== 'all') {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }
    
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(user => user.city === filters.city);
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, filters, users]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Suspicious': return 'bg-yellow-500 text-white';
      case 'Blacklisted': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const filterOptions = [
    {
      key: 'role',
      label: 'Role',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'Customer', label: 'Customer' },
        { value: 'Vendor', label: 'Vendor' },
        { value: 'Franchise', label: 'Franchise' },
        { value: 'Institute', label: 'Institute' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Active', label: 'Active' },
        { value: 'Suspicious', label: 'Suspicious' },
        { value: 'Blacklisted', label: 'Blacklisted' }
      ]
    },
    {
      key: 'city',
      label: 'City',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Cities' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Pune', label: 'Pune' }
      ]
    }
  ];
  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };
  
  const handleFilter = (appliedFilters: Record<string, string>) => {
    setFilters(appliedFilters);
    setCurrentPage(1);
  };
  
  const handleAddUser = () => {
    setIsAddUserOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBulkNotifyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setBulkNotifyData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'userRoles') {
      // Handle multiple select for user roles
      const options = (e.target as HTMLSelectElement).options;
      const selectedRoles: string[] = [];
      
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedRoles.push(options[i].value);
        }
      }
      
      setBulkNotifyData(prev => ({ ...prev, userRoles: selectedRoles }));
    } else {
      setBulkNotifyData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(...users.map(i => i.id)) + 1;
    
    // Create new user object
    const newUser: User = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      city: formData.city,
      status: 'Active', // Default to active
      joinDate: new Date().toISOString().split('T')[0], // Today's date
      referredBy: formData.referredBy,
      lastLogin: 'Just now'
    };
    
    // Add to users array
    setUsers(prev => [newUser, ...prev]);
    
    // Close the dialog and reset form
    setIsAddUserOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Customer',
      city: '',
      referredBy: 'Direct'
    });
    
    // Show success notification
    toast({
      title: "User Added",
      description: `${formData.name} has been successfully added to the platform.`,
    });
  };

  const handleBulkNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Close dialog
    setIsBulkNotifyOpen(false);
    
    // Determine message channels
    const channels = [];
    if (bulkNotifyData.includeApp) channels.push('App');
    if (bulkNotifyData.includeEmail) channels.push('Email');
    if (bulkNotifyData.includeSMS) channels.push('SMS');
    
    // Show success notification
    toast({
      title: "Bulk Notification Sent",
      description: `Notification "${bulkNotifyData.title}" sent to ${bulkNotifyData.userRoles.join(', ')} users via ${channels.join(', ')}.`,
    });
    
    // Reset form data
    setBulkNotifyData({
      title: '',
      message: '',
      userRoles: ['Customer', 'Vendor', 'Franchise', 'Institute'],
      includeSMS: true,
      includeEmail: true,
      includeApp: true
    });
  };

  const handleBulkNotify = () => {
    setIsBulkNotifyOpen(true);
  };
  
  const handleExport = () => {
    // Create PDF document
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(16);
    doc.text("Learn2Pay - Users Report", 14, 22);
    
    // Add timestamp and filters
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Filters applied: ${Object.keys(filters).length > 0 ? 
      Object.entries(filters).map(([key, value]) => `${key}: ${value}`).join(', ') : 
      'None'}`, 14, 36);
    
    // Prepare table data
    const tableData = filteredUsers.map(user => [
      user.id.toString(),
      user.name,
      user.email,
      user.phone,
      user.role,
      user.city,
      user.status,
      user.joinDate,
      user.referredBy,
      user.lastLogin
    ]);
    
    // Create table
    autoTable(doc, {
      startY: 45,
      head: [['ID', 'Name', 'Email', 'Phone', 'Role', 'City', 'Status', 'Join Date', 'Referred By', 'Last Login']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      didDrawPage: (data) => {
        // Footer with page number
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(10);
        
        // Fixed type issues with jsPDF internal methods
        const pageNumber = (doc as any).internal.getCurrentPageInfo().pageNumber;
        const totalPages = (doc as any).internal.getNumberOfPages();
        doc.text(`Page ${pageNumber} of ${totalPages}`, pageSize.width / 2, pageHeight - 10, { align: 'center' });
      }
    });
    
    // Save the PDF
    doc.save(`learn2pay-users-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    
    toast({
      title: "Export Completed",
      description: "Users report has been downloaded as PDF."
    });
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const handleAction = (action: string, user: User) => {
    toast({
      title: `${action} User`,
      description: `${action} action triggered for ${user.name}`
    });
  };

  const handleBulkUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you would handle file processing here
      // For now, we'll just show a toast notification
      toast({
        title: "File Uploaded",
        description: `${file.name} uploaded successfully. Processing user data...`,
      });
      
      // Simulate processing delay
      setTimeout(() => {
        toast({
          title: "Users Imported",
          description: `15 new users were successfully imported from ${file.name}.`,
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-blue-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">45,678</p>
              <p className="text-sm text-gray-400">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center">
            <UserCheck className="h-8 w-8 text-green-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">42,156</p>
              <p className="text-sm text-gray-400">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center">
            <UserX className="h-8 w-8 text-red-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-sm text-gray-400">Blacklisted</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-yellow-400 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">3,433</p>
              <p className="text-sm text-gray-400">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Panel */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-400">Manage all platform users with 360° control</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleAddUser}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handleBulkUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handleBulkNotify}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Bulk Notify
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6">
            <SearchAndFilter
              searchPlaceholder="Search users by name, email, phone..."
              filterOptions={filterOptions}
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
          </div>

          {/* Users Table */}
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="hover:bg-gray-800/80 border-gray-700">
                  <TableHead className="text-gray-200">User Details</TableHead>
                  <TableHead className="text-gray-200">Role & City</TableHead>
                  <TableHead className="text-gray-200">Status</TableHead>
                  <TableHead className="text-gray-200">Referred By</TableHead>
                  <TableHead className="text-gray-200">Last Login</TableHead>
                  <TableHead className="text-gray-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow className="hover:bg-gray-800/50 border-gray-700">
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No users found matching the search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-800/50 border-gray-700">
                      <TableCell className="text-gray-200">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                          <div className="text-sm text-gray-400">{user.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div>
                          <Badge variant="outline" className="border-gray-600 text-gray-200">{user.role}</Badge>
                          <div className="text-sm text-gray-400 mt-1">{user.city}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="text-sm">{user.referredBy}</div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="text-sm">{user.lastLogin}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('View', user)}
                          >
                            <Eye className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('Edit', user)}
                          >
                            <Edit className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('Block', user)}
                          >
                            <Ban className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('Delete', user)}
                          >
                            <Trash2 className="h-3 w-3 text-gray-200" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination info */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-400">
              Showing {paginatedUsers.length} of {filteredUsers.length} users
              {filteredUsers.length !== users.length && ` (filtered from ${users.length} total)`}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-slate-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add New User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to register a new user on Learn2Pay
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-300">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-gray-300">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right text-gray-300">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded-md h-9 px-3"
                  required
                >
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Institute">Institute</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right text-gray-300">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="referredBy" className="text-right text-gray-300">Referred By</Label>
                <Input
                  id="referredBy"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <DialogFooter className="bg-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)} className="border-gray-700 text-gray-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Add User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Bulk Notification Dialog */}
      <Dialog open={isBulkNotifyOpen} onOpenChange={setIsBulkNotifyOpen}>
        <DialogContent className="bg-slate-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Send Bulk Notification</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create and send a notification to multiple users at once
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBulkNotifySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-gray-300">Notification Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={bulkNotifyData.title}
                  onChange={handleBulkNotifyChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right text-gray-300 pt-2">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={bulkNotifyData.message}
                  onChange={handleBulkNotifyChange}
                  className="col-span-3 min-h-[100px] bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="userRoles" className="text-right text-gray-300">Target User Roles</Label>
                <select
                  id="userRoles"
                  name="userRoles"
                  value={bulkNotifyData.userRoles}
                  onChange={handleBulkNotifyChange}
                  className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded-md min-h-[80px] px-3"
                  multiple
                  required
                >
                  <option value="Customer">Customer</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Institute">Institute</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-gray-300">Notification Channels</Label>
                <div className="col-span-3 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeSMS"
                      name="includeSMS"
                      checked={bulkNotifyData.includeSMS}
                      onChange={handleBulkNotifyChange}
                      className="bg-gray-700 border-gray-600"
                    />
                    <Label htmlFor="includeSMS" className="text-gray-300">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeEmail"
                      name="includeEmail"
                      checked={bulkNotifyData.includeEmail}
                      onChange={handleBulkNotifyChange}
                      className="bg-gray-700 border-gray-600"
                    />
                    <Label htmlFor="includeEmail" className="text-gray-300">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeApp"
                      name="includeApp"
                      checked={bulkNotifyData.includeApp}
                      onChange={handleBulkNotifyChange}
                      className="bg-gray-700 border-gray-600"
                    />
                    <Label htmlFor="includeApp" className="text-gray-300">In-App Notification</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="bg-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsBulkNotifyOpen(false)} className="border-gray-700 text-gray-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Send Notification
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hidden file input for bulk upload */}
      <input
        type="file"
        ref={fileUploadRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
};

export default UserManagement;
