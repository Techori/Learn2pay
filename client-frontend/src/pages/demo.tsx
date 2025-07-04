import { FiUser, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";

const ScheduleDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-orange-600 dark:text-orange-400 mb-4">🚀 Schedule a Demo</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6">
          Let us help you get started! Fill out the form below, and we'll reach out to schedule your personalized demo.
        </p>

        <form className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-10 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-10 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <FiPhone className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-10 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Message Input */}
          <div className="relative">
            <FiMessageCircle className="absolute left-3 top-3 text-gray-400 text-lg" />
            <textarea
              placeholder="Your Message"
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-10 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-3 transition-all duration-300 shadow-md hover:shadow-lg dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleDemoPage;
