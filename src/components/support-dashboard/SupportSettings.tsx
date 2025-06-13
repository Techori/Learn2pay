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
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Support Settings</CardTitle>
          <CardDescription className="text-gray-400">
            Configure support system preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2 text-orange-400" />
              General Settings
            </h3>
            <div className="space-y-4 bg-slate-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assign" className="text-gray-200">
                    Auto-assign tickets
                  </Label>
                  <p className="text-sm text-gray-400">
                    Automatically assign new tickets to available agents
                  </p>
                </div>
                <Switch id="auto-assign" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="follow-up" className="text-gray-200">
                    Automated follow-ups
                  </Label>
                  <p className="text-sm text-gray-400">
                    Send follow-up messages for unresolved tickets
                  </p>
                </div>
                <Switch id="follow-up" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-time" className="text-gray-200">
                  Target response time (hours)
                </Label>
                <Input
                  id="response-time"
                  type="number"
                  defaultValue="2"
                  className="bg-gray-800 border-gray-700 text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-400" />
              Notification Settings
            </h3>
            <div className="space-y-4 bg-slate-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="email-notifications"
                    className="text-gray-200"
                  >
                    Email notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive email alerts for new tickets
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="browser-notifications"
                    className="text-gray-200"
                  >
                    Browser notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Show desktop notifications for ticket updates
                  </p>
                </div>
                <Switch id="browser-notifications" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="escalation-alerts" className="text-gray-200">
                    Escalation alerts
                  </Label>
                  <p className="text-sm text-gray-400">
                    Get notified when tickets are escalated
                  </p>
                </div>
                <Switch id="escalation-alerts" defaultChecked />
              </div>
            </div>
          </div>

          {/* Team Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-orange-400" />
              Team Settings
            </h3>
            <div className="space-y-4 bg-slate-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="team-visibility" className="text-gray-200">
                    Team ticket visibility
                  </Label>
                  <p className="text-sm text-gray-400">
                    Allow team members to view each other's tickets
                  </p>
                </div>
                <Switch id="team-visibility" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="workload-balancing" className="text-gray-200">
                    Workload balancing
                  </Label>
                  <p className="text-sm text-gray-400">
                    Distribute tickets evenly across team members
                  </p>
                </div>
                <Switch id="workload-balancing" defaultChecked />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-orange-400" />
              Security Settings
            </h3>
            <div className="space-y-4 bg-slate-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="text-gray-200">
                    Two-factor authentication
                  </Label>
                  <p className="text-sm text-gray-400">
                    Require 2FA for support team access
                  </p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="session-timeout" className="text-gray-200">
                    Session timeout
                  </Label>
                  <p className="text-sm text-gray-400">
                    Automatically log out after period of inactivity
                  </p>
                </div>
                <Switch id="session-timeout" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout-minutes" className="text-gray-200">
                  Timeout period (minutes)
                </Label>
                <Input
                  id="timeout-minutes"
                  type="number"
                  defaultValue="30"
                  className="bg-gray-800 border-gray-700 text-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-200 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSettings;
