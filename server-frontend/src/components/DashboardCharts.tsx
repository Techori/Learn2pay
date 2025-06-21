import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DashboardCharts = () => {
  const monthlyData = [
    { month: 'Jan', fees: 450000, students: 120 },
    { month: 'Feb', fees: 520000, students: 135 },
    { month: 'Mar', fees: 480000, students: 142 },
    { month: 'Apr', fees: 650000, students: 158 },
    { month: 'May', fees: 720000, students: 165 },
    { month: 'Jun', fees: 680000, students: 172 }
  ];

  const paymentData = [
    { name: 'Paid', value: 68, color: '#22c55e' },
    { name: 'Pending', value: 22, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#ef4444' }
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 95 },
    { day: 'Thu', attendance: 89 },
    { day: 'Fri', attendance: 93 },
    { day: 'Sat', attendance: 85 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fee Collection Chart */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Monthly Fee Collection</CardTitle>
          <CardDescription className="text-gray-400">Fee collection trends over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'fees' ? `₹${value.toLocaleString()}` : value,
                  name === 'fees' ? 'Fee Collection' : 'Students'
                ]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="fees" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Status */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Payment Status</CardTitle>
          <CardDescription className="text-gray-400">Current payment distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']} 
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 space-x-4">
            {paymentData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-300">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Enrollment */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Student Enrollment</CardTitle>
          <CardDescription className="text-gray-400">Monthly student enrollment growth</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
              <Line type="monotone" dataKey="students" stroke="#F97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Attendance */}
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Weekly Attendance</CardTitle>
          <CardDescription className="text-gray-400">Average attendance percentage this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis domain={[0, 100]} stroke="#9CA3AF" />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Attendance']}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="attendance" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
