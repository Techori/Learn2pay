import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Building2, Plus, Eye, Edit, Ban, CheckCircle, XCircle, Phone, Mail, Download } from 'lucide-react';
import SearchAndFilter from "../shared/SearchAndFilter";
import { useToast } from "../../hooks/use-toast";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/Dialog";
import { Label } from "../../components/ui/Label";
import { Select } from "../../components/ui/Select";

interface Institute {
  id: number;
  name: string;
  type: string;
  location: string;
  principal: string;
  phone: string;
  email: string;
  students: number;
  status: string;
  kycStatus: string;
  joinDate: string;
}

interface InstituteFormData {
  name: string;
  type: string;
  location: string;
  principal: string;
  phone: string;
  email: string;
}

const InstituteManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [institutes, setInstitutes] = useState<Institute[]>([
    {
      id: 1,
      name: "Modern Public School",
      type: "School",
      location: "Delhi",
      principal: "Dr. Rajesh Kumar",
      phone: "9876543210",
      email: "info@mps.edu",
      students: 1250,
      status: "Active",
      kycStatus: "Approved",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Excel Coaching Center",
      type: "Coaching",
      location: "Mumbai",
      principal: "Priya Sharma",
      phone: "9876543211",
      email: "excel@coaching.com",
      students: 450,
      status: "Active",
      kycStatus: "Pending",
      joinDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Sunrise College",
      type: "College",
      location: "Bangalore",
      principal: "Prof. Amit Singh",
      phone: "9876543212",
      email: "admin@sunrise.edu",
      students: 2100,
      status: "Suspended",
      kycStatus: "Rejected",
      joinDate: "2024-01-10"
    },
    {
      id: 4,
      name: "Global Education Institute",
      type: "School",
      location: "Chennai",
      principal: "Dr. Lakshmi Nair",
      phone: "9876543213",
      email: "contact@globaledu.org",
      students: 850,
      status: "Active",
      kycStatus: "Approved",
      joinDate: "2024-01-25"
    },
    {
      id: 5,
      name: "Future Academy",
      type: "Coaching",
      location: "Delhi",
      principal: "Vikram Malhotra",
      phone: "9876543214",
      email: "info@futureacademy.com",
      students: 350,
      status: "Pending",
      kycStatus: "Pending",
      joinDate: "2024-02-01"
    }
  ]);
  const [filteredInstitutes, setFilteredInstitutes] = useState<Institute[]>(institutes);
  const [isAddInstituteOpen, setIsAddInstituteOpen] = useState(false);
  const [formData, setFormData] = useState<InstituteFormData>({
    name: '',
    type: 'School',
    location: '',
    principal: '',
    phone: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  
  // Update filtered institutes when search term or filters change
  useEffect(() => {
    let filtered = [...institutes];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(institute => 
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply other filters
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(institute => institute.type === filters.type);
    }
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(institute => institute.status === filters.status);
    }
    
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(institute => institute.location === filters.location);
    }
    
    if (filters.kycStatus && filters.kycStatus !== 'all') {
      filtered = filtered.filter(institute => institute.kycStatus === filters.kycStatus);
    }
    
    setFilteredInstitutes(filtered);
  }, [searchTerm, filters, institutes]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutes.length / pageSize);
  const paginatedInstitutes = filteredInstitutes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Suspended': return 'bg-red-500 text-white';
      case 'Pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500 text-white';
      case 'Rejected': return 'bg-red-500 text-white';
      case 'Pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const filterOptions = [
    {
      key: 'type',
      label: 'Institute Type',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'School', label: 'School' },
        { value: 'College', label: 'College' },
        { value: 'Coaching', label: 'Coaching' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Active', label: 'Active' },
        { value: 'Suspended', label: 'Suspended' },
        { value: 'Pending', label: 'Pending' }
      ]
    },
    {
      key: 'location',
      label: 'Location',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Locations' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Chennai', label: 'Chennai' }
      ]
    },
    {
      key: 'kycStatus',
      label: 'KYC Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All KYC Statuses' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Rejected', label: 'Rejected' }
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
  
  const handleAddInstitute = () => {
    setIsAddInstituteOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = Math.max(...institutes.map(i => i.id)) + 1;
    
    // Create new institute object
    const newInstitute: Institute = {
      id: newId,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      principal: formData.principal,
      phone: formData.phone,
      email: formData.email,
      students: 0, // New institute starts with 0 students
      status: 'Active', // Default to active
      kycStatus: 'Pending', // Default to pending KYC
      joinDate: new Date().toISOString().split('T')[0] // Today's date
    };
    
    // Add to institutes array
    setInstitutes(prev => [newInstitute, ...prev]);
    
    // Close the dialog and reset form
    setIsAddInstituteOpen(false);
    setFormData({
      name: '',
      type: 'School',
      location: '',
      principal: '',
      phone: '',
      email: ''
    });
    
    // Show success notification
    toast({
      title: "Institute Added",
      description: `${formData.name} has been successfully added to the platform.`,
    });
  };
  
  const handleExport = () => {
    // Create PDF document
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(16);
    doc.text("Learn2Pay - Institutes Report", 14, 22);
    
    // Add timestamp and filters
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Filters applied: ${Object.keys(filters).length > 0 ? 
      Object.entries(filters).map(([key, value]) => `${key}: ${value}`).join(', ') : 
      'None'}`, 14, 36);
    
    // Prepare table data
    const tableData = filteredInstitutes.map(institute => [
      institute.id.toString(),
      institute.name,
      institute.type,
      institute.location,
      institute.principal,
      institute.phone,
      institute.email,
      institute.students.toString(),
      institute.status,
      institute.kycStatus,
      institute.joinDate
    ]);
    
    // Create table
    autoTable(doc, {
      startY: 45,
      head: [['ID', 'Name', 'Type', 'Location', 'Principal', 'Phone', 'Email', 'Students', 'Status', 'KYC', 'Join Date']],
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
    doc.save(`learn2pay-institutes-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    
    toast({
      title: "Export Completed",
      description: "Institutes report has been downloaded as PDF."
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
  
  const handleAction = (action: string, institute: Institute) => {
    toast({
      title: `${action} Institute`,
      description: `${action} action triggered for ${institute.name}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-sm text-gray-400">Total Institutes</div>
            <div className="text-xs text-green-400">+12 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">142</div>
            <div className="text-sm text-gray-400">Active Institutes</div>
            <div className="text-xs text-green-400">91% active rate</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-sm text-gray-400">Pending KYC</div>
            <div className="text-xs text-yellow-400">Needs attention</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">45,678</div>
            <div className="text-sm text-gray-400">Total Students</div>
            <div className="text-xs text-blue-400">Across all institutes</div>
          </CardContent>
        </Card>
      </div>

      {/* Institute Management Panel */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-white">
                <Building2 className="h-5 w-5 mr-2 text-orange-400" />
                Institute Management
              </CardTitle>
              <CardDescription className="text-gray-400">Manage all educational institutes on the platform</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleAddInstitute}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Institute
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
              searchPlaceholder="Search institutes by name, location, or principal..."
              filterOptions={filterOptions}
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
          </div>

          {/* Institutes Table */}
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="hover:bg-gray-800/80 border-gray-700">
                  <TableHead className="text-gray-200">Institute Details</TableHead>
                  <TableHead className="text-gray-200">Principal & Contact</TableHead>
                  <TableHead className="text-gray-200">Students</TableHead>
                  <TableHead className="text-gray-200">Status</TableHead>
                  <TableHead className="text-gray-200">KYC Status</TableHead>
                  <TableHead className="text-gray-200">Join Date</TableHead>
                  <TableHead className="text-gray-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInstitutes.length === 0 ? (
                  <TableRow className="hover:bg-gray-800/50 border-gray-700">
                    <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                      No institutes found matching the search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedInstitutes.map((institute) => (
                    <TableRow key={institute.id} className="hover:bg-gray-800/50 border-gray-700">
                      <TableCell className="text-gray-200">
                        <div>
                          <div className="font-medium">{institute.name}</div>
                          <div className="text-sm text-gray-400">{institute.type} • {institute.location}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div>
                          <div className="font-medium">{institute.principal}</div>
                          <div className="text-sm text-gray-400 flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {institute.phone}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {institute.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="text-lg font-semibold">{institute.students.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(institute.status)}>
                          {institute.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getKycStatusColor(institute.kycStatus)}>
                          {institute.kycStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-200">
                        <div className="text-sm">{institute.joinDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('View', institute)}
                          >
                            <Eye className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('Edit', institute)}
                          >
                            <Edit className="h-3 w-3 text-gray-200" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-700 hover:bg-gray-700"
                            onClick={() => handleAction('Suspend', institute)}
                          >
                            <Ban className="h-3 w-3 text-gray-200" />
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
              Showing {paginatedInstitutes.length} of {filteredInstitutes.length} institutes 
              {filteredInstitutes.length !== institutes.length && ` (filtered from ${institutes.length} total)`}
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

      {/* Add Institute Dialog */}
      <Dialog open={isAddInstituteOpen} onOpenChange={setIsAddInstituteOpen}>
        <DialogContent className="bg-slate-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Institute</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to register a new educational institute on Learn2Pay
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
                <Label htmlFor="type" className="text-right text-gray-300">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border border-gray-600 text-white rounded-md h-9 px-3"
                  required
                >
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="Coaching">Coaching</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-gray-300">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="col-span-3 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="principal" className="text-right text-gray-300">Principal</Label>
                <Input
                  id="principal"
                  name="principal"
                  value={formData.principal}
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
            </div>
            <DialogFooter className="bg-slate-800">
              <Button type="button" variant="outline" onClick={() => setIsAddInstituteOpen(false)} className="border-gray-700 text-gray-200">
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Add Institute
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstituteManagement;
