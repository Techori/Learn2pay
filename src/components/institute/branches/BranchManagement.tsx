import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Building2,
  Users,
  MapPin,
  Briefcase,
  Plus,
  Eye,
  Pencil,
  Settings,
  Search,
  Filter,
} from 'lucide-react';

const BranchManagement = () => {
  const branchSummary = [
    {
      icon: Building2,
      title: "Total Branches",
      value: "4",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Total Students",
      value: "1,280",
      color: "text-green-400",
    },
    {
      icon: MapPin,
      title: "Active Locations",
      value: "3",
      color: "text-purple-400",
    },
    {
      icon: Briefcase,
      title: "Total Staff",
      value: "95",
      color: "text-orange-400",
    },
  ];

  const branchDirectoryData = [
    {
      branchName: "Main Campus",
      branchCode: "NPS-MAIN",
      estYear: "2010",
      address: "123 Main Street, Mumbai Central",
      managerName: "Dr. Rajesh Kumar",
      managerPhone: "9876543210",
      students: "650",
      staff: "45",
      status: "Active",
    },
    {
      branchName: "Andheri Branch",
      branchCode: "NPS-AND",
      estYear: "2018",
      address: "456 Andheri West, Mumbai",
      managerName: "Mrs. Sunita Patel",
      managerPhone: "9876543211",
      students: "350",
      staff: "25",
      status: "Active",
    },
    {
      branchName: "Bandra Branch",
      branchCode: "NPS-BND",
      estYear: "2020",
      address: "789 Bandra East, Mumbai",
      managerName: "Mr. Ravi Kumar",
      managerPhone: "9876543212",
      students: "280",
      staff: "20",
      status: "Active",
    },
    {
      branchName: "Powai Branch",
      branchCode: "NPS-POW",
      estYear: "2024",
      address: "101 Powai, Mumbai",
      managerName: "Mrs. Neha Desai",
      managerPhone: "9876543213",
      students: "0",
      staff: "5",
      status: "Under Construction",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Branch Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Branch Management</h2>
          <p className="text-gray-400">Manage all institute branches and locations</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Branch</span>
        </Button>
      </div>

      {/* Branch Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {branchSummary.map((item, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${item.color.replace('text', 'bg')}/20`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch Overview Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">Branch Overview</CardTitle>
            <p className="text-gray-400 text-sm">All institute branches and their details</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search branches by name, code, or location..."
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter by Status</span>
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter by Location</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Branch Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Manager</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Students</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Staff</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {branchDirectoryData.map((branch, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{branch.branchName}</div>
                      <div className="text-xs text-gray-400">{branch.branchCode} | Est. {branch.estYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{branch.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{branch.managerName}</div>
                      <div className="text-xs text-gray-400">{branch.managerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{branch.students}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{branch.staff}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={branch.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {branch.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
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

export default BranchManagement; 