import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Alert, AlertDescription } from "../../components/ui/Alert";
import { AlertTriangle, Shield, Eye, Ban, CheckCircle, XCircle, Clock, TrendingUp, Settings } from 'lucide-react';

const FraudDetectionSystem = () => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const fraudAlerts = [
    {
      id: 1,
      type: "Multiple Failed Payments",
      user: "John Doe (ABC School)",
      severity: "High",
      description: "15 failed payment attempts in 30 minutes",
      timestamp: "2024-01-15 14:30",
      status: "Open",
      riskScore: 85,
      details: {
        ip: "192.168.1.100",
        device: "Mobile - Android",
        location: "Mumbai, India",
        attempts: 15,
        amount: "₹50,000"
      }
    },
    {
      id: 2,
      type: "Suspicious Login Pattern",
      user: "Jane Smith (XYZ College)",
      severity: "Medium",
      description: "Login from multiple locations within 2 hours",
      timestamp: "2024-01-15 12:15",
      status: "Investigating",
      riskScore: 65,
      details: {
        ip: "192.168.1.101",
        device: "Desktop - Windows",
        location: "Delhi, India",
        attempts: 8,
        amount: "₹25,000"
      }
    },
    {
      id: 3,
      type: "Unusual Transaction Amount",
      user: "Mike Johnson (PQR Academy)",
      severity: "Low",
      description: "Transaction amount 500% higher than usual",
      timestamp: "2024-01-15 10:45",
      status: "Resolved",
      riskScore: 45,
      details: {
        ip: "192.168.1.102",
        device: "Mobile - iOS",
        location: "Bangalore, India",
        attempts: 3,
        amount: "₹2,50,000"
      }
    }
  ];

  const fraudStats = [
    { label: "Total Alerts", value: "24", change: "+15%", color: "text-red-600" },
    { label: "High Risk", value: "8", change: "+25%", color: "text-red-800" },
    { label: "Blocked Accounts", value: "12", change: "+10%", color: "text-orange-600" },
    { label: "Resolved Cases", value: "156", change: "+8%", color: "text-green-600" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'Investigating': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Fraud Detection System
        </CardTitle>
        <CardDescription>Flag unusual activity and prevent fraudulent transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fraud Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fraudStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className={`text-xs ${stat.color}`}>{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Alerts */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Fraud Alerts</h3>
            {/* <Button size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button> */}
          </div>

          <div className="space-y-3">
            {fraudAlerts.map((alert) => (
              <Card key={alert.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="font-semibold">{alert.type}</span>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>User:</strong> {alert.user}
                      </div>
                      
                      <div className="text-sm text-gray-700 mb-2">
                        {alert.description}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.timestamp}
                        </span>
                        <span className={`font-semibold ${getRiskScoreColor(alert.riskScore)}`}>
                          Risk Score: {alert.riskScore}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        <Ban className="h-3 w-3 mr-1" />
                        Block User
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Safe
                      </Button>
                    </div>
                  </div>

                  {/* Alert Details */}
                  {selectedAlert === alert.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded border-l-4 border-blue-500">
                      <h4 className="font-semibold mb-2">Alert Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">IP Address:</span> {alert.details.ip}
                        </div>
                        <div>
                          <span className="font-medium">Device:</span> {alert.details.device}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {alert.details.location}
                        </div>
                        <div>
                          <span className="font-medium">Failed Attempts:</span> {alert.details.attempts}
                        </div>
                        <div>
                          <span className="font-medium">Transaction Amount:</span> {alert.details.amount}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fraud Prevention Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fraud Prevention Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Multiple Payment Failures:</strong> Flag users with more than 10 failed payment attempts in 1 hour
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Unusual Login Patterns:</strong> Detect logins from multiple locations within 2 hours
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>High-Value Transactions:</strong> Review transactions 300% higher than user's average
                </AlertDescription>
              </Alert>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Suspicious Device Changes:</strong> Flag frequent device/browser changes for same account
                </AlertDescription>
              </Alert>
            </div>
            
            <Button className="mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Configure Rules
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default FraudDetectionSystem;
