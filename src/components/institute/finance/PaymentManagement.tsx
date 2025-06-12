import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  IndianRupee,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  Upload,
  Eye,
  Pencil,
} from 'lucide-react';

const PaymentManagement = () => {
  const paymentSummary = [
    {
      icon: IndianRupee,
      title: "Today's Collection",
      amount: "₹12,45,000",
      description: "+15% from yesterday",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "This Month",
      amount: "₹45,60,000",
      description: "Target: ₹50,00,000",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Payments Today",
      amount: "456",
      description: "95% success rate",
      color: "text-purple-400",
    },
    {
      icon: Calendar,
      title: "Failed Payments",
      amount: "12",
      description: "Needs attention",
      color: "text-orange-400",
    },
  ];

  const paymentTransactions = [
    {
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      amount: "₹25,000",
      paymentDate: "2024-01-15",
      paymentMethod: "UPI",
      transactionId: "TXN001234567",
      status: "Completed",
    },
    {
      studentName: "Priya Sharma",
      studentId: "STU002",
      amount: "₹23,000",
      paymentDate: "2024-01-14",
      paymentMethod: "Card",
      transactionId: "TXN001234568",
      status: "Completed",
    },
    {
      studentName: "Amit Singh",
      studentId: "STU003",
      amount: "₹22,000",
      paymentDate: "2024-01-13",
      paymentMethod: "Net Banking",
      transactionId: "TXN001234569",
      status: "Failed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {paymentSummary.map((item, index) => (
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

      {/* Payment Management Section */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">Payment Management</CardTitle>
            <p className="text-gray-400 text-sm">Track and manage all payment transactions</p>
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
              placeholder="Search by student name, admission number, or transaction ID..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-96"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Date</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Status</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paymentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{transaction.studentName}</div>
                      <div className="text-xs text-gray-400">{transaction.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.paymentDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">{transaction.paymentMethod}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.transactionId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={transaction.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {transaction.status}
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

export default PaymentManagement; 