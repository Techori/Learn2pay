import React from 'react';
import { TabsContent } from "../ui/Tabs";
import LeadsManagement from './LeadsManagement';
import OnboardingManagement from './OnboardingManagement';
import TargetsGoals from './TargetsGoals';
import SalesReports from './SalesReports';
import EmiReminder from './EmiReminder';
import SalesDashboard from './SalesDashboard';

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

      <TabsContent value="emiReminder">  
        <EmiReminder />
      </TabsContent>

      <TabsContent value="settings">
        <div className="text-center py-12 bg-[#181f32] rounded-xl border border-[#232b45] shadow-none">
          <h3 className="text-lg font-semibold mb-2 text-white">Sales Settings</h3>
          <p className="text-gray-400">Configure sales team preferences and settings</p>
        </div>
      </TabsContent>
    </>
  );
};

export default SalesTabContent;
