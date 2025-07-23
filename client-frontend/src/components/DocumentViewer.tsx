
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Eye, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentViewerProps {
  fileName: string;
  documentType: string;
}

interface DocumentInfo {
  filename: string;
  contentType: string;
  fileExtension: string;
}

const DocumentViewer = ({ fileName, documentType }: DocumentViewerProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo | null>(null);
  const [fetchingInfo, setFetchingInfo] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL || "https://learn2pay.onrender.com";
  const documentUrl = `${API_BASE_URL}/api/institute/kyc/document/${documentType}`;
  const downloadUrl = `${API_BASE_URL}/api/institute/kyc/document/${fileName}`;

  // Fetch document info when dialog opens
  useEffect(() => {
    if (isOpen && !documentInfo && !fetchingInfo) {
      fetchDocumentInfo();
    }
  }, [isOpen]);

  const fetchDocumentInfo = async () => {
    setFetchingInfo(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/institute/kyc/document/${documentType}/info`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const info = await response.json();
        const fileExtension = info.filename ? info.filename.split('.').pop()?.toLowerCase() || '' : '';
        setDocumentInfo({
          filename: info.filename,
          contentType: info.contentType,
          fileExtension: fileExtension
        });
      } else {
        console.error("Failed to fetch document info");
      }
    } catch (error) {
      console.error("Error fetching document info:", error);
    } finally {
      setFetchingInfo(false);
    }
  };

  const getFileTypeFromDocumentInfo = () => {
    if (!documentInfo) return { isPDF: false, isImage: false };
    
    const { fileExtension, contentType } = documentInfo;
    const isPDF = fileExtension === 'pdf' || contentType === 'application/pdf';
    const isImage = ['jpg', 'jpeg', 'png'].includes(fileExtension) || 
                   contentType?.startsWith('image/');
    
    return { isPDF, isImage };
  };

  const { isPDF, isImage } = getFileTypeFromDocumentInfo();



  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(downloadUrl, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to download document');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =  fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDocumentType = (type: string) => {
    if (type.includes('registrationCertificate')) return 'Registration Certificate';
    if (type.includes('panCard')) return 'PAN Card';
    return type;
  };

  const handleImageError = () => {
    console.error("Image failed to load:", documentUrl);
    setImageError(true);
  };

  const handlePdfError = () => {
    console.error("PDF failed to load:", documentUrl);
    setPdfError(true);
  };

  const renderDocumentPreview = () => {
    // Show loading state while fetching document info
    if (fetchingInfo) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Loading document information...</p>
        </div>
      );
    }

    // If no document info available
    if (!documentInfo) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Unable to load document information</p>
          <p className="text-sm mt-2">Use the download button to view the document</p>
        </div>
      );
    }

    // If both PDF and image failed, show fallback
    if ((isPDF && pdfError) || (isImage && imageError)) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Preview not available</p>
          <p className="text-sm mt-2">Use the download button to view the document</p>
          <p className="text-xs mt-1 text-gray-400">File: {documentInfo.filename}</p>
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="w-full">
          <iframe
            src={documentUrl}
            className="w-full h-[600px] border rounded-lg"
            title={`${formatDocumentType(documentType)} PDF`}
            onError={handlePdfError}
          />
          {pdfError && (
            <div className="text-center py-4 text-red-500">
              <p>PDF failed to load. Please try downloading the document.</p>
            </div>
          )}
        </div>
      );
    }
    
    if (isImage) {
      return (
        <div className="flex justify-center">
          <img
            src={documentUrl}
            alt={formatDocumentType(documentType)}
            className="max-w-full max-h-[600px] object-contain border rounded-lg"
            onError={handleImageError}
            onLoad={() => {
              console.log("Image loaded successfully:", documentUrl);
              setImageError(false);
            }}
          />
          {imageError && (
            <div className="text-center py-8 text-red-500">
              <p>Image failed to load. Please try downloading the document.</p>
              <p className="text-xs mt-1">URL: {documentUrl}</p>
            </div>
          )}
        </div>
      );
    }

    // Fallback for unsupported file types
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Preview not available for this file type ({documentInfo.fileExtension})</p>
        <p className="text-sm mt-2">Use the download button to view the document</p>
        <p className="text-xs mt-1 text-gray-400">File: {documentInfo.filename}</p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{formatDocumentType(documentType)}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isLoading ? "Downloading..." : "Download"}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {renderDocumentPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
