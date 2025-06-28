import React from "react";
import { useParams } from "react-router-dom";

const LearnMore: React.FC = () => {
  const { type } = useParams<{ type: string }>(); // Extract "type" from the URL.

  const renderContent = () => {
    switch (type) {
      case "schools":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Schools & Colleges</h1>
            <p className="text-lg">
              Complete fee management solution for educational institutions.
            </p>
            <ul className="list-disc ml-8">
              <li>Student registration & management</li>
              <li>Class-wise fee structure</li>
              <li>Parent communication portal</li>
              <li>Transport fee management</li>
            </ul>
          </div>
        );
      case "coaching":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Coaching Centers</h1>
            <p className="text-lg">
              Streamlined billing and management for coaching institutes.
            </p>
            <ul className="list-disc ml-8">
              <li>Batch-wise fee collection</li>
              <li>Automated fee reminders</li>
              <li>Discount and scholarship management</li>
            </ul>
          </div>
        );
      case "universities":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Universities</h1>
            <p className="text-lg">
              Enterprise-grade solutions for large educational institutions.
            </p>
            <ul className="list-disc ml-8">
              <li>Multi-campus management</li>
              <li>Department-wise billing</li>
              <li>Scholarship management</li>
              <li>Hostel fee collection</li>
            </ul>
          </div>
        );
      default:
        return <p className="text-lg">Invalid selection.</p>;
    }
  };

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      {renderContent()}
    </div>
  );
};

export default LearnMore;
