import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Users, Globe, Zap, Shield } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";

// Define interfaces for TypeScript
interface LiveMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface SystemAlert {
  type: string;
  message: string;
  time: string;
}

const LiveMonitoringPanel: React.FC = () => {
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('users');

  const liveMetrics: LiveMetric[] = [
    { 
      id: 'users', 
      label: 'Live Users', 
      value: '1,234', 
      change: '+23', 
      trend: 'up', 
      icon: Users,
      color: 'text-green-500' 
    },
    { 
      id: 'transactions', 
      label: 'Transactions/min', 
      value: '156', 
      change: '+12', 
      trend: 'up', 
      icon: TrendingUp,
      color: 'text-blue-500' 
    },
    { 
      id: 'servers', 
      label: 'Server Load', 
      value: '67%', 
      change: '-5%', 
      trend: 'down', 
      icon: Globe,
      color: 'text-orange-500' 
    },
    { 
      id: 'errors', 
      label: 'Error Rate', 
      value: '0.2%', 
      change: '+0.1%', 
      trend: 'up', 
      icon: AlertTriangle,
      color: 'text-red-500' 
    }
  ];

  const systemAlerts: SystemAlert[] = [
    { type: 'warning', message: 'High memory usage on Server 3', time: '2 min ago' },
    { type: 'error', message: 'Payment gateway timeout spike', time: '5 min ago' },
    { type: 'info', message: 'Scheduled maintenance in 2 hours', time: '10 min ago' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-[#2A2F3A]';
      case 'warning': return 'border-l-yellow-500 bg-[#2A2F3A]';
      case 'info': return 'border-l-blue-500 bg-[#2A2F3A]';
      default: return 'border-l-gray-500 bg-[#2A2F3A]';
    }
  };

  // Handle actions
  const handleSecurityScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: `Security scan started at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement security scan logic
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: `Cache cleared at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement cache clearing logic
  };

  const handleSystemReport = () => {
    toast({
      title: "System Report Generated",
      description: `Report generated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement report generation logic
  };

  return (
    <Card className="bg-[#1A1F2B] border-none">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Activity className="h-5 w-5 mr-2 text-blue-400" />
          Live System Monitoring
        </CardTitle>
        <CardDescription className="text-gray-400">Real-time platform health and performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {liveMetrics.map((metric) => (
<Card
  key={metric.id}
  className={`cursor-pointer transition-all ${selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''} overflow-hidden bg-[#232b45] border border-[#2A2F3A]`}
  onClick={() => setSelectedMetric(metric.id)}
>
  <CardContent className="p-4 h-32 flex flex-col items-center justify-center text-center">
    <div className="flex flex-col items-center space-y-2">
      <metric.icon className={`h-6 w-6 ${metric.color}`} />
      <div className="text-2xl font-bold text-white truncate">{metric.value}</div>
      <div className="text-sm text-gray-400 truncate">{metric.label}</div>
    </div>
    <div className={`flex items-center justify-center ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} mt-2`}>
      {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      <span className="text-sm ml-1 truncate">{metric.change}</span>
    </div>
  </CardContent>
</Card>
          ))}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white mb-3">System Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">API Response Time</span>
                <Badge className="bg-green-500 text-white">120ms</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database Performance</span>
                <Badge className="bg-green-500 text-white">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">CDN Status</span>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Backup Status</span>
                <Badge className="bg-yellow-500 text-white">Running</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">Recent Alerts</h4>
            <div className="space-y-2">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded ${getAlertColor(alert.type)}`}>
                  <div className="text-sm font-medium text-white">{alert.message}</div>
                  <div className="text-xs text-gray-500">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={handleSecurityScan}>
            <Shield className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
          <Button variant="outline" className="text-white border-yellow-500 hover:bg-yellow-500" onClick={handleClearCache}>
            <Zap className="h-4 w-4 mr-2" />
            Clear Cache
          </Button>
          <Button variant="outline" className="text-white border-green-500 hover:bg-green-500" onClick={handleSystemReport}>
            <Activity className="h-4 w-4 mr-2" />
            System Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMonitoringPanel;