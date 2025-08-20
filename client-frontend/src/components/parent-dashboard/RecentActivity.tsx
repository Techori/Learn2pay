import { motion } from "framer-motion";

interface RecentActivityProps {
  recentActivity: Array<{
    id: number;
    action: string;
    time: string;
    status: "success" | "complete" | "info" | "warning";
  }>;
}

const RecentActivity = ({ recentActivity }: RecentActivityProps) => {
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
    <motion.div variants={itemVariants}>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
           Recent Activity
         </h3>
                 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
           Latest updates about your EMI and child
         </p>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div
                className={`w-3 h-3 rounded-full mt-1.5 ${
                  activity.status === "success"
                    ? "bg-green-500"
                    : activity.status === "complete"
                    ? "bg-blue-500"
                    : activity.status === "info"
                    ? "bg-cyan-500"
                    : "bg-orange-500"
                }`}
              />
              <div className="flex-1">
                                 <p className="text-gray-800 dark:text-white text-sm">{activity.action}</p>
                 <p className="text-gray-600 dark:text-gray-300 text-xs">{activity.time}</p>
              </div>
              <div className="text-right">
                                 {activity.status === "success" && (
                   <span className="text-green-600 dark:text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded">
                     Success
                   </span>
                 )}
                 {activity.status === "complete" && (
                   <span className="text-blue-600 dark:text-blue-400 text-xs bg-blue-500/20 px-2 py-1 rounded">
                     Complete
                   </span>
                 )}
                 {activity.status === "info" && (
                   <span className="text-cyan-600 dark:text-cyan-400 text-xs bg-cyan-500/20 px-2 py-1 rounded">
                     Info
                   </span>
                 )}
                 {activity.status === "warning" && (
                   <span className="text-orange-600 dark:text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded">
                     Alert
                   </span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentActivity;
