import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Link,
  IndianRupee,
  Users,
  CheckCircle,
  Plus,
  Eye,
  Copy,
  Send,
} from 'lucide-react';

const PaymentLinksManagement = () => {
  const paymentLinkSummary = [
    {
      icon: Link,
      title: "Active Links",
      value: "12",
      color: "text-blue-400",
    },
    {
      icon: IndianRupee,
      title: "Total Collections",
      value: "₹3,45,000",
      color: "text-green-400",
    },
    {
      icon: Users,
      title: "Students Reached",
      value: "245",
      color: "text-purple-400",
    },
    {
      icon: CheckCircle,
      title: "Success Rate",
      value: "87%",
      color: "text-orange-400",
    },
  ];

  const paymentLinksData = [
    {
      linkName: "Class 10 - Quarterly Fees",
      linkUrl: "https://pay.institute.com/class10-q1...",
      amount: "₹15,000",
      clicks: 42,
      payments: 38,
      conversion: "90.5% conversion",
      status: "Active",
      expires: "2024-02-15",
    },
    {
      linkName: "Exam Fees - All Classes",
      linkUrl: "https://pay.institute.com/exam-fees...",
      amount: "₹2,000",
      clicks: 115,
      payments: 110,
      conversion: "95.7% conversion",
      status: "Active",
      expires: "2024-01-25",
    },
    {
      linkName: "Transport Fees - Annual",
      linkUrl: "https://pay.institute.com/transport-annu...",
      amount: "₹8,000",
      clicks: 75,
      payments: 65,
      conversion: "86.7% conversion",
      status: "Expired",
      expires: "2024-01-01",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Link Summary Cards */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Payment Links Management</h2>
          <p className="text-gray-400">Create and manage payment links for students</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Payment Link</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {paymentLinkSummary.map((item, index) => (
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

      {/* Payment Links Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">Payment Links</CardTitle>
            <p className="text-gray-400 text-sm">Manage all your payment links and track their performance</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Input
              type="text"
              placeholder="Search payment links..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-96"
            />
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Status</Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">Filter by Amount</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Link Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Performance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Expires</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paymentLinksData.map((link, index) => (
                  <tr key={index} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{link.linkName}</div>
                      <a href={link.linkUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">{link.linkUrl}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{link.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{link.clicks} clicks</div>
                      <div className="text-xs text-gray-400">{link.payments} payments</div>
                      <div className="text-xs text-gray-400">{link.conversion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={link.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {link.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{link.expires}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                          <Send className="h-4 w-4" />
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

export default PaymentLinksManagement; 