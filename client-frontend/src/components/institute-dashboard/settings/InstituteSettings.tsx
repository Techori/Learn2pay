import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";
import { CalendarIcon, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/Badge";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    instituteName: "National Public School",
    instituteCode: "NPS-MAIN",
    emailAddress: "admin@nps.edu",
    phoneNumber: "9876543210",
    address: "123 Main Street, Mumbai",
    website: "www.nps.edu",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveGeneralSettings = () => {
    console.log("Saving General Settings:", generalSettings);
    toast({
      title: "General Settings Saved",
      description: "Institute information updated successfully.",
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Institute Information
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Basic institute details and contact information
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instituteName" className="text-gray-300">
            Institute Name
          </Label>
          <Input
            id="instituteName"
            value={generalSettings.instituteName}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instituteCode" className="text-gray-300">
            Institute Code
          </Label>
          <Input
            id="instituteCode"
            value={generalSettings.instituteCode}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailAddress" className="text-gray-300">
            Email Address
          </Label>
          <Input
            id="emailAddress"
            value={generalSettings.emailAddress}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-300">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            value={generalSettings.phoneNumber}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="address" className="text-gray-300">
            Address
          </Label>
          <Input
            id="address"
            value={generalSettings.address}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="website" className="text-gray-300">
            Website
          </Label>
          <Input
            id="website"
            value={generalSettings.website}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-start">
          <Button
            onClick={handleSaveGeneralSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AcademicSettings = () => {
  const { toast } = useToast();
  const [academicSettings, setAcademicSettings] = useState({
    academicYearStart: "2024-04-01",
    academicYearEnd: "2025-03-31",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAcademicSettings((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveAcademicSettings = () => {
    console.log("Saving Academic Settings:", academicSettings);
    toast({
      title: "Academic Settings Saved",
      description: "Academic year details updated successfully.",
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Academic Year Settings
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Configure academic year dates and terms
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="academicYearStart" className="text-gray-300">
            Academic Year Start
          </Label>
          <div className="relative">
            <Input
              id="academicYearStart"
              type="date"
              value={academicSettings.academicYearStart}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="academicYearEnd" className="text-gray-300">
            Academic Year End
          </Label>
          <div className="relative">
            <Input
              id="academicYearEnd"
              type="date"
              value={academicSettings.academicYearEnd}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-start">
          <Button
            onClick={handleSaveAcademicSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
      <CardHeader className="mt-6">
        <CardTitle className="text-lg text-white">Term Configuration</CardTitle>
        <p className="text-gray-400 text-sm">
          Set up academic terms and holidays
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 text-center py-8">
          Term configuration options will be available here
        </p>
      </CardContent>
    </Card>
  );
};

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    paymentReminders: true,
    overdueAlerts: true,
  });

  const handleNotificationToggle = (id: string, checked: boolean) => {
    setNotificationPreferences((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSaveNotificationSettings = () => {
    console.log("Saving Notification Preferences:", notificationPreferences);
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Notification Preferences
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Configure how and when you receive notifications
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="emailNotifications" className="text-white block">
              Email Notifications
            </Label>
            <p className="text-gray-400 text-sm">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="emailNotifications"
            checked={notificationPreferences.emailNotifications}
            onCheckedChange={(checked) =>
              handleNotificationToggle("emailNotifications", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="smsNotifications" className="text-white block">
              SMS Notifications
            </Label>
            <p className="text-gray-400 text-sm">
              Receive notifications via SMS
            </p>
          </div>
          <Switch
            id="smsNotifications"
            checked={notificationPreferences.smsNotifications}
            onCheckedChange={(checked) =>
              handleNotificationToggle("smsNotifications", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="paymentReminders" className="text-white block">
              Payment Reminders
            </Label>
            <p className="text-gray-400 text-sm">
              Automatic payment reminder notifications
            </p>
          </div>
          <Switch
            id="paymentReminders"
            checked={notificationPreferences.paymentReminders}
            onCheckedChange={(checked) =>
              handleNotificationToggle("paymentReminders", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="overdueAlerts" className="text-white block">
              Overdue Alerts
            </Label>
            <p className="text-gray-400 text-sm">Alerts for overdue payments</p>
          </div>
          <Switch
            id="overdueAlerts"
            checked={notificationPreferences.overdueAlerts}
            onCheckedChange={(checked) =>
              handleNotificationToggle("overdueAlerts", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="flex justify-start pt-4">
          <Button
            onClick={handleSaveNotificationSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const SecuritySettings = () => {
  const { toast } = useToast();
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    strongPassword: true,
    maxLoginAttempts: 5,
  });

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [id]: checked }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setSecuritySettings((prev) => ({
      ...prev,
      [id]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSaveSecuritySettings = () => {
    console.log("Saving Security Settings:", securitySettings);
    toast({
      title: "Security Settings Saved",
      description: "Your security preferences have been updated.",
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">Security Settings</CardTitle>
        <p className="text-gray-400 text-sm">
          Configure security and access controls
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="twoFactor" className="text-white block">
              Two-Factor Authentication
            </Label>
            <p className="text-gray-400 text-sm">
              Add an extra layer of security
            </p>
          </div>
          <Switch
            id="twoFactor"
            checked={securitySettings.twoFactor}
            onCheckedChange={(checked) =>
              handleSwitchChange("twoFactor", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sessionTimeout" className="text-gray-300">
            Session Timeout (minutes)
          </Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={handleInputChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 w-24"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="strongPassword" className="text-white block">
              Strong Password Policy
            </Label>
            <p className="text-gray-400 text-sm">
              Enforce strong password requirements
            </p>
          </div>
          <Switch
            id="strongPassword"
            checked={securitySettings.strongPassword}
            onCheckedChange={(checked) =>
              handleSwitchChange("strongPassword", checked)
            }
            className="data-[state=checked]:bg-orange-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts" className="text-gray-300">
            Max Login Attempts
          </Label>
          <Input
            id="maxLoginAttempts"
            type="number"
            value={securitySettings.maxLoginAttempts}
            onChange={handleInputChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 w-24"
          />
        </div>
        <div className="flex justify-start pt-4">
          <Button
            onClick={handleSaveSecuritySettings}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BillingSettings = () => {
  const { toast } = useToast();
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    plan: "Premium Plan",
    status: "Active",
    renewalDate: "2025-01-01",
    price: "₹9,999/year",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardType: "Visa",
    last4: "1234",
    expiry: "12/26",
  });

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "INV001",
      date: "2024-01-01",
      description: "Annual Subscription",
      amount: "₹9,999",
      status: "Paid",
    },
    {
      id: "INV002",
      date: "2023-01-01",
      description: "Annual Subscription",
      amount: "₹9,999",
      status: "Paid",
    },
  ]);

  const handleChangePlan = () => {
    toast({
      title: "Change Plan",
      description: "Initiating plan change process... (Not implemented)",
    });
    console.log("Change Plan clicked");
  };

  const handleUpdatePaymentMethod = () => {
    toast({
      title: "Update Payment Method",
      description: "Opening payment method update form... (Not implemented)",
    });
    console.log("Update Payment Method clicked");
  };

  const handleViewInvoices = () => {
    toast({
      title: "View Invoices",
      description: "Redirecting to invoice history... (Not implemented)",
    });
    console.log("View Invoices clicked");
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">
          Billing Information
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Manage your subscription and payment details
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subscription Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Current Subscription
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-gray-300">Plan:</Label>
              <p className="text-white">{subscriptionDetails.plan}</p>
            </div>
            <div>
              <Label className="text-gray-300">Status:</Label>
              <p className="text-white">{subscriptionDetails.status}</p>
            </div>
            <div>
              <Label className="text-gray-300">Renewal Date:</Label>
              <p className="text-white">{subscriptionDetails.renewalDate}</p>
            </div>
            <div>
              <Label className="text-gray-300">Price:</Label>
              <p className="text-white">{subscriptionDetails.price}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleChangePlan}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Change Plan
            </Button>
            <Button
              onClick={handleViewInvoices}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              View Invoices
            </Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-gray-300">Card Type:</Label>
              <p className="text-white">{paymentMethod.cardType}</p>
            </div>
            <div>
              <Label className="text-gray-300">Last 4 Digits:</Label>
              <p className="text-white">**** {paymentMethod.last4}</p>
            </div>
            <div>
              <Label className="text-gray-300">Expires:</Label>
              <p className="text-white">{paymentMethod.expiry}</p>
            </div>
          </div>
          <Button
            onClick={handleUpdatePaymentMethod}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Payment Method
          </Button>
        </div>

        {/* Payment History */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Invoice ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Description
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paymentHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/70">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge
                        className={
                          item.status === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InstituteSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Settings className="h-6 w-6 text-gray-400" />
          <span>Institute Settings</span>
        </h2>
        <p className="text-gray-400 ml-4">
          Configure institute details, preferences, and system settings
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 p-1 rounded-md overflow-x-auto justify-start">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
          >
            Academic
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md"
          >
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="academic">
          <AcademicSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstituteSettings;
