import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const Payment = () => {
  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      details: "**** **** **** 4532",
      expires: "12/26",
      default: true,
    },
    { id: 2, type: "UPI", details: "priya.sharma@paytm" },
    { id: 3, type: "E-Nach", details: "HDFC Bank - Auto Debit" },
    { id: 4, type: "Net Banking", details: "SBI Bank - ****6789" },
    { id: 5, type: "Digital Wallet", details: "Paytm Wallet" },
  ];

  const recentTransactions = [
    {
      id: 1,
      fee: "Q4 2023 Fee",
      date: "Jan 15, 2024",
      method: "Credit Card ****4532",
      amount: "₹12,500",
      status: "Success",
    },
    {
      id: 2,
      fee: "Q3 2023 Fee",
      date: "Oct 15, 2023",
      method: "UPI - paytm",
      amount: "₹12,500",
      status: "Success",
    },
    {
      id: 3,
      fee: "Q2 2023 Fee",
      date: "Jul 15, 2023",
      method: "E-Nach Auto Debit",
      amount: "₹12,500",
      status: "Success",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Payment Section */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Quick Payment</h3>
        <Card className="bg-slate-700/50 border-gray-600">
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-white font-medium">Amount to Pay</h4>
              <p className="text-green-500 text-2xl font-bold">₹12,500</p>
              <p className="text-gray-400 text-sm">Q3 2024 Fee Due</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">Select Payment Method</h4>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id={`method-${method.id}`}
                  />
                  <label
                    htmlFor={`method-${method.id}`}
                    className="text-gray-300"
                  >
                    {method.type} - {method.details}
                  </label>
                </div>
              ))}
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4">
              Request to Pay
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="bg-slate-700/50 border-gray-600"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h4 className="text-white font-medium">{transaction.fee}</h4>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                  <p className="text-gray-500 text-xs">{transaction.method}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-green-500 font-bold">
                    {transaction.amount}
                  </p>
                  <Badge className="bg-green-500 text-white">
                    {transaction.status}
                  </Badge>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    View Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods Section */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="bg-slate-700/50 border-gray-600">
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    {method.type}
                    {method.default && (
                      <Badge className="bg-orange-500 text-white">
                        Default
                      </Badge>
                    )}
                  </h4>
                  <p className="text-gray-400 text-sm">{method.details}</p>
                  {method.expires && (
                    <p className="text-gray-500 text-xs">
                      Expires: {method.expires}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Edit
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Gateway Options */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Payment Gateway Options
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {["Razorpay", "PayU", "CCAvenue", "Cash Payment"].map((gateway) => (
            <Button
              key={gateway}
              className="bg-slate-700 hover:bg-slate-800 text-white w-full py-4"
            >
              {gateway}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
