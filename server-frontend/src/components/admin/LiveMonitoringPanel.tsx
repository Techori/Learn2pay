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
      color: 'text-success' 
    },
    { 
      id: 'transactions', 
      label: 'Transactions/min', 
      value: '156', 
      change: '+12', 
      trend: 'up', 
      icon: TrendingUp,
      color: 'text-secondary' 
    },
    { 
      id: 'servers', 
      label: 'Server Load', 
      value: '67%', 
      change: '-5%', 
      trend: 'down', 
      icon: Globe,
      color: 'text-primary' 
    },
    { 
      id: 'errors', 
      label: 'Error Rate', 
      value: '0.2%', 
      change: '+0.1%', 
      trend: 'up', 
      icon: AlertTriangle,
      color: 'text-danger' 
    }
  ];

  const systemAlerts: SystemAlert[] = [
    { type: 'warning', message: 'High memory usage on Server 3', time: '2 min ago' },
    { type: 'error', message: 'Payment gateway timeout spike', time: '5 min ago' },
    { type: 'info', message: 'Scheduled maintenance in 2 hours', time: '10 min ago' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-danger bg-card-bg';
      case 'warning': return 'border-l-warning bg-card-bg';
      case 'info': return 'border-l-secondary bg-card-bg';
      default: return 'border-l-text-secondary bg-card-bg';
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
    <Card className="bg-card-bg border-card-border">
      <CardHeader>
        <CardTitle className="flex items-center text-text-color">
          <Activity className="h-5 w-5 mr-2 text-secondary" />
          Live System Monitoring
        </CardTitle>
        <CardDescription className="text-text-secondary">Real-time platform health and performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {liveMetrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className="cursor-pointer"
            >
              <Card
                className={`transition-all ${selectedMetric === metric.id ? 'ring-2 ring-primary' : ''} overflow-hidden bg-surface-color border-border-color`}
              >
                <CardContent className="p-4 h-32 flex flex-col items-center justify-center text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    <div className="text-2xl font-bold text-text-color truncate">{metric.value}</div>
                    <div className="text-sm text-text-secondary truncate">{metric.label}</div>
                  </div>
                  <div className={`flex items-center justify-center ${metric.trend === 'up' ? 'text-success' : 'text-danger'} mt-2`}>
                    {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm ml-1 truncate">{metric.change}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-text-color mb-3">System Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">API Response Time</span>
                <Badge className="bg-success text-white">120ms</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Database Performance</span>
                <Badge className="bg-success text-white">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">CDN Status</span>
                <Badge className="bg-success text-white">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Backup Status</span>
                <Badge className="bg-warning text-white">Running</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-text-color mb-3">Recent Alerts</h4>
            <div className="space-y-2">
              {systemAlerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded ${getAlertColor(alert.type)}`}>
                  <div className="text-sm font-medium text-text-color">{alert.message}</div>
                  <div className="text-xs text-text-secondary">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={handleSecurityScan}>
            <Shield className="h-4 w-4 mr-2 text-secondary" />
            Run Security Scan
          </Button>
          <Button variant="outline" className="text-text-color border-warning hover:bg-warning hover:text-white" onClick={handleClearCache}>
            <Zap className="h-4 w-4 mr-2 text-warning" />
            Clear Cache
          </Button>
          <Button variant="outline" className="text-text-color border-success hover:bg-success hover:text-white" onClick={handleSystemReport}>
            <Activity className="h-4 w-4 mr-2 text-success" />
            System Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMonitoringPanel;