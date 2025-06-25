import React from 'react';
import { TabsContent } from "../ui/Tabs";
import LeadsManagement from './LeadsManagement';
import OnboardingManagement from './OnboardingManagement';
import TargetsGoals from './TargetsGoals';
import SalesReports from './SalesReports';
import ReviewKYC from './ReviewKYC';
import SalesDashboard from './SalesDashboard';
import Settings from './Settings';

const SalesTabContent = () => {
  return (
    <>
      <TabsContent value="dashboard">
        <SalesDashboard />
      </TabsContent>

      <TabsContent value="leads">
        <div className="bg-[#181f32] rounded-xl border border-[#232b45] shadow-none p-4">
          <LeadsManagement />
        </div>
      </TabsContent>

      <TabsContent value="onboarding">
        <OnboardingManagement />
      </TabsContent>

      <TabsContent value="targets">
        <div className="bg-[#181f32] rounded-xl border border-[#232b45] shadow-none p-4">
          <TargetsGoals />
        </div>
      </TabsContent>

      <TabsContent value="reports">
        <SalesReports />
      </TabsContent>

      <TabsContent value="kyc">  
        <ReviewKYC />
      </TabsContent>

      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </>
  );
};

export default SalesTabContent;
