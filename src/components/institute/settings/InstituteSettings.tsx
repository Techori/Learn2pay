import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { CalendarIcon, Bell, Shield, Book, CreditCard, Settings } from 'lucide-react';

const GeneralSettings = () => (
  <Card className="bg-gray-800/50 border-gray-700 shadow-md">
    <CardHeader>
      <CardTitle className="text-lg text-white">Institute Information</CardTitle>
      <p className="text-gray-400 text-sm">Basic institute details and contact information</p>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="institute-name" className="text-gray-300">Institute Name</Label>
        <Input id="institute-name" value="National Public School" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="institute-code" className="text-gray-300">Institute Code</Label>
        <Input id="institute-code" value="NPS-MAIN" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-address" className="text-gray-300">Email Address</Label>
        <Input id="email-address" value="admin@nps.edu" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone-number" className="text-gray-300">Phone Number</Label>
        <Input id="phone-number" value="9876543210" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="space-y-2 col-span-1 md:col-span-2">
        <Label htmlFor="address" className="text-gray-300">Address</Label>
        <Input id="address" value="123 Main Street, Mumbai" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="space-y-2 col-span-1 md:col-span-2">
        <Label htmlFor="website" className="text-gray-300">Website</Label>
        <Input id="website" value="www.nps.edu" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500" readOnly />
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-start">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </CardContent>
  </Card>
);

const AcademicSettings = () => (
  <Card className="bg-gray-800/50 border-gray-700 shadow-md">
    <CardHeader>
      <CardTitle className="text-lg text-white">Academic Year Settings</CardTitle>
      <p className="text-gray-400 text-sm">Configure academic year dates and terms</p>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="academic-start" className="text-gray-300">Academic Year Start</Label>
        <div className="relative">
          <Input id="academic-start" value="01-04-2024" className="bg-gray-900 border-gray-700 text-white pr-10" readOnly />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="academic-end" className="text-gray-300">Academic Year End</Label>
        <div className="relative">
          <Input id="academic-end" value="31-03-2025" className="bg-gray-900 border-gray-700 text-white pr-10" readOnly />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-start">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </CardContent>
    <CardHeader className="mt-6">
      <CardTitle className="text-lg text-white">Term Configuration</CardTitle>
      <p className="text-gray-400 text-sm">Set up academic terms and holidays</p>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500 text-center py-8">Term configuration options will be available here</p>
    </CardContent>
  </Card>
);

const NotificationSettings = () => (
  <Card className="bg-gray-800/50 border-gray-700 shadow-md">
    <CardHeader>
      <CardTitle className="text-lg text-white">Notification Preferences</CardTitle>
      <p className="text-gray-400 text-sm">Configure how and when you receive notifications</p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="email-notifications" className="text-white block">Email Notifications</Label>
          <p className="text-gray-400 text-sm">Receive notifications via email</p>
        </div>
        <Switch id="email-notifications" defaultChecked className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="sms-notifications" className="text-white block">SMS Notifications</Label>
          <p className="text-gray-400 text-sm">Receive notifications via SMS</p>
        </div>
        <Switch id="sms-notifications" defaultChecked className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="payment-reminders" className="text-white block">Payment Reminders</Label>
          <p className="text-gray-400 text-sm">Automatic payment reminder notifications</p>
        </div>
        <Switch id="payment-reminders" defaultChecked className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="overdue-alerts" className="text-white block">Overdue Alerts</Label>
          <p className="text-gray-400 text-sm">Alerts for overdue payments</p>
        </div>
        <Switch id="overdue-alerts" defaultChecked className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="flex justify-start pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </CardContent>
  </Card>
);

const SecuritySettings = () => (
  <Card className="bg-gray-800/50 border-gray-700 shadow-md">
    <CardHeader>
      <CardTitle className="text-lg text-white">Security Settings</CardTitle>
      <p className="text-gray-400 text-sm">Configure security and access controls</p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="two-factor" className="text-white block">Two-Factor Authentication</Label>
          <p className="text-gray-400 text-sm">Add an extra layer of security</p>
        </div>
        <Switch id="two-factor" className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="session-timeout" className="text-gray-300">Session Timeout (minutes)</Label>
        <Input id="session-timeout" type="number" value="30" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 w-24" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="strong-password" className="text-white block">Strong Password Policy</Label>
          <p className="text-gray-400 text-sm">Enforce strong password requirements</p>
        </div>
        <Switch id="strong-password" defaultChecked className="data-[state=checked]:bg-orange-500" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="max-login-attempts" className="text-gray-300">Max Login Attempts</Label>
        <Input id="max-login-attempts" type="number" value="5" className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 w-24" />
      </div>
      <div className="flex justify-start pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </CardContent>
  </Card>
);

const BillingSettings = () => (
  <Card className="bg-gray-800/50 border-gray-700 shadow-md">
    <CardHeader>
      <CardTitle className="text-lg text-white">Billing Information</CardTitle>
      <p className="text-gray-400 text-sm">Manage your subscription and payment details</p>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500 text-center py-8">Billing settings options will be available here</p>
    </CardContent>
  </Card>
);

const InstituteSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Settings className="h-6 w-6 text-gray-400" />
          <span>Institute Settings</span>
        </h2>
        <p className="text-gray-400 ml-4">Configure institute details, preferences, and system settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 p-1 rounded-md overflow-x-auto justify-start">
          <TabsTrigger value="general" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
            General
          </TabsTrigger>
          <TabsTrigger value="academic" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
            Academic
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center space-x-2 py-2 px-4 rounded-md">
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