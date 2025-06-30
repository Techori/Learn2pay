import React, { useEffect, useState } from 'react';
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Activity, AlertTriangle, Shield, Headphones } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";

interface GlobalFilter {
  section: string;
  timeframe: string;
  status: string;
}

interface AdminStatsProps {
  filters?: GlobalFilter;
}

interface StatItem {
  title: string;
  count: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const AdminStats: React.FC<AdminStatsProps> = ({ filters = { section: 'all', timeframe: 'all', status: 'all' } }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [liveStats, setLiveStats] = useState<StatItem[]>([
    { title: "Live Users", count: "1,234", icon: Activity, color: "var(--success)", bgColor: "rgba(var(--success-rgb), 0.2)" },
    { title: "Fraud Alerts", count: "12", icon: AlertTriangle, color: "var(--danger)", bgColor: "rgba(var(--danger-rgb), 0.2)" },
    { title: "Pending KYC", count: "89", icon: Shield, color: "var(--warning)", bgColor: "rgba(var(--warning-rgb), 0.2)" },
    { title: "Support Tickets", count: "45", icon: Headphones, color: "var(--secondary)", bgColor: "rgba(var(--secondary-rgb), 0.2)" }
  ]);
  
  // Update stats when filters change
  useEffect(() => {
    // Only trigger if not default 'all' filters
    if (filters.section !== 'all' || filters.timeframe !== 'all' || filters.status !== 'all') {
      setIsLoading(true);
      
      // Simulate API call to fetch filtered stats
      setTimeout(() => {
        // Generate some random data based on filters to simulate filtering
        const filteredStats = [...liveStats].map(stat => {
          // Simulating changes based on filter values
          let multiplier = 1.0;
          
          // Apply timeframe filter effect
          if (filters.timeframe === 'today') multiplier = 0.3;
          else if (filters.timeframe === 'this_week') multiplier = 0.6;
          else if (filters.timeframe === 'this_month') multiplier = 0.9;
          
          // Introduce some randomness for realistic data
          const randomFactor = 0.85 + Math.random() * 0.3;
          
          // Parse count, apply multiplier, and convert back to string
          const baseCount = parseInt(stat.count.replace(/,/g, ''));
          const newCount = Math.round(baseCount * multiplier * randomFactor);
          
          return {
            ...stat,
            count: newCount.toLocaleString()
          };
        });
        
        setLiveStats(filteredStats);
        setIsLoading(false);
        
        toast({
          title: "Stats Updated",
          description: `Showing stats for: ${filters.timeframe !== 'all' ? filters.timeframe : 'all time'}`,
        });
      }, 800);
    }
  }, [filters, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {liveStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className={`bg-surface border-[var(--border-color)] backdrop-blur-sm ${isLoading ? 'opacity-60' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: stat.bgColor }}>
                <IconComponent className={`h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoading ? '...' : stat.count}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;
