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
      color: "text-primary",
    },
    {
      title: "Active Institutes",
      value: "1,247",
      change: "+12% from last month",
      icon: <School className="h-5 w-5" />,
      color: "text-success",
    },
    {
      title: "Response Time",
      value: "2.3h",
      change: "-30min from last week",
      icon: <Clock className="h-5 w-5" />,
      color: "text-secondary",
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+2% from last month",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-success",
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
        return "bg-danger";
      case "Medium":
        return "bg-warning";
      case "Low":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-secondary";
      case "In Progress":
        return "bg-primary";
      case "Resolved":
        return "bg-success";
      default:
        return "bg-secondary";
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
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-text-secondary">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-primary" />
              <span>Recent Support Tickets</span>
            </CardTitle>
            <CardDescription>
              Latest support requests from institutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg cursor-pointer hover:bg-card-bg/80"
                  onClick={() => handleTicketClick(ticket.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
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
                    <p className="text-sm font-medium">
                      {ticket.title}
                    </p>
                    <p className="text-xs text-text-secondary">
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
              className="w-full mt-4"
              onClick={handleViewAllTickets}
            >
              View All Tickets
            </Button>
          </CardContent>
        </Card>

        {/* Support Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Support Channels</span>
            </CardTitle>
            <CardDescription>
              Performance across different support channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-card-border rounded-lg hover:bg-card-bg/80"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-card-bg/80 p-2 rounded-full text-primary">
                      {channel.icon}
                    </div>
                    <div>
                      <p className="font-medium">{channel.channel}</p>
                      <p className="text-xs text-text-secondary">
                        {channel.requests} requests
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Avg Response</p>
                    <p className="text-text-secondary text-sm">{channel.avgTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Common support tasks and escalations
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="text-left justify-start h-auto py-4"
              onClick={handleEscalatedIssues}
            >
              <div>
                <h3 className="font-medium">Escalated Issues</h3>
                <p className="text-xs text-text-secondary">3 pending escalations</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="text-left justify-start h-auto py-4"
              onClick={handleViewAllInstitutes}
            >
              <div>
                <h3 className="font-medium">Institute Management</h3>
                <p className="text-xs text-text-secondary">
                  View all institutes
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="text-left justify-start h-auto py-4"
              onClick={handlePerformanceReports}
            >
              <div>
                <h3 className="font-medium">Performance Reports</h3>
                <p className="text-xs text-text-secondary">
                  Support team metrics
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Support Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Team Performance</span>
            </CardTitle>
            <CardDescription>
              Support team productivity metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Tickets Resolved</p>
                <p className="text-success">92%</p>
              </div>
              <div className="h-2 bg-card-bg/50 rounded-full mt-2">
                <div className="h-2 bg-success rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Response Time</p>
                <p className="text-primary">87%</p>
              </div>
              <div className="h-2 bg-card-bg/50 rounded-full mt-2">
                <div className="h-2 bg-primary rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">User Satisfaction</p>
                <p className="text-success">95%</p>
              </div>
              <div className="h-2 bg-card-bg/50 rounded-full mt-2">
                <div className="h-2 bg-success rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboardOverview;
