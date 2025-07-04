import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Switch } from "../../components/ui/Switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Settings, Users, Shield, Bell, Globe, Database, Key, Save, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/Dialog";

// Define interfaces for TypeScript
interface GlobalSettings {
  platformName: string;
  supportEmail: string;
  maxFileSize: number;
  sessionTimeout: number;
  maintenanceMode: boolean;
  newRegistrations: boolean;
  emailVerification: boolean;
  smsVerification: boolean;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  permissions: string[];
}

interface NewAdminForm {
  name: string;
  email: string;
  role: string;
  status: string;
}

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    platformName: "Multi-Service Platform",
    supportEmail: "support../...com",
    maxFileSize: 10,
    sessionTimeout: 30,
    maintenanceMode: false,
    newRegistrations: true,
    emailVerification: true,
    smsVerification: false
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: 1,
      name: "Super Admin",
      email: "admin../...com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2024-01-20 14:30:25",
      permissions: ["All Access"]
    },
    {
      id: 2,
      name: "KYC Manager",
      email: "kyc../.. .com",
      role: "KYC Admin",
      status: "Active",
      lastLogin: "2024-01-20 12:15:10",
      permissions: ["KYC Management", "User Management"]
    },
    {
      id: 3,
      name: "Support Lead",
      email: "support.lead../.. .com",
      role: "Support Admin",
      status: "Inactive",
      lastLogin: "2024-01-18 09:45:33",
      permissions: ["Ticket Management", "User Support"]
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [newAdminForm, setNewAdminForm] = useState<NewAdminForm>({
    name: '',
    email: '',
    role: '',
    status: 'Active'
  });

  const handleGlobalSettingChange = (key: string, value: any) => {
    setGlobalSettings(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Inactive': return 'bg-danger text-white';
      case 'Suspended': return 'bg-warning text-white';
      default: return 'bg-text-secondary text-white';
    }
  };

  // Handle actions
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: `Global settings saved at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
  };

  const handleAddAdminUser = () => {
    setShowAddDialog(true);
  };

  const handleAddSubmit = () => {
    if (!newAdminForm.name || !newAdminForm.email || !newAdminForm.role) {
      toast({
        title: "Add Admin Error",
        description: "Please fill in all required fields (Name, Email, Role).",
        variant: "destructive"
      });
      return;
    }
    const newAdmin: AdminUser = {
      id: Date.now(),
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: newAdminForm.role,
      status: newAdminForm.status,
      lastLogin: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      permissions: ["Pending"]
    };
    setAdminUsers(prev => [...prev, newAdmin]);
    toast({
      title: "Admin User Added",
      description: `Added ${newAdminForm.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setShowAddDialog(false);
    setNewAdminForm({ name: '', email: '', role: '', status: 'Active' });
  };

  const handleEditAdmin = (id: number) => {
    toast({
      title: "Edit Admin",
      description: `Editing admin user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Open a dialog or form for editing (placeholder)
  };

  const handleSecureAdmin = (id: number) => {
    toast({
      title: "Secure Admin",
      description: `Securing admin user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Implement security action (e.g., enable 2FA)
  };

  const handleDeleteAdmin = (id: number) => {
    toast({
      title: "Delete Admin",
      description: `Deleting admin user with ID ${id} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    setAdminUsers(prev => prev.filter(admin => admin.id !== id));
  };

  const handleSecuritySwitchChange = (setting: string, checked: boolean) => {
    toast({
      title: `${setting} Updated`,
      description: `${setting} set to ${checked} at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }).replace(',', ' ')}.`
    });
    // Mock: Update security settings (e.g., via API)
  };

  return (
    <div className="space-y-6 bg-background-color p-6 text-text-color min-h-screen">
      {/* Platform Settings */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center text-text-color">
            <Settings className="h-5 w-5 mr-2 text-secondary" />
            Global Platform Settings
          </CardTitle>
          <CardDescription className="text-text-secondary">Configure core platform settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-text-secondary">Platform Name</label>
              <Input
                className="pl-10 bg-input-bg border-input-border text-input-text"
                value={globalSettings.platformName}
                onChange={(e) => handleGlobalSettingChange('platformName', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Support Email</label>
              <Input
                className="pl-10 bg-input-bg border-input-border text-input-text"
                value={globalSettings.supportEmail}
                onChange={(e) => handleGlobalSettingChange('supportEmail', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Max File Size (MB)</label>
              <Input
                className="pl-10 bg-input-bg border-input-border text-input-text"
                type="number"
                value={globalSettings.maxFileSize}
                onChange={(e) => handleGlobalSettingChange('maxFileSize', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Session Timeout (minutes)</label>
              <Input
                className="pl-10 bg-input-bg border-input-border text-input-text"
                type="number"
                value={globalSettings.sessionTimeout}
                onChange={(e) => handleGlobalSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-color">Maintenance Mode</h4>
                <p className="text-sm text-text-secondary">Temporarily disable platform access</p>
              </div>
              <Switch
                checked={globalSettings.maintenanceMode}
                onCheckedChange={(checked) => handleGlobalSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-color">New Registrations</h4>
                <p className="text-sm text-text-secondary">Allow new user registrations</p>
              </div>
              <Switch
                checked={globalSettings.newRegistrations}
                onCheckedChange={(checked) => handleGlobalSettingChange('newRegistrations', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-color">Email Verification</h4>
                <p className="text-sm text-text-secondary">Require email verification for new accounts</p>
              </div>
              <Switch
                checked={globalSettings.emailVerification}
                onCheckedChange={(checked) => handleGlobalSettingChange('emailVerification', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-text-color">SMS Verification</h4>
                <p className="text-sm text-text-secondary">Require SMS OTP for account verification</p>
              </div>
              <Switch
                checked={globalSettings.smsVerification}
                onCheckedChange={(checked) => handleGlobalSettingChange('smsVerification', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin User Management */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-text-color">
                <Users className="h-5 w-5 mr-2 text-secondary" />
                Admin User Management
              </CardTitle>
              <CardDescription className="text-text-secondary">Manage admin users and their permissions</CardDescription>
            </div>
            <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleAddAdminUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-text-color">Admin Details</TableHead>
                <TableHead className="text-text-color">Role & Permissions</TableHead>
                <TableHead className="text-text-color">Status</TableHead>
                <TableHead className="text-text-color">Last Login</TableHead>
                <TableHead className="text-text-color">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id} className="hover:bg-surface-color">
                  <TableCell className="text-text-color">
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-sm text-text-secondary">{admin.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div>
                      <Badge variant="outline" className="border-border-color text-text-secondary mb-2">{admin.role}</Badge>
                      <div className="text-sm text-text-secondary">
                        {admin.permissions.join(', ')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <Badge className={getStatusColor(admin.status)}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-text-color">
                    <div className="text-sm font-mono">{admin.lastLogin}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleEditAdmin(admin.id)}>
                        <Edit className="h-3 w-3 text-secondary hover:text-white" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleSecureAdmin(admin.id)}>
                        <Shield className="h-3 w-3 text-secondary hover:text-white" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-text-color border-orange-500 hover:bg-orange-500 hover:text-white" onClick={() => handleDeleteAdmin(admin.id)}>
                        <Trash2 className="h-3 w-3 text-secondary hover:text-white" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Integration Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center text-text-color">
              <Globe className="h-5 w-5 mr-2 text-secondary" />
              API Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { service: "Payment Gateway", provider: "Razorpay", status: "Connected", lastSync: "2 hours ago" },
              { service: "SMS Service", provider: "Twilio", status: "Connected", lastSync: "5 minutes ago" },
              { service: "Email Service", provider: "SendGrid", status: "Connected", lastSync: "1 hour ago" },
              { service: "WhatsApp API", provider: "Meta Business", status: "Error", lastSync: "3 hours ago" }
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface-color rounded">
                <div>
                  <div className="font-medium text-text-color">{integration.service}</div>
                  <div className="text-sm text-text-secondary">{integration.provider}</div>
                  <div className="text-xs text-text-secondary/70">Last sync: {integration.lastSync}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={integration.status === 'Connected' ? 'bg-success text-white' : 'bg-danger text-white'}>
                    {integration.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="text-text-color border-secondary hover:bg-secondary hover:text-white">
                    <Key className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card-bg border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center text-text-color">
              <Database className="h-5 w-5 mr-2 text-secondary" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { component: "Database", status: "Healthy", uptime: "99.9%", response: "45ms" },
              { component: "API Server", status: "Healthy", uptime: "99.8%", response: "120ms" },
              { component: "File Storage", status: "Warning", uptime: "98.5%", response: "300ms" },
              { component: "Cache System", status: "Healthy", uptime: "99.9%", response: "12ms" }
            ].map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface-color rounded">
                <div>
                  <div className="font-medium text-text-color">{system.component}</div>
                  <div className="text-sm text-text-secondary">Uptime: {system.uptime}</div>
                  <div className="text-xs text-text-secondary/70">Response: {system.response}</div>
                </div>
                <Badge className={
                  system.status === 'Healthy' ? 'bg-success text-white' :
                  system.status === 'Warning' ? 'bg-warning text-white' :
                  'bg-danger text-white'
                }>
                  {system.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="bg-card-bg border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center text-text-color">
            <Shield className="h-5 w-5 mr-2 text-secondary" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-text-secondary">Configure platform security and access controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-color">Two-Factor Authentication</h4>
                  <p className="text-sm text-text-secondary">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={false} // Default state, can be dynamic
                  onCheckedChange={(checked) => handleSecuritySwitchChange('Two-Factor Authentication', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-color">IP Whitelist</h4>
                  <p className="text-sm text-text-secondary">Restrict admin access to specific IPs</p>
                </div>
                <Switch
                  checked={false} // Default state, can be dynamic
                  onCheckedChange={(checked) => handleSecuritySwitchChange('IP Whitelist', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-color">Audit Logging</h4>
                  <p className="text-sm text-text-secondary">Log all admin actions</p>
                </div>
                <Switch
                  checked={true} // Default state, can be dynamic
                  onCheckedChange={(checked) => handleSecuritySwitchChange('Audit Logging', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Password Policy</label>
                <div className="text-sm text-text-secondary mt-1">
                  <div>• Minimum 8 characters</div>
                  <div>• At least 1 uppercase letter</div>
                  <div>• At least 1 number</div>
                  <div>• At least 1 special character</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary">Session Settings</label>
                <div className="text-sm text-text-secondary mt-1">
                  <div>• Auto logout after 30 minutes</div>
                  <div>• Force logout on browser close</div>
                  <div>• Single session per user</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-card-bg border-border-color text-text-color max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Enter details for the new admin user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Name"
              value={newAdminForm.name}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
              className="bg-input-bg border-input-border text-input-text w-full"
            />
            <Input
              placeholder="Email"
              value={newAdminForm.email}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
              className="bg-input-bg border-input-border text-input-text w-full"
            />
            <Input
              placeholder="Role"
              value={newAdminForm.role}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
              className="bg-input-bg border-input-border text-input-text w-full"
            />
            <select
              value={newAdminForm.status}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, status: e.target.value })}
              className="bg-input-bg border-input-border text-input-text w-full p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-border-color text-text-color hover:bg-surface-color" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-secondary hover:bg-secondary text-white" onClick={handleAddSubmit}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSettings;