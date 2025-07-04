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

  const permissionLabels: Record<string, string> = {
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
    <Card className="bg-card-bg border-card-border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center text-text-color">
              <Shield className="h-5 w-5 mr-2 text-secondary" />
              Role Management
            </CardTitle>
            <CardDescription className="text-text-secondary">Configure roles and permissions for admin users</CardDescription>
          </div>
          <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleCreateRole}>
            <Plus className="h-4 w-4 mr-2 text-white" />
            Create Role
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Roles List */}
        <div>
          <h3 className="text-lg font-semibold text-text-color mb-3">Available Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="cursor-pointer"
              >
                <Card
                  className={`transition-colors ${selectedRole === role.id ? 'border-primary bg-surface-color' : 'hover:bg-surface-color'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-text-color">{role.name}</h4>
                        <p className="text-sm text-text-secondary">{role.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white" onClick={(e) => { e.stopPropagation(); handleEditRole(role.id); }}>
                          <Edit className="h-3 w-3 text-secondary" />
                        </Button>
                        <Button variant="outline" className="text-text-color border-danger hover:bg-danger hover:text-white" onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id); }}>
                          <Trash className="h-3 w-3 text-danger" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-border-color text-text-secondary">
                        <Users className="h-3 w-3 mr-1 text-secondary" />
                        {role.users} users
                      </Badge>
                      <div className="text-xs text-text-secondary">
                        {Object.values(role.permissions).filter(Boolean).length} permissions
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Configuration */}
        {selectedRoleData && (
          <Card className="bg-surface-color border-border-color">
            <CardHeader>
              <CardTitle className="text-lg text-text-color">
                Configure Permissions: {selectedRoleData.name}
              </CardTitle>
              <CardDescription className="text-text-secondary">
                Set what this role can access and modify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-color">{label}</h4>
                    <p className="text-sm text-text-secondary">
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
        <Card className="bg-surface-color border-border-color">
          <CardHeader>
            <CardTitle className="text-lg text-text-color">Quick Role Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">User Email</label>
              <Input
                className="pl-10 bg-input-bg border-input-border text-input-text"
                placeholder="Enter user email to assign role"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Select Role</label>
              <select className="w-full p-2 border rounded-md pl-10 bg-input-bg border-input-border text-input-text">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleAssignRole}>
              Assign Role
            </Button>
          </CardContent>
        </Card>

        {/* Create Role Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="bg-card-bg border-border-color text-text-color max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Enter details for the new role.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Role Name"
                value={newRoleForm.name}
                onChange={(e) => setNewRoleForm({ ...newRoleForm, name: e.target.value })}
                className="bg-input-bg border-input-border text-input-text w-full"
              />
              <Input
                placeholder="Description"
                value={newRoleForm.description}
                onChange={(e) => setNewRoleForm({ ...newRoleForm, description: e.target.value })}
                className="bg-input-bg border-input-border text-input-text w-full"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-border-color text-text-color hover:bg-surface-color" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleCreateSubmit}>
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