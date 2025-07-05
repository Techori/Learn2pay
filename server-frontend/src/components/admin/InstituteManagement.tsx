import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Building2, Plus, Eye, Edit, Ban, CheckCircle, XCircle, Phone, Mail, Download, Building, DollarSign, Target, TrendingUp } from 'lucide-react';
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

interface FranchiseData {
  id: number;
  name: string;
  owner: string;
  location: string;
  phone: string;
  email: string;
  status: string;
  performance: string;
  revenue: number;
  target: number;
  institutes: number;
  students: number;
  joinDate: string;
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
  const [franchises, setFranchises] = useState<FranchiseData[]>([
    {
      id: 1,
      name: "Mumbai Central",
      owner: "Rajesh Patel",
      location: "Mumbai, Maharashtra",
      phone: "9876543210",
      email: "mumbai@learn2pay.com",
      status: "Active",
      performance: "Excellent",
      revenue: 450000,
      target: 500000,
      institutes: 25,
      students: 1250,
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Delhi North",
      owner: "Priya Sharma",
      location: "Delhi, NCR",
      phone: "9876543211",
      email: "delhi@learn2pay.com",
      status: "Active",
      performance: "Good",
      revenue: 380000,
      target: 400000,
      institutes: 20,
      students: 980,
      joinDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Bangalore Tech",
      owner: "Amit Singh",
      location: "Bangalore, Karnataka",
      phone: "9876543212",
      email: "bangalore@learn2pay.com",
      status: "Under Review",
      performance: "Average",
      revenue: 250000,
      target: 350000,
      institutes: 15,
      students: 650,
      joinDate: "2024-01-10"
    }
  ]);
  const [filteredFranchises, setFilteredFranchises] = useState<FranchiseData[]>(franchises);

