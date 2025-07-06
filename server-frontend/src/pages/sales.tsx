import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import SalesTabContent from "../components/sales-dashboard/SalesTabContent";
import QuickActions from "@/components/shared/QuickActions";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/shared/DashboardHeader";

const Sales = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const location = useLocation();
  const isManager = location.pathname.includes("/manager");

  // Mock user data (update based on role)
  const mockUser = {
    name: isManager ? "Sales Manager" : "Salesperson",
    email: isManager ? "manager@583.com" : "sales@583.com",
    phone: "+91 9876543210",
    role: isManager ? "Sales Team Lead" : "Salesperson",
    avatar: "",
    address: "Sales Office, Mumbai",
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Redirect to login page (adjust route as needed)
    window.location.href = "/login";
  };

  const handleUserUpdate = (updatedUser: any) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  // Define tabs based on role
  const tabs = isManager
    ? ["dashboard", "leads", "onboarding", "team","targets", "reports", "reviewKYC", "settings"]
    : ["dashboard", "myleads", "salesonboarding", "myTargets", "settings"];

  useEffect(() => {
    // Reset to default tab when role changes
    setActiveTab("dashboard");
  }, [isManager]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        dashboardName="Sales"
        badges={[]}
        user={mockUser}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />

      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <QuickActions role={isManager ? "manager" : "sales"} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  disabled={!tabs.includes(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
                </TabsTrigger>
              ))}
            </TabsList>

            <SalesTabContent activeTab={activeTab} isManager={isManager} />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Sales;