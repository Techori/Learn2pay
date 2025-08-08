import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../hooks/use-toast";
import { useTheme } from "../../context/ThemeContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/Dialog";

const SalesPersonOnboarding = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  
  // Theme variables
  const bgColor = theme === "dark" ? "bg-[#101624]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-[#181f32]" : "bg-white";
  const inputBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const inputBorder = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const inputText = theme === "dark" ? "text-white" : "text-gray-900";
  const placeholderText = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";
  const tableHeaderBg = theme === "dark" ? "bg-[#232b45]" : "bg-gray-100";
  const tableBorderColor = theme === "dark" ? "border-[#232b45]" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverBg = theme === "dark" ? "hover:bg-[#232b45]" : "hover:bg-gray-50";

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
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Loading state for institutes
  const [isLoadingInstitutes, setIsLoadingInstitutes] = useState(false);

  // Define file upload state
  const [files, setFiles] = useState({
    panCard: null as File | null,
    gstCertificate: null as File | null,
    affiliationProof: null as File | null,
    otherDocuments: [] as File[],
  });

  // Define onboarded institutes state
  const [onboardedInstitutes, setOnboardedInstitutes] = useState<{
    id: string;
    name: string;
    status: string;
    submittedDate: string;
  }[]>([]);
  
  // Define pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Institute details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch onboarded institutes with pagination
  const fetchOnboardedInstitutes = async (page = 1) => {
    try {
      setIsLoadingInstitutes(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales/institute/list?page=${page}`);
      if (!res.ok) {
        throw new Error('Failed to fetch institutes');
      }
      const data = await res.json();
      
      // Transform data to match our state format
      const institutes = data.institutes.map((institute: any) => ({
        id: institute._id,
        name: institute.instituteName,
        status: institute.kycStatus,
        submittedDate: new Date(institute.createdAt).toISOString().split('T')[0]
      }));
      
      setOnboardedInstitutes(institutes);
      
      // Update pagination state
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching institutes:', error);
      toast({
        title: "Error",
        description: "Failed to load onboarded institutes.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInstitutes(false);
    }
  };

  // Load institutes on component mount
  useEffect(() => {
    fetchOnboardedInstitutes(1);
  }, []);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchOnboardedInstitutes(newPage);
  };

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set loading state to true
    setIsSubmitting(true);
    
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
      setIsSubmitting(false);
      return;
    }
    if (!/^\+91\d{10}$/.test(formData.contactPersonNumber)) {
      toast({
        title: "Error",
        description: "Contact number must be in +91XXXXXXXXXX format.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare FormData for file upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (files.panCard) data.append("panCard", files.panCard);
    if (files.gstCertificate) data.append("gstCertificate", files.gstCertificate);
    if (files.affiliationProof) data.append("affiliationProof", files.affiliationProof);
    files.otherDocuments.forEach((file: File, idx: number) => {
      data.append(`otherDocuments`, file);
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales/institute/onboard`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.message || "Failed to onboard institute.",
          variant: "destructive",
        });
        return;
      }
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
      
      // Refresh the institutes list (go back to page 1)
      fetchOnboardedInstitutes(1);
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Set loading state back to false regardless of success or failure
      setIsSubmitting(false);
    }
  };

  // Handle view details
  const handleViewDetails = async (id: string) => {
    try {
      setIsLoadingDetails(true);
      setShowDetailsModal(true);
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sales/institute/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch institute details');
      }
      
      const data = await res.json();
      setSelectedInstitute(data.institute);
    } catch (error) {
      console.error('Error fetching institute details:', error);
      toast({
        title: "Error",
        description: "Failed to load institute details.",
        variant: "destructive",
      });
      setShowDetailsModal(false);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div className={`min-h-screen ${bgColor} p-4`}>
      <Card className={cardBg}>
        <CardHeader>
          <CardTitle className={textColor}>🏫 Institute Onboarding Form</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Basic Institute Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Institute Name</label>
              <Input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleInputChange}
                placeholder="Enter institute name"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Institute Type</label>
              <select
                name="instituteType"
                value={formData.instituteType}
                onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
              >
                <option value="School">School</option>
                <option value="Coaching">Coaching</option>
                <option value="College">College</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Contact Person Name</label>
              <Input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Contact Number</label>
              <Input
                type="text"
                name="contactPersonNumber"
                value={formData.contactPersonNumber}
                onChange={handleInputChange}
                placeholder="e.g., +919876543210"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Email (Optional)</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Lead Source</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
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
              <label className={`block text-sm font-medium ${textMuted}`}>Institute Address</label>
              <textarea
                name="instituteAddress"
                value={formData.instituteAddress}
                onChange={handleInputChange}
                placeholder="Enter institute address"
                className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${inputText} ${placeholderText} h-24`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>City</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${textMuted}`}>Pincode</label>
              <Input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter pincode"
                className={`mt-1 ${inputBg} border ${inputBorder} ${inputText} ${placeholderText}`}
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="mb-6">
            <h3 className={`${textColor} text-lg mb-4`}>🔹 Document Uploads</h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textMuted}`}>PAN Card</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "panCard")}
                  className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textMuted}`}>GST Certificate (Optional)</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "gstCertificate")}
                  className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textMuted}`}>School ID / Affiliation Proof</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "affiliationProof")}
                  className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textMuted}`}>Other Documents (Optional)</label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleFileChange(e, "otherDocuments")}
                  className={`w-full p-2 mt-1 rounded ${inputBg} border ${inputBorder} ${textMuted}`}
                  multiple
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button 
              onClick={handleSubmit} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Onboarding"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optional: Previously Onboarded Institutes */}
      <Card className={`mt-6 ${cardBg}`}>
        <CardHeader>
          <CardTitle className={textColor}>📄 Previously Onboarded Institutes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className={`w-full ${textColor}`}>
              <thead>
                <tr className={`${tableHeaderBg} text-left`}>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Submitted Date</th>
                  <th className="p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingInstitutes ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading institutes...
                      </span>
                    </td>
                  </tr>
                ) : onboardedInstitutes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center">No institutes found. Onboard your first institute!</td>
                  </tr>
                ) : (
                  onboardedInstitutes.map((institute) => (
                    <tr key={institute.id} className={`border-t ${tableBorderColor} ${hoverBg}`}>
                      <td className="p-2">{institute.name}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          institute.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          institute.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          institute.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {institute.status.charAt(0).toUpperCase() + institute.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-2">{institute.submittedDate}</td>
                      <td className="p-2">
                        <Button onClick={() => handleViewDetails(institute.id)} variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                          🔍
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {!isLoadingInstitutes && onboardedInstitutes.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className={`text-sm ${textMuted}`}>
                Showing {onboardedInstitutes.length} of {pagination.totalItems} institutes
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  variant="outline"
                  className={`${cardBg} ${textMuted} ${!pagination.hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    // Logic to show pages around current page
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        variant={pagination.currentPage === pageNumber ? "default" : "outline"}
                        className={`w-8 h-8 p-0 ${
                          pagination.currentPage === pageNumber 
                            ? 'bg-orange-500 text-white' 
                            : `${cardBg} ${textMuted}`
                        }`}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  
                  {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                    <>
                      <span className={textMuted}>...</span>
                      <Button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        variant="outline"
                        className={`w-8 h-8 p-0 ${cardBg} ${textMuted}`}
                      >
                        {pagination.totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  variant="outline"
                  className={`${cardBg} ${textMuted} ${!pagination.hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Institute Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className={`${cardBg} ${textColor} max-w-3xl`}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Institute Details</DialogTitle>
            <DialogDescription className={textMuted}>
              Comprehensive information about the selected institute
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingDetails ? (
            <div className="flex justify-center items-center py-12">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : selectedInstitute ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className={`font-medium ${textMuted}`}>Basic Information</h3>
                  <div className={`${inputBg} p-3 rounded-md mt-1`}>
                    <p><span className="font-bold">Name:</span> {selectedInstitute.instituteName}</p>
                    <p><span className="font-bold">Type:</span> {selectedInstitute.instituteType}</p>
                    <p><span className="font-bold">KYC Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        selectedInstitute.kycStatus === 'approved' ? 'bg-green-100 text-green-800' : 
                        selectedInstitute.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        selectedInstitute.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedInstitute.kycStatus?.charAt(0).toUpperCase() + selectedInstitute.kycStatus?.slice(1)}
                      </span>
                    </p>
                    <p><span className="font-bold">Registered On:</span> {new Date(selectedInstitute.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-medium ${textMuted}`}>Contact Person</h3>
                  <div className={`${inputBg} p-3 rounded-md mt-1`}>
                    <p><span className="font-bold">Name:</span> {selectedInstitute.contactPerson?.firstName} {selectedInstitute.contactPerson?.lastName}</p>
                    <p><span className="font-bold">Phone:</span> {selectedInstitute.contactPhone}</p>
                    <p><span className="font-bold">Email:</span> {selectedInstitute.contactEmail || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className={`font-medium ${textMuted}`}>Address</h3>
                  <div className={`${inputBg} p-3 rounded-md mt-1`}>
                    <p><span className="font-bold">Complete Address:</span> {selectedInstitute.address?.completeAddress}</p>
                    <p><span className="font-bold">City:</span> {selectedInstitute.address?.city}</p>
                    <p><span className="font-bold">State:</span> {selectedInstitute.address?.state}</p>
                    <p><span className="font-bold">Pin Code:</span> {selectedInstitute.address?.pinCode}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className={`font-medium ${textMuted}`}>Document Status</h3>
                  <div className={`${inputBg} p-3 rounded-md mt-1`}>
                    <p>
                      <span className="font-bold">Registration Certificate:</span> 
                      <span className={`ml-2 ${selectedInstitute.documents?.registerationCertificate ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedInstitute.documents?.registerationCertificate ? '✓ Submitted' : '✗ Missing'}
                      </span>
                      {selectedInstitute.documentUrls?.affiliationProof && (
                        <a 
                          href={selectedInstitute.documentUrls.affiliationProof} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          View Document
                        </a>
                      )}
                    </p>
                    <p>
                      <span className="font-bold">PAN Card:</span> 
                      <span className={`ml-2 ${selectedInstitute.documents?.panCard ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedInstitute.documents?.panCard ? '✓ Submitted' : '✗ Missing'}
                      </span>
                      {selectedInstitute.documentUrls?.panCard && (
                        <a 
                          href={selectedInstitute.documentUrls.panCard} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          View Document
                        </a>
                      )}
                    </p>
                    {selectedInstitute.documentUrls?.gstCertificate && (
                      <p>
                        <span className="font-bold">GST Certificate:</span>
                        <a 
                          href={selectedInstitute.documentUrls.gstCertificate} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          View Document
                        </a>
                      </p>
                    )}
                    {selectedInstitute.documentUrls?.otherDocuments && selectedInstitute.documentUrls.otherDocuments.length > 0 && (
                      <div className="mt-2">
                        <span className="font-bold">Other Documents:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {selectedInstitute.documentUrls.otherDocuments.map((url: string, index: number) => (
                            <li key={index}>
                              <a 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                Document {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="col-span-1 md:col-span-2">
                <h3 className={`font-medium ${textMuted}`}>Additional Information</h3>
                <div className={`${inputBg} p-3 rounded-md mt-1`}>
                  <p><span className="font-bold">Premium Plan:</span> {selectedInstitute.premiumPlan ? 'Yes' : 'No'}</p>
                  <p><span className="font-bold">Approved:</span> {selectedInstitute.approved ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p>No institute details available</p>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => setShowDetailsModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesPersonOnboarding;