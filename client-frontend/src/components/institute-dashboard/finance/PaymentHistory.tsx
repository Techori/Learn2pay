import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PaymentRecord {
  transactionId: string;
  studentName: string;
  studentId: string;
  amount: string;
  date: string;
  method: string;
  status: string;
}

const PaymentHistory = () => {
  const paymentRecords: PaymentRecord[] = [
    {
      transactionId: "TRN001",
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      amount: "₹15,000",
      date: "2024-06-10",
      method: "UPI",
      status: "Completed",
    },
    {
      transactionId: "TRN002",
      studentName: "Priya Sharma",
      studentId: "STU002",
      amount: "₹22,000",
      date: "2024-06-01",
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      transactionId: "TRN003",
      studentName: "Amit Singh",
      studentId: "STU003",
      amount: "₹5,000",
      date: "2024-05-20",
      method: "Cash",
      status: "Pending",
    },
    {
      transactionId: "TRN004",
      studentName: "Suman Devi",
      studentId: "STU004",
      amount: "₹10,000",
      date: "2024-05-15",
      method: "Card",
      status: "Failed",
    },
  ];

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">Payment History</CardTitle>
        <CardDescription className="text-gray-400">
          View all past payment transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Transaction ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Student Details
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Method
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {paymentRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-800/70">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {record.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {record.studentName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {record.studentId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {record.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {record.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      className={
                        record.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : record.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {record.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
