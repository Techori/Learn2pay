import { motion } from "framer-motion";

interface EmiScheduleProps {
  emiSchedule: Array<{
    month: string;
    amount: number;
    status: "paid" | "due" | "upcoming";
    dueDate: string;
    paidDate: string | null;
    schoolFeeCovered: number;
  }>;
  emiData: {
    totalPaid: number;
    pendingAmount: number;
  };
}

const EmiSchedule = ({ emiSchedule, emiData }: EmiScheduleProps) => {
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
              EMI Schedule Dashboard
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Total Paid:{" "}
                <span className="text-green-400 font-bold">
                  ₹{emiData.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Pending:{" "}
                <span className="text-red-400 font-bold">
                  ₹{emiData.pendingAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Auto-Pay Status */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white font-medium">
                  Auto EMI Deduction Active
                </span>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Manage AutoPay
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {emiSchedule.map((emi, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  emi.status === "paid"
                    ? "bg-green-500/10 border-green-500/30"
                    : emi.status === "due"
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-gray-500/10 border-gray-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{emi.month}</h4>
                    <p className="text-gray-400 text-sm">
                      EMI Due: {emi.dueDate}
                    </p>
                    <p className="text-gray-400 text-sm">
                      School Fee Covered: ₹
                      {emi.schoolFeeCovered.toLocaleString()}
                    </p>
                    {emi.paidDate && (
                      <p className="text-green-400 text-sm">
                        Paid: {emi.paidDate}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">
                      ₹{emi.amount.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        emi.status === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : emi.status === "due"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {emi.status === "paid"
                        ? "✅ Paid"
                        : emi.status === "due"
                        ? "🕒 Due"
                        : "⏳ Upcoming"}
                    </span>
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

export default EmiSchedule;
