import { motion } from "framer-motion";

interface ChildProfileProps {
  childInfo: {
    name: string;
    studentId: string;
    class: string;
    rollNumber: string;
    admissionDate: string;
    email: string;
    phone: string;
    address: string;
    attendance: number;
    currentGrade: string;
    subjects: number;
    status: string;
    school: string;
  };
  parentData: {
    name: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
  learn2payInfo: {
    planType: string;
    totalAmount: number;
    emiAmount: number;
    tenure: string;
    interestRate: number;
  };
}

const ChildProfile = ({
  childInfo,
  parentData,
  learn2payInfo,
}: ChildProfileProps) => {
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
              Student & Plan Information
            </h3>
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Student Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-orange-400 mb-4">
                👤 Student Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Full Name</label>
                  <p className="text-white font-medium">{childInfo.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Student ID</label>
                  <p className="text-white font-medium">
                    {childInfo.studentId}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">School</label>
                  <p className="text-white font-medium">{childInfo.school}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Class</label>
                  <p className="text-white font-medium">{childInfo.class}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Roll Number</label>
                  <p className="text-white font-medium">
                    {childInfo.rollNumber}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Admission Date
                  </label>
                  <p className="text-white font-medium">
                    {childInfo.admissionDate}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Current Status
                  </label>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm">
                    {childInfo.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-orange-400 mb-4">
                📞 Contact Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Student Email</label>
                  <p className="text-white font-medium">{childInfo.email}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Student Phone</label>
                  <p className="text-white font-medium">{childInfo.phone}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Address</label>
                  <p className="text-white font-medium">{childInfo.address}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Parent Name</label>
                  <p className="text-white font-medium">{parentData.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Parent Phone</label>
                  <p className="text-white font-medium">
                    {parentData.contactInfo.phone}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Parent Email</label>
                  <p className="text-white font-medium">
                    {parentData.contactInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Learn2Pay Plan Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-orange-400 mb-4">
                💳 Learn2Pay Plan Details
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-sm">Plan Type</label>
                  <p className="text-white font-medium">
                    {learn2payInfo.planType}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Total Amount Financed
                  </label>
                  <p className="text-white font-medium">
                    ₹{learn2payInfo.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Monthly EMI</label>
                  <p className="text-white font-medium">
                    ₹{learn2payInfo.emiAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Tenure</label>
                  <p className="text-white font-medium">
                    {learn2payInfo.tenure}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Interest Rate</label>
                  <p className="text-white font-medium">
                    {learn2payInfo.interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Current Attendance
                  </label>
                  <p className="text-white font-medium">
                    {childInfo.attendance}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChildProfile;
