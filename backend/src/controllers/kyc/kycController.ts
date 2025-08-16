import { Request, Response } from "express";
import Institute from "@/models/institute/instituteModel";
import KycRequest from "@/models/kycRequestsModel";
import { config } from "dotenv";
config();

const startKycVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { documents } = req.body;
    
    if (!documents || !documents.registrationCertificate || !documents.panCard) {
      res.status(400).json({ message: "Please provide all required documents" });
      return;
    }

    const institute = await Institute.findById(req.institute?._id);
    if (!institute) {
      res.status(404).json({ message: "Institute not found" });
      return;
    }

    // Check if KYC status allows verification start
    if (institute.kycStatus !== 'Not Started' && institute.kycStatus !== 'Rejected') {
      res.status(400).json({ 
        message: "KYC verification can only be started when status is 'not started' or 'rejected'" 
      });
      return;
    }

    // Process documents from frontend (base64 or file data)
    const processedDocs = {
      registrationCertificate: {
        filename: documents.registrationCertificate.name,
        contentType: documents.registrationCertificate.type,
        data: Buffer.from(documents.registrationCertificate.data, 'base64')
      },
      panCard: {
        filename: documents.panCard.name,
        contentType: documents.panCard.type,
        data: Buffer.from(documents.panCard.data, 'base64')
      }
    };

    // Create or update KYC request with documents
    let kycRequest = await KycRequest.findOne({ institute: institute._id });
    if (!kycRequest) {
      kycRequest = new KycRequest({
        institute: institute._id,
        submittedBy: req.institute?._id,
        documents: processedDocs,
        status: 'Under Review'
      });
    } else {
      kycRequest.documents = processedDocs;
      kycRequest.status = 'Under Review';
    }

    await kycRequest.save();

    // Update institute KYC status and document flags
    institute.kycStatus = 'Under Review';
    if (!institute.documents) {
      institute.documents = {
        registerationCertificate: false,
        panCard: false
      };
    }
    institute.documents.registerationCertificate = true;
    institute.documents.panCard = true;
    await institute.save();

    // Mock KYC verification logic
    setTimeout(async () => {
      try {
        const updatedKycRequest = await KycRequest.findById(kycRequest!._id);
        const updatedInstitute = await Institute.findById(institute._id);
        
        if (updatedKycRequest && updatedInstitute) {
          // Mock verification result (90% success rate)
          const isVerified = Math.random() > 0.1;
          
          if (isVerified) {
            updatedKycRequest.status = 'Verified';
            updatedInstitute.kycStatus = 'Verified';
            console.log(`KYC verified for institute: ${updatedInstitute.instituteName}`);
          } else {
            updatedKycRequest.status = 'Rejected';
            updatedInstitute.kycStatus = 'Rejected';
            console.log(`KYC rejected for institute: ${updatedInstitute.instituteName}`);
          }
          
          await updatedKycRequest.save();
          await updatedInstitute.save();
        }
      } catch (error) {
        console.error("Mock verification error:", error);
      }
    }, 5000); // Mock 5 second verification delay

    res.status(200).json({ message: "KYC verification started successfully" });
  } catch (error) {
    console.error("KYC verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getKycStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const institute = await Institute.findById(req.institute?._id).select('kycStatus documents');
    const kycRequest = await KycRequest.findOne({ institute: req.institute?._id });

    if (!institute) {
      res.status(404).json({ message: "Institute not found" });
      return;
    }

    res.status(200).json({
      kycStatus: institute.kycStatus,
      documents: institute.documents || { registerationCertificate: false, panCard: false },
      kycRequest: kycRequest ? {
        _id: kycRequest._id,
        status: kycRequest.status,
        documents: {
          registrationCertificate: !!kycRequest.documents?.registrationCertificate?.data,
          panCard: !!kycRequest.documents?.panCard?.data
        }
      } : null,
      uploadedFiles: kycRequest?.documents ? Object.keys(kycRequest.documents).filter(key => {
        const docKey = key as 'registrationCertificate' | 'panCard';
        return kycRequest.documents && kycRequest.documents[docKey]?.data;
      }) : []
    });
  } catch (error) {
    console.error("Get KYC status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentType } = req.params;
    console.log("Getting document for type:", documentType, "Institute ID:", req.institute?._id);
    
    const kycRequest = await KycRequest.findOne({ institute: req.institute?._id });

    // Validate document type
    if (documentType !== 'registrationCertificate' && documentType !== 'panCard') {
      res.status(400).json({ message: "Invalid document type" });
      return;
    }

    const docKey = documentType as 'registrationCertificate' | 'panCard';
    
    if (!kycRequest || !kycRequest.documents || !kycRequest.documents[docKey]) {
      console.log("Document not found:", { kycRequest: !!kycRequest, documents: !!kycRequest?.documents, docKey });
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const document = kycRequest.documents[docKey];
    if (!document || !document.data) {
      console.log("Document data not found for:", docKey);
      res.status(404).json({ message: "Document data not found" });
      return;
    }

    console.log("Serving document:", {
      filename: document.filename,
      contentType: document.contentType,
      dataSize: document.data.length
    });

    // Set proper headers for document serving
    res.setHeader('Content-Type', document.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${document.filename || 'document'}"`);
    
    res.send(document.data);
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDocumentInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { documentType } = req.params;
    console.log("Getting document info for type:", documentType, "Institute ID:", req.institute?._id);
    
    const kycRequest = await KycRequest.findOne({ institute: req.institute?._id });

    // Validate document type
    if (documentType !== 'registrationCertificate' && documentType !== 'panCard') {
      res.status(400).json({ message: "Invalid document type" });
      return;
    }

    const docKey = documentType as 'registrationCertificate' | 'panCard';
    
    if (!kycRequest || !kycRequest.documents || !kycRequest.documents[docKey]) {
      console.log("Document not found:", { kycRequest: !!kycRequest, documents: !!kycRequest?.documents, docKey });
      res.status(404).json({ message: "Document not found" });
      return;
    }

    const document = kycRequest.documents[docKey];
    if (!document) {
      console.log("Document data not found for:", docKey);
      res.status(404).json({ message: "Document data not found" });
      return;
    }

    console.log("Serving document info:", {
      filename: document.filename,
      contentType: document.contentType,
    });

    // Return document metadata
    res.json({
      filename: document.filename,
      contentType: document.contentType,
      size: document.data ? document.data.length : 0
    });
  } catch (error) {
    console.error("Error retrieving document info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { startKycVerification, getKycStatus, getDocument, getDocumentInfo };
