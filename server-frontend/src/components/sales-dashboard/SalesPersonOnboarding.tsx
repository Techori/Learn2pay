import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../hooks/use-toast";

const SalesPersonOnboarding = () => {
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    instituteName: "",
    instituteAddress: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    contactPersonName: "",
    contactPersonNumber: "",
    email: "",
    instituteType: "School",
    leadSource: "",
  });

  // File upload state
  const [files, setFiles] = useState({
    panCard: null as File | null,
    gstCertificate: null as File | null,
    affiliationProof: null as File | null,
    otherDocuments: [] as File[],
  });

  // Mock previously onboarded institutes
  const [onboardedInstitutes] = useState([
    { id: 1, name: "Delhi International School", status: "Pending", submittedDate: "2025-06-22" },
    { id: 2, name: "Mumbai Coaching Center", status: "Approved", submittedDate: "2025-06-20" },
  ]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof files) => {
    const file = e.target.files?.[0] || null;
    if (field === "otherDocuments") {
      setFiles((prev) => ({ ...prev, [field]: file ? [...prev.otherDocuments, file] : prev.otherDocuments }));
    } else {
      setFiles((prev) => ({ ...prev, [field]: file }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      formData.instituteName,
      formData.instituteAddress,
      formData.city,
      formData.state,
      formData.pincode,
      formData.contactPersonName,
      formData.contactPersonNumber,
      files.affiliationProof,
    ];
    if (requiredFields.some((field) => !field)) {
      toast({
        title: "Error",
        description: "Please fill all mandatory fields and upload Affiliation Proof.",
        variant: "destructive",
      });
      return;
    }
    if (!/^\+91\d{10}$/.test(formData.contactPersonNumber)) {
      toast({
        title: "Error",
        description: "Contact number must be in +91XXXXXXXXXX format.",
        variant: "destructive",
      });
      return;
    }
    // Mock success
    toast({
      title: "Success",
      description: `Institute "${formData.instituteName}" onboarded successfully!`,
    });
    // Reset form
    setFormData({
      instituteName: "",
      instituteAddress: "",
      city: "",
      state: "Maharashtra",
      pincode: "",
      contactPersonName: "",
      contactPersonNumber: "",
      email: "",
      instituteType: "School",
      leadSource: "",
    });
    setFiles({ panCard: null, gstCertificate: null, affiliationProof: null, otherDocuments: [] });
  };

  // Handle view details
  const handleViewDetails = (id: number) => {
    alert(`Viewing details for institute ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-[#101624] p-4">
      <Card>
        <CardHeader>
          <CardTitle>🏫 Institute Onboarding Form</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Basic Institute Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Institute Name</label>
              <Input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleInputChange}
                placeholder="Enter institute name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Institute Type</label>
              <select
                name="instituteType"
                value={formData.instituteType}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
              >
                <option value="School">School</option>
                <option value="Coaching">Coaching</option>
                <option value="College">College</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Contact Person Name</label>
              <Input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Contact Number</label>
              <Input
                type="text"
                name="contactPersonNumber"
                value={formData.contactPersonNumber}
                onChange={handleInputChange}
                placeholder="e.g., +919876543210"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email (Optional)</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Lead Source</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
              >
                <option value="">Select Lead Source</option>
                <option value="MyLeads">MyLeads</option>
                <option value="Referral">Referral</option>
                <option value="Campaign">Campaign</option>
              </select>
            </div>
          </div>

          {/* Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300">Institute Address</label>
              <textarea
                name="instituteAddress"
                value={formData.instituteAddress}
                onChange={handleInputChange}
                placeholder="Enter institute address"
                className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-white placeholder-gray-400 h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">City</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Pincode</label>
              <Input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter pincode"
                className="mt-1"
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="mb-6">
            <h3 className="text-white text-lg mb-4">🔹 Document Uploads</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">PAN Card</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "panCard")}
                  className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">GST Certificate (Optional)</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "gstCertificate")}
                  className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">School ID / Affiliation Proof</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "affiliationProof")}
                  className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Other Documents (Optional)</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "otherDocuments")}
                  className="w-full p-2 mt-1 rounded bg-[#232b45] border border-[#232b45] text-gray-300"
                  multiple
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
              Submit Onboarding
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optional: Previously Onboarded Institutes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>📄 Previously Onboarded Institutes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-[#232b45] text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Submitted Date</th>
                  <th className="p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {onboardedInstitutes.map((institute) => (
                  <tr key={institute.id} className="border-t border-[#232b45]">
                    <td className="p-2">{institute.name}</td>
                    <td className="p-2">{institute.status}</td>
                    <td className="p-2">{institute.submittedDate}</td>
                    <td className="p-2">
                      <Button onClick={() => handleViewDetails(institute.id)} variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                        🔍
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPersonOnboarding;