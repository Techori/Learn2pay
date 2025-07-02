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
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { useToast } from "@/hooks/use-toast";
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
  TrendingUp,
  FileText,
  Plus,
  MoreVertical,
  Filter,
  ArrowUpDown,
} from "lucide-react";

interface SupportInstitutesProps {
  role?: string;
  user?: { name: string };
}

const SupportInstitutes = ({ role = "lead", user }: SupportInstitutesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all"); // Changed from typeFilter to planFilter
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [newInstitute, setNewInstitute] = useState({
    name: "",
    location: "",
    students: "",
    joinedDate: "",
    phone: "",
    email: "",
    monthlyRevenue: "",
    status: "Active",
    plan: "Basic",
    teachers: "",
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
      assignedTo: "Support Team Lead",
    },
    {
      id: "INST-002",
      name: "XYZ Academy",
      location: "Delhi, India",
      students: 800,
      joinedDate: "2024-02-20",
      phone: "+91 9876543210",
      email: "info@xyzacademy.com",
      monthlyRevenue: "₹80,000",
      status: "Active",
      plan: "Standard",
      payment: "Pending",
      teachers: 45,
      totalTickets: 3,
      openTickets: 1,
      assignedTo: "Support Team Lead",
    },
    {
      id: "INST-003",
      name: "Success Coaching Institute",
      location: "Bangalore, Karnataka",
      students: 350,
      joinedDate: "2024-03-10",
      phone: "+91 9876543210",
      email: "contact@successinstitute.com",
      monthlyRevenue: "₹35,000",
      status: "Inactive",
      plan: "Basic",
      payment: "Overdue",
      teachers: 20,
      totalTickets: 8,
      openTickets: 0,
      assignedTo: "Support Team Lead",
    },
    {
      id: "INST-004",
      name: "Test Institute for Team Member",
      location: "Test City",
      students: 100,
      joinedDate: "2024-06-01",
      phone: "+91 9000000000",
      email: "test@institute.com",
      monthlyRevenue: "₹10,000",
      status: "Active",
      plan: "Basic",
      payment: "Paid",
      teachers: 10,
      totalTickets: 1,
      openTickets: 1,
      assignedTo: "Support Team Member",
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
      case "Active":
        return "bg-success text-white";
      case "Inactive":
        return "bg-danger text-white";
      default:
        return "bg-text-secondary text-white";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Premium":
        return "bg-warning text-white";
      case "Standard":
        return "bg-secondary text-white";
      case "Basic":
        return "bg-text-secondary text-white";
      default:
        return "bg-text-secondary text-white";
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case "Paid":
        return "bg-success text-white";
      case "Pending":
        return "bg-warning text-white";
      case "Overdue":
        return "bg-danger text-white";
      default:
        return "bg-text-secondary text-white";
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
    setNewInstitute((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateInstitute = () => {
    if (
      !newInstitute.name ||
      !newInstitute.location ||
      !newInstitute.email ||
      !newInstitute.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId = `INST-${String(institutes.length + 1).padStart(3, "0")}`;
    const institute = {
      id: newId,
      ...newInstitute,
      students: parseInt(newInstitute.students as string),
      teachers: parseInt(newInstitute.teachers as string),
      joinedDate: new Date().toISOString().split("T")[0],
      monthlyRevenue: `₹${(Math.random() * 100000).toFixed(2)}`,
      payment: "Paid",
      totalTickets: 0,
      openTickets: 0,
      assignedTo: user?.name || "Support Team Lead",
    };

    setInstitutes((prevInstitutes) => [institute, ...prevInstitutes]);
    setNewInstitute({
      name: "",
      location: "",
      students: "",
      joinedDate: "",
      phone: "",
      email: "",
      monthlyRevenue: "",
      status: "Active",
      plan: "Basic",
      teachers: "",
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
      case "deactivate":
        updatedInstitutes = institutes.map((inst) =>
          inst.id === selectedInstitute.id
            ? { ...inst, status: "Inactive" }
            : inst
        );
        setInstitutes(updatedInstitutes);
        toast({
          title: "Institute Deactivated",
          description: `Institute ${selectedInstitute.name} has been deactivated.`,
        });
        break;
      case "activate":
        updatedInstitutes = institutes.map((inst) =>
          inst.id === selectedInstitute.id
            ? { ...inst, status: "Active" }
            : inst
        );
        setInstitutes(updatedInstitutes);
        toast({
          title: "Institute Activated",
          description: `Institute ${selectedInstitute.name} has been activated.`,
        });
        break;
      case "manage":
        // This could navigate to a detailed management page or open a more complex dialog
        console.log(`Managing institute: ${selectedInstitute.name}`);
        break;
      default:
        break;
    }

    setIsActionDialogOpen(false);
    setSelectedInstitute(null);
    setSelectedAction("");
  };

  const getActionDialogContent = () => {
    if (!selectedInstitute) return null;

    switch (selectedAction) {
      case "view":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                Institute Details - {selectedInstitute.name}
              </DialogTitle>
              <DialogDescription>
                Full information about the institute
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-semibold">ID:</span>{" "}
                {selectedInstitute.id}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {selectedInstitute.location}
              </div>
              <div>
                <span className="font-semibold">Students:</span>{" "}
                {selectedInstitute.students}
              </div>
              <div>
                <span className="font-semibold">Joined Date:</span>{" "}
                {selectedInstitute.joinedDate}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedInstitute.phone}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedInstitute.email}
              </div>
              <div>
                <span className="font-semibold">Monthly Revenue:</span>{" "}
                {selectedInstitute.monthlyRevenue}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedInstitute.status}
              </div>
              <div>
                <span className="font-semibold">Plan:</span>{" "}
                {selectedInstitute.plan}
              </div>
              <div>
                <span className="font-semibold">Payment Status:</span>{" "}
                {selectedInstitute.payment}
              </div>
              <div>
                <span className="font-semibold">Teachers:</span>{" "}
                {selectedInstitute.teachers}
              </div>
              <div>
                <span className="font-semibold">Total Tickets:</span>{" "}
                {selectedInstitute.totalTickets}
              </div>
              <div>
                <span className="font-semibold">Open Tickets:</span>{" "}
                {selectedInstitute.openTickets}
              </div>
            </div>
          </>
        );
      case "activate":
      case "deactivate":
        return (
          <DialogHeader>
            <DialogTitle>
              {selectedAction === "activate" ? "Activate" : "Deactivate"}{" "}
              Institute - {selectedInstitute.name}?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedAction} this institute? This
              will affect its access and visibility.
            </DialogDescription>
          </DialogHeader>
        );
      case "manage":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                Manage Institute - {selectedInstitute.name}
              </DialogTitle>
              <DialogDescription>
                Detailed management options for {selectedInstitute.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Section: Basic Details */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800/50">
                <h4 className="font-semibold mb-3">Basic Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">ID:</span>{" "}
                    {selectedInstitute.id}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {selectedInstitute.location}
                  </div>
                  <div>
                    <span className="font-medium">Students:</span>{" "}
                    {selectedInstitute.students}
                  </div>
                  <div>
                    <span className="font-medium">Teachers:</span>{" "}
                    {selectedInstitute.teachers}
                  </div>
                  <div>
                    <span className="font-medium">Joined:</span>{" "}
                    {selectedInstitute.joinedDate}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedInstitute.phone}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedInstitute.email}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <Badge
                      className={`${getStatusColor(
                        selectedInstitute.status
                      )} text-white`}
                    >
                      {selectedInstitute.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Plan:</span>{" "}
                    <Badge
                      className={`${getPlanColor(
                        selectedInstitute.plan
                      )} text-white`}
                    >
                      {selectedInstitute.plan}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() =>
                    console.log(
                      `Edit Basic Details for ${selectedInstitute.name}`
                    )
                  }
                >
                  Edit Details
                </Button>
              </div>

              {/* Section: Financial Overview */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800/50">
                <h4 className="font-semibold mb-3">Financial Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Monthly Revenue:</span>{" "}
                    {selectedInstitute.monthlyRevenue}
                  </div>
                  <div>
                    <span className="font-medium">Payment Status:</span>{" "}
                    <Badge
                      className={`${getPaymentColor(
                        selectedInstitute.payment
                      )} text-white`}
                    >
                      {selectedInstitute.payment}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() =>
                    console.log(
                      `View Financial Reports for ${selectedInstitute.name}`
                    )
                  }
                >
                  View Financials
                </Button>
              </div>

              {/* Section: Support Tickets */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800/50">
                <h4 className="font-semibold mb-3">Support Tickets</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Total Tickets:</span>{" "}
                    {selectedInstitute.totalTickets}
                  </div>
                  <div>
                    <span className="font-medium">Open Tickets:</span>{" "}
                    {selectedInstitute.openTickets}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() =>
                    console.log(
                      `View All Tickets for ${selectedInstitute.name}`
                    )
                  }
                >
                  View Tickets
                </Button>
              </div>

              {/* Section: Quick Actions */}
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800/50">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      console.log(
                        `Sending a reminder to ${selectedInstitute.name}`
                      )
                    }
                  >
                    Send Reminder
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      console.log(
                        `Initiating a follow-up for ${selectedInstitute.name}`
                      )
                    }
                  >
                    Schedule Follow-up
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      console.log(`Archiving ${selectedInstitute.name}`)
                    }
                  >
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

  const filteredInstitutes = institutes.filter((institute) => {
    const matchesSearch =
      institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institute.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || institute.status === statusFilter;
    const matchesPlan = planFilter === "all" || institute.plan === planFilter;
    let matchesAssignee = true;
    if (role === "member" && user?.name) {
      matchesAssignee = institute.assignedTo === user.name;
    }
    return matchesSearch && matchesStatus && matchesPlan && matchesAssignee;
  });

  return (
    <div className="space-y-6 p-6 bg-background-color text-text-color min-h-screen">
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <CardTitle className="text-text-color">Institutes</CardTitle>
          <CardDescription className="text-text-secondary">
            Manage and support registered educational institutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-4 w-4" />
              <Input
                placeholder="Search institutes..."
                className="pl-10 bg-input-bg border-input-border text-input-text focus:border-secondary"
              />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="border-border-color text-text-color hover:bg-warning hover:text-white group"
              >
                <Filter className="h-4 w-4 mr-2 text-text-secondary group-hover:text-white" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="border-border-color text-text-color hover:bg-warning hover:text-white group"
              >
                <ArrowUpDown className="h-4 w-4 mr-2 text-text-secondary group-hover:text-white" />
                Sort
              </Button>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-warning hover:bg-warning text-white">
                    <Building className="h-4 w-4 mr-2" />
                    Add Institute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Institute</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new educational institute
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Institute Name</Label>
                      <Input
                        id="name"
                        value={newInstitute.name}
                        onChange={(e) =>
                          handleNewInstituteChange("name", e.target.value)
                        }
                        placeholder="e.g., Bright Minds School"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newInstitute.location}
                        onChange={(e) =>
                          handleNewInstituteChange("location", e.target.value)
                        }
                        placeholder="e.g., Mumbai, Maharashtra"
                      />
                    </div>
                    <div>
                      <Label htmlFor="students">Number of Students</Label>
                      <Input
                        id="students"
                        type="number"
                        value={newInstitute.students}
                        onChange={(e) =>
                          handleNewInstituteChange("students", e.target.value)
                        }
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teachers">Number of Teachers</Label>
                      <Input
                        id="teachers"
                        type="number"
                        value={newInstitute.teachers}
                        onChange={(e) =>
                          handleNewInstituteChange("teachers", e.target.value)
                        }
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={newInstitute.phone}
                        onChange={(e) =>
                          handleNewInstituteChange("phone", e.target.value)
                        }
                        placeholder="e.g., +91 9876543210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newInstitute.email}
                        onChange={(e) =>
                          handleNewInstituteChange("email", e.target.value)
                        }
                        placeholder="e.g., info@institute.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newInstitute.status}
                        onValueChange={(value) =>
                          handleNewInstituteChange("status", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status">
                            {newInstitute.status}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="plan">Plan</Label>
                      <Select
                        value={newInstitute.plan}
                        onValueChange={(value) =>
                          handleNewInstituteChange("plan", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan">
                            {newInstitute.plan}
                          </SelectValue>
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
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
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

          <div className="space-y-4">
            <div className="grid grid-cols-12 text-xs font-semibold text-text-secondary pb-2 border-b border-border-color">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1">Students</div>
              <div className="col-span-2">Tickets</div>
              <div className="col-span-1">Status</div>
            </div>

            {filteredInstitutes.map((institute) => (
              <div
                key={institute.id}
                className="grid grid-cols-12 items-center py-3 px-2 border border-border-color rounded-lg hover:bg-surface-color cursor-pointer"
                onClick={() => handleInstituteAction(institute, "view")}
              >
                <div className="col-span-3">
                  <p className="font-medium text-text-color">{institute.name}</p>
                  <p className="text-xs text-text-secondary">ID: {institute.id}</p>
                </div>
                <div className="col-span-2 text-text-secondary">
                  {institute.location}
                </div>
                <div className="col-span-2 text-text-secondary">
                  {institute.students.toLocaleString()}
                </div>
                <div className="col-span-2">
                  {institute.openTickets > 0 ? (
                    <Badge className="bg-warning text-white">
                      {institute.openTickets}
                    </Badge>
                  ) : (
                    <span className="text-text-secondary">None</span>
                  )}
                </div>
                <div className="col-span-1">
                  <Badge
                    className={`${getStatusColor(institute.status)} text-white`}
                  >
                    {institute.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-text-secondary">
              Showing {filteredInstitutes.length} of {institutes.length}{" "}
              institutes
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border-color text-text-color hover:bg-surface-color"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border-color text-text-color hover:bg-surface-color"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="flex flex-col max-h-[90vh]">
          <div className="overflow-y-auto flex-1">
            {getActionDialogContent()}
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsActionDialogOpen(false)}
            >
              Cancel
            </Button>
            {selectedAction !== "view" && selectedAction !== "manage" && (
              <Button
                onClick={confirmInstituteAction}
                variant={
                  selectedAction === "activate" ? "default" : "destructive"
                }
              >
                {selectedAction === "activate" ? "Activate" : "Deactivate"}
              </Button>
            )}
            {(selectedAction === "manage" || selectedAction === "view") && (
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
