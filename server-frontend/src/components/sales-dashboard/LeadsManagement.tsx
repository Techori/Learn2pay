import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  Plus,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface Lead {
  id: number;
  name: string;
  salesperson: string;
  dateAdded: string;
  schoolInstitute: string;
  stage: "New" | "Contacted" | "KYC Submitted" | "Onboarded";
  priority: "High" | "Medium" | "Low";
  lastActivity: string;
}

const LeadsManagement = () => {
  const { toast } = useToast();

  // State for filters, sorting, and new lead form
  const [salespersonFilter, setSalespersonFilter] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState<Lead>({
    id: Date.now(),
    name: "",
    salesperson: "",
    dateAdded: "",
    schoolInstitute: "",
    stage: "New",
    priority: "Medium",
    lastActivity: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);

  // Dummy data
  const leads: Lead[] = [
    {
      id: 1,
      name: "Raj School Pvt Ltd",
      salesperson: "Priya Sharma",
      dateAdded: "2025-06-20",
      schoolInstitute: "Raj School",
      stage: "New",
      priority: "High",
      lastActivity: "2025-06-22",
    },
    {
      id: 2,
      name: "Excel Academy",
      salesperson: "Rajesh Kumar",
      dateAdded: "2025-06-21",
      schoolInstitute: "Excel Coaching",
      stage: "Contacted",
      priority: "Medium",
      lastActivity: "2025-06-23",
    },
    {
      id: 3,
      name: "Modern Institute",
      salesperson: "Anita Patel",
      dateAdded: "2025-06-22",
      schoolInstitute: "Modern Academy",
      stage: "KYC Submitted",
      priority: "Low",
      lastActivity: "2025-06-24",
    },
    {
      id: 4,
      name: "Bright Future School",
      salesperson: "Vikram Singh",
      dateAdded: "2025-06-23",
      schoolInstitute: "Bright Minds",
      stage: "Onboarded",
      priority: "High",
      lastActivity: "2025-06-24",
    },
  ];

  // Unique filter values
  const salespersonOptions = Array.from(new Set(leads.map((l) => l.salesperson)));
  const stageOptions = ["New", "Contacted", "KYC Submitted", "Onboarded"];

  // Filtering and sorting logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSalesperson =
      !salespersonFilter || lead.salesperson === salespersonFilter;
    const matchesStage = !stageFilter || lead.stage === stageFilter;
    const matchesDate =
      (!dateFrom || new Date(lead.dateAdded) >= new Date(dateFrom)) &&
      (!dateTo || new Date(lead.dateAdded) <= new Date(dateTo));
    return matchesSalesperson && matchesStage && matchesDate;
  });

  const sortedLeads = React.useMemo(() => {
    let sortableLeads = [...filteredLeads];
    if (sortConfig !== null) {
      sortableLeads.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLeads;
  }, [filteredLeads, sortConfig]);

  // Summary data
  const totalLeads = sortedLeads.length;
  const highPriority = sortedLeads.filter((l) => l.priority === "High").length;
  const mediumPriority = sortedLeads.filter((l) => l.priority === "Medium").length;
  const lowPriority = sortedLeads.filter((l) => l.priority === "Low").length;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "New":
        return "bg-primary";
      case "Contacted":
        return "bg-warning";
      case "KYC Submitted":
        return "bg-secondary";
      case "Onboarded":
        return "bg-success";
      default:
        return "bg-text-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-danger";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-success";
      default:
        return "text-text-secondary";
    }
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newLead.name ||
      !newLead.salesperson ||
      !newLead.dateAdded ||
      !newLead.schoolInstitute ||
      !newLead.lastActivity
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you'd add this to a state or API
    toast({
      title: "Lead Added",
      description: `Added ${newLead.name} at ${new Date().toLocaleString(
        "en-IN",
        { timeZone: "Asia/Kolkata" }
      ).replace(",", " ")}.`,
    });
    setShowAddLead(false);
    setNewLead({
      id: Date.now(),
      name: "",
      salesperson: "",
      dateAdded: "",
      schoolInstitute: "",
      stage: "New",
      priority: "Medium",
      lastActivity: "",
    });
  };

  const requestSort = (key: keyof Lead) => {
    setSortConfig((prev) =>
      prev && prev.key === key && prev.direction === "asc"
        ? { key, direction: "desc" }
        : { key, direction: "asc" }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Lead Management</h2>
          <p className="text-text-secondary">Track and manage all sales leads</p>
        </div>
        <Button onClick={() => setShowAddLead(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Lead
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Total Leads</p>
                <h3 className="text-2xl font-bold">{totalLeads}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">High Priority</p>
                <h3 className="text-2xl font-bold text-danger">{highPriority}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Medium Priority</p>
                <h3 className="text-2xl font-bold text-warning">{mediumPriority}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <p className="text-sm text-text-secondary">Low Priority</p>
                <h3 className="text-2xl font-bold text-success">{lowPriority}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-text-secondary" />
                <Input
                  className="pl-8"
                  placeholder="Search leads..."
                  onChange={(e) => {
                    // Add your search logic here
                  }}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Salesperson</label>
              <select
                className="w-full p-2 border rounded border-input-border bg-input-bg text-text"
                value={salespersonFilter || ""}
                onChange={(e) => setSalespersonFilter(e.target.value || null)}
              >
                <option value="">All Salespersons</option>
                {salespersonOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Stage</label>
              <select
                className="w-full p-2 border rounded border-input-border bg-input-bg text-text"
                value={stageFilter || ""}
                onChange={(e) => setStageFilter(e.target.value || null)}
              >
                <option value="">All Stages</option>
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date Added</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-1/2"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({sortedLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-card-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-card-bg/50">
                  <TableHead className="w-[180px]" onClick={() => requestSort("name")}>
                    <div className="flex items-center">
                      Lead Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]" onClick={() => requestSort("salesperson")}>
                    <div className="flex items-center">
                      Salesperson
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px]" onClick={() => requestSort("dateAdded")}>
                    <div className="flex items-center">
                      Date Added
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]">Institute</TableHead>
                  <TableHead className="w-[120px]" onClick={() => requestSort("stage")}>
                    <div className="flex items-center">
                      Stage
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]" onClick={() => requestSort("priority")}>
                    <div className="flex items-center">
                      Priority
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]" onClick={() => requestSort("lastActivity")}>
                    <div className="flex items-center">
                      Last Activity
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-card-bg/50">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.salesperson}</TableCell>
                    <TableCell>{new Date(lead.dateAdded).toLocaleDateString()}</TableCell>
                    <TableCell>{lead.schoolInstitute}</TableCell>
                    <TableCell>
                      <Badge className={getStageColor(lead.stage)}>
                        {lead.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className={getPriorityColor(lead.priority)}>
                      {lead.priority}
                    </TableCell>
                    <TableCell>{new Date(lead.lastActivity).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          toast({
                            title: "View Lead",
                            description: `Viewing ${lead.name}`,
                          });
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          toast({
                            title: "Contact Lead",
                            description: `Contacting ${lead.name}`,
                          });
                        }}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {sortedLeads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-text-secondary">
                      No leads found matching the criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Lead Dialog */}
      <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddLead} className="space-y-4">
            {/* Form fields go here */}
            {/* ... */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddLead(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Lead</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsManagement;