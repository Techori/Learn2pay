import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { RefreshCw, Filter, Clock, Download } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { jsPDF } from "jspdf";

interface Activity {
  type: string;
  name: string;
  time: string;
  status: 'success' | 'error' | 'info';
}

type FilterType = 'all' | 'success' | 'error' | 'info';

const AdminActivities = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([
    { type: "User Registered", name: "Raj Kumar - Mumbai", time: "2 min ago", status: "success" },
    { type: "Fraud Alert", name: "Suspicious login detected", time: "5 min ago", status: "error" },
    { type: "Vendor Added", name: "Tech Solutions Pvt Ltd", time: "10 min ago", status: "info" },
    { type: "Payment Received", name: "₹45,000 from Delhi Franchise", time: "15 min ago", status: "success" }
  ]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  useEffect(() => {
    filterActivities(activeFilter);
  }, [activities, activeFilter]);

  const filterActivities = (filter: FilterType) => {
    if (filter === 'all') {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter(activity => activity.status === filter));
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call to fetch new activities
    setTimeout(() => {
      const newActivity: Activity = {
        type: "New Login",
        name: "Admin user from Hyderabad",
        time: "Just now",
        status: "info"
      };
      setActivities([newActivity, ...activities.slice(0, activities.length - 1)]);
      setIsLoading(false);
      toast({
        title: "Activities Refreshed",
        description: "Latest activities have been loaded."
      });
    }, 1000);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Recent Activities Report", 10, 10);
    
    let yPos = 30;
    filteredActivities.forEach((activity, index) => {
      doc.text(`${index + 1}. ${activity.type}: ${activity.name} (${activity.time})`, 10, yPos);
      yPos += 10;
    });
    
    doc.save("recent-activities.pdf");
    toast({
      title: "Report Downloaded",
      description: "Activities report has been exported to PDF."
    });
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'var(--success)';
      case 'error':
        return 'var(--danger)';
      case 'info':
      default:
        return 'var(--secondary)';
    }
  };

  return (
    <Card className="bg-surface border-color backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Today's Highlights</CardTitle>
          <CardDescription className="text-secondary">Real-time platform activity</CardDescription>
        </div>
        <div className="flex space-x-2">
          <div className="flex bg-input-bg rounded-md p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${activeFilter === 'all' ? 'bg-[var(--surface-color)] text-[var(--text-color)]' : 'text-secondary hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]'}`}
              onClick={() => handleFilterChange('all')}
            >
              All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${activeFilter === 'success' ? 'bg-[var(--surface-color)] text-[var(--text-color)]' : 'text-secondary hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]'}`}
              onClick={() => handleFilterChange('success')}
            >
              Success
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${activeFilter === 'error' ? 'bg-[var(--surface-color)] text-[var(--text-color)]' : 'text-secondary hover:text-[var(--text-color)] hover:bg-[var(--surface-color)]'}`}
              onClick={() => handleFilterChange('error')}
            >
              Issues
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2 text-secondary" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 text-secondary ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-4 text-secondary">No activities found with the selected filter.</div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[var(--input-bg)] rounded-lg border border-[var(--border-color)] hover:bg-[var(--surface-color)] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getStatusColor(activity.status) }}></div>
                  <div>
                    <div className="font-medium">{activity.type}</div>
                    <div className="text-sm text-secondary">{activity.name}</div>
                  </div>
                </div>
                <div className="text-right flex items-center">
                  <Clock className="h-3.5 w-3.5 text-secondary mr-1" />
                  <div className="text-xs text-secondary">{activity.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActivities;
