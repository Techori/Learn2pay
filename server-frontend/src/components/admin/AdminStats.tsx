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
    { title: "Live Users", count: "1,234", icon: Activity, color: "text-green-400", bgColor: "bg-green-500/20" },
    { title: "Fraud Alerts", count: "12", icon: AlertTriangle, color: "text-red-400", bgColor: "bg-red-500/20" },
    { title: "Pending KYC", count: "89", icon: Shield, color: "text-orange-400", bgColor: "bg-orange-500/20" },
    { title: "Support Tickets", count: "45", icon: Headphones, color: "text-blue-400", bgColor: "bg-blue-500/20" }
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
          <Card key={index} className={`bg-slate-800/50 border-gray-700 backdrop-blur-sm ${isLoading ? 'opacity-60' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`h-5 w-5 ${stat.color} ${isLoading ? 'animate-pulse' : ''}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{isLoading ? '...' : stat.count}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;
