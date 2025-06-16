import React, { useState } from "react";
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
  UserPlus,
  Phone,
  Mail,
  Edit,
  Eye,
  Plus,
  MapPin,
  Calendar,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast"; // already imported
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

const LeadsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    location: "",
    status: "",
    source: "",
    lastContact: "",
    followUpDate: "",
    notes: "",
    estimatedValue: "",
  });
  const { toast } = useToast();

  const leads = [
    {
      id: 1,
      name: "Sunrise Public School",
      contact: "Dr. Priya Sharma",
      phone: "+91 9876543210",
      email: "principal@sunriseschool.edu",
      location: "Mumbai, Maharashtra",
      status: "Hot",
      source: "Website",
      lastContact: "2024-01-20",
      followUpDate: "2024-01-22",
      notes: "Interested in comprehensive package",
      estimatedValue: "₹25,000",
    },
    {
      id: 2,
      name: "Excel Coaching Center",
      contact: "Mr. Rajesh Kumar",
      phone: "+91 9876543211",
      email: "info@excelcoaching.com",
      location: "Delhi",
      status: "Warm",
      source: "Referral",
      lastContact: "2024-01-19",
      followUpDate: "2024-01-24",
      notes: "Comparing with competitors",
      estimatedValue: "₹15,000",
    },
    {
      id: 3,
      name: "Modern Academy",
      contact: "Ms. Anita Patel",
      phone: "+91 9876543212",
      email: "director@modernacademy.in",
      location: "Pune, Maharashtra",
      status: "Cold",
      source: "Cold Call",
      lastContact: "2024-01-18",
      followUpDate: "2024-01-25",
      notes: "Budget constraints mentioned",
      estimatedValue: "₹12,000",
    },
    {
      id: 4,
      name: "Brilliant Minds School",
      contact: "Prof. Vikram Singh",
      phone: "+91 9876543213",
      email: "admin@brilliantminds.edu",
      location: "Bangalore, Karnataka",
      status: "Hot",
      source: "Social Media",
      lastContact: "2024-01-21",
      followUpDate: "2024-01-23",
      notes: "Ready for demo",
      estimatedValue: "₹30,000",
    },
  ];

  // Unique filter values
  const statusOptions = Array.from(new Set(leads.map((l) => l.status)));
  const sourceOptions = Array.from(new Set(leads.map((l) => l.source)));
  const locationOptions = Array.from(new Set(leads.map((l) => l.location)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-600 text-white";
      case "Warm":
        return "bg-yellow-400 text-black";
      case "Cold":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Filtering logic
  const filteredLeads = leads.filter(
    (lead) =>
      (statusFilter === null || lead.status === statusFilter) &&
      (sourceFilter === null || lead.source === sourceFilter) &&
      (locationFilter === null || lead.location === locationFilter) &&
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 bg-[#0B0F1A] p-6 text-white min-h-screen">
      {/* Leads Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-400">23</div>
            <div className="text-sm text-gray-400">Hot Leads</div>
            <div className="text-xs text-red-400">High priority</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">45</div>
            <div className="text-sm text-gray-400">Warm Leads</div>
            <div className="text-xs text-yellow-400">Follow up needed</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">78</div>
            <div className="text-sm text-gray-400">Cold Leads</div>
            <div className="text-xs text-blue-400">Nurture required</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2B]">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">156</div>
            <div className="text-sm text-gray-400">Total Leads</div>
            <div className="text-xs text-green-400">This month</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Management */}
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Leads Management</CardTitle>
              <CardDescription className="text-gray-400">
                Track and manage all sales leads
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {/* Add New Lead Dialog */}
              <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setShowAddLead(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Lead
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                  </DialogHeader>
                  <form
                    className="space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Yahan aap lead ko leads array me add kar sakte hain (state me ya API call)
                      toast({ title: "Lead Added", description: newLead.name });
                      setShowAddLead(false);
                      setNewLead({
                        name: "",
                        contact: "",
                        phone: "",
                        email: "",
                        location: "",
                        status: "",
                        source: "",
                        lastContact: "",
                        followUpDate: "",
                        notes: "",
                        estimatedValue: "",
                      });
                    }}
                  >
                    <Input
                      placeholder="Institute Name"
                      required
                      value={newLead.name}
                      onChange={(e) =>
                        setNewLead({ ...newLead, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Contact Person"
                      required
                      value={newLead.contact}
                      onChange={(e) =>
                        setNewLead({ ...newLead, contact: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Phone"
                      required
                      value={newLead.phone}
                      onChange={(e) =>
                        setNewLead({ ...newLead, phone: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Email"
                      required
                      value={newLead.email}
                      onChange={(e) =>
                        setNewLead({ ...newLead, email: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Location"
                      required
                      value={newLead.location}
                      onChange={(e) =>
                        setNewLead({ ...newLead, location: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Status"
                      required
                      value={newLead.status}
                      onChange={(e) =>
                        setNewLead({ ...newLead, status: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Source"
                      required
                      value={newLead.source}
                      onChange={(e) =>
                        setNewLead({ ...newLead, source: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Last Contact Date"
                      type="date"
                      required
                      value={newLead.lastContact}
                      onChange={(e) =>
                        setNewLead({ ...newLead, lastContact: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Follow Up Date"
                      type="date"
                      required
                      value={newLead.followUpDate}
                      onChange={(e) =>
                        setNewLead({ ...newLead, followUpDate: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Notes"
                      value={newLead.notes}
                      onChange={(e) =>
                        setNewLead({ ...newLead, notes: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Estimated Value"
                      required
                      value={newLead.estimatedValue}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          estimatedValue: e.target.value,
                        })
                      }
                    />
                    <Button
                      type="submit"
                      className="bg-orange-500 text-white w-full"
                    >
                      Add Lead
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Import Leads Dialog */}
              <Dialog open={showImport} onOpenChange={setShowImport}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-white border-gray-600"
                    onClick={() => setShowImport(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" /> Import Leads
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Leads</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept=".csv, .xlsx"
                      className="block w-full text-white"
                    />
                    <Button className="bg-blue-500 text-white w-full">
                      Import
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search leads by name, contact, or location..."
                className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={statusFilter || ""}
                onChange={(e) => setStatusFilter(e.target.value || null)}
              >
                <option value="">Status</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Source Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={sourceFilter || ""}
                onChange={(e) => setSourceFilter(e.target.value || null)}
              >
                <option value="">Source</option>
                {sourceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Location Filter Dropdown */}
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={locationFilter || ""}
                onChange={(e) => setLocationFilter(e.target.value || null)}
              >
                <option value="">Location</option>
                {locationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* Reset Filters Button */}
            {(statusFilter || sourceFilter || locationFilter) && (
              <button
                className="px-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 hover:bg-[#2a3352] transition"
                onClick={() => {
                  setStatusFilter(null);
                  setSourceFilter(null);
                  setLocationFilter(null);
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Leads Table */}
          <Table>
            <TableHeader>
              <TableRow className="text-gray-400">
                <TableHead>Institute Details</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Status & Source</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Follow Up</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-[#2A2F3A]">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {lead.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">
                        {lead.contact}
                      </div>
                      <div className="text-sm text-gray-400">{lead.phone}</div>
                      <div className="text-sm text-gray-400">{lead.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      <div className="text-sm text-gray-400">{lead.source}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white">{lead.lastContact}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      {lead.followUpDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-green-400">
                      {lead.estimatedValue}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() =>
                          toast({ title: "Calling", description: lead.phone })
                        }
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() =>
                          toast({
                            title: "Send Email",
                            description: lead.email,
                          })
                        }
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() =>
                          toast({ title: "Edit Lead", description: lead.name })
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-orange-500"
                        onClick={() =>
                          toast({ title: "View Lead", description: lead.name })
                        }
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsManagement;
