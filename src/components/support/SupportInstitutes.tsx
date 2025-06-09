import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Building,
  MapPin,
  Users as UsersIcon,
  Calendar,
  Phone,
  Mail,
  Ticket,
  Clock,
  CheckCircle,
  TrendingUp,
  CircleSlash,
  ArrowDownCircle,
  CirclePlay,
  FileText,
  Plus,
  MoreVertical,
} from 'lucide-react';

const SupportInstitutes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all'); // Changed from typeFilter to planFilter
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    location: '',
    students: '',
    joinedDate: '',
    phone: '',
    email: '',
    monthlyRevenue: '',
    status: 'Active',
    plan: 'Basic',
    teachers: '',
    totalTickets: 0,
    openTickets: 0,
  });

  const [institutes, setInstitutes] = useState([
    {
      id: "INST-001",
      name: "ABC International School",
      location: "Mumbai, Maharashtra",
      students: 1250,
      joinedDate: "2024-01-15",
      phone: "+91 9876543210",
      email: "admin@abcschool.com",
      monthlyRevenue: "₹1,25,000",
      status: "Active",
      plan: "Premium",
      payment: "Paid",
      teachers: 85,
      totalTickets: 5,
      openTickets: 2,
    },
    {
      id: "INST-002",
      name: "XYZ Academy",
      location: "Delhi, India",
      students: 800,
      joinedDate: "2024-02-20",
      phone: "+91 9876543210", // Static number for now
      email: "info@xyzacademy.com",
      monthlyRevenue: "₹80,000",
      status: "Active",
      plan: "Standard",
      payment: "Pending",
      teachers: 45,
      totalTickets: 3,
      openTickets: 1,
    },
    {
      id: "INST-003",
      name: "Success Coaching Institute",
      location: "Bangalore, Karnataka",
      students: 350,
      joinedDate: "2024-03-10",
      phone: "+91 9876543210", // Static number for now
      email: "contact@successinstitute.com",
      monthlyRevenue: "₹35,000",
      status: "Inactive",
      plan: "Basic",
      payment: "Overdue",
      teachers: 20,
      totalTickets: 8,
      openTickets: 0,
    },
  ]);

  const [summaryStats, setSummaryStats] = useState([
    {
      title: "Total Institutes",
      value: "3",
      icon: <Building className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: "Active Institutes",
      value: "2",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "Total Students",
      value: "2400",
      icon: <UsersIcon className="h-5 w-5" />,
      color: "text-orange-500",
    },
    {
      title: "Open Support Tickets",
      value: "3", // Sum of open tickets from static data
      icon: <Clock className="h-5 w-5" />,
      color: "text-red-500", // Red color as in image
    },
  ]);

  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'bg-yellow-500';
      case 'Standard': return 'bg-blue-500';
      case 'Basic': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Paid': return 'bg-green-500';
      case 'Pending': return 'bg-orange-500';
      case 'Overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handlePlanChange = (value: string) => {
    setPlanFilter(value);
  };

  const handleNewInstituteChange = (field: string, value: string) => {
    setNewInstitute(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateInstitute = () => {
    if (!newInstitute.name || !newInstitute.location || !newInstitute.email || !newInstitute.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const newId = `INST-${String(institutes.length + 1).padStart(3, '0')}`;
    const institute = {
      id: newId,
      ...newInstitute,
      students: parseInt(newInstitute.students as string),
      teachers: parseInt(newInstitute.teachers as string),
      joinedDate: new Date().toISOString().split('T')[0],
      monthlyRevenue: `₹${(Math.random() * 100000).toFixed(2)}`, // Mock revenue
      payment: 'Paid', // Default payment status
      totalTickets: 0,
      openTickets: 0,
    };

    setInstitutes(prevInstitutes => [institute, ...prevInstitutes]);
    setNewInstitute({
      name: '',
      location: '',
      students: '',
      joinedDate: '',
      phone: '',
      email: '',
      monthlyRevenue: '',
      status: 'Active',
      plan: 'Basic',
      teachers: '',
      totalTickets: 0,
      openTickets: 0,
    });
    setIsCreateDialogOpen(false);
  };

  const handleInstituteAction = (institute: any, action: string) => {
    setSelectedInstitute(institute);
    setSelectedAction(action);
    setIsActionDialogOpen(true);
  };

  const confirmInstituteAction = () => {
    if (!selectedInstitute) return;

    let updatedInstitutes = institutes;

    switch (selectedAction) {
      case 'deactivate':
        updatedInstitutes = institutes.map(inst =>
          inst.id === selectedInstitute.id ? { ...inst, status: 'Inactive' } : inst
        );
        setInstitutes(updatedInstitutes);
        toast({
          title: "Institute Deactivated",
          description: `Institute ${selectedInstitute.name} has been deactivated.`,
        });
        break;
      case 'activate':
        updatedInstitutes = institutes.map(inst =>
          inst.id === selectedInstitute.id ? { ...inst, status: 'Active' } : inst
        );
        setInstitutes(updatedInstitutes);
        toast({
          title: "Institute Activated",
          description: `Institute ${selectedInstitute.name} has been activated.`,
        });
        break;
      case 'manage':
        // This could navigate to a detailed management page or open a more complex dialog
        console.log(`Managing institute: ${selectedInstitute.name}`);
        break;
      default:
        break;
    }

    setIsActionDialogOpen(false);
    setSelectedInstitute(null);
    setSelectedAction('');
  };

  const getActionDialogContent = () => {
    if (!selectedInstitute) return null;

    switch (selectedAction) {
      case 'view':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Institute Details - {selectedInstitute.name}</DialogTitle>
              <DialogDescription>Full information about the institute</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div><span className="font-semibold">ID:</span> {selectedInstitute.id}</div>
              <div><span className="font-semibold">Location:</span> {selectedInstitute.location}</div>
              <div><span className="font-semibold">Students:</span> {selectedInstitute.students}</div>
              <div><span className="font-semibold">Joined Date:</span> {selectedInstitute.joinedDate}</div>
              <div><span className="font-semibold">Phone:</span> {selectedInstitute.phone}</div>
              <div><span className="font-semibold">Email:</span> {selectedInstitute.email}</div>
              <div><span className="font-semibold">Monthly Revenue:</span> {selectedInstitute.monthlyRevenue}</div>
              <div><span className="font-semibold">Status:</span> {selectedInstitute.status}</div>
              <div><span className="font-semibold">Plan:</span> {selectedInstitute.plan}</div>
              <div><span className="font-semibold">Payment Status:</span> {selectedInstitute.payment}</div>
              <div><span className="font-semibold">Teachers:</span> {selectedInstitute.teachers}</div>
              <div><span className="font-semibold">Total Tickets:</span> {selectedInstitute.totalTickets}</div>
              <div><span className="font-semibold">Open Tickets:</span> {selectedInstitute.openTickets}</div>
            </div>
          </>
        );
      case 'activate':
      case 'deactivate':
        return (
          <DialogHeader>
            <DialogTitle>{selectedAction === 'activate' ? 'Activate' : 'Deactivate'} Institute - {selectedInstitute.name}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedAction} this institute? This will affect its access and visibility.
            </DialogDescription>
          </DialogHeader>
        );
      case 'manage':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Manage Institute - {selectedInstitute.name}</DialogTitle>
              <DialogDescription>Detailed management options for {selectedInstitute.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Section: Basic Details */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3">Basic Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">ID:</span> {selectedInstitute.id}</div>
                  <div><span className="font-medium">Location:</span> {selectedInstitute.location}</div>
                  <div><span className="font-medium">Students:</span> {selectedInstitute.students}</div>
                  <div><span className="font-medium">Teachers:</span> {selectedInstitute.teachers}</div>
                  <div><span className="font-medium">Joined:</span> {selectedInstitute.joinedDate}</div>
                  <div><span className="font-medium">Phone:</span> {selectedInstitute.phone}</div>
                  <div><span className="font-medium">Email:</span> {selectedInstitute.email}</div>
                  <div><span className="font-medium">Status:</span> <Badge className={`${getStatusColor(selectedInstitute.status)} text-white`}>{selectedInstitute.status}</Badge></div>
                  <div><span className="font-medium">Plan:</span> <Badge className={`${getPlanColor(selectedInstitute.plan)} text-white`}>{selectedInstitute.plan}</Badge></div>
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => console.log(`Edit Basic Details for ${selectedInstitute.name}`)}>
                  Edit Details
                </Button>
              </div>

              {/* Section: Financial Overview */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3">Financial Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Monthly Revenue:</span> {selectedInstitute.monthlyRevenue}</div>
                  <div><span className="font-medium">Payment Status:</span> <Badge className={`${getPaymentColor(selectedInstitute.payment)} text-white`}>{selectedInstitute.payment}</Badge></div>
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => console.log(`View Financial Reports for ${selectedInstitute.name}`)}>
                  View Financials
                </Button>
              </div>

              {/* Section: Support Tickets */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3">Support Tickets</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Total Tickets:</span> {selectedInstitute.totalTickets}</div>
                  <div><span className="font-medium">Open Tickets:</span> {selectedInstitute.openTickets}</div>
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => console.log(`View All Tickets for ${selectedInstitute.name}`)}>
                  View Tickets
                </Button>
              </div>

              {/* Section: Quick Actions */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" onClick={() => console.log(`Sending a reminder to ${selectedInstitute.name}`)}>
                    Send Reminder
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => console.log(`Initiating a follow-up for ${selectedInstitute.name}`)}>
                    Schedule Follow-up
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => console.log(`Archiving ${selectedInstitute.name}`)}>
                    Archive Institute
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const filteredInstitutes = institutes.filter(institute => {
    const matchesSearch = institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          institute.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || institute.status === statusFilter;
    const matchesPlan = planFilter === 'all' || institute.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Institute Support</CardTitle>
          <CardDescription>Manage and support educational institutes</CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center" onClick={() => console.log("Export Report button clicked")}>
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Institute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Institute</DialogTitle>
                <DialogDescription>Fill in the details to add a new educational institute</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Institute Name</Label>
                  <Input id="name" value={newInstitute.name} onChange={(e) => handleNewInstituteChange('name', e.target.value)} placeholder="e.g., Bright Minds School" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={newInstitute.location} onChange={(e) => handleNewInstituteChange('location', e.target.value)} placeholder="e.g., Mumbai, Maharashtra" />
                </div>
                <div>
                  <Label htmlFor="students">Number of Students</Label>
                  <Input id="students" type="number" value={newInstitute.students} onChange={(e) => handleNewInstituteChange('students', e.target.value)} placeholder="e.g., 500" />
                </div>
                <div>
                  <Label htmlFor="teachers">Number of Teachers</Label>
                  <Input id="teachers" type="number" value={newInstitute.teachers} onChange={(e) => handleNewInstituteChange('teachers', e.target.value)} placeholder="e.g., 30" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={newInstitute.phone} onChange={(e) => handleNewInstituteChange('phone', e.target.value)} placeholder="e.g., +91 9876543210" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={newInstitute.email} onChange={(e) => handleNewInstituteChange('email', e.target.value)} placeholder="e.g., info@institute.com" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newInstitute.status} onValueChange={(value) => handleNewInstituteChange('status', value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={newInstitute.plan} onValueChange={(value) => handleNewInstituteChange('plan', value)}>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateInstitute}>
                  Add Institute
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search institutes by name, location, or ID..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
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
        <Select value={planFilter} onValueChange={handlePlanChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Standard">Standard</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Institute List */}
      <div className="space-y-4">
        {filteredInstitutes.map((institute) => (
          <Card key={institute.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Institute Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Building className="h-10 w-10 text-blue-600" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold">{institute.name}</h3>
                        <Badge className={`${getStatusColor(institute.status)} text-white`}>{institute.status}</Badge>
                        <Badge className={`${getPlanColor(institute.plan)} text-white`}>{institute.plan}</Badge>
                        <Badge className={`${getPaymentColor(institute.payment)} text-white`}>{institute.payment}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{institute.location}</span>
                      </p>
                      <p className="text-muted-foreground text-sm flex items-center space-x-1">
                         <UsersIcon className="h-4 w-4"/>
                         <span>{institute.students} students</span>
                      </p>
                       <p className="text-muted-foreground text-sm flex items-center space-x-1">
                         <Calendar className="h-4 w-4"/>
                         <span>Joined {institute.joinedDate}</span>
                       </p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4 text-gray-500"/>
                          <span>{institute.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                           <Mail className="h-4 w-4"/>
                          <span>{institute.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                    <div className="space-y-1">
                      <div className="text-xl font-bold">{institute.students}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold">{institute.teachers}</div>
                      <div className="text-sm text-muted-foreground">Teachers</div>
                    </div>
                     <div className="space-y-1">
                       <div className="text-xl font-bold">{institute.totalTickets}</div>
                       <div className="text-sm text-muted-foreground">Total Tickets</div>
                     </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold">{institute.openTickets}</div>
                      <div className="text-sm text-muted-foreground">Open Tickets</div>
                    </div>
                  </div>

                   {/* Action Buttons */}
                   <div className="flex flex-wrap gap-3 mt-4">
                      <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log(`Call button clicked for ${institute.name}, Phone: ${institute.phone}`)}>
                          <Phone className="h-4 w-4"/>
                          Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log(`Email button clicked for ${institute.name}, Email: ${institute.email}`)}>
                          <Mail className="h-4 w-4"/>
                          Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1" onClick={() => console.log(`View Tickets button clicked for ${institute.name}, Total Tickets: ${institute.totalTickets}, Open Tickets: ${institute.openTickets}`)}>
                         <Ticket className="h-4 w-4"/>
                         View Tickets
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
                        <DropdownMenuItem onClick={() => handleInstituteAction(institute, 'view')}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInstituteAction(institute, institute.status === 'Active' ? 'deactivate' : 'activate')}>
                          {institute.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleInstituteAction(institute, 'manage')}>
                          Manage
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
        <DialogContent className="flex flex-col max-h-[90vh]">
          <div className="overflow-y-auto flex-1">
            {getActionDialogContent()}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
              Cancel
            </Button>
            {selectedAction !== 'view' && selectedAction !== 'manage' && (
              <Button 
                onClick={confirmInstituteAction}
                variant={selectedAction === 'activate' ? 'default' : 'destructive'}
              >
                {selectedAction === 'activate' ? 'Activate' : 'Deactivate'}
              </Button>
            )}
            {(selectedAction === 'manage' || selectedAction === 'view') && (
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

export default SupportInstitutes;
