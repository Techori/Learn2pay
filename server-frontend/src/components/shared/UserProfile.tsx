import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Aavatar";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useTheme } from "../../context/ThemeContext";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar?: string;
    address?: string;
  };
  onUpdate: (updatedUser: any) => void;
}

const UserProfile = ({ user, onUpdate }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border border-primary bg-background text-text-color hover:bg-primary hover:text-white transition-colors flex items-center space-x-2 pl-2 pr-3"
        >
          <Avatar className="h-6 w-6 bg-gray-200 dark:bg-gray-600 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-black dark:text-gray-200">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block">{user.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-800 border-border-color">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-foreground">
            User Profile
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-primary hover:text-primary-hover hover:bg-primary/10"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="text-foreground hover:text-foreground/80 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSave}
                  className="text-success hover:text-success hover:bg-success/10"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-20 w-20 bg-gray-200 dark:bg-gray-600">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg text-black dark:text-gray-200">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white dark:bg-slate-700 text-foreground"
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 border border-border-color rounded">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{user.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white dark:bg-slate-700 text-foreground"
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 border border-border-color rounded">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{user.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-white dark:bg-slate-700 text-foreground"
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 border border-border-color rounded">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{user.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">Role</Label>
              <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 border border-border-color rounded">
                <span className="capitalize font-medium text-orange-500">
                  {user.role}
                </span>
              </div>
            </div>

            {user.address && (
              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-white dark:bg-slate-700 text-foreground"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 border border-border-color rounded">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{user.address}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
