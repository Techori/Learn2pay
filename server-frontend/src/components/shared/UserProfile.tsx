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
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Avatar className="h-8 w-8 bg-primary/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-primary">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-text-color">{user.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-surface-color border-border-color">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-text-color">
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
                  className="text-text-secondary hover:text-text-secondary/80 hover:bg-card-bg/50"
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
            <Avatar className="h-20 w-20 bg-primary/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg text-primary">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-text-color">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-card-bg border border-border-color rounded">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-text-color">{user.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-color">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-card-bg border border-border-color rounded">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-text-color">{user.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-text-color">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-card-bg border border-border-color rounded">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-text-color">{user.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-text-color">Role</Label>
              <div className="flex items-center space-x-2 p-2 bg-card-bg border border-border-color rounded">
                <span className="capitalize font-medium text-primary">
                  {user.role}
                </span>
              </div>
            </div>

            {user.address && (
              <div className="space-y-2">
                <Label htmlFor="address" className="text-text-color">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 bg-card-bg border border-border-color rounded">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-text-color">{user.address}</span>
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
