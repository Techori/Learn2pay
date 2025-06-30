import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, CreditCard, Download, Eye, RefreshCw, AlertTriangle, CheckCircle, Clock, XCircle, Building2, Smartphone, Banknote, Wallet, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select";
import { format } from 'date-fns';

const TransactionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isSyncing, setIsSyncing] = useState(false);

  const transactions = [
    {
      id: "TXN001",
      amount: 15000,
      type: "Subscription",
      institute: "Modern Public School",
      method: "UPI",
      status: "Success",
      date: "2024-01-20 14:30:25",
      reference: "UPI123456789",
      gateway: "Razorpay"
    },
    {
      id: "TXN002",
      amount: 8500,
      type: "Fee Payment",
      institute: "Excel Coaching",
      method: "Credit Card",
      status: "Failed",
      date: "2024-01-20 14:25:15",
      reference: "CARD987654321",
      gateway: "PayU"
    },
    {
      id: "TXN003",
      amount: 25000,
      type: "Registration",
      institute: "Sunrise College",
      method: "E-Nach",
      status: "Pending",
      date: "2024-01-20 14:20:45",
      reference: "ENACH456789123",
      gateway: "Razorpay"
    },
    {
      id: "TXN004",
      amount: 5000,
      type: "Late Fee",
      institute: "Modern Public School",
      method: "Digital Wallet",
      status: "Success",
      date: "2024-01-20 14:15:30",
      reference: "WAL789123456",
      gateway: "Paytm"
    },
    {
      id: "TXN005",
      amount: 12000,
      type: "Monthly Fee",
      institute: "Tech Academy",
      method: "Cash",
      status: "Success",
      date: "2024-01-20 14:10:15",
      reference: "CASH001234567",
      gateway: "Office Counter"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Processing': return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'upi': return <Smartphone className="h-4 w-4" />;
      case 'credit card': return <CreditCard className="h-4 w-4" />;
      case 'e-nach': return <Building2 className="h-4 w-4" />;
      case 'digital wallet': return <Wallet className="h-4 w-4" />;
      case 'cash': return <Banknote className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const handleExport = (selectedTransactions = filteredTransactions) => {
    const csvContent = [
      ['Transaction ID', 'Amount', 'Type', 'Institute', 'Method', 'Status', 'Date', 'Reference', 'Gateway'],
      ...selectedTransactions.map(t => [
        t.id,
        t.amount,
        t.type,
        t.institute,
        t.method,
        t.status,
        t.date,
        t.reference,
        t.gateway
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    alert('Payments synced successfully!');
  };

  const handleViewDetails = (transaction) => {
    alert(`Viewing details for transaction ${transaction.id}\n\n` +
          `Amount: ₹${transaction.amount}\n` +
          `Type: ${transaction.type}\n` +
          `Institute: ${transaction.institute}\n` +
          `Method: ${transaction.method}\n` +
          `Status: ${transaction.status}\n` +
          `Date: ${transaction.date}\n` +
          `Reference: ${transaction.reference}\n` +
          `Gateway: ${transaction.gateway}`);
  };

  const handleRetry = (transaction) => {
    alert(`Retrying transaction ${transaction.id}`);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm);

      const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesMethod = methodFilter === 'all' || t.method.toLowerCase() === methodFilter.toLowerCase();

      const transactionDate = new Date(t.date);
      const matchesDate = !dateRange.start || !dateRange.end ||
        (transactionDate >= new Date(dateRange.start) && transactionDate <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    });
  }, [searchTerm, statusFilter, methodFilter, dateRange]);

  return (
    <div className="space-y-6">
      <style>
        {`
          .custom-select-trigger {
            background-color: #1A2A44;
            color: white;
            border: 1px solid #2A4463;
            border-radius: 4px;
            padding: 0.5rem 1rem;
          }
          .custom-select-trigger:hover {
            background-color: #25354D;
          }
          .custom-select-content {
            background-color: #1A2A44;
            border: 1px solid #2A4463;
            border-radius: 4px;
            color: white;
          }
          .custom-select-item {
            padding: 0.5rem 1rem;
            color: white;
          }
          .custom-select-item:hover {
            background-color: #25354D;
          }
          .custom-select-item[data-state="checked"] {
            background-color: #1E90FF;
            color: white;
          }
        `}
      </style>

      {/* Transaction Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card-bg border-border-color">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">₹12,45,000</div>
            <div className="text-sm text-text-secondary">Total Revenue</div>
            <div className="text-xs text-success">+23% this month</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-border-color">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">1,234</div>
            <div className="text-sm text-text-secondary">Total Transactions</div>
            <div className="text-xs text-info">+156 today</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-border-color">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">98.5%</div>
            <div className="text-sm text-text-secondary">Success Rate</div>
            <div className="text-xs text-success">Above industry average</div>
          </CardContent>
        </Card>
        <Card className="bg-card-bg border-border-color">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-text-color">23</div>
            <div className="text-sm text-text-secondary">Failed Transactions</div>
            <div className="text-xs text-danger">Needs attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateway Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Performance</CardTitle>
          <CardDescription>Success rates by payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">UPI</div>
              <div className="text-2xl font-bold text-green-600">99.2%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold">Cards</div>
              <div className="text-2xl font-bold text-green-600">97.8%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
              <div className="font-semibold">E-Nach</div>
              <div className="text-2xl font-bold text-green-600">96.5%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Wallet className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="font-semibold">Wallets</div>
              <div className="text-2xl font-bold text-green-600">98.1%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Banknote className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">Cash</div>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Management Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Transaction Management
              </CardTitle>
              <CardDescription>Monitor and manage all platform transactions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => handleExport()}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSync} 
                disabled={isSyncing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Payments'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search by transaction ID, institute, or amount..." 
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] custom-select-trigger">
                <Filter className="h-4 w-4 mr-2 text-white" />
                <SelectValue placeholder="Filter by Status" className="text-white" />
              </SelectTrigger>
              <SelectContent className="custom-select-content">
                <SelectItem value="all" className="custom-select-item">All Status</SelectItem>
                <SelectItem value="success" className="custom-select-item">Success</SelectItem>
                <SelectItem value="failed" className="custom-select-item">Failed</SelectItem>
                <SelectItem value="pending" className="custom-select-item">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[180px] custom-select-trigger">
                <Filter className="h-4 w-4 mr-2 text-white" />
                <SelectValue placeholder="Filter by Method" className="text-white" />
              </SelectTrigger>
              <SelectContent className="custom-select-content">
                <SelectItem value="all" className="custom-select-item">All Methods</SelectItem>
                <SelectItem value="upi" className="custom-select-item">UPI</SelectItem>
                <SelectItem value="credit card" className="custom-select-item">Credit Card</SelectItem>
                <SelectItem value="e-nach" className="custom-select-item">E-Nach</SelectItem>
                <SelectItem value="digital wallet" className="custom-select-item">Digital Wallet</SelectItem>
                <SelectItem value="cash" className="custom-select-item">Cash</SelectItem>
              </SelectContent>
            </Select>
            <Popover>

              <PopoverContent className="w-auto p-4 bg-gray-800 text-white border-gray-700">
                <div className="space-y-2">
                  <div>
                    <label className="text-sm">Start Date</label>
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="bg-gray-700 text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm">End Date</label>
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="bg-gray-700 text-white border-gray-600"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Transactions Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount & Type</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <div className="font-mono font-medium">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.reference}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-lg">₹{transaction.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{transaction.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.institute}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(transaction.method)}
                      <div>
                        <div className="font-medium">{transaction.method}</div>
                        <div className="text-sm text-gray-500">{transaction.gateway}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono">{transaction.date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleViewDetails(transaction)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      {transaction.status === 'Failed' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRetry(transaction)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleExport([transaction])}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No transactions match the current filters
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Transaction Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#1A1F2B] rounded border-l-4 border-red-500">
              <div>
                <div className="font-medium">High Value Failed Transaction</div>
                <div className="text-sm text-gray-600">₹25,000 payment failed for Sunrise College</div>
                <div className="text-xs text-gray-500">5 minutes ago</div>
              </div>
              <Button variant="outline" onClick={() => alert('Investigating transaction...')}>
                Investigate
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1A1F2B] rounded border-l-4 border-yellow-500">
              <div>
                <div className="font-medium">Payment Gateway Issue</div>
                <div className="text-sm text-gray-600">Multiple transaction failures with PayU gateway</div>
                <div className="text-xs text-gray-500">15 minutes ago</div>
              </div>
              <Button variant="outline" onClick={() => alert('Checking gateway status...')}>
                Check Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;