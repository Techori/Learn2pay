import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import {
  Plus,
  FileText,
  Download,
  Send,
  IndianRupee,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

interface InstituteDashboardOverviewProps {
  onQuickActionClick: (tabName: string) => void;
}

const InstituteDashboardOverview = ({
  onQuickActionClick,
}: InstituteDashboardOverviewProps) => {
  const { toast } = useToast();

  const handleGenerateInvoice = () => {
    // Simulate PDF generation and download
    const invoiceContent = `
      Invoice Details:\n
      Invoice Number: INV-${Date.now()}\n
      Date: ${new Date().toLocaleDateString()}\n
      Amount Due: ₹10,000.00\n
      For: Student Tuition Fee\n
      Status: Due\n
      Thank you for your business.\n
    `;

    // Note: For actual PDF generation, a dedicated library like 'jsPDF' or a backend service would be required.
    // This currently downloads a plain text file as a placeholder for a 'PDF'.
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Invoice Generated",
      description: "A sample invoice PDF has been downloaded.",
    });
  };

  const quickActions = [
    {
      icon: Plus,
      title: "Add Student",
      description: "Register new student",
      onClick: () => onQuickActionClick("students"),
    },
    {
      icon: FileText,
      title: "Generate Invoice",
      description: "Create fee invoice",
      onClick: handleGenerateInvoice,
    },
    {
      icon: Download,
      title: "Download Report",
      description: "Export current data",
      onClick: () => onQuickActionClick("reports"),
    },
    {
      icon: Send,
      title: "Send Notification",
      description: "Broadcast message",
      onClick: () => {
        toast({
          title: "Notification Sent",
          description: "Your message has been broadcast successfully!",
        });
      },
    },
  ];

  const financialMetrics = [
    {
      title: "Total fee collection",
      amount: "₹10,50,00,000",
      description: "for 1050 students",
    },
    {
      title: "Paid amount",
      amount: "₹4,50,00,000",
      description: "for 450 students",
    },
    {
      title: "Unpaid amount",
      amount: "₹6,00,00,000",
      description: "for 600 students",
    },
    {
      title: "One-time full payment done",
      amount: "₹75,23,562",
      description: "for 80 students",
    },
  ];

  const productCoverageData = [
    { name: "Cred", students: 200, value: 1500000, color: "#3498db" },
    { name: "Flex", students: 400, value: 4000000, color: "#f39c12" },
    { name: "Pay", students: 250, value: 3000000, color: "#1abc9c" },
  ];

  const paymentBookingData = [
    { month: "Jan", payment: 4000, booking: 2400 },
    { month: "Feb", payment: 3000, booking: 1398 },
    { month: "Mar", payment: 5000, booking: 9800 },
    { month: "Apr", payment: 2780, booking: 3908 },
    { month: "May", payment: 1890, booking: 4800 },
    { month: "Jun", payment: 2390, booking: 3800 },
    { month: "Jul", payment: 3490, booking: 4300 },
    { month: "Aug", payment: 4000, booking: 2400 },
    { month: "Sep", payment: 3000, booking: 1398 },
    { month: "Oct", payment: 5000, booking: 9800 },
    { month: "Nov", payment: 2780, booking: 3908 },
    { month: "Dec", payment: 1890, booking: 4800 },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <Button
              variant="ghost"
              className="w-full h-full p-0 flex flex-col items-center text-center justify-center focus-visible:ring-offset-0 focus-visible:ring-0"
              onClick={action.onClick}
            >
              <CardContent className="p-5 flex flex-col items-center text-center">
                <action.icon className="h-8 w-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </CardContent>
            </Button>
          </Card>
        ))}
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md"
          >
            <CardContent className="p-5">
              <h3 className="text-sm text-gray-300 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white mb-2 flex items-center">
                <IndianRupee className="h-6 w-6 mr-1" />
                {metric.amount}
              </p>
              <p className="text-sm text-gray-400">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Amount covered across products (Donut Chart) */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Amount covered across products
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={productCoverageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productCoverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    props.payload.name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <IndianRupee className="h-6 w-6 mr-1" />
                8,50,00,000
              </p>
              <p className="text-sm text-gray-400">Total amount</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 mt-6 w-full">
              {productCoverageData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm text-gray-400">
                    {item.students} students
                  </span>
                  <span className="text-sm text-white font-medium ml-auto">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment and Booking Chart & Progress Bars */}
        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-white">
                  Payment & Booking
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className="bg-orange-500 text-white">Payment</Badge>
                  <Badge
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    Booking
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={paymentBookingData}>
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="payment" fill="#f97316" name="Payment" />
                  <Bar dataKey="booking" fill="#60a5fa" name="Booking" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student Coverage */}
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                Student coverage
              </h3>
              <Progress
                value={80}
                className="h-3 bg-gray-700 [&>div]:bg-orange-500 mb-2"
              />
              <p className="text-2xl font-bold text-white mb-1">80.00%</p>
              <p className="text-sm text-gray-400">
                850/1050 students covered by Jodo
              </p>
            </CardContent>
          </Card>

          {/* On-time Payment */}
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                On-time payment
              </h3>
              <Progress
                value={95.02}
                className="h-3 bg-gray-700 [&>div]:bg-green-500 mb-2"
              />
              <p className="text-2xl font-bold text-white mb-1">95.02%</p>
              <p className="text-sm text-gray-400">
                775/850 students paid on-time
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboardOverview;
