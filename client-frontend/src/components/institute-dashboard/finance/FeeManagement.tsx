import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
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
  DollarSign,
  IndianRupee,
  Users,
  FileText,
  Plus,
  Upload,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import PaymentHistory from "./PaymentHistory";
import FeeReports from "./FeeReports";
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import axios from "axios";

const FeeManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState("student-fees");
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [showAddFeeStructureDialog, setShowAddFeeStructureDialog] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [paymentDetails, setPaymentDetails] = useState({
    studentId: "",
    amount: "",
    date: "",
    method: "",
  });
  const [newFeeStructure, setNewFeeStructure] = useState({
    class: "",
    tuitionFee: "",
    admissionFee: "",
    examFee: "",
  });

  const [studentFees, setStudentFees] = useState<any[]>([]);
  const [isLoadingStudentFees, setIsLoadingStudentFees] = useState(true);

  const [isViewStudentFeeDialogOpen, setIsViewStudentFeeDialogOpen] =
    useState(false);
  const [isEditStudentFeeDialogOpen, setIsEditStudentFeeDialogOpen] =
    useState(false);
  const [selectedStudentFee, setSelectedStudentFee] = useState<any>(null);

  const [feeStructures, setFeeStructures] = useState<any[]>([]);
  const [isLoadingFeeStructures, setIsLoadingFeeStructures] = useState(true);

  // API Configuration
  const API_BASE_URL = import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_LOCAL_API_BASE_URL || "http://localhost:3000";

  // Fetch fee structures from API
  const fetchFeeStructures = async () => {
    try {
      setIsLoadingFeeStructures(true);
      const response = await axios.get(`${API_BASE_URL}/api/fee-structures`, {
        withCredentials: true
      });
      
      if (response.data.success && response.data.data) {
        // Transform API data to match component format
        const transformedData = response.data.data.map((item: any) => ({
          id: item._id,
          class: `Class ${item.class}`,
          tuitionFee: `₹${item.tuitionFee.toLocaleString('en-IN')}`,
          admissionFee: `₹${item.admissionFee.toLocaleString('en-IN')}`,
          examFee: `₹${item.examFee.toLocaleString('en-IN')}`,
          totalFee: `₹${item.totalFee.toLocaleString('en-IN')}`,
          originalData: item // Keep original data for API operations
        }));
        setFeeStructures(transformedData);
      } else {
        console.error('Failed to fetch fee structures:', response.data);
        // Fallback to empty array
        setFeeStructures([]);
      }
    } catch (error: any) {
      console.error('Error fetching fee structures:', error);
      if (error.response?.status === 401) {
        console.log('Authentication required for fee structures');
      }
      // Keep empty array on error
      setFeeStructures([]);
    } finally {
      setIsLoadingFeeStructures(false);
    }
  };

  // Fetch student fees from API
  const fetchStudentFees = async () => {
    try {
      setIsLoadingStudentFees(true);
      const response = await axios.get(`${API_BASE_URL}/api/student-fees`, {
        withCredentials: true
      });
      
      if (response.data.success && response.data.data) {
        // Transform API data to match component format
        const transformedData = response.data.data.map((item: any) => ({
          id: item._id,
          studentName: item.studentName,
          studentId: item.studentId,
          class: `${item.class}th A`, // Format class display
          feeStructure: `₹${item.totalFeeAmount.toLocaleString('en-IN')}`,
          paymentStatus: item.paymentStatus,
          paidAmount: `₹${item.paidAmount.toLocaleString('en-IN')}`,
          pendingAmount: `₹${item.pendingAmount.toLocaleString('en-IN')}`,
          dueDate: new Date(item.dueDate).toISOString().slice(0, 10),
          lastPayment: item.lastPaymentDate 
            ? new Date(item.lastPaymentDate).toISOString().slice(0, 10)
            : "No payment yet",
          originalData: item // Keep original data for API operations
        }));
        setStudentFees(transformedData);
      } else {
        console.error('Failed to fetch student fees:', response.data);
        setStudentFees([]);
      }
    } catch (error: any) {
      console.error('Error fetching student fees:', error);
      if (error.response?.status === 401) {
        console.log('Authentication required for student fees');
      }
      setStudentFees([]);
    } finally {
      setIsLoadingStudentFees(false);
    }
  };

  // Fetch fee structures on component mount
  useEffect(() => {
    fetchFeeStructures();
    fetchStudentFees();
  }, []);

  const [isViewFeeStructureDialogOpen, setIsViewFeeStructureDialogOpen] =
    useState(false);
  const [isEditFeeStructureDialogOpen, setIsEditFeeStructureDialogOpen] =
    useState(false);
  const [isDeleteFeeStructureDialogOpen, setIsDeleteFeeStructureDialogOpen] =
    useState(false);
  const [selectedFeeStructure, setSelectedFeeStructure] = useState<any>(null);

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddPaymentSubmit = async () => {
    try {
      // Find the student fee record
      const studentFeeRecord = studentFees.find(
        (fee) => fee.studentId === paymentDetails.studentId
      );

      if (!studentFeeRecord) {
        alert('Student not found. Please check the student ID.');
        return;
      }

      const payload = {
        amount: parseFloat(paymentDetails.amount),
        method: paymentDetails.method,
        transactionId: `TXN_${Date.now()}`, // Generate a transaction ID
        remarks: `Payment via ${paymentDetails.method}`
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/student-fees/${studentFeeRecord.id}/payment`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(`Payment of ₹${paymentDetails.amount} added successfully for student ${paymentDetails.studentId}`);
        await fetchStudentFees(); // Refresh the list
        setShowAddPaymentDialog(false);
        setPaymentDetails({ studentId: "", amount: "", date: "", method: "" });
      } else {
        alert('Failed to add payment. Please try again.');
      }
    } catch (error: any) {
      console.error('Error adding payment:', error);
      if (error.response?.status === 401) {
        alert('Authentication required. Please log in.');
      } else if (error.response?.status === 400) {
        alert(error.response?.data?.message || 'Invalid payment details.');
      } else {
        alert('Failed to add payment. Please try again.');
      }
    }
  };

  const handleFeeStructureInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setNewFeeStructure((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddFeeStructureSubmit = async () => {
    try {
      const payload = {
        class: newFeeStructure.class,
        tuitionFee: parseFloat(newFeeStructure.tuitionFee || "0"),
        admissionFee: parseFloat(newFeeStructure.admissionFee || "0"),
        examFee: parseFloat(newFeeStructure.examFee || "0"),
        academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
        // instituteId will be automatically set by the backend from authentication
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/fee-structures`, 
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert(`Fee structure for ${newFeeStructure.class} added successfully!`);
        await fetchFeeStructures(); // Refresh the list
        setShowAddFeeStructureDialog(false);
        setNewFeeStructure({
          class: "",
          tuitionFee: "",
          admissionFee: "",
          examFee: "",
        });
      } else {
        alert('Failed to add fee structure. Please try again.');
      }
    } catch (error: any) {
      console.error('Error adding fee structure:', error);
      if (error.response?.status === 401) {
        alert('Authentication required. Please log in.');
      } else {
        alert('Failed to add fee structure. Please try again.');
      }
    }
  };

  const handleViewStudentFee = (fee: any) => {
    setSelectedStudentFee(fee);
    setIsViewStudentFeeDialogOpen(true);
  };

  const handleEditStudentFee = (fee: any) => {
    setSelectedStudentFee(fee);
    setIsEditStudentFeeDialogOpen(true);
  };

  const handleSaveEditedStudentFee = () => {
    if (selectedStudentFee) {
      setStudentFees(
        studentFees.map((sf) =>
          sf.studentId === selectedStudentFee.studentId
            ? selectedStudentFee
            : sf
        )
      );
      setIsEditStudentFeeDialogOpen(false);
      setSelectedStudentFee(null);
    }
  };

  const handleStudentFeeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    if (selectedStudentFee) {
      setSelectedStudentFee((prev: any) => {
        if (!prev) return null;
        return {
          ...prev,
          [id.replace("editStudentFee", "").toLowerCase()]: value,
        };
      });
    }
  };

  const handleViewFeeStructure = (structure: any) => {
    setSelectedFeeStructure(structure);
    setIsViewFeeStructureDialogOpen(true);
  };

  const handleEditFeeStructure = (structure: any) => {
    setSelectedFeeStructure(structure);
    setIsEditFeeStructureDialogOpen(true);
  };

  const handleDeleteFeeStructure = (structure: any) => {
    setSelectedFeeStructure(structure);
    setIsDeleteFeeStructureDialogOpen(true);
  };

  const confirmDeleteFeeStructure = async () => {
    if (!selectedFeeStructure) return;

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/fee-structures/${selectedFeeStructure.id || selectedFeeStructure.originalData?._id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Fee structure deleted successfully!');
        await fetchFeeStructures(); // Refresh the list
        setIsDeleteFeeStructureDialogOpen(false);
        setSelectedFeeStructure(null);
      } else {
        alert('Failed to delete fee structure. Please try again.');
      }
    } catch (error: any) {
      console.error('Error deleting fee structure:', error);
      if (error.response?.status === 401) {
        alert('Authentication required. Please log in.');
      } else if (error.response?.status === 404) {
        alert('Fee structure not found. It may have already been deleted.');
      } else {
        alert('Failed to delete fee structure. Please try again.');
      }
    }
  };

  const handleSaveEditedFeeStructure = async () => {
    if (!selectedFeeStructure) return;

    try {
      // Parse the numeric values from the formatted strings
      const parseAmount = (value: string) => {
        return parseFloat(value.replace(/[₹,]/g, '') || "0");
      };

      const payload = {
        class: selectedFeeStructure.class.replace('Class ', ''), // Remove 'Class ' prefix
        tuitionFee: parseAmount(selectedFeeStructure.tuitionfee || selectedFeeStructure.tuitionFee),
        admissionFee: parseAmount(selectedFeeStructure.admissionfee || selectedFeeStructure.admissionFee),
        examFee: parseAmount(selectedFeeStructure.examfee || selectedFeeStructure.examFee),
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/fee-structures/${selectedFeeStructure.id || selectedFeeStructure.originalData?._id}`,
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Fee structure updated successfully!');
        await fetchFeeStructures(); // Refresh the list
        setIsEditFeeStructureDialogOpen(false);
        setSelectedFeeStructure(null);
      } else {
        alert('Failed to update fee structure. Please try again.');
      }
    } catch (error: any) {
      console.error('Error updating fee structure:', error);
      if (error.response?.status === 401) {
        alert('Authentication required. Please log in.');
      } else if (error.response?.status === 404) {
        alert('Fee structure not found. It may have been deleted.');
      } else {
        alert('Failed to update fee structure. Please try again.');
      }
    }
  };

  const handleFeeStructureEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    if (selectedFeeStructure) {
      setSelectedFeeStructure((prev: any) => {
        if (!prev) return null;
        
        // Map the input field IDs to the correct property names
        let fieldName = id.replace("editFeeStructure", "").toLowerCase();
        
        // Handle specific field mappings
        if (fieldName === "tuitionfee") fieldName = "tuitionFee";
        if (fieldName === "admissionfee") fieldName = "admissionFee";
        if (fieldName === "examfee") fieldName = "examFee";
        if (fieldName === "totalfee") fieldName = "totalFee";
        
        const updatedStructure = {
          ...prev,
          [fieldName]: value,
        };

        // Auto-calculate total fee if any fee component changes
        if (fieldName === "tuitionFee" || fieldName === "admissionFee" || fieldName === "examFee") {
          const parseAmount = (val: string) => parseFloat(val.replace(/[₹,]/g, '') || "0");
          
          const tuition = parseAmount(fieldName === "tuitionFee" ? value : updatedStructure.tuitionFee);
          const admission = parseAmount(fieldName === "admissionFee" ? value : updatedStructure.admissionFee);
          const exam = parseAmount(fieldName === "examFee" ? value : updatedStructure.examFee);
          
          const total = tuition + admission + exam;
          updatedStructure.totalFee = `₹${total.toLocaleString('en-IN')}`;
        }

        return updatedStructure;
      });
    }
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

  const financialSummary = [
    {
      icon: IndianRupee,
      title: "Total Collected",
      amount: "45,60,00,000",
      description: "This academic year",
      color: "text-green-400",
    },
    {
      icon: IndianRupee,
      title: "Pending Amount",
      amount: "12,40,000",
      description: "Due this month",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Paid Students",
      amount: "456",
      description: "Out of 650 total",
      color: "text-purple-400",
    },
    {
      icon: FileText,
      title: "Overdue",
      amount: "78",
      description: "Payment pending",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {financialSummary.map((item, index) => (
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
                <p className="text-2xl font-bold flex items-center">
                  <span className="text-xl"></span>
                  {item.amount}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner Tabs for Fee Management */}
      <Tabs
        value={activeSubTab}
        onValueChange={setActiveSubTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4  p-1 rounded-md">
          <TabsTrigger
            value="student-fees"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Student Fees
          </TabsTrigger>
          <TabsTrigger
            value="fee-structure"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Fee Structure
          </TabsTrigger>
          <TabsTrigger
            value="payment-history"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Payment History
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Student Fees Tab Content */}
        <TabsContent value="student-fees">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg ">
                  Student Fee Management
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Track and manage individual student fee payments
                </p>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showAddPaymentDialog}
                  onOpenChange={setShowAddPaymentDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Payment</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Add New Payment
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Enter the details for the new fee payment.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        id="studentId"
                        placeholder="Student ID"
                        value={paymentDetails.studentId}
                        onChange={handlePaymentInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="amount"
                        placeholder="Amount"
                        type="number"
                        value={paymentDetails.amount}
                        onChange={handlePaymentInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="date"
                        type="date"
                        value={paymentDetails.date}
                        onChange={handlePaymentInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="method"
                        placeholder="Payment Method (e.g., Cash, UPI, Card)"
                        value={paymentDetails.method}
                        onChange={handlePaymentInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddPaymentDialog(false)}
                        className="border-gray-700 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddPaymentSubmit}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Add Payment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                  searchPlaceholder="Search student fees..."
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  onClear={handleClearFilters}
                  filterOptions={[
                    {
                      key: "paymentStatus",
                      label: "Payment Status",
                      type: "select",
                      options: [
                        { value: "Paid", label: "Paid" },
                        { value: "Partial", label: "Partial" },
                        { value: "Unpaid", label: "Unpaid" },
                      ],
                    },
                    {
                      key: "class",
                      label: "Class",
                      type: "select",
                      options: [
                        { value: "10th A", label: "10th A" },
                        { value: "9th B", label: "9th B" },
                        { value: "8th C", label: "8th C" },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Student Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Fee Structure
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Payment Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Paid Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Pending Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Last Payment
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {isLoadingStudentFees ? (
                      <tr>
                        <td colSpan={9} className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-2"></div>
                            <span className="text-gray-400">Loading student fees...</span>
                          </div>
                        </td>
                      </tr>
                    ) : studentFees.length > 0 ? (
                      studentFees
                        .filter(
                          (fee) =>
                            fee.studentName
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            fee.studentId
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            fee.class
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                        )
                        .filter((fee) => {
                          if (
                            filters.paymentStatus &&
                            fee.paymentStatus !== filters.paymentStatus
                          ) {
                            return false;
                          }
                          if (filters.class && fee.class !== filters.class) {
                            return false;
                          }
                          return true;
                        })
                        .map((fee, index) => (
                          <tr key={fee.id || index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium ">
                                {fee.studentName}
                              </div>
                              <div className="text-xs text-gray-500">
                                {fee.studentId}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                              {fee.class}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {fee.feeStructure}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  fee.paymentStatus === "Paid"
                                    ? "bg-green-500/20 text-green-400"
                                    : fee.paymentStatus === "Partial"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                                }
                              >
                                {fee.paymentStatus}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                              {fee.paidAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                              {fee.pendingAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                              {fee.dueDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">
                              {fee.lastPayment}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  className="text-gray-400 hover:text-orange-500"
                                  onClick={() => handleViewStudentFee(fee)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="text-gray-400 hover:text-orange-500"
                                  onClick={() => handleEditStudentFee(fee)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
                          No student fee records found. Click "Add Payment" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Structure Tab Content */}
        <TabsContent value="fee-structure">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">
                  Fee Structures
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Define and manage fee structures for different classes
                </p>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showAddFeeStructureDialog}
                  onOpenChange={setShowAddFeeStructureDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Fee Structure</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Add New Fee Structure
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Enter the details for the new fee structure.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        id="class"
                        placeholder="Class (e.g., 10th Grade)"
                        value={newFeeStructure.class}
                        onChange={handleFeeStructureInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="tuitionFee"
                        placeholder="Tuition Fee (e.g., 15000)"
                        type="number"
                        value={newFeeStructure.tuitionFee}
                        onChange={handleFeeStructureInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="admissionFee"
                        placeholder="Admission Fee (e.g., 5000)"
                        type="number"
                        value={newFeeStructure.admissionFee}
                        onChange={handleFeeStructureInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Input
                        id="examFee"
                        placeholder="Exam Fee (e.g., 2000)"
                        type="number"
                        value={newFeeStructure.examFee}
                        onChange={handleFeeStructureInputChange}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddFeeStructureDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddFeeStructureSubmit}>
                        Add Fee Structure
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                {isLoadingFeeStructures ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                      <p className="text-gray-400">Loading fee structures...</p>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Class
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Tuition Fee
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Admission Fee
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Exam Fee
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Total Fee
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
                      {feeStructures.length > 0 ? (
                        feeStructures.map((structure, index) => (
                          <tr key={structure.id || index} className="hover:bg-gray-800/70">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {structure.class}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {structure.tuitionFee}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {structure.admissionFee}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {structure.examFee}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                              {structure.totalFee}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  className="text-gray-400 hover:text-orange-500"
                                  onClick={() => handleViewFeeStructure(structure)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="text-gray-400 hover:text-orange-500"
                                  onClick={() => handleEditFeeStructure(structure)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  className="text-gray-400 hover:text-red-500"
                                  onClick={() => handleDeleteFeeStructure(structure)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                            No fee structures found. Click "Add Fee Structure" to create one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab Content */}
        <TabsContent value="payment-history">
          <PaymentHistory />
        </TabsContent>

        {/* Fee Reports Tab Content */}
        <TabsContent value="reports">
          <FeeReports />
        </TabsContent>
      </Tabs>

      {/* View Student Fee Dialog */}
      {selectedStudentFee && (
        <Dialog
          open={isViewStudentFeeDialogOpen}
          onOpenChange={setIsViewStudentFeeDialogOpen}
        >
          <DialogContent className="max-w-xl bg:white text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Student Fee Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Viewing details for {selectedStudentFee.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-400">Student Name:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.studentName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Student ID:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.studentId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Class:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.class}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Fee Structure:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.feeStructure}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payment Status:</p>
                <Badge
                  className={
                    selectedStudentFee.paymentStatus === "Paid"
                      ? "bg-green-500/20 text-green-400"
                      : selectedStudentFee.paymentStatus === "Partial"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }
                >
                  {selectedStudentFee.paymentStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-400">Paid Amount:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.paidAmount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Pending Amount:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.pendingAmount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Due Date:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.dueDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Payment:</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {selectedStudentFee.lastPayment}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewStudentFeeDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Student Fee Dialog */}
      {selectedStudentFee && (
        <Dialog
          open={isEditStudentFeeDialogOpen}
          onOpenChange={setIsEditStudentFeeDialogOpen}
        >
          <DialogContent className="max-w-xl  bg-white dark:bg-gray-800 p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Student Fee
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Editing details for {selectedStudentFee.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <Input
                id="editStudentFeeStudentName"
                type="text"
                placeholder="Student Name"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.studentName}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeeStudentId"
                type="text"
                placeholder="Student ID"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.studentId}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeeClass"
                type="text"
                placeholder="Class"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.class}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeeFeeStructure"
                type="text"
                placeholder="Fee Structure"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.feeStructure}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeePaymentStatus"
                type="text"
                placeholder="Payment Status"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.paymentStatus}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeePaidAmount"
                type="text"
                placeholder="Paid Amount"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.paidAmount}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeePendingAmount"
                type="text"
                placeholder="Pending Amount"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.pendingAmount}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeeDueDate"
                type="text"
                placeholder="Due Date"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.dueDate}
                onChange={handleStudentFeeInputChange}
              />
              <Input
                id="editStudentFeeLastPayment"
                type="text"
                placeholder="Last Payment"
                className="bg-gray-700 border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                value={selectedStudentFee.lastPayment}
                onChange={handleStudentFeeInputChange}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditStudentFeeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEditedStudentFee}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* View Fee Structure Dialog */}
      {selectedFeeStructure && (
        <Dialog
          open={isViewFeeStructureDialogOpen}
          onOpenChange={setIsViewFeeStructureDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Fee Structure Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Viewing details for {selectedFeeStructure.class}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-400">Class:</p>
                <p className="text-white font-medium">
                  {selectedFeeStructure.class}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Tuition Fee:</p>
                <p className="text-white font-medium">
                  {selectedFeeStructure.tuitionFee}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Admission Fee:</p>
                <p className="text-white font-medium">
                  {selectedFeeStructure.admissionFee}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Exam Fee:</p>
                <p className="text-white font-medium">
                  {selectedFeeStructure.examFee}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Fee:</p>
                <p className="text-white font-medium">
                  {selectedFeeStructure.totalFee}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewFeeStructureDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Fee Structure Dialog */}
      {selectedFeeStructure && (
        <Dialog
          open={isEditFeeStructureDialogOpen}
          onOpenChange={setIsEditFeeStructureDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Edit Fee Structure
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Editing details for {selectedFeeStructure.class}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <Input
                id="editFeeStructureClass"
                type="text"
                placeholder="Class"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedFeeStructure.class}
                onChange={handleFeeStructureEditInputChange}
              />
              <Input
                id="editFeeStructureTuitionFee"
                type="text"
                placeholder="Tuition Fee"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedFeeStructure.tuitionFee}
                onChange={handleFeeStructureEditInputChange}
              />
              <Input
                id="editFeeStructureAdmissionFee"
                type="text"
                placeholder="Admission Fee"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedFeeStructure.admissionFee}
                onChange={handleFeeStructureEditInputChange}
              />
              <Input
                id="editFeeStructureExamFee"
                type="text"
                placeholder="Exam Fee"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedFeeStructure.examFee}
                onChange={handleFeeStructureEditInputChange}
              />
              <Input
                id="editFeeStructureTotalFee"
                type="text"
                placeholder="Total Fee"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={selectedFeeStructure.totalFee}
                onChange={handleFeeStructureEditInputChange}
                readOnly
                title="Total fee is automatically calculated"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditFeeStructureDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEditedFeeStructure}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Fee Structure Confirmation Dialog */}
      {selectedFeeStructure && (
        <Dialog
          open={isDeleteFeeStructureDialogOpen}
          onOpenChange={setIsDeleteFeeStructureDialogOpen}
        >
          <DialogContent className="max-w-md bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Confirm Deletion
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Are you sure you want to delete the fee structure for{" "}
                <span className="font-semibold text-white">{selectedFeeStructure.class}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteFeeStructureDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteFeeStructure}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FeeManagement;
