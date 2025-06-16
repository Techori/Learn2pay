import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  IndianRupee,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  Upload,
  Eye,
  Pencil,
} from "lucide-react";

interface PaymentTransaction {
  studentName: string;
  studentId: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
}

const PaymentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const [paymentTransactions, setPaymentTransactions] = useState<
    PaymentTransaction[]
  >([
    {
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      amount: "₹25,000",
      paymentDate: "2024-01-15",
      paymentMethod: "UPI",
      transactionId: "TXN001234567",
      status: "Completed",
    },
    {
      studentName: "Priya Sharma",
      studentId: "STU002",
      amount: "₹23,000",
      paymentDate: "2024-01-14",
      paymentMethod: "Card",
      transactionId: "TXN001234568",
      status: "Completed",
    },
    {
      studentName: "Amit Singh",
      studentId: "STU003",
      amount: "₹22,000",
      paymentDate: "2024-01-13",
      paymentMethod: "Net Banking",
      transactionId: "TXN001234569",
      status: "Failed",
    },
  ]);

  const [isViewPaymentDialogOpen, setIsViewPaymentDialogOpen] = useState(false);
  const [isEditPaymentDialogOpen, setIsEditPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentTransaction | null>(null);

  const paymentSummary = [
    {
      icon: IndianRupee,
      title: "Today's Collection",
      amount: "₹12,45,000",
      description: "+15% from yesterday",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "This Month",
      amount: "₹45,60,000",
      description: "Target: ₹50,00,000",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Payments Today",
      amount: "456",
      description: "95% success rate",
      color: "text-purple-400",
    },
    {
      icon: Calendar,
      title: "Failed Payments",
      amount: "12",
      description: "Needs attention",
      color: "text-orange-400",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
    // Implement actual search logic here
  };

  const handleFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    console.log("Filters:", newFilters);
    // Implement actual filter logic here
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({});
    console.log("Filters cleared");
    // Implement actual clear logic here
  };

  const handleViewPayment = (payment: PaymentTransaction) => {
    setSelectedPayment(payment);
    setIsViewPaymentDialogOpen(true);
  };

  const handleEditPayment = (payment: PaymentTransaction) => {
    setSelectedPayment(payment);
    setIsEditPaymentDialogOpen(true);
  };

  const handleSaveEditedPayment = () => {
    if (selectedPayment) {
      setPaymentTransactions(
        paymentTransactions.map((pt) =>
          pt.transactionId === selectedPayment.transactionId
            ? selectedPayment
            : pt
        )
      );
      setIsEditPaymentDialogOpen(false);
      setSelectedPayment(null);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (selectedPayment) {
      setSelectedPayment((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [id.replace("editPayment", "").toLowerCase()]: value,
        };
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {paymentSummary.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md"
          >
            <CardContent className="p-5 flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${item.color.replace(
                  "text",
                  "bg"
                )}/20`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white flex items-center">
                  <span className="text-xl"></span>
                  {item.amount}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Management Section */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">
              Payment Management
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Track and manage all payment transactions
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <SearchAndFilter
              searchPlaceholder="Search payments..."
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClear={handleClearFilters}
              filterOptions={[
                {
                  key: "date",
                  label: "Date",
                  type: "date",
                },
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: [
                    { value: "Completed", label: "Completed" },
                    { value: "Failed", label: "Failed" },
                    { value: "Pending", label: "Pending" },
                  ],
                },
                {
                  key: "method",
                  label: "Payment Method",
                  type: "select",
                  options: [
                    { value: "UPI", label: "UPI" },
                    { value: "Card", label: "Card" },
                    { value: "Net Banking", label: "Net Banking" },
                  ],
                },
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
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
                    Payment Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Payment Method
                  </th>
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paymentTransactions
                  .filter(
                    (transaction) =>
                      transaction.studentName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      transaction.studentId
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      transaction.transactionId
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .filter((transaction) => {
                    if (
                      filters.date &&
                      transaction.paymentDate !== filters.date
                    ) {
                      return false;
                    }
                    if (
                      filters.status &&
                      transaction.status !== filters.status
                    ) {
                      return false;
                    }
                    if (
                      filters.method &&
                      transaction.paymentMethod !== filters.method
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-800/70">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {transaction.studentName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.studentId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.paymentDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          {transaction.paymentMethod}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            transaction.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleViewPayment(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleEditPayment(transaction)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Payment Dialog */}
      {selectedPayment && (
        <Dialog
          open={isViewPaymentDialogOpen}
          onOpenChange={setIsViewPaymentDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Payment Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Viewing details for transaction ID:{" "}
                {selectedPayment.transactionId}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-400">Student Name:</p>
                <p className="text-white font-medium">
                  {selectedPayment.studentName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Student ID:</p>
                <p className="text-white font-medium">
                  {selectedPayment.studentId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Amount:</p>
                <p className="text-white font-medium">
                  {selectedPayment.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Date:</p>
                <p className="text-white font-medium">
                  {selectedPayment.paymentDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Method:</p>
                <p className="text-white font-medium">
                  {selectedPayment.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Transaction ID:</p>
                <p className="text-white font-medium">
                  {selectedPayment.transactionId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status:</p>
                <Badge
                  className={
                    selectedPayment.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }
                >
                  {selectedPayment.status}
                </Badge>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewPaymentDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Payment Dialog */}
      {selectedPayment && (
        <Dialog
          open={isEditPaymentDialogOpen}
          onOpenChange={setIsEditPaymentDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Edit Payment
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Editing details for transaction ID:{" "}
                {selectedPayment.transactionId}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <Input
                id="editPaymentStudentName"
                type="text"
                placeholder="Student Name"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.studentName}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentStudentId"
                type="text"
                placeholder="Student ID"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.studentId}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentAmount"
                type="text"
                placeholder="Amount"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.amount}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentPaymentDate"
                type="text"
                placeholder="Payment Date"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.paymentDate}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentPaymentMethod"
                type="text"
                placeholder="Payment Method"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.paymentMethod}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentTransactionId"
                type="text"
                placeholder="Transaction ID"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.transactionId}
                onChange={handleEditInputChange}
              />
              <Input
                id="editPaymentStatus"
                type="text"
                placeholder="Status"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedPayment.status}
                onChange={handleEditInputChange}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEditedPayment}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentManagement;
