import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Building, Plus, Eye, Edit, TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const FranchiseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    performance: 'all',
    location: 'all'
  });

  const franchises = [
    {
      id: 1,
      name: "Mumbai Central",
      owner: "Rajesh Patel",
      location: "Mumbai, Maharashtra",
      phone: "9876543210",
      email: "mumbai@larn2pay.com",
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
      email: "delhi@larn2pay.com",
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
      email: "bangalore@larn2pay.com",
      status: "Under Review",
      performance: "Average",
      revenue: 250000,
      target: 350000,
      institutes: 15,
      students: 650,
      joinDate: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Under Review': return 'bg-warning text-white';
      case 'Suspended': return 'bg-danger text-white';
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

  // Filtered franchises
  const [filteredFranchises, setFilteredFranchises] = useState(franchises);
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
    if (filters.status !== 'all') {
      filtered = filtered.filter(franchise => franchise.status === filters.status);
    }
    if (filters.performance !== 'all') {
      filtered = filtered.filter(franchise => franchise.performance === filters.performance);
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter(franchise => franchise.location === filters.location);
    }
    setFilteredFranchises(filtered);
  }, [searchTerm, filters]);

  // Handle button actions
  const handleView = (franchise: typeof franchises[0]) => {
    alert(`Viewing details for ${franchise.name}`);
  };

  const handleEdit = (franchise: typeof franchises[0]) => {
    alert(`Editing ${franchise.name}`);
  };

  const handlePerformance = (franchise: typeof franchises[0]) => {
    alert(`Checking performance analytics for ${franchise.name}`);
  };

  const handleAddFranchise = () => {
    alert("Adding a new franchise (implement form logic here)");
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      {/* Franchise Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4 flex items-center">
            <Building className="h-8 w-8 text-secondary mr-3" />
            <div>
              <div className="text-2xl font-bold text-text-color">45</div>
              <div className="text-sm text-text-secondary">Total Franchises</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4 flex items-center">
            <DollarSign className="h-8 w-8 text-secondary mr-3" />
            <div>
              <div className="text-2xl font-bold text-text-color">₹25.5L</div>
              <div className="text-sm text-text-secondary">Monthly Revenue</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4 flex items-center">
            <Target className="h-8 w-8 text-secondary mr-3" />
            <div>
              <div className="text-2xl font-bold text-text-color">85%</div>
              <div className="text-sm text-text-secondary">Target Achievement</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-card-border">
          <CardContent className="p-4 flex items-center">
            <Users className="h-8 w-8 text-secondary mr-3" />
            <div>
              <div className="text-2xl font-bold text-text-color">2,880</div>
              <div className="text-sm text-text-secondary">Total Students</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Franchise Management Panel */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color">
                <Building className="h-5 w-5 mr-2 text-secondary" />
                Franchise Management
              </CardTitle>
              <CardDescription className="text-text-secondary">Monitor and manage all Larn2Pay franchise operations</CardDescription>
            </div>
            <Button className="bg-secondary hover:bg-secondary-hover text-text-color" onClick={handleAddFranchise}>
              <Plus className="h-4 w-4 mr-2" />
              Add Franchise
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
                className="pl-10 bg-input-bg border-input-border text-input-text placeholder-text-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-input-bg border border-input-border  text-text-secondary cursor-pointer"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Suspended">Suspended</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-input-bg border border-input-border text-input-text cursor-pointer"
                value={filters.performance}
                onChange={(e) => setFilters({ ...filters, performance: e.target.value })}
              >
                <option value="all">Performance</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-card-bg border border-card-border text-text-secondary cursor-pointer"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="all">Location</option>
                <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                <option value="Delhi, NCR">Delhi, NCR</option>
                <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
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
              {filteredFranchises.map((franchise) => (
                <TableRow key={franchise.id} className="hover:bg-card-hover border-card-border">
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-medium text-text-secondary">{franchise.name}</div>
                      <div className="text-sm text-text-secondary">{franchise.location}</div>
                      <Badge className={getStatusColor(franchise.status)}>
                        {franchise.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-medium text-text-secondary">{franchise.owner}</div>
                      <div className="text-sm text-text-secondary">{franchise.phone}</div>
                      <div className="text-sm text-text-secondary">{franchise.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <Badge className={getPerformanceColor(franchise.performance)}>
                      {franchise.performance}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-semibold">₹{franchise.revenue.toLocaleString()}</div>
                      <div className="text-sm text-text-secondary">Target: ₹{franchise.target.toLocaleString()}</div>
                      <div className="w-full bg-card-bg rounded-full h-2 mt-1">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${(franchise.revenue / franchise.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-medium text-text-secondary">
                        <span className="font-medium text-text-secondary">{franchise.institutes}</span> Institutes
                      </div>
                      <div className="text-sm text-text-secondary">
                        <span className="font-medium text-text-secondary">{franchise.students}</span> Students
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-text-color border-secondary hover:bg-secondary" onClick={() => handleView(franchise)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-text-color border-secondary hover:bg-secondary" onClick={() => handleEdit(franchise)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-text-color border-secondary hover:bg-secondary" onClick={() => handlePerformance(franchise)}>
                        <TrendingUp className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="text-text-color">Top Performing Franchises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {franchises.sort((a, b) => b.revenue - a.revenue).map((franchise, index) => (
                <div key={franchise.id} className="flex items-center justify-between p-3 bg-card-bg rounded">
                  <div className="flex items-center space-x-3">
                    <div className="font-bold text-lg text-secondary">#{index + 1}</div>
                    <div>
                      <div className="font-medium text-text-color">{franchise.name}</div>
                      <div className="text-sm text-text-secondary">
                        {((franchise.revenue / franchise.target) * 100).toFixed(1)}% of target
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-text-color">₹{franchise.revenue.toLocaleString()}</div>
                    <Badge className={getPerformanceColor(franchise.performance)} variant="outline">
                      {franchise.performance}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="text-text-color">Franchise Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-card-bg rounded-lg border-l-4 border-success">
                <div className="font-medium text-success">Revenue Growth</div>
                <div className="text-sm text-text-secondary">
                  Overall franchise revenue up 23% this quarter
                </div>
              </div>
              
              <div className="p-4 bg-card-bg rounded-lg border-l-4 border-secondary">
                <div className="font-medium text-secondary">New Territories</div>
                <div className="text-sm text-text-secondary">
                  3 new franchise applications under review
                </div>
              </div>
              
              <div className="p-4 bg-card-bg rounded-lg border-l-4 border-warning">
                <div className="font-medium text-warning">Support Needed</div>
                <div className="text-sm text-text-secondary">
                  2 franchises need marketing support this month
                </div>
              </div>
              
              <div className="p-4 bg-card-bg rounded-lg border-l-4 border-success">
                <div className="font-medium text-success">Training Sessions</div>
                <div className="text-sm text-text-secondary">
                  Next franchise training scheduled for Feb 15
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseManagement;