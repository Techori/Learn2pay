import React from 'react';
import { 
  BarChart3, 
  UserPlus, 
  TrendingUp, 
  Wallet, 
  FileText, 
  Bell, 
  Settings,
  Menu,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ReferralSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ReferralSidebar = ({ isCollapsed, onToggle, activeTab, setActiveTab }: ReferralSidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', value: 'dashboard' },
    { icon: UserPlus, label: 'Add Referrals', value: 'add-referrals' },
    { icon: TrendingUp, label: 'Revenue Tracking', value: 'revenue-tracking' },
    { icon: Wallet, label: 'Payouts', value: 'payouts' },
    { icon: FileText, label: 'Reports', value: 'reports' },
    { icon: Bell, label: 'Notifications', value: 'notifications' },
    { icon: Settings, label: 'Settings', value: 'settings' },
  ];

  return (
    <div className={`bg-custom-purple text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} min-h-screen flex flex-col`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img src="/public/lovable-uploads/e614adc9-40d7-4bd0-a484-f1179a4f04c5.png" alt="Learn2Pay Logo" className="h-8 w-auto" />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggle}
            className="text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-4">
            <select className="w-full bg-gray-700 text-white p-2 rounded text-sm border border-gray-600 focus:ring focus:ring-blue-500 focus:border-blue-500">
              <option>Referral Partner Portal</option>
              <option>Agent Dashboard</option>
            </select>
            <div className="text-xs text-gray-400 mt-1">Partner ID: REF2024001</div>
          </div>
        )}
      </div>

      <div className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer transition-colors ${
              item.value === activeTab ? 'bg-gray-700 border-l-4 border-blue-500' : ''
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 text-sm">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <>
            <div className="flex items-center space-x-2 mb-2 text-gray-400">
              <Menu className="h-4 w-4" />
              <span className="text-sm">Collapse menu</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="bg-gray-700 p-1 rounded text-white">
                <span className="font-bold">R</span>
              </div>
              <span>Referral Partner</span>
              <Phone className="h-4 w-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReferralSidebar;