  // Update filtered institutes when search term or filters change
  useEffect(() => {
    let filtered = [...institutes];
    
    if (searchTerm) {
      filtered = filtered.filter(institute => 
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
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

  // Update filtered franchises
  useEffect(() => {
    let filtered = [...franchises];
    if (searchTerm) {
      filtered = filtered.filter(franchise =>
        franchise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        franchise.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        franchise.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        franchise.phone.includes(searchTerm) ||
        franchise.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(franchise => franchise.status === filters.status);
    }
    if (filters.performance && filters.performance !== 'all') {
      filtered = filtered.filter(franchise => franchise.performance === filters.performance);
    }
    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(franchise => franchise.location === filters.location);
    }
    setFilteredFranchises(filtered);
  }, [searchTerm, filters, franchises]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredInstitutes.length / pageSize);
  const paginatedInstitutes = filteredInstitutes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Suspended': return 'bg-danger text-white';
      case 'Pending': return 'bg-warning text-white';
      case 'Under Review': return 'bg-warning text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success text-white';
      case 'Rejected': return 'bg-danger text-white';
      case 'Pending': return 'bg-warning text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent': return 'bg-success text-white';
      case 'Good': return 'bg-secondary text-white';
      case 'Average': return 'bg-warning text-white';
      case 'Poor': return 'bg-danger text-white';
      default: return 'bg-text-secondary text-white';
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
        { value: 'Pending', label: 'Pending' },
        { value: 'Under Review', label: 'Under Review' }
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
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Mumbai, Maharashtra', label: 'Mumbai, Maharashtra' },
        { value: 'Delhi, NCR', label: 'Delhi, NCR' },
        { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' }
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
    },
    {
      key: 'performance',
      label: 'Performance',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Performances' },
        { value: 'Excellent', label: 'Excellent' },
        { value: 'Good', label: 'Good' },
        { value: 'Average', label: 'Average' },
        { value: 'Poor', label: 'Poor' }
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
    
    const newId = Math.max(...institutes.map(i => i.id)) + 1;
    
    const newInstitute: Institute = {
      id: newId,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      principal: formData.principal,
      phone: formData.phone,
      email: formData.email,
      students: 0,
      status: 'Active',
      kycStatus: 'Pending',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setInstitutes(prev => [newInstitute, ...prev]);
    
    setIsAddInstituteOpen(false);
    setFormData({
      name: '',
      type: 'School',
      location: '',
      principal: '',
      phone: '',
      email: ''
    });
    
    toast({
      title: "Institute Added",
      description: `${formData.name} has been successfully added to the platform.`,
    });
  };
  
  const handleExport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Learn2Pay - Institutes Report", 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Filters applied: ${Object.keys(filters).length > 0 ? 
      Object.entries(filters).map(([key, value]) => `${key}: ${value}`).join(', ') : 
      'None'}`, 14, 36);
    
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
    
    autoTable(doc, {
      startY: 45,
      head: [['ID', 'Name', 'Type', 'Location', 'Principal', 'Phone', 'Email', 'Students', 'Status', 'KYC', 'Join Date']],
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
    switch (action) {
      case 'View':
        toast({ title: "View Institute", description: `Viewing details for ${institute.name}` });
        break;
      case 'Edit':
        toast({ title: "Edit Institute", description: `Editing ${institute.name}` });
        break;
      case 'Suspend':
        if (institute.status !== "Suspended") {
          setInstitutes(institutes.map(i => i.id === institute.id ? { ...i, status: "Suspended" } : i));
          toast({ title: "Suspended", description: `${institute.name} has been suspended.` });
        }
        break;
      case 'Activate':
        if (institute.status === "Suspended") {
          setInstitutes(institutes.map(i => i.id === institute.id ? { ...i, status: "Active" } : i));
          toast({ title: "Activated", description: `${institute.name} has been activated.` });
        }
        break;
    }
  };

  const handleStudentUpdate = (instituteId: number, operation: 'add' | 'subtract', value: number) => {
    setInstitutes(institutes.map(i => 
      i.id === instituteId 
        ? { ...i, students: Math.max(0, operation === 'add' ? i.students + value : i.students - value) } 
        : i
    ));
    toast({
      title: `Student Count Updated`,
      description: `Updated student count for ${institutes.find(i => i.id === instituteId)?.name} by ${operation === 'add' ? '+' : '-'}${value}.`,
    });
  };

  const handleFranchiseAction = (action: string, franchise: FranchiseData) => {
    switch (action) {
      case "View":
        toast({ title: "View Franchise", description: `Viewing details for ${franchise.name}.` });
        break;
      case "Edit":
        toast({ title: "Edit Franchise", description: `Editing ${franchise.name}.` });
        break;
      case "Performance":
        toast({ title: "Performance Analytics", description: `Checking performance for ${franchise.name}.` });
        break;
    }
  };

  const handleAddFranchise = () => {
    toast({ title: "Add Franchise", description: "Franchise addition feature coming soon!" });
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">156</div>
            <div className="text-sm text-text-secondary">Total Institutes</div>
            <div className="text-xs text-success">+12 this month</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">142</div>
            <div className="text-sm text-text-secondary">Active Institutes</div>
            <div className="text-xs text-success">91% active rate</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">23</div>
            <div className="text-sm text-text-secondary">Pending KYC</div>
            <div className="text-xs text-warning">Needs attention</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">45,678</div>
            <div className="text-sm text-text-secondary">Total Students</div>
            <div className="text-xs text-secondary">Across all institutes</div>
          </CardContent>
        </Card>
      </div>

      {/* Institute Management Panel */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-text-color">
                <Building2 className="h-5 w-5 mr-2 text-orange-400" />
                Institute Management
              </CardTitle>
              <CardDescription className="text-text-secondary">Manage all educational institutes on the platform</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-text-color"
                onClick={handleAddInstitute}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Institute
              </Button>
              <Button 
                variant="outline" 
                className="border-card-border text-text-secondary hover:bg-orange-500 hover:text-white"
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
          <div className="rounded-md border border-card-border overflow-hidden">
            <Table>
              <TableHeader className="bg-card-header">
                <TableRow className="hover:bg-card-hover border-card-border">
                  <TableHead className="text-text-secondary">Institute Details</TableHead>
                  <TableHead className="text-text-secondary">Principal & Contact</TableHead>
                  <TableHead className="text-text-secondary">Students</TableHead>
                  <TableHead className="text-text-secondary">Status</TableHead>
                  <TableHead className="text-text-secondary">KYC Status</TableHead>
                  <TableHead className="text-text-secondary">Join Date</TableHead>
                  <TableHead className="text-text-secondary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInstitutes.length === 0 ? (
                  <TableRow className="hover:bg-card-hover border-card-border">
                    <TableCell colSpan={7} className="text-center py-8 text-text-secondary">
                      No institutes found matching the search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedInstitutes.map((institute) => (
                    <TableRow key={institute.id} className="hover:bg-card-hover border-card-border">
                      <TableCell className="text-text-secondary">
                        <div>
                          <div className="font-medium text-text-secondary">{institute.name}</div>
                          <div className="text-sm text-text-secondary">{institute.type} • {institute.location}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary">
                        <div>
                          <div className="font-medium text-text-secondary">{institute.principal}</div>
                          <div className="text-sm text-text-secondary flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {institute.phone}
                          </div>
                          <div className="text-sm text-text-secondary flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {institute.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-text-secondary">{institute.students.toLocaleString()}</span>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-orange-500 hover:bg-orange-500 hover:text-white text-text-secondary"
                              onClick={() => handleStudentUpdate(institute.id, 'add', 10)}
                            >
                              +10
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-orange-500 hover:bg-orange-500 hover:text-white text-text-secondary"
                              onClick={() => handleStudentUpdate(institute.id, 'subtract', 10)}
                            >
                              -10
                            </Button>
                          </div>
                        </div>
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
                      <TableCell className="text-text-secondary">
                        <div className="text-sm">{institute.joinDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-orange-500 text-text-color hover:bg-warning"
                            onClick={() => handleAction('View', institute)}
                          >
                            <Eye className="h-4 w-4 text-text-secondary hover:text-white" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-orange-500 text-text-color hover:bg-warning"
                            onClick={() => handleAction('Edit', institute)}
                          >
                            <Edit className="h-4 w-4 text-text-secondary hover:text-white" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-orange-500 text-text-color hover:bg-warning"
                            onClick={() => handleAction(institute.status === "Suspended" ? "Activate" : "Suspend", institute)}
                          >
                            {institute.status === "Suspended" ? <CheckCircle className="h-4 w-4 text-text-secondary hover:text-white" /> : <Ban className="h-4 w-4 text-text-secondary hover:text-white" />}
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
            <div className="text-sm text-text-secondary">
              Showing {paginatedInstitutes.length} of {filteredInstitutes.length} institutes 
              {filteredInstitutes.length !== institutes.length && ` (filtered from ${institutes.length} total)`}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white"
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Franchise Management Panel (Merged from FranchiseManagement) */}
      <Card className="bg-card-bg border-card-border mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-400" />
                Franchise Management
              </CardTitle>
              <CardDescription className="text-text-secondary">Monitor and manage all Learn2Pay franchise operations</CardDescription>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleAddFranchise}>
              <Plus className="h-4 w-4 mr-2" /> Add Franchise
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search franchises..."
                className="pl-10 bg-card-bg border border-card-border text-text-color placeholder-text-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary"
                value={filters.status || 'all'}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Suspended">Suspended</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary"
                value={filters.performance || 'all'}
                onChange={(e) => setFilters({ ...filters, performance: e.target.value })}
              >
                <option value="all">Performance</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary"
                value={filters.location || 'all'}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="all">Location</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="Delhi, NCR">Delhi, NCR</option>
                <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary" />
            </div>
          </div>

          {/* Franchises Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-text-secondary">Franchise Details</TableHead>
                <TableHead className="text-text-secondary">Owner & Contact</TableHead>
                <TableHead className="text-text-secondary">Performance</TableHead>
                <TableHead className="text-text-secondary">Revenue vs Target</TableHead>
                <TableHead className="text-text-secondary">Coverage</TableHead>
                <TableHead className="text-text-secondary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFranchises.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-text-secondary">
                    No franchises found matching the search criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredFranchises.map((franchise) => (
                  <TableRow key={franchise.id} className="hover:bg-card-hover">
                    <TableCell className="text-text-secondary">
                      <div>
                        <div className="font-medium text-text-color">{franchise.name}</div>
                        <div className="text-sm text-text-secondary">{franchise.location}</div>
                        <Badge className={getStatusColor(franchise.status)}>
                          {franchise.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      <div>
                        <div className="font-medium text-text-color">{franchise.owner}</div>
                        <div className="text-sm text-text-secondary">{franchise.phone}</div>
                        <div className="text-sm text-text-secondary">{franchise.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      <Badge className={getPerformanceColor(franchise.performance)}>
                        {franchise.performance}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      <div>
                        <div className="font-semibold">₹{franchise.revenue.toLocaleString()}</div>
                        <div className="text-sm text-text-secondary">Target: ₹{franchise.target.toLocaleString()}</div>
                        <div className="w-full bg-card-bg rounded-full h-2 mt-1">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${(franchise.revenue / franchise.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-text-color">{franchise.institutes}</span> Institutes
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{franchise.students}</span> Students
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="text-text-secondary border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleFranchiseAction("View", franchise)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-text-secondary border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleFranchiseAction("Edit", franchise)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-text-secondary border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleFranchiseAction("Performance", franchise)}>
                          <TrendingUp className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Institute Dialog */}
      <Dialog open={isAddInstituteOpen} onOpenChange={setIsAddInstituteOpen}>
        <DialogContent className="bg-card-bg border-card-border text-text-color">
          <DialogHeader>
            <DialogTitle className="text-text-color">Add New Institute</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Fill in the details to register a new educational institute on Learn2Pay
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-text-secondary">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right text-text-secondary">Type</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color rounded-md h-9 px-3"
                  required
                >
                  <option value="School">School</option>
                  <option value="College">College</option>
                  <option value="Coaching">Coaching</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right text-text-secondary">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="principal" className="text-right text-text-secondary">Principal</Label>
                <Input
                  id="principal"
                  name="principal"
                  value={formData.principal}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-text-secondary">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-text-secondary">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="col-span-3 bg-card-bg border border-card-border text-text-color"
                  required
                />
              </div>
            </div>
            <DialogFooter className="bg-card-bg">
              <Button type="button" variant="outline" onClick={() => setIsAddInstituteOpen(false)} className="border-orange-500 text-text-secondary hover:bg-orange-500 hover:text-white">
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