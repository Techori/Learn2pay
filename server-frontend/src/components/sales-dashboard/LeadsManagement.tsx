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
        return "bg-red-600";
      case "Contacted":
        return "bg-yellow-500";
      case "KYC Submitted":
        return "bg-blue-500";
      case "Onboarded":
        return "bg-green-500";
      default:
        return "bg-gray-500";
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
    <div className="space-y-6 bg-[#0B0F1A] p-6 text-white min-h-screen">
      {/* Filters and Add Lead */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search leads..."
            className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
          />
        </div>
        <div className="relative">
          <select
            className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
            value={salespersonFilter || ""}
            onChange={(e) => setSalespersonFilter(e.target.value || null)}
          >
            <option value="">Salesperson</option>
            {salespersonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
            value={stageFilter || ""}
            onChange={(e) => setStageFilter(e.target.value || null)}
          >
            <option value="">Stage</option>
            {stageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="flex space-x-2">
          <Input
            type="date"
            className="bg-[#232b45] border border-[#232b45] text-white"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            type="date"
            className="bg-[#232b45] border border-[#232b45] text-white"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        {(salespersonFilter || stageFilter || dateFrom || dateTo) && (
          <button
            className="px-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 hover:bg-[#2a3352] transition"
            onClick={() => {
              setSalespersonFilter(null);
              setStageFilter(null);
              setDateFrom("");
              setDateTo("");
            }}
          >
            Reset Filters
          </button>
        )}
        <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleAddLead}>
              <Input
                placeholder="Lead Name"
                required
                value={newLead.name}
                onChange={(e) =>
                  setNewLead({ ...newLead, name: e.target.value })
                }
              />
              <Input
                placeholder="Salesperson"
                required
                value={newLead.salesperson}
                onChange={(e) =>
                  setNewLead({ ...newLead, salesperson: e.target.value })
                }
              />
              <Input
                type="date"
                placeholder="Date Added"
                required
                value={newLead.dateAdded}
                onChange={(e) =>
                  setNewLead({ ...newLead, dateAdded: e.target.value })
                }
              />
              <Input
                placeholder="School/Institute"
                required
                value={newLead.schoolInstitute}
                onChange={(e) =>
                  setNewLead({ ...newLead, schoolInstitute: e.target.value })
                }
              />
              <select
                className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white"
                value={newLead.stage}
                onChange={(e) =>
                  setNewLead({ ...newLead, stage: e.target.value as Lead["stage"] })
                }
              >
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-white"
                value={newLead.priority}
                onChange={(e) =>
                  setNewLead({ ...newLead, priority: e.target.value as Lead["priority"] })
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <Input
                type="date"
                placeholder="Last Activity"
                required
                value={newLead.lastActivity}
                onChange={(e) =>
                  setNewLead({ ...newLead, lastActivity: e.target.value })
                }
              />
              <Button type="submit" className="bg-orange-500 text-white w-full">
                Add Lead
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leads Table */}
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <CardTitle className="text-white">Leads Management</CardTitle>
          <CardDescription className="text-gray-400">
            Track and manage all sales leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-gray-400">
                <TableHead className="w-[100px]">
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("id")}
                  >
                    ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("name")}
                  >
                    Lead Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("salesperson")}
                  >
                    Salesperson
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("dateAdded")}
                  >
                    Date Added
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("schoolInstitute")}
                  >
                    School/Institute
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("stage")}
                  >
                    Stage
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    className="flex items-center"
                    onClick={() => requestSort("priority")}
                  >
                    Priority
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-[#2A2F3A]">
                  <TableCell className="font-medium">{lead.id}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.salesperson}</TableCell>
                  <TableCell>{lead.dateAdded}</TableCell>
                  <TableCell>{lead.schoolInstitute}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(lead.stage) + " text-white"}>
                      {lead.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        lead.priority === "High"
                          ? "bg-red-600"
                          : lead.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } text-white`}
                    >
                      {lead.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() => {
                          toast({
                            title: "View Details",
                            description: JSON.stringify(lead, null, 2),
                          });
                        }}
                      >
                        <Eye className="h-3 w-3" /> View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() => {
                          toast({
                            title: "Message Sent",
                            description: `Message to ${lead.salesperson} initiated.`,
                          });
                        }}
                      >
                        <MessageCircle className="h-3 w-3" /> Message
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-[#2A2F3A] font-semibold">
                <TableCell>Total</TableCell>
                <TableCell>{totalLeads}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {highPriority} High, {mediumPriority} Medium, {lowPriority} Low
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManagement;