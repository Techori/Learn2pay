import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Filter, Shield, Eye, Download, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";

// Define interfaces for TypeScript
interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  status: string;
  risk: string;
}

interface SecurityStat {
  label: string;
  value: string;
  change: string;
  color: string;
}

const SecurityAuditLogs: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({ status: 'all', risk: 'all', timeRange: '24h' });
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      user: "Super Admin",
      action: "Vendor Approved",
      resource: "Tech Solutions Pvt Ltd",
      ip: "192.168.1.100",
      status: "Success",
      risk: "Low"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:25:15",
      user: "Franchise Admin",
      action: "User Blocked",
      resource: "john.doe../..email.com",
      ip: "192.168.1.101",
      status: "Success",
      risk: "Medium"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:20:45",
      user: "System",
      action: "Failed Login Attempt",
      resource: "admin../..company.com",
      ip: "45.123.45.67",
      status: "Failed",
      risk: "High"
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:15:30",
      user: "Super Admin",
      action: "Settings Modified",
      resource: "Platform Settings",
      ip: "192.168.1.100",
      status: "Success",
      risk: "Low"
    }
  ]);

  const securityStats: SecurityStat[] = [
    { label: "Total Events", value: "2,456", change: "+12%", color: "text-blue-400" },
    { label: "Security Alerts", value: "23", change: "+5%", color: "text-red-400" },
    { label: "Failed Logins", value: "156", change: "-8%", color: "text-yellow-400" },
    { label: "System Health", value: "98.5%", change: "+0.2%", color: "text-green-400" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-500 text-white';
      case 'Failed': return 'bg-red-500 text-white';
      case 'Warning': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Filtered logs
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(auditLogs);
  useEffect(() => {
    let filtered = [...auditLogs];
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm)
      );
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(log => log.status === filters.status);
    }
    if (filters.risk !== 'all') {
      filtered = filtered.filter(log => log.risk === filters.risk);
    }
    if (filters.timeRange === '24h') {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      filtered = filtered.filter(log => new Date(log.timestamp) >= twentyFourHoursAgo);
    }
    setFilteredLogs(filtered);
  }, [searchTerm, filters, auditLogs]);

  // Handle actions
  const handleView = (log: AuditLog) => {
    toast({
      title: "View Log",
      description: `Viewing details for action "${log.action}" by ${log.user}.`
    });
  };

  const handleExportLogs = () => {
    const csv = [
      'Timestamp,User,Action,Resource,IP Address,Status,Risk Level',
      ...auditLogs.map(log =>
        `${log.timestamp},${log.user},${log.action},${log.resource},${log.ip},${log.status},${log.risk}`
      )
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security_audit_logs_${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(/[,:\s]/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Logs Exported",
      description: `Audit logs exported at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  const handleInvestigate = (title: string) => {
    toast({
      title: `${title} Investigation Started`,
      description: `Investigation for "${title}" initiated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  const handleReview = (title: string) => {
    toast({
      title: `${title} Review Started`,
      description: `Review for "${title}" initiated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  return (
    <div className="space-y-6 bg-[#0B0F1A] p-6 text-white min-h-screen">
      <Card className="bg-[#1A1F2B]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                Security Audit Logs
              </CardTitle>
              <CardDescription className="text-gray-400">Monitor all system activities and security events</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={handleExportLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityStats.map((stat, index) => (
              <Card key={index} className="bg-[#1A1F2B]">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className={`text-xs ${stat.color}`}>{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search audit logs..."
                className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Warning">Warning</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.risk}
                onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
              >
                <option value="all">Risk</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300 cursor-pointer"
                value={filters.timeRange}
                onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Audit Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200">Timestamp</TableHead>
                <TableHead className="text-gray-200">User</TableHead>
                <TableHead className="text-gray-200">Action</TableHead>
                <TableHead className="text-gray-200">Resource</TableHead>
                <TableHead className="text-gray-200">IP Address</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
                <TableHead className="text-gray-200">Risk Level</TableHead>
                <TableHead className="text-gray-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-[#2A2F3A]">
                  <TableCell className="font-mono text-sm text-white">{log.timestamp}</TableCell>
                  <TableCell className="text-white">{log.user}</TableCell>
                  <TableCell className="text-white">{log.action}</TableCell>
                  <TableCell className="text-white">{log.resource}</TableCell>
                  <TableCell className="font-mono text-white">{log.ip}</TableCell>
                  <TableCell className="text-white">
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    <Badge className={getRiskColor(log.risk)}>
                      {log.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={() => handleView(log)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Recent Security Alerts */}
          <Card className="bg-[#1A1F2B]">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                Recent Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#2A2F3A] rounded border-l-4 border-red-500">
                  <div>
                    <div className="font-medium text-white">Multiple Failed Login Attempts</div>
                    <div className="text-sm text-gray-400">IP: 45.123.45.67 attempted 15 failed logins</div>
                    <div className="text-xs text-gray-500">2 minutes ago</div>
                  </div>
                  <Button variant="outline" className="text-white border-red-500 hover:bg-red-500" onClick={() => handleInvestigate("Multiple Failed Login Attempts")}>
                    Investigate
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#2A2F3A] rounded border-l-4 border-yellow-500">
                  <div>
                    <div className="font-medium text-white">Unusual Admin Activity</div>
                    <div className="text-sm text-gray-400">Admin logged in from new location</div>
                    <div className="text-xs text-gray-500">15 minutes ago</div>
                  </div>
                  <Button variant="outline" className="text-white border-yellow-500 hover:bg-yellow-500" onClick={() => handleReview("Unusual Admin Activity")}>
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAuditLogs;