import { Request, Response } from 'express';
import Institute from '../../models/institute/instituteModel';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { hashPassword } from '../../utils/hashAuth';
import { instituteRegisterSchema } from '../../validations/instituteValidation';

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed.'));
    }
    cb(null, true);
  },
});

// Multer middleware for handling file uploads
export const handleFileUpload = upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
  { name: 'affiliationProof', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 5 }
]);

// Controller to list institutes with pagination
export const listInstitutes = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse page number from query parameters (default to 1 if not provided)
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10; // Number of institutes per page
    const skip = (page - 1) * limit;
    
    // Get total count for pagination metadata
    const total = await Institute.countDocuments();
    const totalPages = Math.ceil(total / limit);
    
    // Fetch paginated institutes
    const institutes = await Institute.find()
      .sort({ createdAt: -1 }) // Sort by creation date descending (newest first)
      .select('instituteName kycStatus createdAt') // Select only needed fields
      .skip(skip)
      .limit(limit);

    res.status(200).json({ 
      success: true,
      institutes,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching institutes:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Controller to get institute details by ID
export const getInstituteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Institute ID is required.' });
      return;
    }

    const institute = await Institute.findById(id);
    
    if (!institute) {
      res.status(404).json({ message: 'Institute not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      institute
    });
  } catch (error) {
    console.error('Error fetching institute details:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Controller to handle institute onboarding
export const onboardInstitute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { instituteName, instituteAddress, city, state, pincode, contactPersonName, contactPersonNumber, email, instituteType, leadSource } = req.body;

    // Prepare data for validation
    const instituteData = {
      instituteName,
      instituteType: instituteType.charAt(0).toUpperCase() + instituteType.slice(1).toLowerCase(), // Ensure proper capitalization
      description: req.body.description || '',
      contactPerson: {
        firstName: contactPersonName.split(' ')[0] || '',
        lastName: contactPersonName.split(' ').slice(1).join(' ') || contactPersonName.split(' ')[0] || '', // Ensure lastName is never empty
      },
      contactEmail: email || '',
      contactPhone: contactPersonNumber,
      address: {
        completeAddress: instituteAddress,
        city,
        state,
        pinCode: pincode,
      },
      password: 'Password123', // Default password for onboarding - meets validation requirements
      documents: {
        registerationCertificate: false,
        panCard: false,
      }
    };

    // Validate data using the schema
    const parsed = instituteRegisterSchema.safeParse(instituteData);
    if (!parsed.success) {
      const validationErrors = parsed.error.errors.map((err) => {
        if (err.path.length > 0) {
          const fieldPath = err.path.join(".");
          return `${fieldPath}: ${err.message}`;
        }
        return err.message;
      });

      res.status(400).json({
        error: "Validation failed",
        message: validationErrors.join(", "),
        details: validationErrors,
      });
      return;
    }

    // Check if institute with this email already exists
    if (email) {
      const existingInstitute = await Institute.findOne({ contactEmail: email });
      if (existingInstitute) {
        res.status(400).json({ 
          message: `An institute with email ${email} already exists. Please use a different email address.` 
        });
        return;
      }
    }

    // Check if institute with this phone number already exists
    const existingInstituteByPhone = await Institute.findOne({ contactPhone: contactPersonNumber });
    if (existingInstituteByPhone) {
      res.status(400).json({ 
        message: `An institute with phone number ${contactPersonNumber} already exists. Please use a different phone number.` 
      });
      return;
    }

    // Validate contact number format
    if (!/^\+91\d{10}$/.test(contactPersonNumber)) {
      res.status(400).json({ message: 'Contact number must be in +91XXXXXXXXXX format.' });
      return;
    }

    // Handle file upload
    const uploadedFiles: Record<string, string | string[]> = {};
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    
    if (files) {
      // Check if affiliation proof is required but missing
      if (!files.affiliationProof) {
        res.status(400).json({ message: 'Affiliation Proof is required.' });
        return;
      }

      // Process each file type
      for (const fieldName in files) {
        for (const file of files[fieldName]) {
          try {
            // Convert file buffer to base64 for Cloudinary
            const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            
            // Upload to Cloudinary
            const uploadResult = await cloudinaryV2.uploader.upload(base64String, {
              resource_type: 'auto',
              folder: 'learn2pay/institutes',
              public_id: `${instituteName.replace(/\s+/g, '_')}_${fieldName}_${Date.now()}`
            });
            
            // Store the secure URL
            if (fieldName === 'otherDocuments') {
              if (!uploadedFiles[fieldName]) {
                uploadedFiles[fieldName] = [];
              }
              (uploadedFiles[fieldName] as string[]).push(uploadResult.secure_url);
            } else {
              uploadedFiles[fieldName] = uploadResult.secure_url;
            }
          } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            res.status(500).json({ message: `File upload failed for ${fieldName}.` });
            return;
          }
        }
      }
    }

    // Save to database using validated data
    const newInstitute = await Institute.create({
      ...parsed.data,
      documents: {
        registerationCertificate: !!uploadedFiles['affiliationProof'],
        panCard: !!uploadedFiles['panCard'],
      },
      documentUrls: {
        affiliationProof: uploadedFiles['affiliationProof'] || null,
        panCard: uploadedFiles['panCard'] || null,
        gstCertificate: uploadedFiles['gstCertificate'] || null,
        otherDocuments: uploadedFiles['otherDocuments'] || [],
      },
      kycStatus: 'Pending', // Set to Pending (capital P) to match model enum
      approved: false,
      premiumPlan: false,
      joinDate: new Date().toISOString().split('T')[0], // Add join date
      // Hash the password
      password: await hashPassword(parsed.data.password),
    });

    // Respond with success
    res.status(201).json({ 
      message: 'Institute onboarded successfully.', 
      institute: {
        id: newInstitute._id,
        name: newInstitute.instituteName,
        status: newInstitute.kycStatus,
        submittedDate: newInstitute.createdAt
      }
    });
  } catch (error) {
    console.error('Error onboarding institute:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
