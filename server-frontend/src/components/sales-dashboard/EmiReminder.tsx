import React, { useState, useEffect } from "react";
import { institutes } from "../../data/instituteEmiData";
import SearchAndFilter from "../shared/SearchAndFilter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import { Button } from "../ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  Mail,
  Bell,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { Badge } from "../ui/Badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

// Enhanced interface for EMI data with status
interface EnhancedEmi {
  id: number;
  name: string;
  parentEmail: string;
  amount: number;
  dueDate: string;
  status: "pending" | "overdue" | "paid";
  lastReminder: string | null;
  reminderCount: number;
}

interface EnhancedInstitute {
  id: number;
  name: string;
  students: EnhancedEmi[];
}

// Define the FilterOption interface to match the one in SearchAndFilter
interface FilterOption {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { value: string; label: string }[];
}

const EmiReminder: React.FC = () => {
  // Enhanced state with status information
  const [enhancedEmiList, setEnhancedEmiList] = useState<EnhancedInstitute[]>(
    []
  );
  const [filteredInstituteId, setFilteredInstituteId] = useState<number | "">(
    ""
  );
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [reminderSent, setReminderSent] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<EnhancedEmi | null>(
    null
  );
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [reminderTemplate, setReminderTemplate] = useState<string>("");
  const { toast } = useToast();

  // Prepare EMI data with status on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const today = new Date();

      const enhancedData = institutes.map((institute) => {
        return {
          ...institute,
          students: institute.students.map((student) => {
            const dueDate = new Date(student.dueDate);
            let status: "pending" | "overdue" | "paid";

            // Randomly assign some as paid for demo purposes
            const isPaid = Math.random() > 0.7;

            if (isPaid) {
              status = "paid";
            } else if (dueDate < today) {
              status = "overdue";
            } else {
              status = "pending";
            }

            return {
              ...student,
              status,
              lastReminder: status === "paid" ? "N/A" : null,
              reminderCount: 0,
            };
          }),
        };
      });

      setEnhancedEmiList(enhancedData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Calculate summary statistics
  const totalEmis = enhancedEmiList.reduce(
    (sum, institute) => sum + institute.students.length,
    0
  );
  const pendingEmis = enhancedEmiList.reduce(
    (sum, institute) =>
      sum + institute.students.filter((s) => s.status === "pending").length,
    0
  );
  const overdueEmis = enhancedEmiList.reduce(
    (sum, institute) =>
      sum + institute.students.filter((s) => s.status === "overdue").length,
    0
  );
  const paidEmis = enhancedEmiList.reduce(
    (sum, institute) =>
      sum + institute.students.filter((s) => s.status === "paid").length,
    0
  );

  const totalAmount = enhancedEmiList.reduce(
    (sum, institute) =>
      sum +
      institute.students.reduce((iSum, student) => iSum + student.amount, 0),
    0
  );
  const pendingAmount = enhancedEmiList.reduce(
    (sum, institute) =>
      sum +
      institute.students
        .filter((s) => s.status !== "paid")
        .reduce((iSum, student) => iSum + student.amount, 0),
    0
  );

  // Prepare filter options
  const filterOptions: FilterOption[] = [
    {
      key: "institute",
      label: "Institute",
      type: "select",
      options: [
        { value: "", label: "All Institutes" },
        ...institutes.map((inst) => ({
          value: String(inst.id),
          label: inst.name,
        })),
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "overdue", label: "Overdue" },
        { value: "paid", label: "Paid" },
      ],
    },
  ];

  // Handle filter change
  const handleFilter = (filters: Record<string, string>) => {
    if (filters.institute) {
      setFilteredInstituteId(Number(filters.institute));
    } else {
      setFilteredInstituteId("");
    }

    setStatusFilter(filters.status || "");
  };

  // Filter data based on selected filters
  const filteredData = enhancedEmiList
    .filter(
      (institute) =>
        filteredInstituteId === "" || institute.id === filteredInstituteId
    )
    .map((institute) => ({
      ...institute,
      students: institute.students.filter(
        (student) => statusFilter === "" || student.status === statusFilter
      ),
    }))
    .filter((institute) => institute.students.length > 0);

  // Handle sending reminder
  const handleSendReminder = (student: EnhancedEmi, instituteName: string) => {
    setSelectedStudent(student);
    setSelectedInstitute(instituteName);

    // Set default reminder template
    const dueDate = new Date(student.dueDate);
    const formattedDate = dueDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setReminderTemplate(
      `Dear Parent/Guardian of ${
        student.name
      },\n\nThis is a reminder that your EMI payment of ₹${student.amount.toLocaleString()} for ${instituteName} is due on ${formattedDate}.\n\nPlease make the payment before the due date to avoid any late fees.\n\nRegards,\nLearn2Pay Team`
    );

    setShowReminderDialog(true);
  };

  // Send the actual reminder
  const sendReminderNow = () => {
    if (!selectedStudent) return;

    // In a real app, this would call an API to send the reminder
    const key = `${selectedStudent.id}-${selectedStudent.parentEmail}`;
    setReminderSent((prev) => ({ ...prev, [key]: true }));

    // Update the student's reminder info
    setEnhancedEmiList((prevList) =>
      prevList.map((institute) => ({
        ...institute,
        students: institute.students.map((student) =>
          student.id === selectedStudent.id &&
          student.parentEmail === selectedStudent.parentEmail
            ? {
                ...student,
                lastReminder: new Date().toISOString(),
                reminderCount: student.reminderCount + 1,
              }
            : student
        ),
      }))
    );

    toast({
      title: "Reminder Sent",
      description: `EMI reminder sent to ${selectedStudent.parentEmail} for ${selectedStudent.name}`,
    });

    setShowReminderDialog(false);
  };

  // Export EMI data to CSV
  const exportToCSV = () => {
    // Collect all students from all institutes
    const allStudents: {
      institute: string;
      studentName: string;
      email: string;
      amount: number;
      dueDate: string;
      status: string;
      lastReminder: string;
    }[] = [];

    // Use filtered data if filters are applied, otherwise use all data
    const dataToExport =
      filteredData.length > 0 ? filteredData : enhancedEmiList;

    dataToExport.forEach((institute) => {
      institute.students.forEach((student) => {
        allStudents.push({
          institute: institute.name,
          studentName: student.name,
          email: student.parentEmail,
          amount: student.amount,
          dueDate: student.dueDate,
          status: student.status,
          lastReminder: student.lastReminder || "Not sent",
        });
      });
    });

    // Create CSV header
    const headers = [
      "Institute",
      "Student Name",
      "Email",
      "Amount (₹)",
      "Due Date",
      "Status",
      "Last Reminder",
    ];

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...allStudents.map((student) =>
        [
          `"${student.institute}"`,
          `"${student.studentName}"`,
          `"${student.email}"`,
          student.amount,
          formatDate(student.dueDate),
          student.status,
          typeof student.lastReminder === "string" &&
          student.lastReminder !== "Not sent"
            ? formatDate(student.lastReminder)
            : student.lastReminder,
        ].join(",")
      ),
    ].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `emi_reminders_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `EMI data has been exported to CSV`,
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
            Overdue
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            Paid
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total EMIs</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {totalEmis}
                </h3>
                <p className="text-sm mt-1 text-gray-400">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Pending EMIs</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {pendingEmis}
                </h3>
                <p className="text-sm mt-1 text-yellow-400">Due soon</p>
              </div>
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Overdue EMIs</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {overdueEmis}
                </h3>
                <p className="text-sm mt-1 text-red-400">Needs attention</p>
              </div>
              <div className="bg-red-500/20 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Paid EMIs</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {paidEmis}
                </h3>
                <p className="text-sm mt-1 text-green-400">Completed</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EMI List */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">EMI Reminders</CardTitle>
              <CardDescription className="text-gray-400">
                Manage and send EMI payment reminders to students
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                onClick={exportToCSV}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <SearchAndFilter
              filterOptions={filterOptions}
              onFilter={handleFilter}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institute</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>EMI Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reminder</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-400"
                  >
                    No EMI records found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((institute) =>
                  institute.students.map((student) => (
                    <TableRow
                      key={`${institute.id}-${student.id}`}
                      className={
                        student.status === "overdue"
                          ? "bg-red-900/10"
                          : student.status === "paid"
                          ? "bg-green-900/10"
                          : ""
                      }
                    >
                      <TableCell>
                        <div className="font-medium">{institute.name}</div>
                      </TableCell>
                      <TableCell>
                        <div>{student.name}</div>
                        <div className="text-xs text-gray-400">
                          {student.parentEmail}
                        </div>
                      </TableCell>
                      <TableCell>₹{student.amount.toLocaleString()}</TableCell>
                      <TableCell>{formatDate(student.dueDate)}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        {student.lastReminder ? (
                          <span className="text-xs">
                            {formatDate(student.lastReminder)}
                            <span className="text-gray-400 ml-2">
                              ({student.reminderCount} sent)
                            </span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">
                            Not sent yet
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.status !== "paid" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-orange-400 border-orange-400 hover:bg-orange-500/10"
                            onClick={() =>
                              handleSendReminder(student, institute.name)
                            }
                            disabled={
                              reminderSent[
                                `${student.id}-${student.parentEmail}`
                              ]
                            }
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Send Reminder
                          </Button>
                        )}
                        {student.status === "paid" && (
                          <span className="text-green-400 text-xs flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reminder Dialog */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="bg-[#181f32] border border-[#232b45] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Send EMI Reminder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedStudent && (
              <>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-300">To:</div>
                  <div className="bg-[#232b45] p-2 rounded text-white">
                    {selectedStudent.parentEmail}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-300">
                    Subject:
                  </div>
                  <div className="bg-[#232b45] p-2 rounded text-white">
                    EMI Payment Reminder - {selectedInstitute}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-300">
                    Message:
                  </div>
                  <textarea
                    className="w-full bg-[#232b45] border border-[#232b45] text-white p-3 rounded resize-none h-40"
                    value={reminderTemplate}
                    onChange={(e) => setReminderTemplate(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowReminderDialog(false)}
                    className="border-gray-500 text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={sendReminderNow}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmiReminder;
