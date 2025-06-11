import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Card, CardContent } from "../ui/Card";
import { Switch } from "../ui/Switch";

interface NotificationCenterProps {
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    type: "warning" | "success" | "info";
    time: string;
    read: boolean;
  }>;
}

const NotificationCenter = ({ notifications }: NotificationCenterProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter(
    (n) => n.type === "warning"
  ).length;
  const thisWeekCount = notifications.length; // Assuming all notifications are from this week for simplicity

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Notification Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-gray-700">
          <CardContent className="text-center">
            <h4 className="text-2xl font-bold text-orange-500">
              {unreadCount}
            </h4>
            <p className="text-gray-300">Unread</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700">
          <CardContent className="text-center">
            <h4 className="text-2xl font-bold text-orange-500">
              {highPriorityCount}
            </h4>
            <p className="text-gray-300">High Priority</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-gray-700">
          <CardContent className="text-center">
            <h4 className="text-2xl font-bold text-orange-500">
              {thisWeekCount}
            </h4>
            <p className="text-gray-300">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Recent Notifications
        </h3>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className="bg-slate-700/50 border-gray-600"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    {notification.title}
                    <Badge
                      className={`bg-${
                        notification.type === "warning" ? "red" : "blue"
                      }-500 text-white`}
                    >
                      {notification.type}
                    </Badge>
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {notification.message}
                  </p>
                  <p className="text-gray-500 text-xs">{notification.time}</p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Mark as Read
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            "Fee Reminders",
            "Academic Updates",
            "Attendance Alerts",
            "General Announcements",
            "Event Notifications",
          ].map((preference) => (
            <Card key={preference} className="bg-slate-700/50 border-gray-600">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h4 className="text-white font-medium">{preference}</h4>
                  <p className="text-gray-400 text-sm">
                    Receive notifications for {preference.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Switch />
                  <label className="text-gray-300">Email</label>
                  <Switch />
                  <label className="text-gray-300">SMS</label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCenter;
