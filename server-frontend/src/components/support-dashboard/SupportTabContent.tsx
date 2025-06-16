import React from 'react';
import { TabsContent } from "@/components/ui/Tabs";
import SupportDashboardOverview from './SupportDashboardOverview';
import SupportTickets from './SupportTickets';
import SupportInstitutes from './SupportInstitutes';
import SupportUsers from './SupportUsers';
import SupportReports from './SupportReports';
import SupportSettings from './SupportSettings';

interface SupportTabContentProps {
  activeTab: string;
}

const SupportTabContent = () => {
  // We will pass activeTab as a prop here later
  // For now, it will use the Tabs context

  return (
    <>
      <TabsContent value="dashboard" className="space-y-6">
        <SupportDashboardOverview />
      </TabsContent>
      
      <TabsContent value="tickets" className="space-y-6">
        <SupportTickets />
      </TabsContent>
      
      <TabsContent value="institutes" className="space-y-6">
        <SupportInstitutes />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-6">
        <SupportUsers />
      </TabsContent>
      
      <TabsContent value="reports" className="space-y-6">
        <SupportReports />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <SupportSettings />
      </TabsContent>
    </>
  );
};

export default SupportTabContent;
