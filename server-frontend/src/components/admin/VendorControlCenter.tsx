import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Store, Plus, Eye, Edit, Ban, CheckCircle, XCircle, Star, TrendingUp, Download } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "../../components/ui/Dialog";
import { Label } from "../../components/ui/Label";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

// Vendor interface
interface Vendor {
  id: number;
  name: string;
  owner: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  status: string;
  rating: number;
  revenue: number;
  subscriptionPlan: string;
  joinDate: string;
}

// Filter state interface
interface FilterState {
  category: string;
  status: string;
  plan: string;
}

const VendorControlCenter = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    status: 'all',
    plan: 'all'
  });
  const [showAddVendorDialog, setShowAddVendorDialog] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showPlanFilter, setShowPlanFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  
  // New vendor form state
  const [newVendor, setNewVendor] = useState({
    name: '',
    owner: '',
    category: '',
    location: '',
    phone: '',
    email: '',
    subscriptionPlan: 'Basic'
  });

  // Mock vendor data
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 1,
      name: "Tech Solutions Pvt Ltd",
      owner: "Rajesh Kumar",
      category: "Software Services",
      location: "Mumbai",
      phone: "9876543210",
      email: "info@techsolutions.com",
      status: "Active",
      rating: 4.8,
      revenue: 125000,
      subscriptionPlan: "Premium",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "EduTech Innovations",
      owner: "Priya Sharma",
      category: "Educational Tools",
      location: "Delhi",
      phone: "9876543211",
      email: "contact@edutech.com",
      status: "Pending",
      rating: 4.5,
      revenue: 85000,
      subscriptionPlan: "Basic",
      joinDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Smart Learning Hub",
      owner: "Amit Singh",
      category: "Content Creation",
      location: "Bangalore",
      phone: "9876543212",
      email: "hello@smartlearning.com",
      status: "Suspended",
      rating: 3.2,
      revenue: 45000,
      subscriptionPlan: "Standard",
      joinDate: "2024-01-10"
    },
    {
      id: 4,
      name: "Digital Classrooms Ltd",
      owner: "Neha Gupta",
      category: "Educational Tools",
      location: "Chennai",
      phone: "9876543213",
      email: "info@digitalclassrooms.com",
      status: "Active",
      rating: 4.6,
      revenue: 95000,
      subscriptionPlan: "Premium",
      joinDate: "2024-01-05"
    },
    {
      id: 5,
      name: "LearnFirst Technologies",
      owner: "Sanjay Patel",
      category: "Software Services",
      location: "Hyderabad",
      phone: "9876543214",
      email: "hello@learnfirst.com",
      status: "Active",
      rating: 4.2,
      revenue: 75000,
      subscriptionPlan: "Standard",
      joinDate: "2024-01-12"
    }
  ]);
  
  // Filtered vendors state
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);
  
  // Apply filters and search
  useEffect(() => {
    let filtered = [...vendors];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.phone.includes(searchTerm)
      );
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(vendor => vendor.category === filters.category);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(vendor => vendor.status === filters.status);
    }
    
    // Apply plan filter
    if (filters.plan !== 'all') {
      filtered = filtered.filter(vendor => vendor.subscriptionPlan === filters.plan);
    }
    
    setFilteredVendors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, vendors]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredVendors.length / pageSize);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Pending': return 'bg-yellow-500 text-white';
      case 'Suspended': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'bg-purple-500 text-white';
      case 'Standard': return 'bg-blue-500 text-white';
      case 'Basic': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  // Handle Add Vendor
  const handleAddVendor = () => {
    if (!newVendor.name || !newVendor.owner || !newVendor.category || !newVendor.location || !newVendor.phone || !newVendor.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const vendor: Vendor = {
      id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1,
      name: newVendor.name,
      owner: newVendor.owner,
      category: newVendor.category,
      location: newVendor.location,
      phone: newVendor.phone,
      email: newVendor.email,
      status: 'Pending',
      rating: 0,
      revenue: 0,
      subscriptionPlan: newVendor.subscriptionPlan,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setVendors(prev => [...prev, vendor]);
    setNewVendor({
      name: '',
      owner: '',
      category: '',
      location: '',
      phone: '',
      email: '',
      subscriptionPlan: 'Basic'
    });
    setShowAddVendorDialog(false);
    toast({
      title: "Vendor Added",
      description: "New vendor has been added successfully and is pending approval."
    });
  };
  
  // Handle Export Vendors
  const handleExportVendors = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Learn2Pay - Vendor Report", 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    let filterText = "Filters applied: ";
    if (filters.category !== 'all') filterText += `Category: ${filters.category}, `;
    if (filters.status !== 'all') filterText += `Status: ${filters.status}, `;
    if (filters.plan !== 'all') filterText += `Plan: ${filters.plan}, `;
    if (filterText === "Filters applied: ") filterText += "None";
    else filterText = filterText.slice(0, -2);
    
    doc.text(filterText, 14, 36);
    
    const tableData = filteredVendors.map(vendor => [
      vendor.name,
      vendor.owner,
      vendor.category,
      vendor.location,
      vendor.phone,
      vendor.email,
      vendor.status,
      vendor.rating.toString(),
      `₹${vendor.revenue.toLocaleString()}`,
      vendor.subscriptionPlan,
      vendor.joinDate
    ]);
    
    autoTable(doc, {
      startY: 45,
      head: [['Name', 'Owner', 'Category', 'Location', 'Phone', 'Email', 'Status', 'Rating', 'Revenue', 'Plan', 'Join Date']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      didDrawPage: (data) => {
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(10);
        const pageNumber = (doc as any).internal.getCurrentPageInfo().pageNumber;
        const totalPages = (doc as any).internal.getNumberOfPages();
        doc.text(`Page ${pageNumber} of ${totalPages}`, pageSize.width / 2, pageHeight - 10, { align: 'center' });
      }
    });
    
    doc.save(`learn2pay-vendor-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    toast({
      title: "Export Completed",
      description: "Vendor report has been downloaded as PDF."
    });
  };
  
  // Handle Vendor Actions
  const handleViewVendor = (vendor: Vendor) => {
    toast({
      title: "View Vendor",
      description: `Viewing details for ${vendor.name}`
    });
  };
  
  const handleEditVendor = (vendor: Vendor) => {
    toast({
      title: "Edit Vendor",
      description: `Editing ${vendor.name}`
    });
  };
  
  const handleApproveVendor = (vendor: Vendor) => {
    setVendors(prev => 
      prev.map(v => 
        v.id === vendor.id ? { ...v, status: 'Active' } : v
      )
    );
    toast({
      title: "Vendor Approved",
      description: `${vendor.name} has been approved and is now active.`
    });
  };
  
  const handleRejectVendor = (vendor: Vendor) => {
    setVendors(prev => 
      prev.map(v => 
        v.id === vendor.id ? { ...v, status: 'Suspended' } : v
      )
    );
    toast({
      title: "Vendor Rejected",
      description: `${vendor.name} has been rejected.`
    });
  };
  
  const handleToggleVendorStatus = (vendor: Vendor) => {
    const newStatus = vendor.status === 'Active' ? 'Suspended' : 'Active';
    setVendors(prev => 
      prev.map(v => 
        v.id === vendor.id ? { ...v, status: newStatus } : v
      )
    );
    toast({
      title: `Vendor ${newStatus === 'Active' ? 'Activated' : 'Suspended'}`,
      description: `${vendor.name} has been ${newStatus === 'Active' ? 'activated' : 'suspended'}.`
    });
  };
  
  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
  
  // Handle filter changes
  const handleCategoryFilterChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };
  
  const handleStatusFilterChange = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };
  
  const handlePlanFilterChange = (plan: string) => {
    setFilters(prev => ({ ...prev, plan }));
  };

  return (
    <div className="space-y-6 bg-[#0B0F1A] p-6 text-white min-h-screen">
      {/* Vendor Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">156</div>
            <div className="text-sm text-gray-400">Total Vendors</div>
            <div className="text-xs text-red-400">+12 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">142</div>
            <div className="text-sm text-gray-400">Active Vendors</div>
            <div className="text-xs text-yellow-400">91% active rate</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">₹12.5L</div>
            <div className="text-sm text-gray-400">Total Revenue</div>
            <div className="text-xs text-blue-400">This month</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">4.6</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
            <div className="text-xs text-green-400">⭐ Excellent</div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Management Panel */}
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">
                <Store className="h-5 w-5 mr-2 text-orange-400" />
                Vendor Control Center
              </CardTitle>
              <CardDescription className="text-gray-400">Manage all platform vendors and their services</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowAddVendorDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </Button>
              <Button 
                variant="outline"
                className="text-white border-gray-600"
                onClick={handleExportVendors}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Vendors
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search vendors..."
                className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Category Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.category}
                onChange={(e) => handleCategoryFilterChange(e.target.value)}
              >
                <option value="all">Category</option>
                <option value="Software Services">Software Services</option>
                <option value="Educational Tools">Educational Tools</option>
                <option value="Content Creation">Content Creation</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.status}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
              >
                <option value="all">Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Plan Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.plan}
                onChange={(e) => handlePlanFilterChange(e.target.value)}
              >
                <option value="all">Plan</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Basic">Basic</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Vendors Table */}
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="hover:bg-gray-800/80 border-gray-700">
                  <TableHead className="text-gray-200">Vendor Details</TableHead>
                  <TableHead className="text-gray-200">Owner & Contact</TableHead>
                  <TableHead className="text-gray-200">Performance</TableHead>
                  <TableHead className="text-gray-200">Revenue</TableHead>
                  <TableHead className="text-gray-200">Status & Plan</TableHead>
                  <TableHead className="text-gray-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVendors.length === 0 ? (
                  <TableRow className="hover:bg-gray-800/50 border-gray-700">
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No vendors found matching the search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedVendors.map((vendor) => (
                    <TableRow key={vendor.id} className="hover:bg-gray-800/50 border-gray-700">
                      <TableCell className="text-gray-200">
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-gray-400">{vendor.category} • {vendor.location}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div>
                          <div className="font-medium">{vendor.owner}</div>
                          <div className="text-sm text-gray-400">{vendor.phone}</div>
                          <div className="text-sm text-gray-400">{vendor.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium">{vendor.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="font-semibold">₹{vendor.revenue.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getStatusColor(vendor.status)}>
                            {vendor.status}
                          </Badge>
                          <Badge className={getPlanColor(vendor.subscriptionPlan)} variant="outline">
                            {vendor.subscriptionPlan}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-white border-orange-500"
                            onClick={() => handleViewVendor(vendor)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-white border-orange-500"
                            onClick={() => handleEditVendor(vendor)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          {vendor.status === 'Pending' && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleApproveVendor(vendor)}
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => handleRejectVendor(vendor)}
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-white border-orange-500"
                            onClick={() => handleToggleVendorStatus(vendor)}
                          >
                            <Ban className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Showing {paginatedVendors.length} of {filteredVendors.length} vendors
              {filteredVendors.length !== vendors.length && 
                ` (filtered from ${vendors.length} total)`
              }
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-gray-600"
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                Previous
              </Button>
              <span className="py-1 px-2 text-gray-200">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-gray-600"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Vendor Dialog */}
      <Dialog open={showAddVendorDialog} onOpenChange={setShowAddVendorDialog}>
        <DialogContent className="bg-[#1A1F2B] border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Vendor</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the vendor details below to add them to the platform.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-name" className="text-white">Name</Label>
              <Input 
                id="vendor-name" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.name}
                onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-owner" className="text-white">Owner</Label>
              <Input 
                id="vendor-owner" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.owner}
                onChange={(e) => setNewVendor({...newVendor, owner: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-category" className="text-white">Category</Label>
              <Input 
                id="vendor-category" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.category}
                onChange={(e) => setNewVendor({...newVendor, category: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-location" className="text-white">Location</Label>
              <Input 
                id="vendor-location" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.location}
                onChange={(e) => setNewVendor({...newVendor, location: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-phone" className="text-white">Phone</Label>
              <Input 
                id="vendor-phone" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.phone}
                onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-email" className="text-white">Email</Label>
              <Input 
                id="vendor-email" 
                className="col-span-3 bg-[#232b45] border border-[#232b45] text-white"
                value={newVendor.email}
                onChange={(e) => setNewVendor({...newVendor, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="vendor-plan" className="text-white">Plan</Label>
              <div className="col-span-3 flex space-x-2">
                <Button 
                  type="button"
                  variant={newVendor.subscriptionPlan === 'Basic' ? 'default' : 'outline'}
                  className={newVendor.subscriptionPlan === 'Basic' ? 'bg-gray-500 hover:bg-gray-600' : 'border-gray-600 text-gray-200 hover:bg-gray-700'}
                  onClick={() => setNewVendor({...newVendor, subscriptionPlan: 'Basic'})}
                >
                  Basic
                </Button>
                <Button 
                  type="button"
                  variant={newVendor.subscriptionPlan === 'Standard' ? 'default' : 'outline'}
                  className={newVendor.subscriptionPlan === 'Standard' ? 'bg-blue-500 hover:bg-blue-600' : 'border-gray-600 text-gray-200 hover:bg-gray-700'}
                  onClick={() => setNewVendor({...newVendor, subscriptionPlan: 'Standard'})}
                >
                  Standard
                </Button>
                <Button 
                  type="button"
                  variant={newVendor.subscriptionPlan === 'Premium' ? 'default' : 'outline'}
                  className={newVendor.subscriptionPlan === 'Premium' ? 'bg-purple-500 hover:bg-purple-600' : 'border-gray-600 text-gray-200 hover:bg-gray-700'}
                  onClick={() => setNewVendor({...newVendor, subscriptionPlan: 'Premium'})}
                >
                  Premium
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-200 hover:bg-gray-700"
              onClick={() => setShowAddVendorDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleAddVendor}
            >
              Add Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorControlCenter;