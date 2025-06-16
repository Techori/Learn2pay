import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Users,
  UserCheck,
  UserPlus,
  GraduationCap,
  Plus,
  Upload,
  Eye,
  Pencil,
  Search,
} from "lucide-react";

interface Student {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  roll: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
  status: string;
  feeStatus: string;
  attendance: string;
}

interface Transfer {
  id: string;
  studentName: string;
  studentId: string;
  transferDate: string;
  reason: string;
  destinationInstitute: string;
}

interface Alumni {
  id: string;
  studentName: string;
  studentId: string;
  graduationYear: string;
  careerPath: string;
  contactEmail: string;
}

interface KYC {
  id: string; // This will be the Aadhar Number
  studentName: string;
  studentId: string;
  aadharNo: string;
  verificationStatus: "Pending" | "Verified" | "Rejected";
  submittedDate: string;
}

interface NewStudent
  extends Omit<Student, "id" | "status" | "feeStatus" | "attendance"> {}

const StudentManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState("all-students");
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showViewStudentDialog, setShowViewStudentDialog] = useState(false);
  const [showEditStudentDialog, setShowEditStudentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [newStudent, setNewStudent] = useState<NewStudent>({
    studentName: "",
    studentId: "",
    class: "",
    roll: "",
    parentName: "",
    parentContact: "",
    parentEmail: "",
  });

  const [allStudentsData, setAllStudentsData] = useState<Student[]>([
    {
      id: "1",
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      class: "10th A",
      roll: "15",
      parentName: "Suresh Kumar",
      parentContact: "9876543210",
      parentEmail: "rajesh@email.com",
      status: "Active",
      feeStatus: "Paid",
      attendance: "95%",
    },
    {
      id: "2",
      studentName: "Priya Sharma",
      studentId: "STU002",
      class: "10th A",
      roll: "18",
      parentName: "Amit Sharma",
      parentContact: "9876543211",
      parentEmail: "priya@email.com",
      status: "Active",
      feeStatus: "Pending",
      attendance: "92%",
    },
    {
      id: "3",
      studentName: "Arjun Singh",
      studentId: "STU003",
      class: "9th B",
      roll: "22",
      parentName: "Vikram Singh",
      parentContact: "9876543212",
      parentEmail: "arjun@email.com",
      status: "Active",
      feeStatus: "Paid",
      attendance: "88%",
    },
  ]);

  const [transfersData, setTransfersData] = useState<Transfer[]>([
    {
      id: "T001",
      studentName: "Rahul Gupta",
      studentId: "STU004",
      transferDate: "2023-08-15",
      reason: "Family Relocation",
      destinationInstitute: "DPS Public School, Delhi",
    },
    {
      id: "T002",
      studentName: "Sneha Reddy",
      studentId: "STU005",
      transferDate: "2023-09-01",
      reason: "Change of Curriculum",
      destinationInstitute: "National Academy, Mumbai",
    },
  ]);

  const [alumniData, setAlumniData] = useState<Alumni[]>([
    {
      id: "A001",
      studentName: "Vivek Singh",
      studentId: "STU006",
      graduationYear: "2020",
      careerPath: "Software Engineer at Google",
      contactEmail: "vivek.s@example.com",
    },
    {
      id: "A002",
      studentName: "Neha Kumari",
      studentId: "STU007",
      graduationYear: "2019",
      careerPath: "Doctor at Apollo Hospital",
      contactEmail: "neha.k@example.com",
    },
  ]);

  const [kycData, setKycData] = useState<KYC[]>([
    {
      id: "KYC001",
      studentName: "Rajesh Kumar",
      studentId: "STU001",
      aadharNo: "123456789012",
      verificationStatus: "Verified",
      submittedDate: "2023-01-10",
    },
    {
      id: "KYC002",
      studentName: "Priya Sharma",
      studentId: "STU002",
      aadharNo: "987654321098",
      verificationStatus: "Pending",
      submittedDate: "2023-03-05",
    },
  ]);

  const [showAddTransferDialog, setShowAddTransferDialog] = useState(false);
  const [newTransfer, setNewTransfer] = useState<Omit<Transfer, "id">>({
    studentName: "",
    studentId: "",
    transferDate: "",
    reason: "",
    destinationInstitute: "",
  });

  const [showAddKycDialog, setShowAddKycDialog] = useState(false);
  const [newKyc, setNewKyc] = useState<
    Omit<KYC, "id" | "verificationStatus" | "submittedDate">
  >({
    studentName: "",
    studentId: "",
    aadharNo: "",
  });

  const studentSummary = [
    {
      icon: Users,
      title: "Total Students",
      value: allStudentsData.length.toString(),
      description: "+25 this month",
      color: "text-blue-400",
    },
    {
      icon: UserCheck,
      title: "Active Students",
      value: allStudentsData
        .filter((student) => student.status === "Active")
        .length.toString(),
      description: "95.1% active rate",
      color: "text-green-400",
    },
    {
      icon: UserPlus,
      title: "New Admissions",
      value: "45", // This should be dynamic, but keeping as is for now
      description: "This month",
      color: "text-orange-400",
    },
    {
      icon: GraduationCap,
      title: "Avg. Attendance",
      value: "92.5%", // This should be dynamic, but keeping as is for now
      description: "School-wide",
      color: "text-purple-400",
    },
  ];

  const handleAddStudent = () => {
    const studentWithId: Student = {
      ...newStudent,
      id: (allStudentsData.length + 1).toString(),
      status: "Active",
      feeStatus: "Pending",
      attendance: "0%", // Default for new student
    };
    setAllStudentsData([...allStudentsData, studentWithId]);
    setShowAddStudentDialog(false);
    setNewStudent({
      studentName: "",
      studentId: "",
      class: "",
      roll: "",
      parentName: "",
      parentContact: "",
      parentEmail: "",
    });
  };

  const handleEditStudent = (student: Student) => {
    console.log("handleEditStudent: Editing student:", student);
    setSelectedStudent(student);
    setShowEditStudentDialog(true);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowViewStudentDialog(true);
  };

  const handleExportStudents = () => {
    // Implement export functionality here
    alert("Exporting student data...");
  };

  const handleAddTransfer = () => {
    const transferWithId: Transfer = {
      ...newTransfer,
      id: `T${String(transfersData.length + 1).padStart(3, "0")}`,
    };
    setTransfersData([...transfersData, transferWithId]);
    setShowAddTransferDialog(false);
    setNewTransfer({
      studentName: "",
      studentId: "",
      transferDate: "",
      reason: "",
      destinationInstitute: "",
    });
  };

  const handleAddKyc = () => {
    const kycWithId: KYC = {
      ...newKyc,
      id: newKyc.aadharNo, // Aadhar number as unique ID
      verificationStatus: "Pending",
      submittedDate: new Date().toISOString().split("T")[0],
    };
    setKycData([...kycData, kycWithId]);
    setShowAddKycDialog(false);
    setNewKyc({
      studentName: "",
      studentId: "",
      aadharNo: "",
    });
  };

  const filteredStudents = allStudentsData.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesStatus = statusFilter ? student.status === statusFilter : true;

    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Student Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {studentSummary.map((item, index) => (
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
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inner Tabs for Student Management */}
      <Tabs
        value={activeSubTab}
        onValueChange={setActiveSubTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 p-1 rounded-md">
          <TabsTrigger
            value="all-students"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            All Students
          </TabsTrigger>
          <TabsTrigger
            value="admissions"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Admissions
          </TabsTrigger>
          <TabsTrigger
            value="transfers"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Transfers
          </TabsTrigger>
          <TabsTrigger
            value="alumni"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Alumni
          </TabsTrigger>
          <TabsTrigger
            value="kyc"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
          >
            Complete KYC
          </TabsTrigger>
        </TabsList>

        {/* All Students Tab Content */}
        <TabsContent value="all-students">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">
                  Student Management
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Manage all student records and information
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
                  onClick={() => setShowAddStudentDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Student</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2"
                  onClick={handleExportStudents}
                >
                  <Upload className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="student-search-input"
                    type="text"
                    placeholder="Search by name, admission number, or class..."
                    className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Select
                    value={classFilter}
                    onValueChange={setClassFilter}
                    className="w-[180px] bg-gray-900 border-gray-700 text-white"
                  >
                    <SelectItem
                      value=""
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      All Classes
                    </SelectItem>
                    <SelectItem
                      value="10th A"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      10th A
                    </SelectItem>
                    <SelectItem
                      value="9th B"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      9th B
                    </SelectItem>
                    {/* Add more classes dynamically if needed */}
                  </Select>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                    className="w-[180px] bg-gray-900 border-gray-700 text-white"
                  >
                    <SelectItem
                      value=""
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="Active"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      Active
                    </SelectItem>
                    <SelectItem
                      value="Inactive"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      Inactive
                    </SelectItem>
                  </Select>
                </div>
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
                        Class & Roll No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Parent Info
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Contact
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
                        Fee Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Attendance
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
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {student.studentName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {student.studentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {student.class}
                          <br />
                          Roll: {student.roll}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {student.parentName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {student.parentEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {student.parentContact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              student.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              student.feeStatus === "Paid"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {student.feeStatus}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {student.attendance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-orange-500"
                              onClick={() => handleViewStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="text-gray-400 hover:text-orange-500"
                              onClick={() => handleEditStudent(student)}
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
        </TabsContent>

        {/* Admissions Tab Content */}
        <TabsContent value="admissions">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md h-[400px] flex flex-col items-center justify-center">
            <CardTitle className="text-xl text-white mb-4">
              Admission Management
            </CardTitle>
            <CardDescription className="text-gray-400 text-center mb-6">
              Track and process new student applications
            </CardDescription>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
              onClick={() => setShowAddStudentDialog(true)} // Reusing the Add Student dialog for now
            >
              <Plus className="h-5 w-5" />
              <span>New Admission</span>
            </Button>
          </Card>
        </TabsContent>

        {/* Transfers Tab Content */}
        <TabsContent value="transfers">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">
                  Transfer Management
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Manage student transfers to other institutes
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
                  onClick={() => setShowAddTransferDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Transfer</span>
                </Button>
              </div>
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
                        Student Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Transfer Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Reason
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Destination Institute
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {transfersData.map((transfer) => (
                      <tr key={transfer.id} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {transfer.studentName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {transfer.studentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transfer.transferDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transfer.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transfer.destinationInstitute}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alumni Tab Content */}
        <TabsContent value="alumni">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">
                  Alumni Records
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  View and manage records of graduated students
                </p>
              </div>
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
                        Student Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Graduation Year
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Career Path
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Contact Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {alumniData.map((alumnus) => (
                      <tr key={alumnus.id} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {alumnus.studentName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {alumnus.studentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {alumnus.graduationYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {alumnus.careerPath}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {alumnus.contactEmail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complete KYC Tab Content */}
        <TabsContent value="kyc">
          <Card className="bg-gray-800/50 border-gray-700 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg text-white">
                  KYC Management
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Manage student KYC verification records
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
                  onClick={() => setShowAddKycDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add KYC Record</span>
                </Button>
              </div>
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
                        Student Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Aadhar No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Verification Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Submitted Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {kycData.map((kyc) => (
                      <tr key={kyc.id} className="hover:bg-gray-800/70">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {kyc.studentName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {kyc.studentId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {kyc.aadharNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              kyc.verificationStatus === "Verified"
                                ? "bg-green-500/20 text-green-400"
                                : kyc.verificationStatus === "Pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {kyc.verificationStatus}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {kyc.submittedDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Student Dialog */}
      <Dialog
        open={showAddStudentDialog}
        onOpenChange={setShowAddStudentDialog}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student Name
              </label>
              <Input
                id="add-student-name"
                value={newStudent.studentName}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, studentName: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student's full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student ID
              </label>
              <Input
                id="add-student-id"
                value={newStudent.studentId}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, studentId: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Class</label>
              <Input
                id="add-student-class"
                value={newStudent.class}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, class: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="e.g., 10th A"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Roll No.
              </label>
              <Input
                id="add-student-roll"
                value={newStudent.roll}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, roll: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter roll number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Parent Name
              </label>
              <Input
                id="add-parent-name"
                value={newStudent.parentName}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, parentName: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter parent's full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Parent Contact
              </label>
              <Input
                id="add-parent-contact"
                value={newStudent.parentContact}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    parentContact: e.target.value,
                  })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter parent's contact number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Parent Email
              </label>
              <Input
                id="add-parent-email"
                value={newStudent.parentEmail}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, parentEmail: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter parent's email address"
                type="email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
              onClick={() => setShowAddStudentDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog
        open={showViewStudentDialog}
        onOpenChange={setShowViewStudentDialog}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Student Name</p>
                  <p className="text-white">{selectedStudent.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Student ID</p>
                  <p className="text-white">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Class</p>
                  <p className="text-white">{selectedStudent.class}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Roll No.</p>
                  <p className="text-white">{selectedStudent.roll}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Parent Name</p>
                  <p className="text-white">{selectedStudent.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Parent Contact</p>
                  <p className="text-white">{selectedStudent.parentContact}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-400">Parent Email</p>
                  <p className="text-white">{selectedStudent.parentEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <Badge
                    className={
                      selectedStudent.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  >
                    {selectedStudent.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fee Status</p>
                  <Badge
                    className={
                      selectedStudent.feeStatus === "Paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  >
                    {selectedStudent.feeStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Attendance</p>
                  <p className="text-white">{selectedStudent.attendance}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowViewStudentDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog
        open={showEditStudentDialog}
        onOpenChange={setShowEditStudentDialog}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-700 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Student Name
                </label>
                <Input
                  id="edit-student-name"
                  value={selectedStudent.studentName}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      studentName: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Class
                </label>
                <Input
                  id="edit-student-class"
                  value={selectedStudent.class}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      class: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Roll No.
                </label>
                <Input
                  id="edit-student-roll"
                  value={selectedStudent.roll}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      roll: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Parent Name
                </label>
                <Input
                  id="edit-parent-name"
                  value={selectedStudent.parentName}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      parentName: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Parent Contact
                </label>
                <Input
                  id="edit-parent-contact"
                  value={selectedStudent.parentContact}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      parentContact: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Parent Email
                </label>
                <Input
                  id="edit-parent-email"
                  value={selectedStudent.parentEmail}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      parentEmail: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Status
                </label>
                <Select
                  value={selectedStudent.status}
                  onValueChange={(value) =>
                    setSelectedStudent({ ...selectedStudent, status: value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                >
                  <SelectItem
                    value="Active"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="Inactive"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Inactive
                  </SelectItem>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Fee Status
                </label>
                <Select
                  value={selectedStudent.feeStatus}
                  onValueChange={(value) =>
                    setSelectedStudent({ ...selectedStudent, feeStatus: value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                >
                  <SelectItem
                    value="Paid"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Paid
                  </SelectItem>
                  <SelectItem
                    value="Pending"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="Overdue"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Overdue
                  </SelectItem>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Attendance
                </label>
                <Input
                  id="edit-student-attendance"
                  value={selectedStudent.attendance}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      attendance: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
              onClick={() => setShowEditStudentDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => {
                if (selectedStudent) {
                  setAllStudentsData(
                    allStudentsData.map((student) =>
                      student.id === selectedStudent.id
                        ? selectedStudent
                        : student
                    )
                  );
                }
                setShowEditStudentDialog(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Transfer Dialog */}
      <Dialog
        open={showAddTransferDialog}
        onOpenChange={setShowAddTransferDialog}
      >
        <DialogContent className="bg-gray-900 text-white border-gray-700 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Transfer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student Name
              </label>
              <Input
                id="add-transfer-student-name"
                value={newTransfer.studentName}
                onChange={(e) =>
                  setNewTransfer({
                    ...newTransfer,
                    studentName: e.target.value,
                  })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student's full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student ID
              </label>
              <Input
                id="add-transfer-student-id"
                value={newTransfer.studentId}
                onChange={(e) =>
                  setNewTransfer({ ...newTransfer, studentId: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Transfer Date
              </label>
              <Input
                id="add-transfer-date"
                type="date"
                value={newTransfer.transferDate}
                onChange={(e) =>
                  setNewTransfer({
                    ...newTransfer,
                    transferDate: e.target.value,
                  })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Reason
              </label>
              <Input
                id="add-transfer-reason"
                value={newTransfer.reason}
                onChange={(e) =>
                  setNewTransfer({ ...newTransfer, reason: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Reason for transfer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Destination Institute
              </label>
              <Input
                id="add-transfer-destination"
                value={newTransfer.destinationInstitute}
                onChange={(e) =>
                  setNewTransfer({
                    ...newTransfer,
                    destinationInstitute: e.target.value,
                  })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Name of destination institute"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
              onClick={() => setShowAddTransferDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleAddTransfer}
            >
              Add Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New KYC Dialog */}
      <Dialog open={showAddKycDialog} onOpenChange={setShowAddKycDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-700 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New KYC Record</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student Name
              </label>
              <Input
                id="add-kyc-student-name"
                value={newKyc.studentName}
                onChange={(e) =>
                  setNewKyc({ ...newKyc, studentName: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student's full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Student ID
              </label>
              <Input
                id="add-kyc-student-id"
                value={newKyc.studentId}
                onChange={(e) =>
                  setNewKyc({ ...newKyc, studentId: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter student ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Aadhar Number
              </label>
              <Input
                id="add-kyc-aadhar-no"
                value={newKyc.aadharNo}
                onChange={(e) =>
                  setNewKyc({ ...newKyc, aadharNo: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Enter 12-digit Aadhar number"
                maxLength={12}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
              onClick={() => setShowAddKycDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleAddKyc}
            >
              Add KYC Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
