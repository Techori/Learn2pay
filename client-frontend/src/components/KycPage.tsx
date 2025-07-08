import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/utils/api";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const KycPage = () => {
  const { toast } = useToast();
  const [kycStatus, setKycStatus] = useState<string>("not_started");
  const [documents, setDocuments] = useState({
    registrationCertificate: { uploaded: false },
    panCard: { uploaded: false },
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const fetchKycStatus = async () => {
    try {
      const response = await authAPI.getKycStatus();
      if (response.kycStatus) {
        setKycStatus(response.kycStatus);
        setDocuments(response.documents);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
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

    setLoading(true);
    try {
      await authAPI.uploadDocument(documentType, file);
      toast({
        title: "Success",
        description: `${documentType.replace(/([A-Z])/g, ' $1').trim()} uploaded successfully`,
      });
      await fetchKycStatus();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartVerification = async () => {
    setLoading(true);
    try {
      const response = await authAPI.startKycVerification();
      if (response.message.includes("successfully")) {
        toast({
          title: "Success",
          description: "KYC verification completed successfully",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "KYC verification failed",
          variant: "destructive",
        });
      }
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
    switch (kycStatus) {
      case 'verified':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white p-6"
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            KYC Verification
            {renderStatusIcon()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">
                KYC Status: {kycStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              {kycStatus === 'rejected' && (
                <p className="text-red-500 mt-1">Please re-upload documents and try again.</p>
              )}
              {kycStatus === 'pending' && (
                <p className="text-yellow-500 mt-1">Your KYC is being processed. Please wait for verification.</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Registration Certificate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'registrationCertificate')}
                    disabled={documents.registrationCertificate.uploaded || loading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 disabled:opacity-50"
                  />
                  {documents.registrationCertificate.uploaded && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">PAN Card</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'panCard')}
                    disabled={documents.panCard.uploaded || loading}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 disabled:opacity-50"
                  />
                  {documents.panCard.uploaded && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleStartVerification}
              disabled={
                kycStatus === 'verified' ||
                kycStatus === 'pending' ||
                !documents.registrationCertificate.uploaded ||
                !documents.panCard.uploaded ||
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KycPage;