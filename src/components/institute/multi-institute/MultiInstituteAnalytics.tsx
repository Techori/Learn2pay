import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, Users, TrendingUp, TrendingDown } from 'lucide-react';

const MultiInstituteAnalytics = () => {
  const revenueData = [
    { month: 'Jan', institutes: 4000, branches: 2400 },
    { month: 'Feb', institutes: 3000, branches: 1398 },
    { month: 'Mar', institutes: 5000, branches: 9800 },
    { month: 'Apr', institutes: 2780, branches: 3908 },
    { month: 'May', institutes: 1890, branches: 4800 },
    { month: 'Jun', institutes: 2390, branches: 3800 },
  ];

  const studentDistributionData = [
    { name: 'Primary', value: 700, color: '#3498db' },
    { name: 'Secondary', value: 1200, color: '#f39c12' },
    { name: 'Higher Ed', value: 480, color: '#1abc9c' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Multi-Institute Analytics Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue Across All Institutes</CardTitle>
            <IndianRupee className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹45.5 Cr</div>
            <p className="text-xs text-gray-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Students Enrolled</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23,800</div>
            <p className="text-xs text-gray-400">+180 since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Average Student Retention</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85.5%</div>
            <p className="text-xs text-gray-400">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Month Chart */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Revenue Across Institutes & Branches</CardTitle>
          <CardDescription className="text-gray-400">Monthly revenue comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="institutes" fill="#f97316" name="Institutes Revenue" />
              <Bar dataKey="branches" fill="#60a5fa" name="Branches Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Student Distribution Chart */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Student Distribution by Education Level</CardTitle>
          <CardDescription className="text-gray-400">Breakdown of students across different levels</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studentDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {studentDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} students`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full">
            {studentDistributionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm text-gray-300">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiInstituteAnalytics; 