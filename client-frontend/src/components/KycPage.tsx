
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/utils/api";
import { Loader2, CheckCircle, XCircle, Clock, FileText, Upload } from "lucide-react";
import DocumentViewer from "./DocumentViewer";

interface KycData {
  kycStatus: string;
  documents: {
    registerationCertificate: boolean;
    panCard: boolean;
  };
  kycRequest: any;
  uploadedFiles: string[];
}

interface SelectedDocument {
  name: string;
  type: string;
  data: string; // base64 data
  file: File;
}

const KycPage = () => {
  const { toast } = useToast();
  const [kycData, setKycData] = useState<KycData>({
    kycStatus: "not started",
    documents: {
      registerationCertificate: false,
      panCard: false,
    },
    kycRequest: null,
    uploadedFiles: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDocs, setSelectedDocs] = useState<{
    registrationCertificate?: SelectedDocument;
    panCard?: SelectedDocument;
  }>({});

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const fetchKycStatus = async () => {
    try {
      const response = await authAPI.getKycStatus();
      if (response.kycStatus) {
        setKycData({
          kycStatus: response.kycStatus,
          documents: response.documents || { registerationCertificate: false, panCard: false },
          kycRequest: response.kycRequest,
          uploadedFiles: response.uploadedFiles || []
        });
      } else {
        throw new Error("Invalid KYC status response");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch KYC status",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, documentType: 'registrationCertificate' | 'panCard') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'application/pdf'].includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF, JPG, or JPEG file",
        variant: "destructive",
      });
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1]; // Remove data:type;base64, prefix
      
      setSelectedDocs(prev => ({
        ...prev,
        [documentType]: {
          name: file.name,
          type: file.type,
          data: base64Data,
          file: file
        }
      }));

      toast({
        title: "Success",
        description: `${documentType.replace(/([A-Z])/g, ' $1').trim()} selected successfully`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleStartVerification = async () => {
    if (!selectedDocs.registrationCertificate || !selectedDocs.panCard) {
      toast({
        title: "Error",
        description: "Please select both documents before starting verification",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.startKycVerification({
        registrationCertificate: selectedDocs.registrationCertificate,
        panCard: selectedDocs.panCard
      });
      
      toast({
        title: "Success",
        description: "KYC verification started successfully",
      });
      
      // Clear selected documents after successful submission
      setSelectedDocs({});
      await fetchKycStatus();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start KYC verification",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = () => {
    switch (kycData.kycStatus) {
      case 'verified':
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'pending':
      case 'under_review':
        return <Clock className="h-6 w-6 text-yellow-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (kycData.kycStatus) {
      case 'verified':
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
      case 'under_review':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDocumentName = (fileName: string) => {
    if (fileName.includes('registrationCertificate')) return 'Registration Certificate';
    if (fileName.includes('panCard')) return 'PAN Card';
    return fileName;
  };

  const getDocumentType = (fileName: string) => {
    if (fileName.includes('registrationCertificate')) return 'registrationCertificate';
    if (fileName.includes('panCard')) return 'panCard';
    return fileName;
  };

  const canUploadDocuments = kycData.kycStatus === 'not started' || kycData.kycStatus === 'rejected';
  const hasSelectedAllDocs = selectedDocs.registrationCertificate && selectedDocs.panCard;
  const hasUploadedDocs = kycData.documents.registerationCertificate && kycData.documents.panCard;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              KYC Verification Status
              {renderStatusIcon()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
                  Status: {kycData.kycStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h3>
                {kycData.kycStatus === 'rejected' && (
                  <p className="text-red-500 mt-1">Please re-select documents and try again.</p>
                )}
                {(kycData.kycStatus === 'pending' || kycData.kycStatus === 'under_review') && (
                  <p className="text-yellow-500 mt-1">Your KYC is being processed. Please wait for verification.</p>
                )}
                {(kycData.kycStatus === 'verified' || kycData.kycStatus === 'approved') && (
                  <p className="text-green-500 mt-1">Your KYC has been verified successfully!</p>
                )}
              </div>

              {kycData.kycRequest && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">KYC Request Details</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Request Status: {kycData.kycRequest.status}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Submitted: {new Date(kycData.kycRequest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Registration Certificate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileSelect(e, 'registrationCertificate')}
                    disabled={!canUploadDocuments || loading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 disabled:opacity-50"
                  />
                  {selectedDocs.registrationCertificate && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                {selectedDocs.registrationCertificate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {selectedDocs.registrationCertificate.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">PAN Card</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileSelect(e, 'panCard')}
                    disabled={!canUploadDocuments || loading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 disabled:opacity-50"
                  />
                  {selectedDocs.panCard && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                {selectedDocs.panCard && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {selectedDocs.panCard.name}
                  </p>
                )}
              </div>

              <Button
                onClick={handleStartVerification}
                disabled={
                  kycData.kycStatus === 'verified' ||
                  kycData.kycStatus === 'approved' ||
                  kycData.kycStatus === 'pending' ||
                  kycData.kycStatus === 'under_review' ||
                  !hasSelectedAllDocs ||
                  loading
                }
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Start KYC Verification'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {kycData.uploadedFiles.length > 0 ? (
                <div className="space-y-3">
                  {kycData.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{formatDocumentName(file)}</p>
                        <p className="text-xs text-gray-500">{file}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DocumentViewer 
                          fileName={file} 
                          documentType={getDocumentType(file)}
                        />
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded yet</p>
                  <p className="text-sm">Select your documents and start verification</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default KycPage;
