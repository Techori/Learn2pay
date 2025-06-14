import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  Building2,
  Users,
  DollarSign,
  Plus,
  Eye,
  Settings,
  Pencil,
} from 'lucide-react';
import BranchesManagement from './BranchesManagement';
import MultiInstituteAnalytics from './MultiInstituteAnalytics';

interface Institute {
  name: string;
  code: string;
  type: string;
  location: string;
  principal: string;
  principalContact: string;
  students: number;
  revenue: string;
  status: string;
}

const MultiInstituteManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('institutes');
  const [showAddInstituteForm, setShowAddInstituteForm] = useState(false);

  const statsData = [
    {
      icon: Building2,
      title: "Total Institutes",
      value: "3",
      color: "text-blue-400",
    },
    {
      icon: Building2,
      title: "Total Branches",
      value: "6",
      color: "text-green-400",
    },
    {
      icon: Users,
      title: "Total Students",
      value: "2,380",
      color: "text-purple-400",
    },
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: "₹45.5L",
      color: "text-orange-400",
    },
  ];

  const instituteOverviewData = [
    {
      name: "National Public School - Main Campus",
      code: "NPS-MAIN",
      type: "School",
      location: "Mumbai Central",
      principal: "Dr. Rajesh Kumar",
      principalContact: "9876543210",
      students: 1250,
      revenue: "₹25.0L",
      status: "Active",
    },
    {
      name: "Excel Coaching Center",
      code: "ECC-001",
      type: "Coaching",
      location: "Andheri West",
      principal: "Prof. Priya Sharma",
      principalContact: "9876543211",
      students: 450,
      revenue: "₹8.5L",
      status: "Active",
    },
    {
      name: "Sunrise College",
      code: "SC-BND",
      type: "College",
      location: "Bandra",
      principal: "Dr. Amit Singh",
      principalContact: "9876543212",
      students: 680,
      revenue: "₹12.0L",
      status: "Suspended",
    },
  ];

  const handleAddInstituteClick = () => {
    setShowAddInstituteForm(true);
  };

  const handleFilterByType = () => {
    console.log("Filter by Type clicked");
    // Mock filtering logic
  };

  const handleFilterByStatus = () => {
    console.log("Filter by Status clicked");
    // Mock filtering logic
  };

  const handleViewInstitute = (institute: Institute) => {
    console.log("View Institute clicked:", institute);
    // Mock view institute logic, e.g., open a modal with institute details
  };

  const handleEditInstitute = (institute: Institute) => {
    console.log("Edit Institute clicked:", institute);
    // Mock edit institute logic, e.g., navigate to an edit form
  };

  const handleInstituteSettings = (institute: Institute) => {
    console.log("Institute Settings clicked:", institute);
    // Mock institute settings logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Multi-Institute Management</h2>
          <p className="text-gray-400">Manage multiple institutes and their branches</p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
          onClick={handleAddInstituteClick}
        >
          <Plus className="h-5 w-5" />
          <span>Add New Institute</span>
        </Button>
      </div>

      {showAddInstituteForm && (
        <Card className="bg-gray-800/50 border-gray-700 shadow-md p-6 mb-6">
          <CardTitle className="text-white mb-4">Add New Institute</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="instituteName" type="text" placeholder="Institute Name" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="instituteCode" type="text" placeholder="Institute Code" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="instituteType" type="text" placeholder="Type (e.g., School, Coaching)" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="instituteLocation" type="text" placeholder="Location" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="principalName" type="text" placeholder="Principal Name" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="principalContact" type="text" placeholder="Principal Contact" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50" onClick={() => setShowAddInstituteForm(false)}>Cancel</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => { alert("Institute Added!"); setShowAddInstituteForm(false); }}>Add Institute</Button>
          </div>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.color.replace('text', 'bg')}/20`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner Tabs and Filters */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="grid grid-cols-3 bg-gray-800 p-1 rounded-md">
            <TabsTrigger value="institutes" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Institutes
            </TabsTrigger>
            <TabsTrigger value="branches" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Branches
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Input
              id="searchInstitutes"
              type="text"
              placeholder="Search institutes..."
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-64"
            />
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50" onClick={handleFilterByType}>
              Filter by Type
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50" onClick={handleFilterByStatus}>
              Filter by Status
            </Button>
          </div>
        </div>

        {/* Institutes Tab Content */}
        <TabsContent value="institutes">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-white">Institute Overview</CardTitle>
              <CardDescription className="text-gray-400">All institutes under your management</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Institute Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type & Location</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Principal</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Students</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {instituteOverviewData.map((institute, index) => (
                      <tr key={index} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{institute.name}</div>
                          <div className="text-xs text-gray-400">{institute.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{institute.type}</div>
                          <div className="text-xs text-gray-400">{institute.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{institute.principal}</div>
                          <div className="text-xs text-gray-400">{institute.principalContact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{institute.students}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{institute.revenue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={institute.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                            {institute.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleViewInstitute(institute as Institute)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleEditInstitute(institute as Institute)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleInstituteSettings(institute as Institute)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branches Tab Content (Placeholder) */}
        <TabsContent value="branches">
          <BranchesManagement />
        </TabsContent>

        {/* Analytics Tab Content (Placeholder) */}
        <TabsContent value="analytics">
          <MultiInstituteAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiInstituteManagement; 