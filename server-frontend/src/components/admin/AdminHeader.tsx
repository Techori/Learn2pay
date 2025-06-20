import React, { useState } from 'react';
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Filter, Search, Download, Bell } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";

interface GlobalFilter {
  section: string;
  timeframe: string;
  status: string;
}

interface AdminHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters?: GlobalFilter;
  onFilterChange?: (section: string, timeframe: string, status: string) => void;
}

const AdminHeader = ({ 
  searchTerm, 
  onSearchChange, 
  filters = { section: 'all', timeframe: 'all', status: 'all' },
  onFilterChange
}: AdminHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(filters.section);
  const [selectedTimeframe, setSelectedTimeframe] = useState(filters.timeframe);
  const [selectedStatus, setSelectedStatus] = useState(filters.status);
  const { toast } = useToast();
  
  // Update local state when global filters change
  React.useEffect(() => {
    setSelectedSection(filters.section);
    setSelectedTimeframe(filters.timeframe);
    setSelectedStatus(filters.status);
  }, [filters]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    // In a real app, this would trigger a global search across sections
    if (e.target.value.length > 2) {
      toast({
        title: "Searching...",
        description: `Searching for "${e.target.value}" across dashboard`,
      });
    }
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Generating dashboard export report",
    });
    // In a real app, this would trigger an export of the current dashboard data
  };
  
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(selectedSection, selectedTimeframe, selectedStatus);
    }
    setIsFilterOpen(false);
  };
  
  const resetFilters = () => {
    setSelectedSection('all');
    setSelectedTimeframe('all');
    setSelectedStatus('all');
    
    if (onFilterChange) {
      onFilterChange('all', 'all', 'all');
    }
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared",
    });
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">
          Super Admin Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-gray-700 text-gray-200">Real-Time</Badge>
          <Badge className="bg-orange-500 text-white">360° Control</Badge>
          <Badge className="bg-gray-800 text-gray-200 border border-gray-700">Super Admin</Badge>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Global search..." 
            className="pl-10 w-64 bg-gray-800 border-gray-700 text-gray-200 focus:border-orange-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-200 hover:bg-gray-700">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              Filters
              {(selectedSection !== 'all' || selectedTimeframe !== 'all' || selectedStatus !== 'all') && (
                <Badge className="ml-2 bg-orange-500 text-white">Active</Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Global Filters</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Section</label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="institutes">Institutes</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="transactions">Transactions</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Timeframe</label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="this_year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={resetFilters} className="border-gray-600 text-gray-200 hover:bg-gray-700">
                  Reset
                </Button>
                <Button onClick={applyFilters} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-700 text-gray-200 hover:bg-gray-700"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2 text-gray-400" />
          Export
        </Button>
        
        <Button variant="outline" size="sm" className="border-gray-700 text-gray-200 hover:bg-gray-700 relative">
          <Bell className="h-4 w-4 text-gray-400" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 text-white">12</Badge>
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
