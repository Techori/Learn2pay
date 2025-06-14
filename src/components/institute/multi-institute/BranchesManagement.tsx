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

interface Branch {
  name: string;
  code: string;
  institute: string;
  location: string;
  head: string;
  headContact: string;
  students: number;
  revenue: string;
  status: string;
}

const BranchesManagement = () => {
  const [showAddBranchForm, setShowAddBranchForm] = useState(false);

  const branchOverviewData: Branch[] = [
    {
      name: "NPS - Secondary Campus",
      code: "NPS-SEC",
      institute: "National Public School - Main Campus",
      location: "Dadar",
      head: "Ms. Anjali Mehta",
      headContact: "9123456789",
      students: 600,
      revenue: "₹10.0L",
      status: "Active",
    },
    {
      name: "ECC - Satellite Center",
      code: "ECC-SAT",
      institute: "Excel Coaching Center",
      location: "Borivali",
      head: "Mr. Sanjay Gupta",
      headContact: "9123456788",
      students: 200,
      revenue: "₹3.0L",
      status: "Active",
    },
  ];

  const handleAddBranchClick = () => {
    setShowAddBranchForm(true);
  };

  const handleViewBranch = (branch: Branch) => {
    console.log("View Branch clicked:", branch);
  };

  const handleEditBranch = (branch: Branch) => {
    console.log("Edit Branch clicked:", branch);
  };

  const handleBranchSettings = (branch: Branch) => {
    console.log("Branch Settings clicked:", branch);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Branch Management</h2>
          <p className="text-gray-400">Manage individual branches</p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
          onClick={handleAddBranchClick}
        >
          <Plus className="h-5 w-5" />
          <span>Add New Branch</span>
        </Button>
      </div>

      {showAddBranchForm && (
        <Card className="bg-gray-800/50 border-gray-700 shadow-md p-6 mb-6">
          <CardTitle className="text-white mb-4">Add New Branch</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="branchName" type="text" placeholder="Branch Name" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="branchCode" type="text" placeholder="Branch Code" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="branchInstitute" type="text" placeholder="Parent Institute" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="branchLocation" type="text" placeholder="Location" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="branchHead" type="text" placeholder="Branch Head Name" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
            <Input id="branchHeadContact" type="text" placeholder="Branch Head Contact" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50" onClick={() => setShowAddBranchForm(false)}>Cancel</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => { alert("Branch Added!"); setShowAddBranchForm(false); }}>Add Branch</Button>
          </div>
        </Card>
      )}

      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Branch Overview</CardTitle>
          <CardDescription className="text-gray-400">All branches managed by your institutes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Branch Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Parent Institute</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location & Head</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Students</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Revenue</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {branchOverviewData.map((branch, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{branch.name}</div>
                      <div className="text-xs text-gray-400">{branch.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{branch.institute}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{branch.location}</div>
                      <div className="text-xs text-gray-400">{branch.head}</div>
                      <div className="text-xs text-gray-400">{branch.headContact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{branch.students}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{branch.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={branch.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {branch.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleViewBranch(branch)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleEditBranch(branch)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" className="text-gray-400 hover:text-orange-500" onClick={() => handleBranchSettings(branch)}>
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
    </div>
  );
};

export default BranchesManagement; 