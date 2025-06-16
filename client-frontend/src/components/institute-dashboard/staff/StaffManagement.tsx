import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/RadixSelect";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  UserCog,
  UserCheck,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Download,
  Filter,
} from "lucide-react";

interface NewStaffMember {
  name: string;
  role: string;
  department: string;
  contactPhone: string;
  contactEmail: string;
  experience: string;
  status: string;
}

interface StaffMember {
  staffId: string;
  name: string;
  role: string;
  department: string;
  contactPhone: string;
  contactEmail: string;
  experience: string;
  status: string;
}

const StaffManagement = () => {
  const { toast } = useToast();
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState<NewStaffMember>({
    name: "",
    role: "",
    department: "",
    contactPhone: "",
    contactEmail: "",
    experience: "",
    status: "active",
  });

  const [viewingStaff, setViewingStaff] = useState<StaffMember | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [staffToDeleteId, setStaffToDeleteId] = useState<string | null>(null);

  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const [staffDirectoryData, setStaffDirectoryData] = useState<StaffMember[]>([
    {
      staffId: "ST001",
      name: "Jane Doe",
      role: "Principal",
      department: "Administration",
      contactPhone: "+91 9876543210",
      contactEmail: "jane.doe@example.com",
      experience: "15 years",
      status: "active",
    },
    {
      staffId: "ST002",
      name: "John Smith",
      role: "Teacher",
      department: "Mathematics",
      contactPhone: "+91 9876543211",
      contactEmail: "john.smith@example.com",
      experience: "8 years",
      status: "active",
    },
    {
      staffId: "ST003",
      name: "Emily White",
      role: "Accountant",
      department: "Administration",
      contactPhone: "+91 9876543212",
      contactEmail: "emily.white@example.com",
      experience: "5 years",
      status: "active",
    },
    {
      staffId: "ST004",
      name: "Michael Brown",
      role: "Teacher",
      department: "Science",
      contactPhone: "+91 9876543213",
      contactEmail: "michael.brown@example.com",
      experience: "10 years",
      status: "inactive",
    },
    {
      staffId: "ST005",
      name: "Sarah Green",
      role: "Office Staff",
      department: "Support",
      contactPhone: "+91 9876543214",
      contactEmail: "sarah.green@example.com",
      experience: "3 years",
      status: "active",
    },
  ]);

  const handleAddStaff = () => {
    const newStaffWithId = {
      ...newStaffMember,
      staffId: `ST${String(staffDirectoryData.length + 1).padStart(3, "0")}`,
    };
    setStaffDirectoryData((prev) => [...prev, newStaffWithId]);
    toast({
      title: "Success",
      description: "Staff member added successfully",
    });
    setShowAddStaffDialog(false);
    setNewStaffMember({
      name: "",
      role: "",
      department: "",
      contactPhone: "",
      contactEmail: "",
      experience: "",
      status: "active",
    });
  };

  const handleEditStaff = () => {
    if (editingStaff) {
      setStaffDirectoryData((prev) =>
        prev.map((staff) =>
          staff.staffId === editingStaff.staffId ? editingStaff : staff
        )
      );
      toast({
        title: "Success",
        description: "Staff member updated successfully",
      });
      setEditingStaff(null);
    }
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaffDirectoryData((prev) =>
      prev.filter((staff) => staff.staffId !== staffId)
    );
    toast({
      title: "Staff Deleted",
      description: "Staff member has been removed.",
      variant: "destructive",
    });
    setShowConfirmDeleteDialog(false);
    setStaffToDeleteId(null);
  };

  const handleExportStaff = () => {
    const headers = [
      "ID",
      "Name",
      "Role",
      "Department",
      "Contact Phone",
      "Contact Email",
      "Experience",
      "Status",
    ];
    const rows = staffDirectoryData.map((staff) => [
      staff.staffId,
      staff.name,
      staff.role,
      staff.department,
      staff.contactPhone,
      staff.contactEmail,
      staff.experience,
      staff.status,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "staff_directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Staff directory exported as CSV.",
    });
  };

  const staffSummary = [
    {
      icon: Users,
      title: "Total Staff",
      value: staffDirectoryData.length,
      change: "+5%",
      changeType: "increase",
    },
    {
      icon: UserCheck,
      title: "Active Staff",
      value: staffDirectoryData.filter((staff) => staff.status === "active")
        .length,
      change: "+2%",
      changeType: "increase",
    },
    {
      icon: UserCog,
      title: "Inactive Staff",
      value: staffDirectoryData.filter((staff) => staff.status === "inactive")
        .length,
      change: "-1%",
      changeType: "decrease",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Staff Management Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Staff Management</h2>
          <p className="text-gray-400">
            Manage teaching and non-teaching staff
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
          onClick={() => setShowAddStaffDialog(true)}
        >
          <Plus className="h-5 w-5" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      {/* Staff Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {staffSummary.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 shadow-md">
            <CardContent className="p-5 flex flex-col items-start">
              <metric.icon className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-400">{metric.title}</p>
              {metric.change && (
                <span
                  className={`text-xs font-medium ${
                    metric.changeType === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  } mt-2`}
                >
                  {metric.changeType === "increase" ? "▲" : "▼"} {metric.change}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Staff Dialog */}
      <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Staff Member
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to add a new staff member to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <Input
                  id="staff-name"
                  value={newStaffMember.name}
                  onChange={(e) =>
                    setNewStaffMember({
                      ...newStaffMember,
                      name: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Role
                </label>
                <Select
                  value={newStaffMember.role}
                  onValueChange={(value) =>
                    setNewStaffMember({ ...newStaffMember, role: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Accountant">Accountant</SelectItem>
                    <SelectItem value="Office Staff">Office Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Department
                </label>
                <Select
                  value={newStaffMember.department}
                  onValueChange={(value) =>
                    setNewStaffMember({ ...newStaffMember, department: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administration">
                      Administration
                    </SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Contact Phone
                </label>
                <Input
                  id="staff-phone"
                  value={newStaffMember.contactPhone}
                  onChange={(e) =>
                    setNewStaffMember({
                      ...newStaffMember,
                      contactPhone: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Contact Email
                </label>
                <Input
                  id="staff-email"
                  value={newStaffMember.contactEmail}
                  onChange={(e) =>
                    setNewStaffMember({
                      ...newStaffMember,
                      contactEmail: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Experience
                </label>
                <Input
                  id="staff-experience"
                  value={newStaffMember.experience}
                  onChange={(e) =>
                    setNewStaffMember({
                      ...newStaffMember,
                      experience: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter years of experience"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddStaffDialog(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddStaff}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Add Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Staff Dialog */}
      <Dialog open={!!viewingStaff} onOpenChange={() => setViewingStaff(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Staff Member Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed information about {viewingStaff?.name}.
            </DialogDescription>
          </DialogHeader>
          {viewingStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="text-gray-300">ID:</div>
                <div className="text-white">{viewingStaff.staffId}</div>

                <div className="text-gray-300">Name:</div>
                <div className="text-white">{viewingStaff.name}</div>

                <div className="text-gray-300">Role:</div>
                <div className="text-white">{viewingStaff.role}</div>

                <div className="text-gray-300">Department:</div>
                <div className="text-white">{viewingStaff.department}</div>

                <div className="text-gray-300">Phone:</div>
                <div className="text-white">{viewingStaff.contactPhone}</div>

                <div className="text-gray-300">Email:</div>
                <div className="text-white">{viewingStaff.contactEmail}</div>

                <div className="text-gray-300">Experience:</div>
                <div className="text-white">{viewingStaff.experience}</div>

                <div className="text-gray-300">Status:</div>
                <div className="text-white">
                  <Badge
                    className={
                      viewingStaff.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  >
                    {viewingStaff.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewingStaff(null)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={!!editingStaff} onOpenChange={() => setEditingStaff(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Edit Staff Member
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the details for {editingStaff?.name}.
            </DialogDescription>
          </DialogHeader>
          {editingStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <Input
                    id="edit-staff-name"
                    value={editingStaff.name}
                    onChange={(e) =>
                      setEditingStaff({ ...editingStaff, name: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Role
                  </label>
                  <Select
                    value={editingStaff.role}
                    onValueChange={(value) =>
                      setEditingStaff({ ...editingStaff, role: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Principal">Principal</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                      <SelectItem value="Office Staff">Office Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Department
                  </label>
                  <Select
                    value={editingStaff.department}
                    onValueChange={(value) =>
                      setEditingStaff({ ...editingStaff, department: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administration">
                        Administration
                      </SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Languages">Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Contact Phone
                  </label>
                  <Input
                    id="edit-staff-phone"
                    value={editingStaff.contactPhone}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        contactPhone: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Contact Email
                  </label>
                  <Input
                    id="edit-staff-email"
                    value={editingStaff.contactEmail}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        contactEmail: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Experience
                  </label>
                  <Input
                    id="edit-staff-experience"
                    value={editingStaff.experience}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        experience: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Status
                  </label>
                  <Select
                    value={editingStaff.status}
                    onValueChange={(value) =>
                      setEditingStaff({ ...editingStaff, status: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingStaff(null)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditStaff}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={showConfirmDeleteDialog}
        onOpenChange={setShowConfirmDeleteDialog}
      >
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this staff member? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDeleteDialog(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                staffToDeleteId && handleDeleteStaff(staffToDeleteId)
              }
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Staff Directory and Quick Actions */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <CardTitle className="text-xl text-white">Staff Directory</CardTitle>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Input
              id="search-staff"
              type="text"
              placeholder="Search staff..."
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-orange-500 w-full md:w-80"
            />
            <div className="flex space-x-2">
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Teaching">Teaching</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800/50"
                onClick={handleExportStaff}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
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
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Department
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
                    Experience
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {staffDirectoryData
                  .filter(
                    (staff) =>
                      selectedDepartment === "All" ||
                      staff.department === selectedDepartment
                  )
                  .map((staff) => (
                    <tr key={staff.staffId} className="hover:bg-gray-800/70">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {staff.staffId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {staff.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {staff.contactEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {staff.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {staff.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {staff.contactPhone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {staff.experience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            staff.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {staff.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-orange-500"
                          onClick={() => setViewingStaff(staff)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-orange-500"
                          onClick={() => setEditingStaff(staff)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => {
                            setStaffToDeleteId(staff.staffId);
                            setShowConfirmDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffManagement;
