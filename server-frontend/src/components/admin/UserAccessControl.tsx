import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Switch } from "../../components/ui/Switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Search, Shield, Users, Plus, Edit, Ban, Eye } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  status: string;
  location: string;
}

interface Role {
  name: string;
  permissions: number;
  users: number;
  description: string;
}

interface NewAdminForm {
  name: string;
  email: string;
  role: string;
  location: string;
  status: string;
}

const UserAccessControl: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState<NewAdminForm>({
    name: '',
    email: '',
    role: '',
    location: '',
    status: 'Active'
  });
  const [securitySettings, setSecuritySettings] = useState({
    'Two-Factor Authentication': false,
    'Session Timeout': true,
    'IP Restriction': false
  });

  const adminUsers: AdminUser[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh../..jodo.com",
      role: "Super Admin",
      permissions: ["All Access"],
      lastLogin: "2024-01-15 14:30",
      status: "Active",
      location: "Mumbai"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya../..jodo.com",
      role: "Franchise Manager",
      permissions: ["Franchise Management", "User Support"],
      lastLogin: "2024-01-15 12:15",
      status: "Active",
      location: "Delhi"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit../..jodo.com",
      role: "Support Agent",
      permissions: ["Ticket Management", "User Support"],
      lastLogin: "2024-01-14 18:45",
      status: "Inactive",
      location: "Bangalore"
    }
  ];

  const roles: Role[] = [
    {
      name: "Super Admin",
      permissions: 15,
      users: 2,
      description: "Full platform access and control"
    },
    {
      name: "Franchise Manager",
      permissions: 8,
      users: 5,
      description: "Manage franchises and vendors"
    },
    {
      name: "Support Agent",
      permissions: 4,
      users: 12,
      description: "Handle customer support tickets"
    },
    {
      name: "Content Manager",
      permissions: 6,
      users: 3,
      description: "Manage events and campaigns"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500 text-white';
      case 'Inactive': return 'bg-gray-500 text-white';
      case 'Suspended': return 'bg-red-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  // Handle actions
  const handleAddAdminUser = () => {
    setShowAddDialog(true);
  };

  const handleAddSubmit = () => {
    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.role || !newAdminForm.location) {
      toast({
        title: "Add Admin Error",
        description: "Please fill in all required fields (Name, Email, Role, Location).",
        variant: "destructive"
      });
      return;
    }
    const newAdmin: AdminUser = {
      id: Date.now(),
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: newAdminForm.role,
      permissions: ["Pending"],
      lastLogin: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: newAdminForm.status,
      location: newAdminForm.location
    };
    adminUsers.push(newAdmin); // Note: This modifies the original array directly; consider using state for immutability
    toast({
      title: "Admin User Added",
      description: `Added ${newAdminForm.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setShowAddDialog(false);
    setNewAdminForm({ name: '', email: '', role: '', location: '', status: 'Active' });
  };

  const handleViewUser = (id: number) => {
    toast({
      title: "View User",
      description: `Viewing user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Open a dialog or detailed view (placeholder)
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Edit User",
      description: `Editing user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Open a dialog or form for editing (placeholder)
  };

  const handleBanUser = (id: number) => {
    toast({
      title: "Ban User",
      description: `Banning user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Update status to "Suspended" or remove user (placeholder)
  };

  const handleManageRoles = () => {
    toast({
      title: "Manage Roles",
      description: `Role management initiated at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement role management view or navigation (e.g., open a new panel)
  };

  const handleSecuritySwitchChange = (setting: string, checked: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: checked
    }));
    toast({
      title: `${setting} Updated`,
      description: `${setting} set to ${checked} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Update security settings (e.g., via API)
  };

  return (
    <Card className="bg-[#1A1F2B] border-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-white">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              User Access Control
            </CardTitle>
            <CardDescription className="text-gray-400">Manage admin users, roles, and permissions</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddAdminUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin User
            </Button>
            <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={handleManageRoles}>
              <Users className="h-4 w-4 mr-2" />
              Manage Roles
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roles Overview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Admin Roles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map((role, index) => (
              <Card key={index} className="bg-[#232b45]">
                <CardContent className="p-4">
                  <div className="text-lg font-bold text-white">{role.name}</div>
                  <div className="text-sm text-gray-400 mb-2">{role.description}</div>
                  <div className="flex justify-between text-xs text-gray-500 space-x-4">
                    <span>{role.permissions} permissions</span>
                    <span>{role.users} users</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search admin users..."
            className="pl-10 bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Admin Users Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-200">Admin User</TableHead>
              <TableHead className="text-gray-200">Role</TableHead>
              <TableHead className="text-gray-200">Permissions</TableHead>
              <TableHead className="text-gray-200">Last Login</TableHead>
              <TableHead className="text-gray-200">Location</TableHead>
              <TableHead className="text-gray-200">Status</TableHead>
              <TableHead className="text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers
              .filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <TableRow key={user.id} className="hover:bg-[#2A2F3A]">
                  <TableCell className="text-white">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    <Badge variant="outline" className="border-gray-500 text-gray-300">{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-sm">{user.lastLogin}</TableCell>
                  <TableCell className="text-white">{user.location}</TableCell>
                  <TableCell className="text-white">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={() => handleViewUser(user.id)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={() => handleEditUser(user.id)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" className="text-white border-red-500 hover:bg-red-500" onClick={() => handleBanUser(user.id)}>
                        <Ban className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Permission Settings */}
        <Card className="bg-[#232b45]">
          <CardHeader>
            <CardTitle className="text-lg text-white">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400">Require 2FA for all admin accounts</p>
              </div>
              <Switch
                checked={securitySettings['Two-Factor Authentication']}
                onCheckedChange={(checked) => handleSecuritySwitchChange('Two-Factor Authentication', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">Session Timeout</h4>
                <p className="text-sm text-gray-400">Auto-logout after 30 minutes of inactivity</p>
              </div>
              <Switch
                checked={securitySettings['Session Timeout']}
                onCheckedChange={(checked) => handleSecuritySwitchChange('Session Timeout', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">IP Restriction</h4>
                <p className="text-sm text-gray-400">Allow admin access only from approved IPs</p>
              </div>
              <Switch
                checked={securitySettings['IP Restriction']}
                onCheckedChange={(checked) => handleSecuritySwitchChange('IP Restriction', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>

      {/* Add Admin Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-[#1A1F2B] border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter details for the new admin user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Name"
              value={newAdminForm.name}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white w-full"
            />
            <Input
              placeholder="Email"
              value={newAdminForm.email}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white w-full"
            />
            <select
              value={newAdminForm.role}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white w-full p-2 rounded"
            >
              {roles.map((role) => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
            <Input
              placeholder="Location"
              value={newAdminForm.location}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, location: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white w-full"
            />
            <select
              value={newAdminForm.status}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, status: e.target.value })}
              className="bg-[#232b45] border border-[#232b45] text-white w-full p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddSubmit}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserAccessControl;