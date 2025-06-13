import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  QrCode,
  IndianRupee,
  RefreshCcw,
  Plus,
  Upload,
  Eye,
  Download,
  BarChart2,
} from 'lucide-react';

const QRTransactionManagement = () => {
  const qrSummary = [
    {
      icon: QrCode,
      title: "QR Transactions Today",
      value: "156",
      color: "text-blue-400",
    },
    {
      icon: IndianRupee,
      title: "Amount Collected",
      value: "₹2,45,000",
      color: "text-green-400",
    },
    {
      icon: BarChart2,
      title: "Success Rate",
      value: "94%",
      color: "text-purple-400",
    },
    {
      icon: RefreshCcw,
      title: "Pending Transactions",
      value: "12",
      color: "text-orange-400",
    },
  ];

  const qrTransactionsData = [
    {
      transactionId: "QR001",
      fullTransactionId: "TXN123456789",
      studentName: "Aarav Sharma",
      feeType: "Quarterly Fees",
      amount: "₹15,000",
      paymentMethod: "UPI",
      status: "Success",
      timestamp: "2024-01-15 10:30 AM",
    },
    {
      transactionId: "QR002",
      fullTransactionId: "TXN123456790",
      studentName: "Priya Patel",
      feeType: "Exam Fees",
      amount: "₹2,000",
      paymentMethod: "UPI",
      status: "Pending",
      timestamp: "2024-01-15 11:15 AM",
    },
    {
      transactionId: "QR003",
      fullTransactionId: "TXN123456791",
      studentName: "Rahul Kumar",
      feeType: "Transport Fees",
      amount: "₹8,000",
      paymentMethod: "UPI",
      status: "Failed",
      timestamp: "2024-01-15 12:00 PM",
    },
  ];

  return (
    <div className="space-y-6">
      {/* QR Transaction Summary Cards */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">QR Transaction Management</h2>
          <p className="text-gray-400">Monitor and manage QR code based transactions</p>
        </div>
        <div className="flex space-x-2">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>Generate QR Code</span>
            </Button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {qrSummary.map((item, index) => (
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

      {/* QR Code Transactions Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">QR Code Transactions</CardTitle>
            <p className="text-gray-400 text-sm">Real-time tracking of QR code based payments</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Input
              type="text"
              placeholder="Search by student name or transaction ID..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-96"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Status</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Amount</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Export</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fee Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment Method</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {qrTransactionsData.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{transaction.transactionId}</div>
                      <div className="text-xs text-gray-400">{transaction.fullTransactionId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.feeType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="border-gray-600 text-gray-300">{transaction.paymentMethod}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={transaction.status === "Success" ? "bg-green-500/20 text-green-400" : transaction.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Download className="h-4 w-4" />
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

export default QRTransactionManagement; 