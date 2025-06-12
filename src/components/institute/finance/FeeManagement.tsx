import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  DollarSign,
  IndianRupee,
  Users,
  FileText,
  Plus,
  Upload,
  Eye,
  Pencil,
} from 'lucide-react';

const FeeManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('student-fees');

  const financialSummary = [
    {
      icon: IndianRupee,
      title: "Total Collected",
      amount: "₹45,60,00,000",
      description: "This academic year",
      color: "text-green-400",
    },
    {
      icon: IndianRupee,
      title: "Pending Amount",
      amount: "₹12,40,000",
      description: "Due this month",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Paid Students",
      amount: "456",
      description: "Out of 650 total",
      color: "text-purple-400",
    },
    {
      icon: FileText,
      title: "Overdue",
      amount: "78",
      description: "Payment pending",
      color: "text-orange-400",
    },
  ];

  const studentFeesData = [
    {
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      class: "10th A",
      feeStructure: "₹22,000",
      paymentStatus: "Partial",
      paidAmount: "₹15,000",
      pendingAmount: "₹7,000",
      dueDate: "2024-07-15",
      lastPayment: "2024-06-10",
    },
    {
      studentName: "Priya Sharma",
      studentId: "STU002",
      class: "10th A",
      feeStructure: "₹22,000",
      paymentStatus: "Paid",
      paidAmount: "₹22,000",
      pendingAmount: "₹0",
      dueDate: "2024-07-15",
      lastPayment: "2024-06-01",
    },
    {
      studentName: "Amit Singh",
      studentId: "STU003",
      class: "9th B",
      feeStructure: "₹21,000",
      paymentStatus: "Unpaid",
      paidAmount: "₹0",
      pendingAmount: "₹21,000",
      dueDate: "2024-07-15",
      lastPayment: "No payment yet",
    },
  ];

  const feeStructureData = [
    {
      class: "Class 10",
      tuitionFee: "₹15,000",
      admissionFee: "₹5,000",
      examFee: "₹2,000",
      totalFee: "₹22,000",
    },
    {
      class: "Class 9",
      tuitionFee: "₹14,000",
      admissionFee: "₹5,000",
      examFee: "₹2,000",
      totalFee: "₹21,000",
    },
    {
      class: "Class 8",
      tuitionFee: "₹13,000",
      admissionFee: "₹5,000",
      examFee: "₹2,000",
      totalFee: "₹20,000",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {financialSummary.map((item, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${item.color.replace('text', 'bg')}/20`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white flex items-center">
                    <span className="text-xl"></span>{item.amount}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner Tabs for Fee Management */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800 p-1 rounded-md">
          <TabsTrigger value="student-fees" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Student Fees
          </TabsTrigger>
          <TabsTrigger value="fee-structure" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Fee Structure
          </TabsTrigger>
          <TabsTrigger value="payment-history" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Payment History
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Student Fees Tab Content */}
        <TabsContent value="student-fees">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">Student Fee Management</CardTitle>
                <p className="text-gray-400 text-sm">Track and manage individual student fee payments</p>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Payment</span>
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
                  placeholder="Search by student name or admission number..."
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-80"
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fee Structure</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Due Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Payment</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {studentFeesData.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{student.studentName}</div>
                          <div className="text-xs text-gray-400">{student.studentId} • {student.class}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{student.feeStructure}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={student.paymentStatus === "Paid" ? "bg-green-500/20 text-green-400" : student.paymentStatus === "Partial" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}>
                            {student.paymentStatus}
                          </Badge>
                          {student.paymentStatus !== "Paid" && (
                            <div className="text-xs text-gray-400 mt-1">
                              Paid: {student.paidAmount}<br/>Pending: {student.pendingAmount}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{student.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{student.lastPayment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-1 px-3 py-1 text-sm rounded-md">
                              <span>Pay</span>
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

        {/* Fee Structure Tab Content */}
        <TabsContent value="fee-structure">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">Fee Structure Management</CardTitle>
                <p className="text-gray-400 text-sm">Configure fee structures for different classes</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Fee Structure</span>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Class</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tuition Fee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Admission Fee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Exam Fee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Fee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {feeStructureData.map((fee, index) => (
                      <tr key={index} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{fee.class}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{fee.tuitionFee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{fee.admissionFee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{fee.examFee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{fee.totalFee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                              <Eye className="h-4 w-4" />
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

        {/* Payment History Tab Content (Placeholder) */}
        <TabsContent value="payment-history">
          <div className="p-6 bg-gray-800/50 rounded-lg text-gray-300">
            Payment history will be displayed here.
          </div>
        </TabsContent>

        {/* Reports Tab Content (Placeholder) */}
        <TabsContent value="reports">
          <div className="p-6 bg-gray-800/50 rounded-lg text-gray-300">
            Fee related reports will be generated here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeManagement; 