import { Request, Response } from "express";
import Institute from "@/models/institute/instituteModel";
// import { documentUploadSchema } from "@/validations/instituteValidation";
// import axios from "axios";
import { config } from "dotenv";
config();

// const uploadDocument = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const parsed = documentUploadSchema.safeParse(req.body);
//     if (!parsed.success) {
//       res.status(400).json({ error: parsed.error.flatten() });
//       return;
//     }

//     const { documentType } = parsed.data;
//     if (!req.file) {
//       res.status(400).json({ message: "No file uploaded" });
//       return;
//     }

//     const institute = await Institute.findById(req.institute?._id);
//     if (!institute) {
//       res.status(404).json({ message: "Institute not found" });
//       return;
//     }

//     // Store document in MongoDB as Buffer
//     institute.documents[documentType] = {
//       file: req.file.buffer,
//       contentType: req.file.mimetype,
//       uploaded: true,
//     };

//     await institute.save();
//     res.status(200).json({ message: `${documentType} uploaded successfully` });
//   } catch (error) {
//     console.error("Document upload error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const startKycVerification = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const institute = await Institute.findById(req.institute?._id);
//     if (!institute) {
//       res.status(404).json({ message: "Institute not found" });
//       return;
//     }

//     if (!institute.documents.registrationCertificate.uploaded || !institute.documents.panCard.uploaded) {
//       res.status(400).json({ message: "Please upload all required documents" });
//       return;
//     }

//     // Update KYC status to pending
//     institute.kycStatus = 'pending';
//     await institute.save();

//     // Prepare documents for Digio API
//     const documents = [
//       {
//         type: 'registrationCertificate',
//         file: institute.documents.registrationCertificate.file.toString('base64'),
//         contentType: institute.documents.registrationCertificate.contentType,
//       },
//       {
//         type: 'panCard',
//         file: institute.documents.panCard.file.toString('base64'),
//         contentType: institute.documents.panCard.contentType,
//       },
//     ];

//     // Digio API integration
//     try {
//       const digioResponse = await axios.post(
//         'https://api.digio.in/v1/kyc/verify',
//         {
//           instituteId: institute._id,
//           documents,
//           contactEmail: institute.contactEmail,
//           contactPerson: institute.contactPerson,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.DIGIO_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (digioResponse.data.status === 'success') {
//         institute.kycStatus = 'verified';
//         await institute.save();
//         res.status(200).json({ message: "KYC verification completed successfully" });
//       } else {
//         institute.kycStatus = 'rejected';
//         await institute.save();
//         res.status(400).json({ message: "KYC verification failed", details: digioResponse.data });
//       }
//     } catch (digioError) {
//       console.error("Digio API error:", digioError);
//       institute.kycStatus = 'rejected';
//       await institute.save();
//       res.status(500).json({ message: "KYC verification failed due to external service error" });
//     }
//   } catch (error) {
//     console.error("KYC verification error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getKycStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const institute = await Institute.findById(req.institute?._id).select('kycStatus documents');
    if (!institute) {
      res.status(404).json({ message: "Institute not found" });
      return;
    }

    res.status(200).json({
      kycStatus: institute.kycStatus,
    });
  } catch (error) {
    console.error("Get KYC status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getKycStatus };