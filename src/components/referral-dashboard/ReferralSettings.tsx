import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";
import { Settings, User, Link, Target, Save, Eye, EyeOff, Copy, RefreshCw, DollarSign } from 'lucide-react';

const ReferralSettings = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  const referralLinks = [
    {
      type: "General Referral",
      url: "https://jodo.com/ref/REF2024001",
      clicks: 245,
      conversions: 12,
      active: true
    },
    {
      type: "Schools Focus",
      url: "https://jodo.com/ref/REF2024001/schools",
      clicks: 156,
      conversions: 8,
      active: true
    },
    {
      type: "Colleges Focus",
      url: "https://jodo.com/ref/REF2024001/colleges",
      clicks: 89,
      conversions: 4,
      active: false
    }
  ];

  const targetSettings = [
    {
      title: "Monthly Referral Target",
      current: "15",
      description: "Number of new referrals per month"
    },
    {
      title: "Revenue Target",
      current: "₹50,000",
      description: "Monthly revenue target from referrals"
    },
    {
      title: "Conversion Rate Goal",
      current: "30%",
      description: "Target conversion rate percentage"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Referral Profile
          </CardTitle>
          <CardDescription>Manage your referral partner information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="partnerName" className="text-gray-700">Partner Name</Label>
              <Input id="partnerName" defaultValue="Rohit Sharma" className="mt-1"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="partnerId" className="text-gray-700">Partner ID</Label>
              <Input id="partnerId" defaultValue="REF2024001" disabled className="mt-1 bg-gray-100 cursor-not-allowed"/>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input id="email" type="email" defaultValue="rohit.sharma@partner.com" className="mt-1"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" className="mt-1"/>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-700">Company/Organization</Label>
            <Input id="company" defaultValue="Educational Solutions Pvt Ltd" className="mt-1"/>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-700">About/Bio</Label>
            <Textarea 
              id="bio" 
              rows={3}
              defaultValue="Experienced educational consultant with 8+ years in the industry. Specialized in helping educational institutions adopt digital solutions."
              className="mt-1"
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Referral Links Management */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Link className="h-5 w-5 mr-2 text-blue-600" />
            Referral Links
          </CardTitle>
          <CardDescription>Manage and track your referral links</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {referralLinks.map((link, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{link.type}</h4>
                    <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={link.active ? "default" : "secondary"} className={`${link.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} text-xs`}>
                      {link.active ? "Active" : "Inactive"}
                    </Badge>
                    <Switch checked={link.active} id={`link-active-${index}`} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">Clicks:</span>
                    <span className="font-medium ml-2 text-gray-900">{link.clicks}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Conversions:</span>
                    <span className="font-medium ml-2 text-green-600">{link.conversions}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium ml-2 text-blue-600">{((link.conversions / link.clicks) * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Regenerate
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100">
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-5 border-gray-300 hover:bg-gray-100">
            Create New Referral Link
          </Button>
        </CardContent>
      </Card>

      {/* Target Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Goals & Targets
          </CardTitle>
          <CardDescription>Set your referral performance targets</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {targetSettings.map((target, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{target.title}</h4>
                    <p className="text-sm text-gray-600">{target.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-700">{target.current}</div>
                  </div>
                </div>
                <Label htmlFor={`target-input-${index}`} className="sr-only">Set new target for {target.title}</Label>
                <Input id={`target-input-${index}`} placeholder="Enter new target" className="mt-2"/>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 mt-5">
            <div>
              <h4 className="font-medium text-gray-900">Achievement Notifications</h4>
              <p className="text-sm text-gray-600">Get notified when you reach your targets</p>
            </div>
            <Switch defaultChecked id="achievement-notifications" />
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Targets
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Commission Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            Commission Settings
          </CardTitle>
          <CardDescription>Your commission structure and payment preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-gray-900 mb-2">Current Commission Rate</h4>
              <div className="text-4xl font-bold text-green-700">5%</div>
              <p className="text-sm text-gray-600 mt-1">On monthly recurring revenue</p>
            </div>
            
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2">Bonus Tier</h4>
              <div className="text-4xl font-bold text-blue-700">Gold</div>
              <p className="text-sm text-gray-600 mt-1">25+ successful referrals</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-5">
            <h4 className="font-medium text-gray-900">Payment Preferences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                <Label htmlFor="payoutFreq" className="text-gray-700">Payout Frequency</Label>
                <select id="payoutFreq" className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring focus:ring-blue-200 focus:border-blue-500">
                    <option>Monthly</option>
                    <option>Bi-weekly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div className="space-y-2">
                <Label htmlFor="minPayout" className="text-gray-700">Minimum Payout Amount</Label>
                <Input id="minPayout" defaultValue="₹1,000" className="mt-1"/>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Commission Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            API Settings
          </CardTitle>
          <CardDescription>Manage your API key for integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-gray-700">API Key</Label>
              <div className="flex items-center space-x-2">
                <Input 
                id="apiKey" 
                  type={showApiKey ? "text" : "password"}
                defaultValue="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  readOnly
                className="flex-1 bg-gray-100 cursor-not-allowed font-mono"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                className="border-gray-300 hover:bg-gray-100"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                  <Copy className="h-4 w-4" />
                </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-4">
            Use this API key to integrate with other services. Keep it secure and do not share it publicly.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSettings;
