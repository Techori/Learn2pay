import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useToast } from "../../hooks/use-toast";
import { Checkbox } from "../ui/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import * as Collapsible from "@radix-ui/react-collapsible";

import { ChevronDown, Upload, User, Mail, Phone } from "lucide-react";

interface Profile {
  name: string;
  email: string;
  phone: string;
  designation: string;
  photo?: string;
}

interface TeamMember {
  name: string;
  region: string;
  target: number;
}

interface NotificationPrefs {
  newLead: boolean;
  kycSubmitted: boolean;
  underperforming: boolean;
  targetAchievement: boolean;
  summaryEmails: boolean;
}

interface Delegation {
  backupManager?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
  active: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    name: "Sales Manager",
    email: "manager@xai.com",
    phone: "+91 9876543210",
    designation: "Sales Manager",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [teamMembers] = useState<TeamMember[]>([
    { name: "Salesperson A", region: "North", target: 50000 },
    { name: "Salesperson B", region: "South", target: 45000 },
    { name: "Salesperson C", region: "East", target: 30000 },
    { name: "Salesperson D", region: "West", target: 35000 },
  ]);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    newLead: true,
    kycSubmitted: true,
    underperforming: false,
    targetAchievement: true,
    summaryEmails: false,
  });
  const [delegation, setDelegation] = useState<Delegation>({ active: false });
  const [backupOptions] = useState(["Priya Patel", "Vikram Singh", "Sneha Desai"]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedPrefs = localStorage.getItem("notificationPrefs");
    if (savedPrefs) setNotifications(JSON.parse(savedPrefs));
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.phone.match(/^\+91\d{10}$/)) {
      toast({ title: "Error", description: "Please enter a valid name and phone number (+91 followed by 10 digits).", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    if (photoFile) {
      reader.onload = (e) => setProfile({ ...profile, photo: e.target?.result as string });
      reader.readAsDataURL(photoFile);
    }
    toast({ title: "Success", description: "Profile updated successfully!" });
  };

  const handleNotificationChange = (key: keyof NotificationPrefs) => {
    const updatedPrefs = { ...notifications, [key]: !notifications[key] };
    setNotifications(updatedPrefs);
    localStorage.setItem("notificationPrefs", JSON.stringify(updatedPrefs));
    toast({ title: "Updated", description: `Notification preference for ${key} updated.` });
  };

  const handleDelegationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegation.backupManager || !delegation.startDate || !delegation.endDate) {
      toast({ title: "Error", description: "Backup manager, start date, and end date are required.", variant: "destructive" });
      return;
    }
    setDelegation({ ...delegation, active: true });
    toast({ title: "Success", description: `Delegation to ${delegation.backupManager} activated until ${delegation.endDate}.` });
  };

  const handleCancelDelegation = () => {
    setDelegation({ active: false });
    toast({ title: "Canceled", description: "Delegation has been canceled." });
  };

  const filteredTeam = regionFilter ? teamMembers.filter((m) => m.region === regionFilter) : teamMembers;

  return (
    <div className="space-y-6 bg-[#101624] min-h-screen p-4 rounded-xl text-white">
      {/* Profile Settings */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src={profile.photo || "https://via.placeholder.com/50"} alt="Profile" className="rounded-full w-12 h-12 object-cover" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" size="sm" variant="outline" className="ml-2 border-[#ff7900] text-orange-400 hover:bg-orange-500/10">
                      <Upload className="h-4 w-4 mr-1" /> Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Profile Photo</DialogTitle>
                    </DialogHeader>
                    <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} className="mb-2" />
                    <Button type="button" onClick={() => setPhotoFile(null)} className="bg-red-500 text-white">Cancel</Button>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex-1">
                <Input placeholder="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="bg-[#232b45] border border-[#232b45] text-white" />
                <Input placeholder="Email" value={profile.email} readOnly className="bg-[#232b45] border border-[#232b45] text-white mt-2" />
                <Input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-[#232b45] border border-[#232b45] text-white mt-2" />
                <Input placeholder="Designation" value={profile.designation} readOnly className="bg-[#232b45] border border-[#232b45] text-white mt-2" />
              </div>
            </div>
            <Button type="submit" className="bg-orange-500 text-white">Save</Button>
          </form>
        </CardContent>
      </Card>

      {/* Team Hierarchy View */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Team Hierarchy</CardTitle>
            <select className="pl-2 pr-2 py-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={regionFilter || ""} onChange={(e) => setRegionFilter(e.target.value || null)}>
              <option value="">All Regions</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
<Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
  <Collapsible.Trigger className="flex items-center w-full text-left text-white hover:bg-[#232b45] p-2 rounded">
    Sales Manager (Self) <ChevronDown className="ml-auto h-4 w-4" />
  </Collapsible.Trigger>

  <Collapsible.Content className="space-y-2 mt-2">
    {filteredTeam.map((member) => (
      <div key={member.name} className="bg-[#232b45] p-2 rounded">
        <p>{member.name}</p>
        <p className="text-sm text-gray-400">Region: {member.region}</p>
        <p className="text-sm text-gray-400">Target: ₹{member.target}</p>
      </div>
    ))}
  </Collapsible.Content>
</Collapsible.Root>

        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="newLead" checked={notifications.newLead} onCheckedChange={() => handleNotificationChange("newLead")} />
            <label htmlFor="newLead" className="text-white">Notify on new lead submitted</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="kycSubmitted" checked={notifications.kycSubmitted} onCheckedChange={() => handleNotificationChange("kycSubmitted")} />
            <label htmlFor="kycSubmitted" className="text-white">Alert on KYC submitted by team</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="underperforming" checked={notifications.underperforming} onCheckedChange={() => handleNotificationChange("underperforming")} />
            <label htmlFor="underperforming" className="text-white">Remind for underperforming team members</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="targetAchievement" checked={notifications.targetAchievement} onCheckedChange={() => handleNotificationChange("targetAchievement")} />
            <label htmlFor="targetAchievement" className="text-white">Confirmation alerts on target achievement</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="summaryEmails" checked={notifications.summaryEmails} onCheckedChange={() => handleNotificationChange("summaryEmails")} />
            <label htmlFor="summaryEmails" className="text-white">Summary emails weekly/monthly</label>
          </div>
        </CardContent>
      </Card>

      {/* Delegation / Backup Manager Settings */}
      <Card className="bg-[#181f32] border border-[#232b45] shadow-none">
        <CardHeader>
          <CardTitle>Delegation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {!delegation.active ? (
            <form onSubmit={handleDelegationSubmit} className="space-y-4">
              <select className="w-full p-2 rounded bg-[#232b45] border border-[#232b45] text-gray-300" value={delegation.backupManager || ""} onChange={(e) => setDelegation({ ...delegation, backupManager: e.target.value })}>
                <option value="">Select Backup Manager</option>
                {backupOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <Input type="date" className="w-full bg-[#232b45] border border-[#232b45] text-gray-300" value={delegation.startDate || ""} onChange={(e) => setDelegation({ ...delegation, startDate: e.target.value })} />
              <Input type="date" className="w-full bg-[#232b45] border border-[#232b45] text-gray-300" value={delegation.endDate || ""} onChange={(e) => setDelegation({ ...delegation, endDate: e.target.value })} />
              <Input placeholder="Reason (Optional)" className="w-full bg-[#232b45] border border-[#232b45] text-gray-300" value={delegation.reason || ""} onChange={(e) => setDelegation({ ...delegation, reason: e.target.value })} />
              <Button type="submit" className="bg-orange-500 text-white">Assign Backup</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-white">Active Backup: {delegation.backupManager} (Until {delegation.endDate})</p>
              {delegation.reason && <p className="text-gray-400">Reason: {delegation.reason}</p>}
              <Button onClick={handleCancelDelegation} className="bg-red-500 text-white">Cancel Delegation</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;