import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/Badge";
import { TrendingUp, TrendingDown, Users, DollarSign, BookOpen, Calendar } from 'lucide-react';

const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Collection Efficiency",
      value: "94.2%",
      target: "95%",
      progress: 94.2,
      trend: "up",
      change: "+2.1%",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Student Retention",
      value: "96.8%",
      target: "95%",
      progress: 96.8,
      trend: "up",
      change: "+1.2%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Average Attendance",
      value: "89.5%",
      target: "90%",
      progress: 89.5,
      trend: "down",
      change: "-0.8%",
      icon: Calendar,
      color: "text-orange-400"
    },
    {
      title: "Course Completion",
      value: "87.3%",
      target: "85%",
      progress: 87.3,
      trend: "up",
      change: "+3.1%",
      icon: BookOpen,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
        <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-200">This Month</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm font-medium text-gray-200">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className="text-sm text-gray-400">Target: {metric.target}</span>
                </div>
                <Progress value={metric.progress} className="h-2 bg-gray-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardMetrics;
