import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Calendar, Users, DollarSign, FileCheck, Share2, AlertTriangle } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useToast } from "../../hooks/use-toast";
import { useTheme } from '../../context/ThemeContext';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

interface StatData {
  key: string;
  value: string;
  change?: string;
  urgency?: 'high' | 'medium' | 'low' | 'none';
  icon: React.ReactNode;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    borderWidth?: number;
    tension?: number;
  }[];
}

const DashboardOverview: React.FC = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState<string>('last_7_days');
  const [stats] = useState<StatData[]>([
    { key: 'Total Institutes', value: '1,247', change: '+5', urgency: 'none', icon: <Users className="h-5 w-5" style={{ color: 'var(--secondary)' }} /> },
    { key: 'Active Students', value: '45,290', change: '+128', urgency: 'none', icon: <Users className="h-5 w-5" style={{ color: 'var(--success)' }} /> },
    { key: 'Total Revenue', value: '₹1.25 Cr', change: '+8.5%', urgency: 'none', icon: <DollarSign className="h-5 w-5" style={{ color: 'var(--warning)' }} /> },
    { key: 'Pending Approvals', value: '89', change: '-12', urgency: 'high', icon: <FileCheck className="h-5 w-5" style={{ color: 'var(--danger)' }} /> },
    { key: 'Active Referrals', value: '1,234', change: '+50', urgency: 'none', icon: <Share2 className="h-5 w-5" style={{ color: 'var(--primary)' }} /> },
  ]);
  const [lastUpdate] = useState<string>('12:42 AM');

  // Generate chart colors based on theme
  const getChartColors = () => {
    return {
      blue: theme === 'dark' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.6)',
      blueBorder: theme === 'dark' ? 'rgba(59, 130, 246, 1)' : 'rgba(37, 99, 235, 1)',
      green: theme === 'dark' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(22, 163, 74, 0.6)',
      greenBorder: theme === 'dark' ? 'rgba(34, 197, 94, 1)' : 'rgba(22, 163, 74, 1)',
      purple: theme === 'dark' ? 'rgba(167, 139, 250, 0.6)' : 'rgba(147, 51, 234, 0.6)',
      purpleBorder: theme === 'dark' ? 'rgba(167, 139, 250, 1)' : 'rgba(147, 51, 234, 1)',
    };
  };

  const colors = getChartColors();

  // Sample data for charts (updated to reflect current week)
  const roleActivityData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 150, 130, 200, 220, 180, 210], // Updated for current week
        backgroundColor: colors.blue,
        borderColor: colors.blueBorder,
        borderWidth: 1,
      },
      {
        label: 'Support',
        data: [80, 90, 100, 115, 100, 90, 110], // Updated for current week
        backgroundColor: colors.green,
        borderColor: colors.greenBorder,
        borderWidth: 1,
      },
      {
        label: 'Referrals',
        data: [50, 60, 70, 85, 90, 80, 95], // Updated for current week
        backgroundColor: colors.purple,
        borderColor: colors.purpleBorder,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: 'top' as const,
        labels: {
          color: 'var(--text-color)'
        } 
      },
      title: { 
        display: true, 
        text: 'Role-wise Activity',
        color: 'var(--text-color)'
      },
    },
    scales: {
      y: { 
        beginAtZero: true,
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
      },
      x: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
      }
    },
  };

  useEffect(() => {
    // Update date range toast
    toast({
      title: "Date Range Updated",
      description: `Showing data for ${dateRange.replace('_', ' ')}.`,
    });
  }, [dateRange]);

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="bg-card-bg border-color backdrop-blur-sm">
        <CardHeader className="pb-2 flex justify-between items-center">
          <div>
            <CardTitle>Dashboard Overview</CardTitle>
            <CardDescription className="text-secondary">Real-time platform statistics</CardDescription>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="text-sm text-secondary">Last updated: {lastUpdate}</div>
          </div>
        </CardHeader>
        <CardContent >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-input border border-color rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  {stat.icon}
                  {stat.urgency === 'high' && <AlertTriangle className="h-5 w-5" style={{ color: 'var(--danger)' }} />}
                </div>
                <div className="text-secondary text-sm mb-1">{stat.key}</div>
                <div className="text-xl font-bold">{stat.value}</div>
                {stat.change && (
                  <div className={`text-xs flex items-center mt-1`} style={{ 
                    color: stat.change.startsWith('+') ? 'var(--success)' : 'var(--danger)' 
                  }}>
                    {stat.change.startsWith('+') ? '↑' : '↓'}
                    <span className="ml-1">{stat.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Card className="bg-surface border-color backdrop-blur-sm">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>Role-wise Activity</CardTitle>
            <CardDescription className="text-secondary">Activity trends by role</CardDescription>
          </div>
          <div className="space-x-2">
            <Button
              variant={dateRange === 'last_7_days' ? 'default' : 'outline'}
              onClick={() => handleDateRangeChange('last_7_days')}
            >
              <Calendar className="h-4 w-4 mr-2" /> 7 Days
            </Button>
            <Button
              variant={dateRange === 'last_30_days' ? 'default' : 'outline'}
              onClick={() => handleDateRangeChange('last_30_days')}
            >
              <Calendar className="h-4 w-4 mr-2" /> 30 Days
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Bar data={roleActivityData} options={chartOptions} />
            </div>
            <div>
              <Line data={roleActivityData} options={chartOptions} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;