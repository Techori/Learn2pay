import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  Link,
  IndianRupee,
  Users,
  CheckCircle,
  Plus,
  Eye,
  Copy,
  Send,
} from "lucide-react";
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import { useToast } from "@/hooks/use-toast";

interface PaymentLink {
  linkName: string;
  linkUrl: string;
  amount: string;
  clicks: number;
  payments: number;
  conversion: string;
  status: string;
  expires: string;
}

const PaymentLinksManagement = () => {
  const [showCreateLinkDialog, setShowCreateLinkDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [newLinkDetails, setNewLinkDetails] = useState({
    linkName: "",
    amount: "",
    expires: "",
  });
  const [generatedPaymentLink, setGeneratedPaymentLink] = useState<
    string | null
  >(null);

  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([
    {
      linkName: "Class 10 - Quarterly Fees",
      linkUrl: "https://pay.institute.com/class10-q1",
      amount: "₹15,000",
      clicks: 42,
      payments: 38,
      conversion: "90.5% conversion",
      status: "Active",
      expires: "2024-02-15",
    },
    {
      linkName: "Exam Fees - All Classes",
      linkUrl: "https://pay.institute.com/exam-fees",
      amount: "₹2,000",
      clicks: 115,
      payments: 110,
      conversion: "95.7% conversion",
      status: "Active",
      expires: "2024-01-25",
    },
    {
      linkName: "Transport Fees - Annual",
      linkUrl: "https://pay.institute.com/transport-annu",
      amount: "₹8,000",
      clicks: 75,
      payments: 65,
      conversion: "86.7% conversion",
      status: "Expired",
      expires: "2024-01-01",
    },
  ]);

  const [isViewLinkDialogOpen, setIsViewLinkDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null);
  const { toast } = useToast();

  const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewLinkDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateLinkSubmit = () => {
    const mockBaseUrl = "https://pay.institute.com/";
    const generatedPath = `${newLinkDetails.linkName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-6)}`;
    const fullLink = `${mockBaseUrl}${generatedPath}`;

    const newPaymentLink: PaymentLink = {
      linkName: newLinkDetails.linkName,
      linkUrl: fullLink,
      amount: `₹${parseFloat(newLinkDetails.amount).toLocaleString()}`,
      clicks: 0,
      payments: 0,
      conversion: "0% conversion",
      status: "Active",
      expires: newLinkDetails.expires,
    };

    setPaymentLinks((prevLinks) => [...prevLinks, newPaymentLink]);
    setGeneratedPaymentLink(fullLink);
    setShowCreateLinkDialog(false);
    setNewLinkDetails({ linkName: "", amount: "", expires: "" }); // Clear form
    toast({
      title: "Link Created",
      description: "Your payment link has been successfully created.",
    });
  };

  const handleCopyGeneratedLink = () => {
    if (generatedPaymentLink) {
      navigator.clipboard
        .writeText(generatedPaymentLink)
        .then(() =>
          toast({
            title: "Copied!",
            description: "Generated link copied to clipboard.",
          })
        )
        .catch((err) =>
          toast({
            title: "Copy Failed",
            description: "Failed to copy link to clipboard.",
            variant: "destructive",
          })
        );
    }
  };

  const handleCopyLink = (linkUrl: string) => {
    navigator.clipboard
      .writeText(linkUrl)
      .then(() =>
        toast({
          title: "Copied!",
          description: "Payment link copied to clipboard.",
        })
      )
      .catch((err) =>
        toast({
          title: "Copy Failed",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        })
      );
  };

  const handleShareLink = (linkName: string, linkUrl: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: `Payment Link for ${linkName}`,
          url: linkUrl,
        })
        .then(() =>
          toast({
            title: "Shared!",
            description: "Payment link shared successfully.",
          })
        )
        .catch((error) => {
          if (error.name !== "AbortError") {
            toast({
              title: "Share Failed",
              description: `Failed to share link: ${error.message}`,
              variant: "destructive",
            });
          }
        });
    } else {
      toast({
        title: "Share Not Supported",
        description: "Web Share API is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  const handleViewLink = (link: PaymentLink) => {
    setSelectedLink(link);
    setIsViewLinkDialogOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
    // Implement actual search logic here
  };

  const handleFilter = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    console.log("Filters:", newFilters);
    // Implement actual filter logic here
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({});
    console.log("Filters cleared");
    // Implement actual clear logic here
  };

  const paymentLinkSummary = [
    {
      icon: Link,
      title: "Active Links",
      value: paymentLinks
        .filter((link) => link.status === "Active")
        .length.toString(),
      color: "text-blue-400",
    },
    {
      icon: IndianRupee,
      title: "Total Collections",
      value: `₹${paymentLinks
        .reduce(
          (sum, link) =>
            sum + parseFloat(link.amount.replace("₹", "").replace("L", "")),
          0
        )
        .toLocaleString()}`,
      color: "text-green-400",
    },
    {
      icon: Users,
      title: "Students Reached",
      value: paymentLinks
        .reduce((sum, link) => sum + link.payments, 0)
        .toLocaleString(),
      color: "text-purple-400",
    },
    {
      icon: CheckCircle,
      title: "Success Rate",
      value: `${(
        (paymentLinks.reduce((sum, link) => sum + link.payments, 0) /
          (paymentLinks.reduce((sum, link) => sum + link.clicks, 0) || 1)) *
        100
      ).toFixed(1)}%`,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Link Summary Cards */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Payment Links Management
          </h2>
          <p className="text-gray-400">
            Create and manage payment links for students
          </p>
        </div>
        <Dialog
          open={showCreateLinkDialog}
          onOpenChange={setShowCreateLinkDialog}
        >
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Create Payment Link</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Payment Link
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter the details for the new payment link.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="linkName"
                placeholder="Link Name (e.g., Class 10 Fees)"
                value={newLinkDetails.linkName}
                onChange={handleLinkInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                id="amount"
                placeholder="Amount (e.g., ₹15000)"
                type="number"
                value={newLinkDetails.amount}
                onChange={handleLinkInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Input
                id="expires"
                type="date"
                value={newLinkDetails.expires}
                onChange={handleLinkInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateLinkDialog(false)}
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateLinkSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Create Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {generatedPaymentLink && (
        <Dialog
          open={!!generatedPaymentLink}
          onOpenChange={() => setGeneratedPaymentLink(null)}
        >
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">
                Payment Link Generated!
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Your payment link has been successfully created.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-white break-all mb-2">
                {generatedPaymentLink}
              </p>
              <Button
                onClick={handleCopyGeneratedLink}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Copy className="h-4 w-4 mr-2" /> Copy Link
              </Button>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setGeneratedPaymentLink(null)}
                className="border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {paymentLinkSummary.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 border-gray-700 shadow-md"
          >
            <CardContent className="p-5 flex items-center space-x-4">
              <div
                className={`p-3 rounded-lg ${item.color.replace(
                  "text",
                  "bg"
                )}/20`}
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Links Table */}
      <Card className="bg-gray-800/50 border-gray-700 shadow-md">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg text-white">Payment Links</CardTitle>
            <p className="text-gray-400 text-sm">
              Manage all your payment links and track their performance
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <SearchAndFilter
              searchPlaceholder="Search payment links..."
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClear={handleClearFilters}
              filterOptions={[
                {
                  key: "status",
                  label: "Status",
                  type: "select",
                  options: [
                    { value: "Active", label: "Active" },
                    { value: "Expired", label: "Expired" },
                  ],
                },
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Link Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Expiry Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Performance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {paymentLinks
                  .filter(
                    (link) =>
                      link.linkName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      link.linkUrl
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .filter((link) => {
                    if (filters.status && link.status !== filters.status) {
                      return false;
                    }
                    return true;
                  })
                  .map((link, index) => (
                    <tr key={index} className="hover:bg-gray-800/70">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {link.linkName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {link.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {link.expires}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            link.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {link.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <div>Clicks: {link.clicks}</div>
                        <div>Payments: {link.payments}</div>
                        <div>{link.conversion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleViewLink(link)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() => handleCopyLink(link.linkUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-orange-500"
                            onClick={() =>
                              handleShareLink(link.linkName, link.linkUrl)
                            }
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Payment Link Dialog */}
      {selectedLink && (
        <Dialog
          open={isViewLinkDialogOpen}
          onOpenChange={setIsViewLinkDialogOpen}
        >
          <DialogContent className="max-w-xl bg-gray-800 text-white p-6 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Payment Link Details
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Viewing details for {selectedLink.linkName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-sm text-gray-400">Link Name:</p>
                <p className="text-white font-medium">
                  {selectedLink.linkName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Link URL:</p>
                <p className="text-white font-medium break-all">
                  {selectedLink.linkUrl}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Amount:</p>
                <p className="text-white font-medium">{selectedLink.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Expiry Date:</p>
                <p className="text-white font-medium">{selectedLink.expires}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status:</p>
                <Badge
                  className={
                    selectedLink.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }
                >
                  {selectedLink.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-400">Clicks:</p>
                <p className="text-white font-medium">{selectedLink.clicks}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Payments:</p>
                <p className="text-white font-medium">
                  {selectedLink.payments}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Conversion:</p>
                <p className="text-white font-medium">
                  {selectedLink.conversion}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewLinkDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentLinksManagement;
