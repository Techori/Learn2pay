
import React from 'react';
import { TabsContent } from "@/components/ui/Tabs";
import ReferralDashboardOverview from './ReferralDashboardOverview';
import AddReferrals from './AddReferrals';
import RevenueTracking from './RevenueTracking';
import Payouts from './Payouts';
import ReferralReports from './ReferralReports';
import ReferralNotifications from './ReferralNotifications';
import ReferralSettings from './ReferralSettings';

const ReferralTabContent = () => {
  return (
    <>
      <TabsContent value="dashboard" className="space-y-6">
        <ReferralDashboardOverview />
      </TabsContent>

      <TabsContent value="add-referrals" className="space-y-6">
        <AddReferrals />
      </TabsContent>

      <TabsContent value="revenue-tracking" className="space-y-6">
        <RevenueTracking />
      </TabsContent>

      <TabsContent value="payouts" className="space-y-6">
        <Payouts />
      </TabsContent>

      <TabsContent value="reports" className="space-y-6">
        <ReferralReports />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <ReferralNotifications />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <ReferralSettings />
      </TabsContent>
    </>
  );
};

export default ReferralTabContent;
