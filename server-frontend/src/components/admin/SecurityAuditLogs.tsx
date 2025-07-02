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
    { label: "Total Events", value: "2,456", change: "+12%", color: "text-secondary" },
    { label: "Security Alerts", value: "23", change: "+5%", color: "text-danger" },
    { label: "Failed Logins", value: "156", change: "-8%", color: "text-warning" },
    { label: "System Health", value: "98.5%", change: "+0.2%", color: "text-success" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-success text-white';
      case 'Failed': return 'bg-danger text-white';
      case 'Warning': return 'bg-warning text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-danger text-white';
      case 'Medium': return 'bg-warning text-white';
      case 'Low': return 'bg-success text-white';
      default: return 'bg-text-secondary text-white';
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
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-text-color">
                <Shield className="h-5 w-5 mr-2 text-secondary" />
                Security Audit Logs
              </CardTitle>
              <CardDescription className="text-text-secondary">Monitor all system activities and security events</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={handleExportLogs}>
                <Download className="h-4 w-4 mr-2 text-secondary" />
                Export Logs
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Security Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityStats.map((stat, index) => (
              <Card key={index} className="bg-card-bg border-card-border">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-text-color">{stat.value}</div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                  <div className={`text-xs ${stat.color}`}>{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search audit logs..."
                className="pl-10 bg-input-bg border-input-border text-input-text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Warning">Warning</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
                value={filters.risk}
                onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
              >
                <option value="all">Risk</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-8 pr-4 py-2 rounded bg-input-bg border-input-border text-input-text cursor-pointer"
                value={filters.timeRange}
                onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Filter className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>

          {/* Audit Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-text-color">Timestamp</TableHead>
                <TableHead className="text-text-color">User</TableHead>
                <TableHead className="text-text-color">Action</TableHead>
                <TableHead className="text-text-color">Resource</TableHead>
                <TableHead className="text-text-color">IP Address</TableHead>
                <TableHead className="text-text-color">Status</TableHead>
                <TableHead className="text-text-color">Risk Level</TableHead>
                <TableHead className="text-text-color">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-surface-color">
                  <TableCell className="font-mono text-sm text-text-color">{log.timestamp}</TableCell>
                  <TableCell className="text-text-color">{log.user}</TableCell>
                  <TableCell className="text-text-color">{log.action}</TableCell>
                  <TableCell className="text-text-color">{log.resource}</TableCell>
                  <TableCell className="font-mono text-text-color">{log.ip}</TableCell>
                  <TableCell className="text-text-color">
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <Badge className={getRiskColor(log.risk)}>
                      {log.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={() => handleView(log)}>
                      <Eye className="h-3 w-3 text-secondary  hover:text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Recent Security Alerts */}
          <Card className="bg-card-bg border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center text-text-color">
                <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                Recent Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-color rounded border-l-4 border-danger">
                  <div>
                    <div className="font-medium text-text-color">Multiple Failed Login Attempts</div>
                    <div className="text-sm text-text-secondary">IP: 45.123.45.67 attempted 15 failed logins</div>
                    <div className="text-xs text-text-secondary/70">2 minutes ago</div>
                  </div>
                  <Button variant="outline" className="text-text-color border-danger hover:bg-danger hover:text-white" onClick={() => handleInvestigate("Multiple Failed Login Attempts")}>
                    <AlertTriangle className="h-3 w-3 mr-2 text-danger" />
                    Investigate
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface-color rounded border-l-4 border-warning">
                  <div>
                    <div className="font-medium text-text-color">Unusual Admin Activity</div>
                    <div className="text-sm text-text-secondary">Admin logged in from new location</div>
                    <div className="text-xs text-text-secondary/70">15 minutes ago</div>
                  </div>
                  <Button variant="outline" className="text-text-color border-warning hover:bg-warning hover:text-white" onClick={() => handleReview("Unusual Admin Activity")}>
                    <Clock className="h-3 w-3 mr-2 text-warning" />
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