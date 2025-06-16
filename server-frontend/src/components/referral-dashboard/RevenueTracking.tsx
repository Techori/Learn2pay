import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import {AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

const RevenueTracking = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const monthlyRevenue = [
    { month: 'Aug', revenue: 180000, commission: 18000, referrals: 12 },
    { month: 'Sep', revenue: 220000, commission: 22000, referrals: 15 },
    { month: 'Oct', revenue: 195000, commission: 19500, referrals: 13 },
    { month: 'Nov', revenue: 280000, commission: 28000, referrals: 18 },
    { month: 'Dec', revenue: 320000, commission: 32000, referrals: 22 },
    { month: 'Jan', revenue: 245000, commission: 24500, referrals: 16 }
  ];

  const revenueByCategory = [
    { name: 'Schools', value: 45, amount: 450000 },
    { name: 'Colleges', value: 30, amount: 300000 },
    { name: 'Coaching Centers', value: 20, amount: 200000 },
    { name: 'Universities', value: 5, amount: 50000 }
  ];

  const topEarners = [
    { name: 'Modern Public School', revenue: '₹45,000', commission: '₹4,500', growth: '+15%' },
    { name: 'Excel Coaching Center', revenue: '₹38,000', commission: '₹3,800', growth: '+23%' },
    { name: 'Sunrise College', revenue: '₹32,000', commission: '₹3,200', growth: '+8%' },
    { name: 'Tech Academy', revenue: '₹28,000', commission: '₹2,800', growth: '+12%' },
    { name: 'Smart Learning Hub', revenue: '₹25,000', commission: '₹2,500', growth: '+5%' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹14,60,000</p>
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commission Earned</p>
                <p className="text-2xl font-bold text-gray-900">₹1,46,000</p>
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Referrals</p>
                <p className="text-2xl font-bold text-gray-900">96</p>
                <p className="text-xs text-blue-600">+12 new this month</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Commission Rate</p>
                <p className="text-2xl font-bold text-gray-900">10%</p>
                <p className="text-xs text-gray-600">Standard rate</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and commission tracking</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 text-gray-700">
                  <SelectValue placeholder="Select range">
                    Select range
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value:any) => [`₹${value.toLocaleString()}`, 'Amount']} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="commission" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
                name="Commission"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Revenue by Institute Type</CardTitle>
            <CardDescription>Distribution of revenue across different institute categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({name, value}:{name:string, value:number}) => `${name}: ${value}%`}
                >
                  {revenueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value:any) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {revenueByCategory.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm">{category.name}: ₹{category.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Earners */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Revenue Generators</CardTitle>
            <CardDescription>Institutes generating highest revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEarners.map((earner, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{earner.name}</div>
                      <div className="text-sm text-gray-600">Revenue: {earner.revenue}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{earner.commission}</div>
                    <div className="text-sm text-green-600">{earner.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Monthly Performance Comparison</CardTitle>
          <CardDescription>Compare revenue and referral count month over month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Revenue (₹)" />
              <Bar yAxisId="right" dataKey="referrals" fill="#10B981" name="Referrals" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Commission Breakdown</CardTitle>
          <CardDescription>Detailed view of commission structure and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-5 border rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-blue-600">8%</div>
              <div className="text-sm text-gray-600">Schools & Colleges</div>
              <div className="text-xs text-gray-500 mt-1">₹88,000 this month</div>
            </div>
            <div className="text-center p-5 border rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-green-600">12%</div>
              <div className="text-sm text-gray-600">Coaching Centers</div>
              <div className="text-xs text-gray-500 mt-1">₹48,000 this month</div>
            </div>
            <div className="text-center p-5 border rounded-lg bg-gray-50">
              <div className="text-2xl font-bold text-purple-600">15%</div>
              <div className="text-sm text-gray-600">Premium Tier</div>
              <div className="text-xs text-gray-500 mt-1">₹18,000 this month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueTracking;
