import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, Users, TrendingUp } from 'lucide-react';

const FeeReports = () => {
  const monthlyCollectionData = [
    { month: 'Jan', collected: 120000, pending: 30000 },
    { month: 'Feb', collected: 150000, pending: 25000 },
    { month: 'Mar', collected: 180000, pending: 20000 },
    { month: 'Apr', collected: 130000, pending: 35000 },
    { month: 'May', collected: 160000, pending: 28000 },
    { month: 'Jun', collected: 190000, pending: 15000 },
  ];

  const feeStatusDistribution = [
    { name: 'Paid', value: 450, color: '#2ecc71' },
    { name: 'Partial', value: 120, color: '#f1c40f' },
    { name: 'Unpaid', value: 80, color: '#e74c3c' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Fee Reports & Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Collected This Year</CardTitle>
            <IndianRupee className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₹87,00,000</div>
            <p className="text-xs text-gray-400">Total revenue from fees</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Students with Pending Fees</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">200</div>
            <p className="text-xs text-gray-400">Students with outstanding payments</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">On-time Payment Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">85%</div>
            <p className="text-xs text-gray-400">Percentage of fees paid by due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Collection Bar Chart */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Monthly Fee Collection vs. Pending</CardTitle>
          <CardDescription className="text-gray-400">Overview of fee collection per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyCollectionData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Tooltip formatter={(value, name) => [name === 'collected' ? `Collected: ₹${value.toLocaleString()}` : `Pending: ₹${value.toLocaleString()}`, name]} />
              <Legend />
              <Bar dataKey="collected" fill="#f97316" name="Collected" />
              <Bar dataKey="pending" fill="#60a5fa" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fee Status Distribution Pie Chart */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-white">Fee Status Distribution</CardTitle>
          <CardDescription className="text-gray-400">Breakdown of student fee payment statuses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={feeStatusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {feeStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} students`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 w-full">
            {feeStatusDistribution.map((item, index) => (
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

export default FeeReports; 