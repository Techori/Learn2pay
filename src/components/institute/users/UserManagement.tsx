import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Users,
  UserCheck,
  UserCog,
  UserX,
  Plus,
  Eye,
  Pencil,
  ShieldOff,
  Ban,
} from 'lucide-react';

const UserManagement = () => {
  const userSummary = [
    {
      icon: Users,
      title: "Total Users",
      value: "24",
      color: "text-blue-400",
    },
    {
      icon: UserCheck,
      title: "Active Users",
      value: "22",
      color: "text-green-400",
    },
    {
      icon: UserCog,
      title: "Admin Roles",
      value: "5",
      color: "text-purple-400",
    },
    {
      icon: UserX,
      title: "Inactive Users",
      value: "2",
      color: "text-orange-400",
    },
  ];

  const systemUsersData = [
    {
      name: "Dr. Rajesh Kumar",
      email: "rajesh@nps.edu",
      contact: "9876543210",
      role: "Principal",
      status: "Active",
      lastLogin: "Today, 9:30 AM",
      permissions: "Full Access",
    },
    {
      name: "Mrs. Priya Sharma",
      email: "priya@nps.edu",
      contact: "9876543211",
      role: "Accountant",
      status: "Active",
      lastLogin: "Today, 8:45 AM",
      permissions: "Fee Management, Reports",
    },
    {
      name: "Mr. Amit Singh",
      email: "amit@nps.edu",
      contact: "9876543212",
      role: "Teacher",
      status: "Active",
      lastLogin: "Yesterday, 6:00 PM",
      permissions: "Student Management, Attendance",
    },
    {
      name: "Ms. Sunita Patel",
      email: "sunita@nps.edu",
      contact: "9876543213",
      role: "Office Staff",
      status: "Inactive",
      lastLogin: "3 days ago",
      permissions: "Basic Access",
    },
  ];

  return (
    <div className="space-y-6">
      {/* User Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400">Manage system users and their permissions</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New User</span>
        </Button>
      </div>

      {/* User Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {userSummary.map((item, index) => (
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

      {/* System Users Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">System Users</CardTitle>
            <p className="text-gray-400 text-sm">Manage all users with access to the system</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Input
              type="text"
              placeholder="Search users by name, email, or role..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-96"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Role</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Status</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Login</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Permissions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {systemUsersData.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={user.role === "Principal" ? "bg-purple-500/20 text-purple-400" : user.role === "Accountant" ? "bg-blue-500/20 text-blue-400" : user.role === "Teacher" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.permissions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <ShieldOff className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Ban className="h-4 w-4" />
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

export default UserManagement; 