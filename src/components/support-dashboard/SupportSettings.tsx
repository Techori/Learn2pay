import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";
import {
  Settings as SettingsIcon,
  RefreshCcw,
  Save,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Clock as ClockIcon,
  MapPin,
  Globe,
  Bell,
  MessageSquare,
  Smartphone,
  AlertTriangle,
  Target,
  Users,
  LockKeyhole,
  Database,
  ShieldCheck,
  CirclePlay,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportSettings = () => {
  const { toast } = useToast();

  // State for form fields (making them mutable)
  const [supportEmail, setSupportEmail] = useState("support@lern2pay.com");
  const [supportPhone, setSupportPhone] = useState("+91 1800-123-4567");
  const [operatingHoursStart, setOperatingHoursStart] = useState("09:00");
  const [operatingHoursEnd, setOperatingHoursEnd] = useState("18:00");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [autoResponseTemplate, setAutoResponseTemplate] = useState(
    "Thank you for contacting support. We have received your request and will respond within 2 hours."
  );

  // State for toggles
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(true);
  const [escalationNotificationsEnabled, setEscalationNotificationsEnabled] =
    useState(true);

  const [highPriorityResponseTime, setHighPriorityResponseTime] = useState("1");
  const [mediumPriorityResponseTime, setMediumPriorityResponseTime] =
    useState("4");
  const [lowPriorityResponseTime, setLowPriorityResponseTime] = useState("24");

  const [highPriorityResolutionTime, setHighPriorityResolutionTime] =
    useState("4");
  const [mediumPriorityResolutionTime, setMediumPriorityResolutionTime] =
    useState("24");
  const [lowPriorityResolutionTime, setLowPriorityResolutionTime] =
    useState("72");

  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const [autoAssignmentEnabled, setAutoAssignmentEnabled] = useState(true);
  const [autoEscalationEnabled, setAutoEscalationEnabled] = useState(false);
  const [autoCloseResolvedTicketsEnabled, setAutoCloseResolvedTicketsEnabled] =
    useState(true);
  const [autoCloseAfterHours, setAutoCloseAfterHours] = useState("72");

  const [maximumTicketsPerAgent, setMaximumTicketsPerAgent] = useState("20");
  const [roundRobinAssignmentEnabled, setRoundRobinAssignmentEnabled] =
    useState(true);
  const [skillBasedRoutingEnabled, setSkillBasedRoutingEnabled] =
    useState(false);

  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("1 Year");
  const [gdprComplianceStatus, setGdprComplianceStatus] = useState("Enabled");

  // Handlers for top-level buttons
  const handleResetToDefaults = () => {
    // In a real app, you'd reset the state to initial values or fetch defaults from an API
    setSupportEmail("support@lern2pay.com");
    setSupportPhone("+91 1800-123-4567");
    setOperatingHoursStart("09:00");
    setOperatingHoursEnd("18:00");
    setTimezone("Asia/Kolkata (IST)");
    setAutoResponseTemplate(
      "Thank you for contacting support. We have received your request and will respond within 2 hours."
    );
    setEmailNotificationsEnabled(true);
    setSmsNotificationsEnabled(false);
    setPushNotificationsEnabled(true);
    setEscalationNotificationsEnabled(true);
    setHighPriorityResponseTime("1");
    setMediumPriorityResponseTime("4");
    setLowPriorityResponseTime("24");
    setHighPriorityResolutionTime("4");
    setMediumPriorityResolutionTime("24");
    setLowPriorityResolutionTime("72");
    setAutoResponseEnabled(true);
    setAutoAssignmentEnabled(true);
    setAutoEscalationEnabled(false);
    setAutoCloseResolvedTicketsEnabled(true);
    setAutoCloseAfterHours("72");
    setMaximumTicketsPerAgent("20");
    setRoundRobinAssignmentEnabled(true);
    setSkillBasedRoutingEnabled(false);
    setDataRetentionPeriod("1 Year");
    setGdprComplianceStatus("Enabled");

    toast({
      title: "Settings Reset",
      description: "All settings have been reset to their default values.",
    });
  };

  const handleSaveChanges = () => {
    // In a real app, you would send all the current state values to an API
    console.log("Saving changes:", {
      supportEmail,
      supportPhone,
      operatingHoursStart,
      operatingHoursEnd,
      timezone,
      autoResponseTemplate,
      emailNotificationsEnabled,
      smsNotificationsEnabled,
      pushNotificationsEnabled,
      escalationNotificationsEnabled,
      highPriorityResponseTime,
      mediumPriorityResponseTime,
      lowPriorityResponseTime,
      highPriorityResolutionTime,
      mediumPriorityResolutionTime,
      lowPriorityResolutionTime,
      autoResponseEnabled,
      autoAssignmentEnabled,
      autoEscalationEnabled,
      autoCloseResolvedTicketsEnabled,
      autoCloseAfterHours,
      maximumTicketsPerAgent,
      roundRobinAssignmentEnabled,
      skillBasedRoutingEnabled,
      dataRetentionPeriod,
      gdprComplianceStatus,
    });
    toast({
      title: "Changes Saved",
      description: "Your settings have been successfully saved.",
    });
  };

  const handleManageApiKeys = () => {
    toast({
      title: "Manage API Keys",
      description:
        "Navigating to API Key management (not implemented in mock).",
    });
    console.log("Managing API Keys...");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">Support System Settings</CardTitle>
          <CardDescription>
            Configure support system preferences and automation
          </CardDescription>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleResetToDefaults}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
            onClick={handleSaveChanges}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="sla-routing">SLA & Routing</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings Tab Content */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>
                Basic support system configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Support Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-phone">Support Phone</Label>
                  <Input
                    id="support-phone"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Operating Hours and Timezone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <div className="relative">
                    <Input
                      id="start-time"
                      value={operatingHoursStart}
                      onChange={(e) => setOperatingHoursStart(e.target.value)}
                    />
                    <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <div className="relative">
                    <Input
                      id="end-time"
                      value={operatingHoursEnd}
                      onChange={(e) => setOperatingHoursEnd(e.target.value)}
                    />
                    <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Add timezone options here */}
                      <SelectItem value="Asia/Kolkata (IST)">
                        Asia/Kolkata (IST)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        America/New York (EST)
                      </SelectItem>
                      <SelectItem value="Europe/London">
                        Europe/London (GMT)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Auto-Response Template */}
              <div className="space-y-2">
                <Label htmlFor="auto-response">Auto-Response Template</Label>
                <Textarea
                  id="auto-response"
                  value={autoResponseTemplate}
                  onChange={(e) => setAutoResponseTemplate(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings Tab Content */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="email-notifications"
                    className="text-base flex items-center space-x-2"
                  >
                    <MailIcon className="h-5 w-5" />
                    <span>Email Notifications</span>
                  </Label>
                  <CardDescription>
                    Send email notifications for new tickets and updates
                  </CardDescription>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotificationsEnabled}
                  onCheckedChange={setEmailNotificationsEnabled}
                />
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="sms-notifications"
                    className="text-base flex items-center space-x-2"
                  >
                    <Smartphone className="h-5 w-5" />
                    <span>SMS Notifications</span>
                  </Label>
                  <CardDescription>
                    Send SMS alerts for urgent tickets
                  </CardDescription>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotificationsEnabled}
                  onCheckedChange={setSmsNotificationsEnabled}
                />
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="push-notifications"
                    className="text-base flex items-center space-x-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Push Notifications</span>
                  </Label>
                  <CardDescription>
                    Browser and mobile push notifications
                  </CardDescription>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotificationsEnabled}
                  onCheckedChange={setPushNotificationsEnabled}
                />
              </div>

              {/* Escalation Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="escalation-notifications"
                    className="text-base flex items-center space-x-2"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span>Escalation Notifications</span>
                  </Label>
                  <CardDescription>
                    Notify managers when tickets are escalated
                  </CardDescription>
                </div>
                <Switch
                  id="escalation-notifications"
                  checked={escalationNotificationsEnabled}
                  onCheckedChange={setEscalationNotificationsEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLA & Routing Settings Tab Content */}
        <TabsContent value="sla-routing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>SLA & Response Times</span>
              </CardTitle>
              <CardDescription>
                Set service level agreements and response time targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Response Time Targets */}
              <div className="space-y-2">
                <Label>Response Time Targets (hours)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <Label htmlFor="high-priority-response">
                      High Priority
                    </Label>
                    <Input
                      id="high-priority-response"
                      value={highPriorityResponseTime}
                      onChange={(e) =>
                        setHighPriorityResponseTime(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="medium-priority-response">
                      Medium Priority
                    </Label>
                    <Input
                      id="medium-priority-response"
                      value={mediumPriorityResponseTime}
                      onChange={(e) =>
                        setMediumPriorityResponseTime(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="low-priority-response">Low Priority</Label>
                    <Input
                      id="low-priority-response"
                      value={lowPriorityResponseTime}
                      onChange={(e) =>
                        setLowPriorityResponseTime(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Resolution Time Targets */}
              <div className="space-y-2">
                <Label>Resolution Time Targets (hours)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <Label htmlFor="high-priority-resolution">
                      High Priority
                    </Label>
                    <Input
                      id="high-priority-resolution"
                      value={highPriorityResolutionTime}
                      onChange={(e) =>
                        setHighPriorityResolutionTime(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="medium-priority-resolution">
                      Medium Priority
                    </Label>
                    <Input
                      id="medium-priority-resolution"
                      value={mediumPriorityResolutionTime}
                      onChange={(e) =>
                        setMediumPriorityResolutionTime(e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="low-priority-resolution">
                      Low Priority
                    </Label>
                    <Input
                      id="low-priority-resolution"
                      value={lowPriorityResolutionTime}
                      onChange={(e) =>
                        setLowPriorityResolutionTime(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Settings Tab Content */}
        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CirclePlay className="h-5 w-5" />
                <span>Automation Settings</span>
              </CardTitle>
              <CardDescription>
                Configure automated actions and workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto-Response */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-response-toggle" className="text-base">
                    Auto-Response
                  </Label>
                  <CardDescription>
                    Automatically send acknowledgment emails
                  </CardDescription>
                </div>
                <Switch
                  id="auto-response-toggle"
                  checked={autoResponseEnabled}
                  onCheckedChange={setAutoResponseEnabled}
                />
              </div>

              {/* Auto-Assignment */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-assignment-toggle" className="text-base">
                    Auto-Assignment
                  </Label>
                  <CardDescription>
                    Automatically assign tickets to available agents
                  </CardDescription>
                </div>
                <Switch
                  id="auto-assignment-toggle"
                  checked={autoAssignmentEnabled}
                  onCheckedChange={setAutoAssignmentEnabled}
                />
              </div>

              {/* Auto-Escalation */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-escalation-toggle" className="text-base">
                    Auto-Escalation
                  </Label>
                  <CardDescription>
                    Escalate overdue tickets automatically
                  </CardDescription>
                </div>
                <Switch
                  id="auto-escalation-toggle"
                  checked={autoEscalationEnabled}
                  onCheckedChange={setAutoEscalationEnabled}
                />
              </div>

              {/* Auto-Close Resolved Tickets */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-close-toggle" className="text-base">
                      Auto-Close Resolved Tickets
                    </Label>
                    <CardDescription>
                      Automatically close resolved tickets after set time
                    </CardDescription>
                  </div>
                  <Switch
                    id="auto-close-toggle"
                    checked={autoCloseResolvedTicketsEnabled}
                    onCheckedChange={setAutoCloseResolvedTicketsEnabled}
                  />
                </div>
                {autoCloseResolvedTicketsEnabled && (
                  <div className="w-1/3 ml-auto">
                    <Label htmlFor="auto-close-hours">
                      Auto-close after (hours)
                    </Label>
                    <Input
                      id="auto-close-hours"
                      value={autoCloseAfterHours}
                      onChange={(e) => setAutoCloseAfterHours(e.target.value)}
                      type="number"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings Tab Content */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Team Management Settings</span>
              </CardTitle>
              <CardDescription>
                Configure team workload and routing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Maximum Tickets per Agent */}
              <div className="space-y-2">
                <Label htmlFor="max-tickets-agent">
                  Maximum Tickets per Agent
                </Label>
                <Input
                  id="max-tickets-agent"
                  value={maximumTicketsPerAgent}
                  onChange={(e) => setMaximumTicketsPerAgent(e.target.value)}
                  type="number"
                  className="w-1/3"
                />
                <CardDescription>
                  Maximum number of active tickets per support agent
                </CardDescription>
              </div>

              {/* Round Robin Assignment */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="round-robin-toggle" className="text-base">
                    Round Robin Assignment
                  </Label>
                  <CardDescription>
                    Distribute tickets evenly among available agents
                  </CardDescription>
                </div>
                <Switch
                  id="round-robin-toggle"
                  checked={roundRobinAssignmentEnabled}
                  onCheckedChange={setRoundRobinAssignmentEnabled}
                />
              </div>

              {/* Skill-Based Routing */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label
                    htmlFor="skill-based-routing-toggle"
                    className="text-base"
                  >
                    Skill-Based Routing
                  </Label>
                  <CardDescription>
                    Route tickets based on agent expertise
                  </CardDescription>
                </div>
                <Switch
                  id="skill-based-routing-toggle"
                  checked={skillBasedRoutingEnabled}
                  onCheckedChange={setSkillBasedRoutingEnabled}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab Content */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LockKeyhole className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>
                Security and access control settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Access */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <LockKeyhole className="h-5 w-5 text-yellow-600" />
                    <div className="space-y-1">
                      <p className="font-medium">API Access</p>
                      <CardDescription className="text-yellow-700">
                        Manage API keys and access tokens for third-party
                        integrations
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManageApiKeys}
                  >
                    Manage API Keys
                  </Button>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-blue-600" />
                    <div className="space-y-1">
                      <p className="font-medium">Data Retention</p>
                      <CardDescription>
                        Configure how long support data is retained in the
                        system
                      </CardDescription>
                    </div>
                  </div>
                  <Select
                    value={dataRetentionPeriod}
                    onValueChange={setDataRetentionPeriod}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 Days">30 Days</SelectItem>
                      <SelectItem value="90 Days">90 Days</SelectItem>
                      <SelectItem value="1 Year">1 Year</SelectItem>
                      <SelectItem value="Unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* GDPR Compliance */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <div className="space-y-1">
                      <p className="font-medium">GDPR Compliance</p>
                      <CardDescription className="text-green-700">
                        Ensure compliance with data protection regulations
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {gdprComplianceStatus}
                  </Badge>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportSettings;
