import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  School,
} from "lucide-react";

const SupportDashboardOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      title: "Open Tickets",
      value: "23",
      change: "-15% from yesterday",
      icon: <Ticket className="h-5 w-5" />,
      color: "text-orange-500",
    },
    {
      title: "Active Institutes",
      value: "1,247",
      change: "+12% from last month",
      icon: <School className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: "Response Time",
      value: "2.3h",
      change: "-30min from last week",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+2% from last month",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500",
    },
  ]);

  const [recentTickets, setRecentTickets] = useState([
    {
      id: "TKT-001",
      title: "Fee collection not working",
      institute: "ABC School",
      priority: "High",
      status: "In Progress",
      time: "2 hours ago",
    },
    {
      id: "TKT-002",
      title: "Parent portal login issue",
      institute: "XYZ Academy",
      priority: "Medium",
      status: "New",
      time: "4 hours ago",
    },
    {
      id: "TKT-003",
      title: "Payment gateway integration",
      institute: "Success Institute",
      priority: "Low",
      status: "Resolved",
      time: "1 day ago",
    },
  ]);

  const [supportChannels, setSupportChannels] = useState([
    {
      channel: "Email Support",
      requests: 156,
      avgTime: "3.2h",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      channel: "Phone Support",
      requests: 89,
      avgTime: "12min",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      channel: "Live Chat",
      requests: 234,
      avgTime: "8min",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "In Progress":
        return "bg-orange-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleViewAllTickets = () => {
    navigate("/support/tickets");
  };

  const handleViewAllInstitutes = () => {
    navigate("/support/institutes");
  };

  const handleEscalatedIssues = () => {
    navigate("/support/tickets?filter=escalated");
  };

  const handlePerformanceReports = () => {
    navigate("/support/reports");
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/support/tickets/${ticketId}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-slate-800/50 border-gray-700 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                {stat.title}
              </CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Ticket className="h-5 w-5 text-orange-400" />
              <span>Recent Support Tickets</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest support requests from institutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg cursor-pointer hover:bg-slate-700/50"
                  onClick={() => handleTicketClick(ticket.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-200">
                        {ticket.id}
                      </span>
                      <Badge
                        className={`${getPriorityColor(
                          ticket.priority
                        )} text-white`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {ticket.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {ticket.institute} • {ticket.time}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(ticket.status)} text-white`}
                  >
                    {ticket.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-gray-700 text-gray-200 hover:bg-gray-700"
              onClick={handleViewAllTickets}
            >
              View All Tickets
            </Button>
          </CardContent>
        </Card>

        {/* Support Channels */}
        <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <MessageSquare className="h-5 w-5 text-orange-400" />
              <span>Support Channels</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Performance across different support channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-slate-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-orange-400">{channel.icon}</div>
                    <div>
                      <p className="font-medium text-gray-200">
                        {channel.channel}
                      </p>
                      <p className="text-sm text-gray-400">
                        {channel.requests} requests today
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">
                      {channel.avgTime}
                    </p>
                    <p className="text-xs text-gray-400 text-right">
                      avg. response
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handleEscalatedIssues}
              >
                <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                Escalated Issues
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-200 hover:bg-gray-700"
                onClick={handlePerformanceReports}
              >
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                Performance Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboardOverview;
