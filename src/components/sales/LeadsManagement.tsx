import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/Table';
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
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast'; // Adjust path as needed

const LeadsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const leads = [
    {
      id: 1,
      name: 'Sunrise Public School',
      contact: 'Dr. Priya Sharma',
      phone: '+91 9876543210',
      email: 'principal@sunriseschool.edu',
      location: 'Mumbai, Maharashtra',
      status: 'Hot',
      source: 'Website',
      lastContact: '2024-01-20',
      followUpDate: '2024-01-22',
      notes: 'Interested in comprehensive package',
      estimatedValue: '₹25,000',
    },
    {
      id: 2,
      name: 'Excel Coaching Center',
      contact: 'Mr. Rajesh Kumar',
      phone: '+91 9876543211',
      email: 'info@excelcoaching.com',
      location: 'Delhi',
      status: 'Warm',
      source: 'Referral',
      lastContact: '2024-01-19',
      followUpDate: '2024-01-24',
      notes: 'Comparing with competitors',
      estimatedValue: '₹15,000',
    },
    {
      id: 3,
      name: 'Modern Academy',
      contact: 'Ms. Anita Patel',
      phone: '+91 9876543212',
      email: 'director@modernacademy.in',
      location: 'Pune, Maharashtra',
      status: 'Cold',
      source: 'Cold Call',
      lastContact: '2024-01-18',
      followUpDate: '2024-01-25',
      notes: 'Budget constraints mentioned',
      estimatedValue: '₹12,000',
    },
    {
      id: 4,
      name: 'Brilliant Minds School',
      contact: 'Prof. Vikram Singh',
      phone: '+91 9876543213',
      email: 'admin@brilliantminds.edu',
      location: 'Bangalore, Karnataka',
      status: 'Hot',
      source: 'Social Media',
      lastContact: '2024-01-21',
      followUpDate: '2024-01-23',
      notes: 'Ready for demo',
      estimatedValue: '₹30,000',
    },
  ];

  // Unique filter values
  const statusOptions = Array.from(new Set(leads.map((l) => l.status)));
  const sourceOptions = Array.from(new Set(leads.map((l) => l.source)));
  const locationOptions = Array.from(new Set(leads.map((l) => l.location)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot':
        return 'bg-red-600 text-white';
      case 'Warm':
        return 'bg-yellow-400 text-black';
      case 'Cold':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Filtering logic
  const filteredLeads = leads.filter(
    (lead) =>
      (statusFilter === null || lead.status === statusFilter) &&
      (sourceFilter === null || lead.source === sourceFilter) &&
      (locationFilter === null || lead.location === locationFilter) &&
      (
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => toast({ title: "Add New Lead", description: "Lead creation modal will open." })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New Lead
              </Button>
              <Button
                variant="outline"
                className="text-white border-gray-600"
                onClick={() => toast({ title: "Import Leads", description: "Import leads modal will open." })}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Import Leads
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
                placeholder="Search leads by name, contact, or location..."
                className="pl-10 bg-[#0B0F1A] text-white border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Status Filter Dropdown */}
            <div className="relative">
              <Button
                variant={statusFilter ? "default" : "outline"}
                className={`text-white border-gray-600 flex items-center ${statusFilter ? "bg-orange-500" : ""}`}
              >
                <Filter className="h-4 w-4 mr-2" /> 
                <span>{statusFilter ? statusFilter : "Status"}</span>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={statusFilter || ""}
                  onChange={e => setStatusFilter(e.target.value || null)}
                >
                  <option value="">All</option>
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Button>
            </div>
            {/* Source Filter Dropdown */}
            <div className="relative">
              <Button
                variant={sourceFilter ? "default" : "outline"}
                className={`text-white border-gray-600 flex items-center ${sourceFilter ? "bg-orange-500" : ""}`}
              >
                <Filter className="h-4 w-4 mr-2" /> 
                <span>{sourceFilter ? sourceFilter : "Source"}</span>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={sourceFilter || ""}
                  onChange={e => setSourceFilter(e.target.value || null)}
                >
                  <option value="">All</option>
                  {sourceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Button>
            </div>
            {/* Location Filter Dropdown */}
            <div className="relative">
              <Button
                variant={locationFilter ? "default" : "outline"}
                className={`text-white border-gray-600 flex items-center ${locationFilter ? "bg-orange-500" : ""}`}
              >
                <Filter className="h-4 w-4 mr-2" /> 
                <span>{locationFilter ? locationFilter : "Location"}</span>
                <select
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={locationFilter || ""}
                  onChange={e => setLocationFilter(e.target.value || null)}
                >
                  <option value="">All</option>
                  {locationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </Button>
            </div>
            {/* Reset Filters Button */}
            {(statusFilter || sourceFilter || locationFilter) && (
              <Button
                variant="outline"
                className="text-white border-gray-600"
                onClick={() => {
                  setStatusFilter(null);
                  setSourceFilter(null);
                  setLocationFilter(null);
                }}
              >
                Reset Filters
              </Button>
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
                      <div className="font-medium text-white">{lead.contact}</div>
                      <div className="text-sm text-gray-400">{lead.phone}</div>
                      <div className="text-sm text-gray-400">{lead.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
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
                        className="text-white border-gray-600"
                        onClick={() => toast({ title: "Calling", description: lead.phone })}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-gray-600"
                        onClick={() => toast({ title: "Send Email", description: lead.email })}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-gray-600"
                        onClick={() => toast({ title: "Edit Lead", description: lead.name })}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-gray-600"
                        onClick={() => toast({ title: "View Lead", description: lead.name })}
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