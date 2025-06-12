import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
  Plus,
  Upload,
  Eye,
  Pencil,
} from 'lucide-react';

const StudentManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('all-students');

  const studentSummary = [
    {
      icon: Users,
      title: "Total Students",
      value: "1,250",
      description: "+25 this month",
      color: "text-blue-400",
    },
    {
      icon: UserCheck,
      title: "Active Students",
      value: "1,189",
      description: "95.1% active rate",
      color: "text-green-400",
    },
    {
      icon: UserPlus,
      title: "New Admissions",
      value: "45",
      description: "This month",
      color: "text-orange-400",
    },
    {
      icon: GraduationCap,
      title: "Avg. Attendance",
      value: "92.5%",
      description: "School-wide",
      color: "text-purple-400",
    },
  ];

  const allStudentsData = [
    {
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      class: "10th A",
      roll: "15",
      parentName: "Suresh Kumar",
      parentContact: "9876543210",
      parentEmail: "rajesh@email.com",
      status: "Active",
      feeStatus: "Paid",
      attendance: "95%",
    },
    {
      studentName: "Priya Sharma",
      studentId: "STU002",
      class: "10th A",
      roll: "18",
      parentName: "Amit Sharma",
      parentContact: "9876543211",
      parentEmail: "priya@email.com",
      status: "Active",
      feeStatus: "Pending",
      attendance: "92%",
    },
    {
      studentName: "Arjun Singh",
      studentId: "STU003",
      class: "9th B",
      roll: "22",
      parentName: "Vikram Singh",
      parentContact: "9876543212",
      parentEmail: "arjun@email.com",
      status: "Active",
      feeStatus: "Paid",
      attendance: "88%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Student Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {studentSummary.map((item, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${item.color.replace('text', 'bg')}/20`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner Tabs for Student Management */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-md">
          <TabsTrigger value="all-students" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            All Students
          </TabsTrigger>
          <TabsTrigger value="admissions" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Admissions
          </TabsTrigger>
          <TabsTrigger value="transfers" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Transfers
          </TabsTrigger>
          <TabsTrigger value="alumni" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Alumni
          </TabsTrigger>
        </TabsList>

        {/* All Students Tab Content */}
        <TabsContent value="all-students">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">Student Management</CardTitle>
                <p className="text-gray-400 text-sm">Manage all student records and information</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Student</span>
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <Input
                  type="text"
                  placeholder="Search by name, admission number, or class..."
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-96"
                />
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Class</Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Status</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Class & Roll No</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Parent Info</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fee Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Attendance</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {allStudentsData.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{student.studentName}</div>
                          <div className="text-xs text-gray-400">{student.studentId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {student.class}<br/>Roll: {student.roll}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{student.parentName}</div>
                          <div className="text-xs text-gray-400">{student.parentContact}</div>
                          <div className="text-xs text-gray-400">{student.parentEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          <div className="text-sm text-white">{student.parentContact}</div>
                          <div className="text-xs text-gray-400">{student.parentEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={student.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={student.feeStatus === "Paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                            {student.feeStatus}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{student.attendance}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                              <Pencil className="h-4 w-4" />
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

        {/* Admissions Tab Content */}
        <TabsContent value="admissions">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md h-[400px] flex flex-col items-center justify-center">
            <CardTitle className="text-xl text-white mb-4">Admission Management</CardTitle>
            <CardDescription className="text-gray-400 text-center mb-6">Track and process new student applications</CardDescription>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>New Admission</span>
            </Button>
          </Card>
        </TabsContent>

        {/* Transfers Tab Content (Placeholder) */}
        <TabsContent value="transfers">
          <div className="p-6 bg-gray-800/50 rounded-lg text-gray-300">
            Student transfer management will be implemented here.
          </div>
        </TabsContent>

        {/* Alumni Tab Content (Placeholder) */}
        <TabsContent value="alumni">
          <div className="p-6 bg-gray-800/50 rounded-lg text-gray-300">
            Alumni records will be managed here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement; 