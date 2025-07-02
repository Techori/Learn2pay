import React from "react";
import { TabsContent } from "../ui/Tabs";
import LeadsManagement from "./LeadsManagement";
import OnboardingManagement from "./OnboardingManagement";
import TargetsGoals from "./TargetsGoals";
import SalesReports from "./SalesReports";
import ReviewKYC from "./ReviewKYC";
import SalesDashboard from "./SalesDashboard";
import Settings from "./Settings";
import MyLeads from "./MyLeads";
import SalesPersonOnboarding from "./SalesPersonOnboarding";
import MyTargets from "./MyTargets";
import MySalesTeam from "./MySalesTeam";

const SalesTabContent = ({ activeTab, isManager }: { activeTab: string; isManager: boolean }) => {
  const tabContent = {
    dashboard: <SalesDashboard />,
    leads: isManager ? <LeadsManagement /> : null,
    myleads: !isManager ? <MyLeads /> : null,
    onboarding: isManager ? <OnboardingManagement /> : null,
    salesonboarding: !isManager ? <SalesPersonOnboarding /> : null,
    targets: isManager ? <TargetsGoals /> : null,
    myTargets: !isManager ? <MyTargets /> : null,
    reports: isManager ? <SalesReports /> : null,
    reviewKYC: isManager ? <ReviewKYC /> : null,
    settings: <Settings />,
    team: isManager ? <MySalesTeam /> : null
  };

  return tabContent[activeTab as keyof typeof tabContent] || <div className="text-text">Content not available</div>;
};

export default SalesTabContent;