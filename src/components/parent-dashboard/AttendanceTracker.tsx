import { motion } from "framer-motion";

interface AttendanceTrackerProps {
  attendanceData: Array<{
    month: string;
    present: number;
    total: number;
    percentage: number;
  }>;
}

const AttendanceTracker = ({ attendanceData }: AttendanceTrackerProps) => {
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
      <motion.div variants={itemVariants}>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">
              Child's Attendance Records
            </h3>
            <p className="text-sm text-gray-400">
              Tracking your child's school attendance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {attendanceData.map((record, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6"
              >
                <h4 className="text-white font-medium mb-2">{record.month}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Present:</span>
                    <span className="text-green-400">{record.present}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total Days:</span>
                    <span className="text-white">{record.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Percentage:</span>
                    <span className="text-blue-400 font-bold">
                      {record.percentage}%
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${record.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceTracker;
