
import React, { useState } from "react";
import { Upload, CheckCircle, X } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/Switch";

interface SelectedDocument {
  name: string;
  type: string;
  data: string; // base64 data
  file: File;
}

interface RegistrationDocumentUploadProps {
  onDocumentsChange: (documents: {
    registrationCertificate?: SelectedDocument;
    panCard?: SelectedDocument;
  } | null) => void;
  onOptOutChange: (optOut: boolean) => void;
}

const RegistrationDocumentUpload: React.FC<RegistrationDocumentUploadProps> = ({ 
  onDocumentsChange, 
  onOptOutChange 
}) => {
  const { toast } = useToast();
  const [selectedDocs, setSelectedDocs] = useState<{
    registrationCertificate?: SelectedDocument;
    panCard?: SelectedDocument;
  }>({});
  const [optOutKyc, setOptOutKyc] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, documentType: 'registrationCertificate' | 'panCard') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'application/pdf', 'image/png'].includes(file.type)) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF, JPG, JPEG, or PNG file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const base64Data = base64.split(',')[1]; // Remove data:type;base64, prefix
      
      const newDocument = {
        name: file.name,
        type: file.type,
        data: base64Data,
        file: file
      };

      const updatedDocs = {
        ...selectedDocs,
        [documentType]: newDocument
      };

      setSelectedDocs(updatedDocs);
      onDocumentsChange(updatedDocs);

      toast({
        title: "Success",
        description: `${documentType.replace(/([A-Z])/g, ' $1').trim()} uploaded successfully`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDocument = (documentType: 'registrationCertificate' | 'panCard') => {
    const updatedDocs = { ...selectedDocs };
    delete updatedDocs[documentType];
    setSelectedDocs(updatedDocs);
    onDocumentsChange(Object.keys(updatedDocs).length > 0 ? updatedDocs : null);
  };

  const handleOptOutToggle = (checked: boolean) => {
    setOptOutKyc(checked);
    onOptOutChange(checked);
    if (checked) {
      // Clear documents when opting out
      setSelectedDocs({});
      onDocumentsChange(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-orange-400">
          KYC Documents
        </h3>
        <div className="flex items-center space-x-2">
          <Label htmlFor="opt-out-kyc" className="text-sm">Complete KYC later</Label>
          <Switch
            id="opt-out-kyc"
            checked={optOutKyc}
            onCheckedChange={handleOptOutToggle}
          />
        </div>
      </div>

      {optOutKyc ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            You've chosen to complete KYC verification later. You can upload your documents after registration from your dashboard.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload required documents for verification (PDF/JPG/PNG format, max 5MB each)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Registration Certificate */}
            <div className="space-y-2">
              <Label>Institute Registration Certificate</Label>
              {selectedDocs.registrationCertificate ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {selectedDocs.registrationCertificate.name}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDocument('registrationCertificate')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("registration-cert-upload")?.click()}
                >
                  <input
                    id="registration-cert-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'registrationCertificate')}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
            </div>

            {/* PAN Card */}
            <div className="space-y-2">
              <Label>PAN Card</Label>
              {selectedDocs.panCard ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {selectedDocs.panCard.name}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDocument('panCard')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-orange-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("pan-card-upload")?.click()}
                >
                  <input
                    id="pan-card-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, 'panCard')}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
            </div>
          </div>

          {selectedDocs.registrationCertificate && selectedDocs.panCard && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 text-sm">
                ✓ All required documents uploaded. KYC verification will be started automatically after registration.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegistrationDocumentUpload;
