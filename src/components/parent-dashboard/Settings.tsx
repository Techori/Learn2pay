import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Switch } from "../ui/Switch";
import { Button } from "../ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Separator } from "../ui/Separator";
import { Badge } from "../ui/Badge";
import {
  Bell,
  CreditCard,
  Shield,
  User,
  Smartphone,
  Mail,
  Globe,
  Eye,
  EyeOff,
  Download,
  Lock,
} from "lucide-react";

interface SettingsProps {
  parentData: {
    name: string;
    contactInfo: {
      email: string;
      phone: string;
    };
  };
}

const Settings = ({ parentData }: SettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    autoEmiDeduction: true,
    emiReminders: true,
    smsPayments: true,
    emailReceipts: true,
    whatsappUpdates: false,
    attendanceAlerts: true,
    feeUpdates: true,
    serviceUpdates: false,
    holidayNotifications: true,
    emergencyAlerts: true,
  });

  const [formData, setFormData] = useState({
    name: parentData.name,
    email: parentData.contactInfo.email,
    phone: parentData.contactInfo.phone,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving settings:", { formData, notifications });
    // Add save logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-gray-700">
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="payments"
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-400" />
                    Profile Photo
                  </h3>
                  <div className="flex items-center gap-8">
                    <img
                      src={profilePhoto || "default-photo-url"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div>
                      <Button
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Change Photo
                      </Button>
                      <input
                        type="file"
                        id="photo-upload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-400" />
                    Profile Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Parent Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-300 flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-gray-300 flex items-center gap-2"
                      >
                        <Smartphone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="bg-slate-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-orange-400" />
                    EMI & Payment Settings
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "autoEmiDeduction",
                        label: "Auto EMI Deduction",
                        description: "Automatically deduct EMI payments",
                      },
                      {
                        key: "emiReminders",
                        label: "EMI Due Date Reminders",
                        description: "Get notified before EMI due dates",
                      },
                      {
                        key: "smsPayments",
                        label: "SMS Notifications for Payments",
                        description: "Receive SMS alerts for transactions",
                      },
                      {
                        key: "emailReceipts",
                        label: "Email Receipts",
                        description: "Get payment receipts via email",
                      },
                      {
                        key: "whatsappUpdates",
                        label: "WhatsApp Payment Updates",
                        description: "Receive updates on WhatsApp",
                      },
                    ].map((setting) => (
                      <Card
                        key={setting.key}
                        className="bg-slate-700/50 border-gray-600"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="space-y-1">
                            <div className="text-white font-medium">
                              {setting.label}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {setting.description}
                            </div>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                setting.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) =>
                              handleNotificationChange(setting.key, checked)
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-orange-400" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        key: "attendanceAlerts",
                        label: "Child Attendance Alerts",
                        description:
                          "Get notified about your child's attendance",
                      },
                      {
                        key: "feeUpdates",
                        label: "School Fee Payment Updates",
                        description: "Updates about school fee payments",
                      },
                      {
                        key: "serviceUpdates",
                        label: "Learn2Pay Service Updates",
                        description: "Updates about Learn2Pay features",
                      },
                      {
                        key: "holidayNotifications",
                        label: "Holiday & Event Notifications",
                        description: "School holidays and events",
                      },
                      {
                        key: "emergencyAlerts",
                        label: "Emergency Alerts from School",
                        description: "Important emergency notifications",
                      },
                    ].map((setting) => (
                      <Card
                        key={setting.key}
                        className="bg-slate-700/50 border-gray-600"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="space-y-1">
                            <div className="text-white font-medium">
                              {setting.label}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {setting.description}
                            </div>
                          </div>
                          <Switch
                            checked={
                              notifications[
                                setting.key as keyof typeof notifications
                              ]
                            }
                            onCheckedChange={(checked) =>
                              handleNotificationChange(setting.key, checked)
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-400" />
                    Security & Privacy
                  </h3>

                  {/* Password Change Section */}
                  <Card className="bg-slate-700/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Change Password
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Update your account password for better security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-gray-300"
                        >
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              handleInputChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                            className="bg-slate-700 border-gray-600 text-white pr-10"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute inset-y-0 right-0 px-3 py-0 h-full text-gray-400 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-gray-300">
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("newPassword", e.target.value)
                          }
                          className="bg-slate-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-gray-300"
                        >
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className="bg-slate-700 border-gray-600 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Actions */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-700/50 border-gray-600 text-white hover:bg-slate-700"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Two-Factor Authentication
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-orange-500/20 text-orange-400"
                      >
                        Recommended
                      </Badge>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-700/50 border-gray-600 text-white hover:bg-slate-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download EMI Statement
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start bg-slate-700/50 border-gray-600 text-white hover:bg-slate-700"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <Separator className="my-6 bg-gray-600" />

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  className="bg-gray-600 hover:bg-gray-700 border-gray-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
