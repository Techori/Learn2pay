import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  UserCog,
  UserCheck,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Download,
  Filter,
} from 'lucide-react';

const StaffManagement = () => {
  const staffSummary = [
    {
      icon: Users,
      title: "Total Staff",
      value: "25",
      color: "text-blue-400",
    },
    {
      icon: UserCheck,
      title: "Teaching Staff",
      value: "18",
      color: "text-green-400",
    },
    {
      icon: UserCog,
      title: "Non-Teaching Staff",
      value: "7",
      color: "text-purple-400",
    },
    {
      icon: UserCheck,
      title: "Present Today",
      value: "23",
      color: "text-orange-400",
    },
  ];

  const staffDirectoryData = [
    {
      staffId: "TCH001",
      name: "Dr. Rajesh Kumar",
      role: "Principal",
      department: "Administration",
      contactPhone: "+91 98765 43210",
      contactEmail: "rajesh@school.com",
      experience: "15 years",
      status: "active",
    },
    {
      staffId: "TCH002",
      name: "Mrs. Sunita Sharma",
      role: "Mathematics Teacher",
      department: "Mathematics",
      contactPhone: "+91 98765 43211",
      contactEmail: "sunita@school.com",
      experience: "8 years",
      status: "active",
    },
    {
      staffId: "TCH003",
      name: "Mr. Amit Patel",
      role: "Physics Teacher",
      department: "Science",
      contactPhone: "+91 98765 43212",
      contactEmail: "amit@school.com",
      experience: "5 years",
      status: "active",
    },
    {
      staffId: "TCH004",
      name: "Ms. Priya Singh",
      role: "English Teacher",
      department: "Languages",
      contactPhone: "+91 98765 43213",
      contactEmail: "priya@school.com",
      experience: "3 years",
      status: "leave",
    },
    {
      staffId: "ADM001",
      name: "Mr. Ravi Kumar",
      role: "Accountant",
      department: "Administration",
      contactPhone: "+91 98765 43214",
      contactEmail: "ravi@school.com",
      experience: "10 years",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Staff Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Staff Management</h2>
          <p className="text-gray-400">Manage teaching and non-teaching staff</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {/* Staff Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {staffSummary.map((item, index) => (
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

      {/* Staff Directory Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">Staff Directory</CardTitle>
            <p className="text-gray-400 text-sm">Complete staff information and contact details</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Input
              type="text"
              placeholder="Search staff..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-80"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">All Departments</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Staff ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Experience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {staffDirectoryData.map((staff, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{staff.staffId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{staff.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{staff.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{staff.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{staff.contactPhone}</div>
                      <div className="text-xs text-gray-400">{staff.contactEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{staff.experience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={staff.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {staff.status}
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
                          <Trash2 className="h-4 w-4" />
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

export default StaffManagement; 