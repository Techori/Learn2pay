import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { Bell, CheckCircle, DollarSign, UserPlus, TrendingUp, Settings, Mail, AlertTriangle } from 'lucide-react';

const ReferralNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "commission_earned",
      title: "Commission Earned",
      message: "You earned ₹2,250 commission from Excel Coaching Center onboarding",
      timestamp: "2 hours ago",
      read: false,
      priority: "normal",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "referral_milestone",
      title: "Milestone Achievement",
      message: "Congratulations! You've reached 25 successful referrals",
      timestamp: "1 day ago",
      read: false,
      priority: "high",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      id: 3,
      type: "new_lead",
      title: "New Lead Interested",
      message: "Modern Public School showed interest in your referral",
      timestamp: "3 hours ago",
      read: true,
      priority: "medium",
      icon: UserPlus,
      color: "text-blue-600"
    },
    {
      id: 4,
      type: "payout_ready",
      title: "Payout Ready",
      message: "Your payout of ₹22,800 is ready for withdrawal",
      timestamp: "5 hours ago",
      read: false,
      priority: "high",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ]);

  const notificationSettings = [
    {
      category: "Commission Updates",
      description: "Notifications about earned commissions and bonuses",
      email: true,
      push: true,
      sms: false
    },
    {
      category: "Referral Progress",
      description: "Updates on referral status and conversion milestones",
      email: true,
      push: true,
      sms: false
    },
    {
      category: "Payout Notifications",
      description: "Payout processing and payment confirmations",
      email: true,
      push: false,
      sms: true
    },
    {
      category: "Performance Alerts",
      description: "Monthly performance reports and goal achievements",
      email: false,
      push: true,
      sms: false
    },
    {
      category: "Lead Activities",
      description: "New leads, responses, and follow-up reminders",
      email: true,
      push: true,
      sms: false
    }
  ];

  const alertPreferences = [
    {
      title: "Low Conversion Alert",
      description: "Alert when conversion rate drops below 20%",
      enabled: true,
      threshold: "20%"
    },
    {
      title: "Inactive Referral Alert",
      description: "Alert for referrals with no activity for 7 days",
      enabled: true,
      threshold: "7 days"
    },
    {
      title: "Revenue Goal Alert",
      description: "Alert when approaching monthly revenue target",
      enabled: false,
      threshold: "80%"
    },
    {
      title: "Payout Reminder",
      description: "Remind to withdraw available balance above ₹10,000",
      enabled: true,
      threshold: "₹10,000"
    }
  ];

  const [settings, setSettings] = useState(notificationSettings);
  const [alerts, setAlerts] = useState(alertPreferences);

  const unreadCount = notifications.filter(notification => !notification.read).length;
  const highPriorityCount = notifications.filter(notification => notification.priority === 'high' && !notification.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSettingChange = (categoryIndex: number, channel: 'email' | 'push' | 'sms', checked: boolean) => {
    const updatedSettings = settings.map((cat, index) => {
      if (index === categoryIndex) {
        return { ...cat, [channel]: checked };
      }
      return cat;
    });
    setSettings(updatedSettings);
    console.log(`Setting updated: Category ${settings[categoryIndex].category}, Channel ${channel}, Enabled: ${checked}`);
    // TODO: Implement API call to update user notification settings
  };

  const handleAlertChange = (alertIndex: number, enabled: boolean) => {
    const updatedAlerts = alerts.map((alert, index) => {
      if (index === alertIndex) {
        return { ...alert, enabled: enabled };
      }
      return alert;
    });
    setAlerts(updatedAlerts);
    console.log(`Alert updated: ${alerts[alertIndex].title}, Enabled: ${enabled}`);
    // TODO: Implement API call to update user alert preferences
  };

  const handleMarkAllRead = () => {
    console.log('Attempting to mark all notifications as read');
    // TODO: Implement API call to mark all notifications as read
    // TODO: Update frontend state to reflect changes
  };

  const handleViewNotificationSettings = () => {
    console.log('Attempting to view notification settings');
    // TODO: Implement navigation or modal to show detailed settings if needed
  };

  const handleMarkNotificationRead = (notificationId: number) => {
    console.log(`Attempting to mark notification ${notificationId} as read`);
    // TODO: Implement API call to mark specific notification as read
    
    // Update frontend state to mark the notification as read
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  const handleViewNotificationDetails = (notificationId: number) => {
    console.log(`Attempting to view details for notification ${notificationId}`);

    // Find the notification details from the state (using mock data for now)
    const notificationDetails = notifications.find(notification => notification.id === notificationId);

    if (notificationDetails) {
      console.log('Notification Details:');
      // Use console.table for a better-formatted output in the console
      console.table(notificationDetails);
      alert(`Details for notification ID ${notificationId} logged to console.`);
    } else {
      console.log(`Notification with ID ${notificationId} not found.`);
      alert(`Notification with ID ${notificationId} not found.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority (Unread)</p>
                <p className="text-2xl font-bold text-gray-900">{highPriorityCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Recent Notifications</CardTitle>
              <CardDescription>Stay updated with your referral activities</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={handleMarkAllRead}>
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100" onClick={handleViewNotificationSettings}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div key={notification.id} className={`p-4 rounded-lg border transition-colors duration-200 ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-blue-200 hover:bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-100`}>
                      <IconComponent className={`h-6 w-6 ${notification.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100" onClick={() => handleMarkNotificationRead(notification.id)}>
                              Mark Read
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100" onClick={() => handleViewNotificationDetails(notification.id)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 mr-2" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4">
            <div className="grid grid-cols-4 text-sm font-medium text-gray-700">
              <div>Category</div>
              <div>Email</div>
              <div>Push</div>
              <div>SMS</div>
            </div>
            <hr className="border-gray-200" />
            {settings.map((setting, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm text-gray-900">{setting.category}</div>
                  <div>
                  <Switch checked={setting.email} onCheckedChange={(checked) => handleSettingChange(index, 'email', checked)} />
                  </div>
                <div>
                  <Switch checked={setting.push} onCheckedChange={(checked) => handleSettingChange(index, 'push', checked)} />
                </div>
                <div>
                  <Switch checked={setting.sms} onCheckedChange={(checked) => handleSettingChange(index, 'sms', checked)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Preferences */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
            Alert Preferences
          </CardTitle>
          <CardDescription>Customize alerts for key events</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 mr-4">
                  <div className="font-medium text-gray-900">{alert.title}</div>
                  <div className="text-sm text-gray-600">{alert.description}</div>
                  {alert.threshold && <div className="text-xs text-gray-500 mt-1">Threshold: {alert.threshold}</div>}
                </div>
                <div>
                  <Switch checked={alert.enabled} onCheckedChange={(checked) => handleAlertChange(index, checked)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Test Notifications
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
            <Button variant="outline" className="justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Email Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralNotifications;
