import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Users, DollarSign } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesReports = () => {
  const [selectedReport, setSelectedReport] = useState('performance');

  const reportTypes = [
    { id: 'performance', name: 'Performance Report', icon: TrendingUp },
    { id: 'revenue', name: 'Revenue Analysis', icon: DollarSign },
    { id: 'conversion', name: 'Conversion Funnel', icon: BarChart3 },
    { id: 'team', name: 'Team Analytics', icon: Users }
  ];

  const performanceMetrics = [
    { label: 'Total Leads Generated', value: '1,247', change: '+23%', trend: 'up' },
    { label: 'Institutes Onboarded', value: '324', change: '+15%', trend: 'up' },
    { label: 'Conversion Rate', value: '26%', change: '+3%', trend: 'up' },
    { label: 'Average Deal Size', value: '₹18,500', change: '+8%', trend: 'up' },
    { label: 'Sales Cycle (Days)', value: '12.5', change: '-2.1', trend: 'down' },
    { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up' }
  ];

  const revenueBreakdown = [
    { source: 'Direct Sales', amount: '₹12,50,000', percentage: 52, color: 'bg-blue-500' },
    { source: 'Referral Program', amount: '₹6,20,000', percentage: 26, color: 'bg-green-500' },
    { source: 'Partner Channel', amount: '₹3,80,000', percentage: 16, color: 'bg-purple-500' },
    { source: 'Digital Marketing', amount: '₹1,50,000', percentage: 6, color: 'bg-orange-500' }
  ];

  const conversionFunnel = [
    { stage: 'Leads Generated', count: 1247, percentage: 100 },
    { stage: 'Qualified Leads', count: 899, percentage: 72 },
    { stage: 'Proposals Sent', count: 562, percentage: 45 },
    { stage: 'Negotiations', count: 389, percentage: 31 },
    { stage: 'Closed Won', count: 324, percentage: 26 }
  ];

  const monthlyTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Leads',
        data: [200, 300, 400, 350, 500, 600],
        backgroundColor: '#f97316',
        borderRadius: 6,
      },
      {
        label: 'Conversions',
        data: [50, 80, 120, 100, 150, 180],
        backgroundColor: '#38bdf8',
        borderRadius: 6,
      },
      {
        label: 'Revenue (k)',
        data: [80, 120, 160, 140, 200, 240],
        backgroundColor: '#a78bfa',
        borderRadius: 6,
      },
    ],
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗' : '↘';
  };

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Report Selection */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Sales Reports & Analytics</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" className="border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex space-x-2">
        {reportTypes.map((type) => (
          <Button
            key={type.id}
            variant={selectedReport === type.id ? 'default' : 'outline'}
            onClick={() => setSelectedReport(type.id)}
            className={`flex items-center ${selectedReport === type.id
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'border-[#232b45] text-gray-300 bg-[#181f32] hover:bg-orange-500/10'
            }`}
          >
            <type.icon className="h-4 w-4 mr-2" />
            {type.name}
          </Button>
        ))}
      </div>

      {/* Performance Report */}
      {selectedReport === 'performance' && (
        <>
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">Key Performance Indicators</CardTitle>
              <CardDescription className="text-gray-400">Monthly performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-[#232b45] rounded-lg bg-[#232b45]">
                    <div className="text-sm text-gray-400">{metric.label}</div>
                    <div className="text-2xl font-bold mt-1 text-white">{metric.value}</div>
                    <div className={`text-sm mt-1 ${getTrendColor(metric.trend)}`}>
                      {getTrendIcon(metric.trend)} {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">Monthly Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-[#232b45] rounded">
                <Bar
                  data={monthlyTrendData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { labels: { color: '#fff' } },
                    },
                    scales: {
                      x: { ticks: { color: '#fff' }, grid: { color: '#232b45' } },
                      y: { ticks: { color: '#fff' }, grid: { color: '#232b45' } },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Revenue Analysis */}
      {selectedReport === 'revenue' && (
        <>
          <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
            <CardHeader>
              <CardTitle className="text-white">Revenue Breakdown by Source</CardTitle>
              <CardDescription className="text-gray-400">Analysis of revenue streams and their contribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="font-medium text-white">{item.source}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-white">{item.amount}</span>
                      <div className="w-32 bg-[#232b45] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{width: `${item.percentage}%`}}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 w-12">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#232b45] rounded">
                <div className="text-lg font-bold text-orange-400">Total Revenue: ₹24,00,000</div>
                <div className="text-sm text-gray-400">15% increase from previous month</div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">Revenue Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-[#232b45] rounded">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Forecast chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Mumbai</span>
                    <Badge className="bg-green-900 text-green-300">₹8,50,000</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Delhi</span>
                    <Badge className="bg-blue-900 text-blue-300">₹6,20,000</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Bangalore</span>
                    <Badge className="bg-purple-900 text-purple-300">₹4,80,000</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Pune</span>
                    <Badge className="bg-orange-900 text-orange-300">₹3,50,000</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Conversion Funnel */}
      {selectedReport === 'conversion' && (
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
          <CardHeader>
            <CardTitle className="text-white">Sales Conversion Funnel</CardTitle>
            <CardDescription className="text-gray-400">Track prospect journey from lead to customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="mb-2 flex items-center">
                    <span className="font-medium text-white">{stage.stage}</span>
                  </div>
                  <div className="relative w-full h-5 mb-1">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 bg-[#232b45] rounded-full"></div>
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                    <div className="relative z-10 flex justify-between items-center h-5 px-2 pointer-events-none">
                      <span className="font-bold text-white">{stage.count}</span>
                      <span className="text-gray-400">{stage.percentage}%</span>
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <div className="text-right text-sm text-red-400 mb-2">
                      -{conversionFunnel[index].count - conversionFunnel[index + 1].count} dropoff
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900 rounded">
                <div className="text-2xl font-bold text-green-300">26%</div>
                <div className="text-sm text-gray-300">Overall Conversion Rate</div>
              </div>
              <div className="text-center p-4 bg-blue-900 rounded">
                <div className="text-2xl font-bold text-blue-300">12.5</div>
                <div className="text-sm text-gray-300">Avg. Sales Cycle (Days)</div>
              </div>
              <div className="text-center p-4 bg-purple-900 rounded">
                <div className="text-2xl font-bold text-purple-300">₹18,500</div>
                <div className="text-sm text-gray-300">Average Deal Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Analytics */}
      {selectedReport === 'team' && (
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
          <CardHeader>
            <CardTitle className="text-white">Team Performance Analytics</CardTitle>
            <CardDescription className="text-gray-400">Individual and team productivity insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Team Analytics Dashboard</h3>
              <p className="text-gray-400">Detailed team performance metrics and comparisons</p>
              <Button className="mt-4 bg-orange-500 text-white hover:bg-orange-600 border-none">View Detailed Analytics</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none text-white">
        <CardHeader>
          <CardTitle className="text-white">Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10">
              <FileText className="h-6 w-6 mb-2" />
              <span>Generate Custom Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Schedule Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10">
              <Download className="h-6 w-6 mb-2" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-[#232b45] text-gray-300 bg-[#232b45] hover:bg-orange-500/10">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Dashboard View</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReports;
