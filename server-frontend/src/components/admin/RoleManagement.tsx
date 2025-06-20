import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Switch } from "../../components/ui/Switch";
import { Users, Shield, Plus, Edit, Trash } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface Permissions {
  userManagement: boolean;
  vendorManagement: boolean;
  franchiseManagement: boolean;
  financeManagement: boolean;
  systemSettings: boolean;
  reportAccess: boolean;
  securityManagement: boolean;
  bulkNotifications: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: Permissions;
}

interface NewRoleForm {
  name: string;
  description: string;
}

const RoleManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState('super-admin');
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Complete platform access and control',
      users: 2,
      permissions: {
        userManagement: true,
        vendorManagement: true,
        franchiseManagement: true,
        financeManagement: true,
        systemSettings: true,
        reportAccess: true,
        securityManagement: true,
        bulkNotifications: true
      }
    },
    {
      id: 'franchise-manager',
      name: 'Franchise Manager',
      description: 'Manage franchises and their vendors',
      users: 5,
      permissions: {
        userManagement: false,
        vendorManagement: true,
        franchiseManagement: true,
        financeManagement: false,
        systemSettings: false,
        reportAccess: true,
        securityManagement: false,
        bulkNotifications: true
      }
    },
    {
      id: 'support-agent',
      name: 'Support Agent',
      description: 'Handle customer support and tickets',
      users: 12,
      permissions: {
        userManagement: false,
        vendorManagement: false,
        franchiseManagement: false,
        financeManagement: false,
        systemSettings: false,
        reportAccess: false,
        securityManagement: false,
        bulkNotifications: false
      }
    },
    {
      id: 'content-manager',
      name: 'Content Manager',
      description: 'Manage events, campaigns, and content',
      users: 3,
      permissions: {
        userManagement: false,
        vendorManagement: false,
        franchiseManagement: false,
        financeManagement: false,
        systemSettings: false,
        reportAccess: true,
        securityManagement: false,
        bulkNotifications: true
      }
    }
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newRoleForm, setNewRoleForm] = useState<NewRoleForm>({
    name: '',
    description: '',
  });

  const permissionLabels = {
    userManagement: 'User Management',
    vendorManagement: 'Vendor Management',
    franchiseManagement: 'Franchise Management',
    financeManagement: 'Finance Management',
    systemSettings: 'System Settings',
    reportAccess: 'Report Access',
    securityManagement: 'Security Management',
    bulkNotifications: 'Bulk Notifications'
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  const handlePermissionChange = (permission: string, enabled: boolean) => {
    if (selectedRoleData) {
      const updatedRoles = roles.map(role =>
        role.id === selectedRole
          ? { ...role, permissions: { ...role.permissions, [permission]: enabled } }
          : role
      );
      setRoles(updatedRoles);
      toast({
        title: "Permission Updated",
        description: `${permissionLabels[permission]} ${enabled ? 'enabled' : 'disabled'} for ${selectedRoleData.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
      });
    }
  };

  const handleCreateRole = () => {
    setShowCreateDialog(true);
  };

  const handleCreateSubmit = () => {
    if (!newRoleForm.name || !newRoleForm.description) {
      toast({
        title: "Create Role Error",
        description: "Please fill in both name and description.",
        variant: "destructive"
      });
      return;
    }
    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: newRoleForm.name,
      description: newRoleForm.description,
      users: 0,
      permissions: {
        userManagement: false,
        vendorManagement: false,
        franchiseManagement: false,
        financeManagement: false,
        systemSettings: false,
        reportAccess: false,
        securityManagement: false,
        bulkNotifications: false
      }
    };
    setRoles([...roles, newRole]);
    toast({
      title: "Role Created",
      description: `Created role "${newRoleForm.name}" at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setShowCreateDialog(false);
    setNewRoleForm({ name: '', description: '' });
  };

  const handleEditRole = (roleId: string) => {
    toast({
      title: "Edit Role Initiated",
      description: `Editing role ${roles.find(role => role.id === roleId)?.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement edit logic (e.g., open a dialog)
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: `Deleted role ${roles.find(role => role.id === roleId)?.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Update selectedRole if the deleted role was selected
    if (selectedRole === roleId) setSelectedRole(roles[0]?.id || '');
  };

  const handleAssignRole = () => {
    toast({
      title: "Role Assigned",
      description: `Role assigned at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement role assignment logic
  };

  return (
    <Card className="bg-[#1A1F2B] border-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-white">
              <Shield className="h-5 w-5 mr-2 text-blue-400" />
              Role Management
            </CardTitle>
            <CardDescription className="text-gray-400">Configure roles and permissions for admin users</CardDescription>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCreateRole}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roles List */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Available Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-colors ${selectedRole === role.id ? 'border-orange-500 bg-[#232b45]' : 'hover:bg-[#2A2F3A]'}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">{role.name}</h4>
                      <p className="text-sm text-gray-400">{role.description}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" className="text-white border-blue-500 hover:bg-blue-500" onClick={(e) => { e.stopPropagation(); handleEditRole(role.id); }}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" className="text-white border-red-500 hover:bg-red-500" onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id); }}>
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      <Users className="h-3 w-3 mr-1" />
                      {role.users} users
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {Object.values(role.permissions).filter(Boolean).length} permissions
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Permission Configuration */}
        {selectedRoleData && (
          <Card className="bg-[#232b45] border border-[#2A2F3A]">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Configure Permissions: {selectedRoleData.name}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Set what this role can access and modify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{label}</h4>
                    <p className="text-sm text-gray-400">
                      {key === 'userManagement' && 'Add, edit, and manage all platform users'}
                      {key === 'vendorManagement' && 'Approve vendors, manage KYC, and vendor settings'}
                      {key === 'franchiseManagement' && 'Manage franchise operations and performance'}
                      {key === 'financeManagement' && 'Access revenue, commissions, and financial data'}
                      {key === 'systemSettings' && 'Modify platform settings and configurations'}
                      {key === 'reportAccess' && 'Generate and download platform reports'}
                      {key === 'securityManagement' && 'Manage security settings and audit logs'}
                      {key === 'bulkNotifications' && 'Send bulk notifications to users'}
                    </p>
                  </div>
                  <Switch
                    checked={selectedRoleData.permissions[key as keyof typeof selectedRoleData.permissions]}
                    onCheckedChange={(checked) => handlePermissionChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Role Assignment */}
        <Card className="bg-[#232b45] border border-[#2A2F3A]">
          <CardHeader>
            <CardTitle className="text-lg text-white">Quick Role Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">User Email</label>
              <Input
                className="pl-10 bg-[#2A2F3A] border border-[#2A2F3A] text-white placeholder-gray-400"
                placeholder="Enter user email to assign role"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Select Role</label>
              <select className="w-full p-2 border rounded-md pl-10 bg-[#2A2F3A] border-[#2A2F3A] text-white">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAssignRole}>
              Assign Role
            </Button>
          </CardContent>
        </Card>

        {/* Create Role Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="bg-[#1A1F2B] border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter details for the new role.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Role Name"
                value={newRoleForm.name}
                onChange={(e) => setNewRoleForm({ ...newRoleForm, name: e.target.value })}
                className="bg-[#232b45] border border-[#232b45] text-white w-full"
              />
              <Input
                placeholder="Description"
                value={newRoleForm.description}
                onChange={(e) => setNewRoleForm({ ...newRoleForm, description: e.target.value })}
                className="bg-[#232b45] border border-[#232b45] text-white w-full"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleCreateSubmit}>
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;