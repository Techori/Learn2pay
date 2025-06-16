import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  QrCode,
  IndianRupee,
  RefreshCcw,
  Plus,
  Upload,
  Eye,
  Download,
  BarChart2,
} from "lucide-react";
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import { useToast } from "@/hooks/use-toast";

interface QRTransaction {
  transactionId: string;
  fullTransactionId: string;
  studentName: string;
  feeType: string;
  amount: string;
  paymentMethod: string;
  status: string;
  timestamp: string;
}

const QRTransactionManagement = () => {
  const [showGenerateQrDialog, setShowGenerateQrDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [qrCodeData, setQrCodeData] = useState({
    amount: "",
    studentId: "",
    description: "",
  });
  const [generatedQrImageUrl, setGeneratedQrImageUrl] = useState<string | null>(
    null
  );

  const [qrTransactions, setQrTransactions] = useState<QRTransaction[]>([
    {
      transactionId: "QR001",
      fullTransactionId: "TXN123456789",
      studentName: "Aarav Sharma",
      feeType: "Quarterly Fees",
      amount: "₹15,000",
      paymentMethod: "UPI",
      status: "Success",
      timestamp: "2024-01-15 10:30 AM",
    },
    {
      transactionId: "QR002",
      fullTransactionId: "TXN123456790",
      studentName: "Priya Patel",
      feeType: "Exam Fees",
      amount: "₹2,000",
      paymentMethod: "UPI",
      status: "Pending",
      timestamp: "2024-01-15 11:15 AM",
    },
    {
      transactionId: "QR003",
      fullTransactionId: "TXN123456791",
      studentName: "Rahul Kumar",
      feeType: "Transport Fees",
      amount: "₹8,000",
      paymentMethod: "UPI",
      status: "Failed",
      timestamp: "2024-01-15 12:00 PM",
    },
  ]);

  const [isViewTransactionDialogOpen, setIsViewTransactionDialogOpen] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<QRTransaction | null>(null);

  const { toast } = useToast();

  const qrSummary = [
    {
      icon: QrCode,
      title: "QR Transactions Today",
      value: qrTransactions
        .filter(
          (t) =>
            new Date(t.timestamp).toDateString() === new Date().toDateString()
        )
        .length.toString(),
      color: "text-blue-400",
    },
    {
      icon: IndianRupee,
      title: "Amount Collected",
      value: `₹${qrTransactions
        .reduce(
          (sum, t) =>
            sum + parseFloat(t.amount.replace("₹", "").replace(",", "")),
          0
        )
        .toLocaleString()}`,
      color: "text-green-400",
    },
    {
      icon: BarChart2,
      title: "Success Rate",
      value: `${(
        (qrTransactions.filter((t) => t.status === "Success").length /
          (qrTransactions.length || 1)) *
        100
      ).toFixed(1)}%`,
      color: "text-purple-400",
    },
    {
      icon: RefreshCcw,
      title: "Pending Transactions",
      value: qrTransactions
        .filter((t) => t.status === "Pending")
        .length.toString(),
      color: "text-orange-400",
    },
  ];

  const handleQrDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setQrCodeData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateQrSubmit = () => {
    const dataString = `Amount: ₹${qrCodeData.amount}, Student ID: ${qrCodeData.studentId}, Desc: ${qrCodeData.description}`;
    const mockQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      dataString
    )}`;
    setGeneratedQrImageUrl(mockQrUrl);
    setShowGenerateQrDialog(false);

    const newQRTransaction: QRTransaction = {
      transactionId: `QR${(qrTransactions.length + 1)
        .toString()
        .padStart(3, "0")}`,
      fullTransactionId: `TXN${Date.now().toString().slice(-10)}`,
      studentName: qrCodeData.studentId
        ? `Student ${qrCodeData.studentId}`
        : "N/A",
      feeType: qrCodeData.description || "General",
      amount: `₹${parseFloat(qrCodeData.amount || "0").toLocaleString()}`,
      paymentMethod: "UPI", // Assuming UPI for QR
      status: "Pending", // Initial status after generation
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setQrTransactions((prevTransactions) => [
      ...prevTransactions,
      newQRTransaction,
    ]);
    toast({
      title: "QR Code Generated!",
      description: "A new QR code has been generated and added to the list.",
    });
    setQrCodeData({ amount: "", studentId: "", description: "" });
  };

  const handleRefresh = () => {
    console.log("Refreshing QR transaction data...");
    toast({
      title: "Refreshed",
      description: "QR transaction data has been refreshed.",
    });
    // In a real application, you would fetch new data here.
  };

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

  const handleExport = () => {
    console.log("Export QR transactions clicked");
    toast({
      title: "Exporting Data",
      description: "QR transaction data is being exported.",
    });
  };

  const handleViewTransaction = (transaction: QRTransaction) => {
    setSelectedTransaction(transaction);
    setIsViewTransactionDialogOpen(true);
  };

  const handleDownloadQr = (transaction: QRTransaction) => {
    const qrCodeDownloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      transaction.fullTransactionId
    )}`;
    const a = document.createElement("a");
    a.href = qrCodeDownloadUrl;
    a.download = `QR_${transaction.transactionId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({
      title: "Downloading QR",
      description: `QR code for ${transaction.transactionId} is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* QR Transaction Summary Cards */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            QR Transaction Management
          </h2>
          <p className="text-gray-400">
            Monitor and manage QR code based transactions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2"
            onClick={handleRefresh}
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Dialog
            open={showGenerateQrDialog}
            onOpenChange={setShowGenerateQrDialog}
          >
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Generate QR Code</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Generate New QR Code
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter details to generate a new QR code for payments.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="amount"
                  placeholder="Amount"
                  type="number"
                  value={qrCodeData.amount}
                  onChange={handleQrDataChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  id="studentId"
                  placeholder="Student ID (Optional)"
                  value={qrCodeData.studentId}
                  onChange={handleQrDataChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  id="description"
                  placeholder="Description (e.g., Class Fee)"
                  value={qrCodeData.description}
                  onChange={handleQrDataChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowGenerateQrDialog(false)}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateQrSubmit}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Generate QR
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {generatedQrImageUrl && (
        <Dialog
          open={!!generatedQrImageUrl}
          onOpenChange={() => setGeneratedQrImageUrl(null)}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader className="text-center">
              <DialogTitle className="text-white">
                Generated QR Code
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Scan this QR code to make a payment.
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 p-4 bg-white rounded-md flex justify-center">
              <img
                src={generatedQrImageUrl}
                alt="Generated QR Code"
                className="w-48 h-48"
              />
            </div>
            <DialogFooter className="w-full justify-center">
              <Button
                onClick={() => setGeneratedQrImageUrl(null)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {qrSummary.map((item, index) => (
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
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* QR Code Transactions Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">
              QR Code Transactions
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Review all QR code based payment transactions
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2"
              onClick={handleExport}
            >
              <Upload className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <SearchAndFilter
              searchPlaceholder="Search transactions..."
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClear={handleClearFilters}
              filterOptions={[
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: [
                    { value: "Success", label: "Success" },
                    { value: "Pending", label: "Pending" },
                    { value: "Failed", label: "Failed" },
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
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Student / Fee Type
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
                    Method & Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Timestamp
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
                {qrTransactions
                  .filter(
                    (transaction) =>
                      transaction.studentName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      transaction.transactionId
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      transaction.fullTransactionId
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .filter((transaction) => {
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
                          {transaction.transactionId}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.fullTransactionId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {transaction.studentName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.feeType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {transaction.paymentMethod}
                        </div>
                        <Badge
                          className={
                            transaction.status === "Success"
                              ? "bg-green-500/20 text-green-400"
                              : transaction.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {transaction.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleViewTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleDownloadQr(transaction)}
                          >
                            <Download className="h-4 w-4" />
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

      {/* View QR Transaction Dialog */}
      {selectedTransaction && (
        <Dialog
          open={isViewTransactionDialogOpen}
          onOpenChange={setIsViewTransactionDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                QR Transaction Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Viewing details for transaction ID:{" "}
                {selectedTransaction.transactionId}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-400">Transaction ID:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.transactionId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Full Transaction ID:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.fullTransactionId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Student Name:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.studentName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Fee Type:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.feeType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Amount:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Method:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.paymentMethod}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status:</p>
                <Badge
                  className={
                    selectedTransaction.status === "Success"
                      ? "bg-green-500/20 text-green-400"
                      : selectedTransaction.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }
                >
                  {selectedTransaction.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-400">Timestamp:</p>
                <p className="text-white font-medium">
                  {selectedTransaction.timestamp}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewTransactionDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default QRTransactionManagement;
