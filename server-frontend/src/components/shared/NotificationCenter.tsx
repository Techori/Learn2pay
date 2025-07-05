import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ScrollArea } from '../../components/ui/ScrollArea';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
// Update the import path below if your useToast hook is located elsewhere
import { useToast } from '../../hooks/use-toast';
import { useTheme } from '../../context/ThemeContext';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationCenter = () => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Payment Received',
      message: 'Fee payment of ₹5,000 received from Student ID: 12345',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Fee Overdue',
      message: 'Student John Doe has overdue fees of ₹2,500',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update',
      message: 'New features have been added to the dashboard',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Payment Failed',
      message: 'Payment gateway error for transaction ID: TXN123',
      timestamp: '5 hours ago',
      read: false
    }
  ]);

  const { toast } = useToast();
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-danger" />;
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <Button 
            variant="outline"
            size="sm" 
            className="h-9 border border-primary bg-background text-text-color hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
          >
            <Bell className="h-4 w-4" />
          </Button>
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-warning text-white pointer-events-none">
              {unreadCount}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[600px] bg-white dark:bg-slate-800 border-border-color">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-foreground">
            Notifications
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary hover:text-primary-hover hover:bg-primary/10">
                Mark all as read
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                    notification.read 
                      ? 'bg-slate-100 dark:bg-slate-700 border-border-color opacity-70' 
                      : 'bg-white dark:bg-slate-800 border-primary/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-foreground">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-foreground/80 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-foreground/60 opacity-70 mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 w-6 p-0 text-success hover:bg-success/10"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-6 w-6 p-0 text-danger hover:bg-danger/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
