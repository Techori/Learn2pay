import { motion } from "framer-motion";

interface DashboardStatsProps {
  emiData: {
    nextEmiDue: number;
    dueDate: string;
    totalPaid: number;
    pendingAmount: number;
    attendanceRate: number;
    emiStatus: string;
  };
}

const DashboardStats = ({ emiData }: DashboardStatsProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Next EMI Due */}
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Next EMI Due</p>
              <p className="text-2xl font-bold text-white">
                ₹{emiData.nextEmiDue.toLocaleString()}
              </p>
              <p className="text-red-400 text-sm">due on {emiData.dueDate}</p>
            </div>
            <div className="text-red-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Child's Attendance */}
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Child's Attendance</p>
              <p className="text-2xl font-bold text-white">
                {emiData.attendanceRate}%
              </p>
              <p className="text-green-400 text-sm">This month</p>
            </div>
            <div className="text-green-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Paid to Learn2Pay */}
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Paid</p>
              <p className="text-2xl font-bold text-white">
                ₹{emiData.totalPaid.toLocaleString()}
              </p>
              <p className="text-blue-400 text-sm">to Learn2Pay</p>
            </div>
            <div className="text-blue-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* EMI Status */}
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">EMI Status</p>
              <p className="text-2xl font-bold text-purple-400">
                {emiData.emiStatus}
              </p>
              <p className="text-gray-300 text-sm">Current plan</p>
            </div>
            <div className="text-purple-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardStats;
