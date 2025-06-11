import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Wallet, CreditCard, Building, Download, Eye, Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react';

const Payouts = () => {
  const payoutSummary = [
    { label: "Available Balance", value: "₹22,800", color: "text-green-600" },
    { label: "Pending Payout", value: "₹15,600", color: "text-yellow-600" },
    { label: "Total Earned", value: "₹1,12,500", color: "text-blue-600" },
    { label: "This Month", value: "₹18,500", color: "text-purple-600" }
  ];

  const payoutHistory = [
    {
      id: "PAY001",
      amount: "₹25,000",
      date: "2024-01-15",
      status: "Completed",
      method: "Bank Transfer",
      transactionId: "TXN123456789",
      processingTime: "2 days"
    },
    {
      id: "PAY002",
      amount: "₹18,500",
      date: "2024-01-01",
      status: "Completed",
      method: "UPI",
      transactionId: "TXN987654321",
      processingTime: "1 day"
    },
    {
      id: "PAY003",
      amount: "₹32,000",
      date: "2023-12-15",
      status: "Completed",
      method: "Bank Transfer",
      transactionId: "TXN456789123",
      processingTime: "3 days"
    },
    {
      id: "PAY004",
      amount: "₹15,600",
      date: "2024-01-20",
      status: "Processing",
      method: "Bank Transfer",
      transactionId: "TXN789123456",
      processingTime: "Pending"
    }
  ];

  const upcomingPayouts = [
    { date: "Jan 31, 2024", amount: "₹22,800", type: "Monthly Commission" },
    { date: "Feb 15, 2024", amount: "₹8,400", type: "Bonus Payment" },
    { date: "Feb 28, 2024", amount: "₹26,200", type: "Monthly Commission" }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Bank Account",
      details: "HDFC Bank - ****5678",
      isDefault: true,
      icon: Building
    },
    {
      id: 2,
      type: "UPI",
      details: "paytm@paytm",
      isDefault: false,
      icon: CreditCard
    }
  ];

  const [payoutAmount, setPayoutAmount] = useState('22800');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('HDFC Bank - ****5678 (Default)');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const onRequestPayout = () => {
    console.log('Requesting Payout:', {
      amount: payoutAmount,
      method: selectedPaymentMethod,
    });
    alert('Payout requested! Check console for details.');
  };

  const onAddPaymentMethod = () => {
    console.log('Attempting to add payment method');
    alert('Add Payment Method clicked! Check console.');
  };

  const onViewPayoutDetails = (payoutId: string) => {
    console.log(`Attempting to view details for payout ID: ${payoutId}`);
    alert(`Viewing details for payout ID: ${payoutId}. Check console.`);
  };

  const onExportPayoutHistory = () => {
    console.log('Attempting to export payout history');
    alert('Export Payout History clicked! Check console.');
  };

  return (
    <div className="space-y-6">
      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {payoutSummary.map((item, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Request Payout</CardTitle>
            <CardDescription>Withdraw your available balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Available Balance</span>
                <span className="text-2xl font-bold text-green-700">{payoutSummary[0].value}</span>
              </div>
              <div className="text-xs text-gray-500">Minimum payout: ₹1,000</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payoutAmount" className="text-gray-700">Payout Amount</Label>
              <Input 
                id="payoutAmount" 
                placeholder="Enter amount" 
                value={payoutAmount} 
                onChange={(e) => setPayoutAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Payment Method</Label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option>HDFC Bank - ****5678 (Default)</option>
                <option>UPI - paytm@paytm</option>
              </select>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3" onClick={onRequestPayout}>
              <Wallet className="h-5 w-5 mr-2" />
              Request Payout
            </Button>

            <div className="text-xs text-gray-500 text-center mt-3">
              Processing time: 1-3 business days
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Manage your payout preferences</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{method.type}</div>
                        <div className="text-sm text-gray-600">{method.details}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Default</Badge>
                      )}
                      <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100">Edit</Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-5 border-gray-300 hover:bg-gray-100" onClick={onAddPaymentMethod}>
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Payouts */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Upcoming Payouts
          </CardTitle>
          <CardDescription>Scheduled commission payments</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingPayouts.map((payout, index) => (
              <div key={index} className="p-4 border rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="text-xl font-bold text-blue-700">{payout.amount}</div>
                <div className="text-sm text-gray-600 mt-1">{payout.date}</div>
                <Badge variant="outline" className="mt-3 text-gray-700">
                  {payout.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Payout History</CardTitle>
              <CardDescription>Track your past payouts and transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={onExportPayoutHistory}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full leading-normal">
            <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payout ID</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Method</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Processing Time</TableHead>
                  <TableHead className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistory.map((payout) => (
                  <TableRow key={payout.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="font-medium text-gray-900">{payout.id}</div>
                    <div className="text-sm text-gray-500">{payout.transactionId}</div>
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="font-medium text-gray-900">{payout.amount}</div>
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="text-sm text-gray-900">{payout.date}</div>
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Badge className={`text-xs ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </Badge>
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {payout.method}
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {payout.processingTime}
                  </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={() => onViewPayoutDetails(payout.id)}>
                        <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payout Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Statistics</CardTitle>
          <CardDescription>Your payout performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">₹28,125</div>
              <div className="text-sm text-gray-600">Average Payout</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">2.1 days</div>
              <div className="text-sm text-gray-600">Avg Processing Time</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-orange-600">Monthly</div>
              <div className="text-sm text-gray-600">Payout Frequency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payouts;
