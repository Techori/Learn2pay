# Sales Admin API Documentation

This document provides comprehensive API documentation for the Sales Admin system, covering Leads Management, Onboarding Management, and Activity Tracking.

## Table of Contents
1. [Authentication](#authentication)
2. [Leads Management](#leads-management)
3. [Onboarding Management](#onboarding-management)
4. [Activity Tracking](#activity-tracking)
5. [Reporting](#reporting)
6. [Data Models](#data-models)

---

## Authentication

All sales API endpoints require authentication using JWT tokens.

**Headers Required:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Role-based Access:**
- `sales_person`: Can manage their own leads and onboarding cases
- `sales_manager`: Can view and manage all leads and onboarding cases
- `admin`: Full access to all features

---

## Leads Management

### 1. Get All Leads
**GET** `/api/sales/leads`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `stage` (string): Filter by stage (New, Contacted, Demo Scheduled, etc.)
- `priority` (string): Filter by priority (High, Medium, Low)
- `assignedTo` (string): Filter by assigned user ID
- `leadSource` (string): Filter by lead source
- `dateFrom` (string): Filter from date (YYYY-MM-DD)
- `dateTo` (string): Filter to date (YYYY-MM-DD)
- `search` (string): Search in name, institute, email
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "lead_id",
      "leadName": "ABC School Lead",
      "instituteName": "ABC International School",
      "contactPerson": {
        "firstName": "John",
        "lastName": "Doe",
        "designation": "Principal"
      },
      "contactEmail": "john@abcschool.com",
      "contactPhone": "+91-9876543210",
      "stage": "New",
      "priority": "High",
      "estimatedValue": 250000,
      "assignedTo": {
        "_id": "user_id",
        "name": "Sales Person",
        "email": "sales@company.com"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "itemsPerPage": 10
  }
}
```

### 2. Get Lead by ID
**GET** `/api/sales/leads/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "lead_id",
    "leadName": "ABC School Lead",
    "instituteName": "ABC International School",
    "contactPerson": {
      "firstName": "John",
      "lastName": "Doe",
      "designation": "Principal"
    },
    "contactEmail": "john@abcschool.com",
    "contactPhone": "+91-9876543210",
    "address": {
      "completeAddress": "123 School Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pinCode": "400001"
    },
    "instituteType": "school",
    "stage": "New",
    "priority": "High",
    "leadSource": "Website",
    "estimatedValue": 250000,
    "expectedCloseDate": "2024-02-15T00:00:00Z",
    "tags": ["premium", "k12"],
    "notes": "Interested in premium package",
    "assignedTo": {
      "_id": "user_id",
      "name": "Sales Person",
      "email": "sales@company.com"
    },
    "createdBy": {
      "_id": "creator_id",
      "name": "Lead Generator",
      "email": "leadgen@company.com"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "lastActivityDate": "2024-01-16T14:20:00Z"
  }
}
```

### 3. Create Lead
**POST** `/api/sales/leads`

**Request Body:**
```json
{
  "leadName": "XYZ College Lead",
  "instituteName": "XYZ Engineering College",
  "contactPerson": {
    "firstName": "Jane",
    "lastName": "Smith",
    "designation": "Dean"
  },
  "contactEmail": "jane@xyzcollege.com",
  "contactPhone": "+91-9876543211",
  "address": {
    "completeAddress": "456 College Road",
    "city": "Pune",
    "state": "Maharashtra",
    "pinCode": "411001"
  },
  "instituteType": "college",
  "priority": "Medium",
  "leadSource": "Cold Call",
  "estimatedValue": 500000,
  "expectedCloseDate": "2024-03-15",
  "tags": ["engineering", "large"],
  "notes": "Requires custom integration",
  "assignedTo": "user_id"
}
```

### 4. Update Lead
**PUT** `/api/sales/leads/:id`

**Request Body:** (Same as create, but all fields optional)
```json
{
  "stage": "Contacted",
  "priority": "High",
  "notes": "Had initial discussion, very interested"
}
```

### 5. Delete Lead
**DELETE** `/api/sales/leads/:id`
*Requires admin or sales_manager role*

### 6. Convert Lead to Onboarding
**POST** `/api/sales/leads/:id/convert`

**Request Body:**
```json
{
  "contractValue": 450000,
  "expectedCompletionDate": "2024-04-30",
  "assignedTo": "onboarding_specialist_id"
}
```

### 7. Add Note to Lead
**POST** `/api/sales/leads/:id/notes`

**Request Body:**
```json
{
  "note": "Follow-up call scheduled for tomorrow",
  "priority": "Medium",
  "nextAction": "Demo call",
  "nextActionDate": "2024-01-17T10:00:00Z"
}
```

### 8. Log Communication
**POST** `/api/sales/leads/:id/communications`

**Request Body:**
```json
{
  "type": "Call",
  "direction": "Outbound",
  "subject": "Initial discussion",
  "content": "Discussed requirements and pricing",
  "duration": 30,
  "outcome": "Positive",
  "participants": ["john@abcschool.com"],
  "followUpRequired": true,
  "followUpDate": "2024-01-18T10:00:00Z"
}
```

### 9. Get Lead Activities
**GET** `/api/sales/leads/:id/activities?limit=50`

### 10. Get Leads Dashboard Stats
**GET** `/api/sales/leads/dashboard-stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalLeads": 150,
      "newLeads": 25,
      "contactedLeads": 45,
      "convertedLeads": 30,
      "lostLeads": 15,
      "conversionRate": 20.0
    },
    "distributions": {
      "stages": [
        {"_id": "New", "count": 25},
        {"_id": "Contacted", "count": 45}
      ],
      "priorities": [
        {"_id": "High", "count": 40},
        {"_id": "Medium", "count": 70}
      ],
      "sources": [
        {"_id": "Website", "count": 60},
        {"_id": "Cold Call", "count": 40}
      ]
    },
    "valueStats": {
      "totalValue": 15000000,
      "avgValue": 100000,
      "minValue": 50000,
      "maxValue": 1000000
    }
  }
}
```

---

## Onboarding Management

### 1. Get All Onboarding Cases
**GET** `/api/sales/onboarding`

**Query Parameters:** (Similar to leads)
- `page`, `limit`, `stage`, `assignedTo`, `dateFrom`, `dateTo`, `search`, `sortBy`, `sortOrder`

### 2. Get Onboarding by ID
**GET** `/api/sales/onboarding/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "onboarding_id",
    "leadId": "original_lead_id",
    "instituteName": "ABC International School",
    "contactPerson": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@abcschool.com",
      "phone": "+91-9876543210"
    },
    "stage": "Documentation",
    "overallProgress": 25,
    "contractValue": 450000,
    "startDate": "2024-01-20T00:00:00Z",
    "expectedCompletionDate": "2024-04-30T00:00:00Z",
    "assignedTo": {
      "_id": "specialist_id",
      "name": "Onboarding Specialist",
      "email": "specialist@company.com"
    },
    "documents": {
      "registrationCertificate": {
        "status": "Submitted",
        "uploadDate": "2024-01-22T10:00:00Z"
      },
      "educationalLicense": {
        "status": "Pending"
      }
    },
    "technicalSetup": {
      "paymentGatewayIntegration": {
        "status": "Pending"
      }
    },
    "training": {
      "adminTraining": {
        "status": "Pending"
      }
    }
  }
}
```

### 3. Create Onboarding Case
**POST** `/api/sales/onboarding`

**Request Body:**
```json
{
  "leadId": "lead_id",
  "instituteName": "ABC International School",
  "contactPerson": {
    "firstName": "John",
    "lastName": "Doe",
    "designation": "Principal",
    "email": "john@abcschool.com",
    "phone": "+91-9876543210"
  },
  "contractValue": 450000,
  "expectedCompletionDate": "2024-04-30",
  "assignedTo": "specialist_id"
}
```

### 4. Update Onboarding Case
**PUT** `/api/sales/onboarding/:id`

### 5. Update Document Status
**PUT** `/api/sales/onboarding/:id/documents`

**Request Body:**
```json
{
  "documentType": "registrationCertificate",
  "status": "Verified",
  "documentUrl": "https://storage.com/doc.pdf"
}
```

**Or for rejection:**
```json
{
  "documentType": "registrationCertificate",
  "status": "Rejected",
  "rejectionReason": "Document is not clear, please resubmit"
}
```

### 6. Update Technical Setup
**PUT** `/api/sales/onboarding/:id/technical-setup`

**Request Body:**
```json
{
  "setupType": "paymentGatewayIntegration",
  "status": "Completed",
  "details": {
    "gatewayProvider": "Razorpay",
    "merchantId": "merchant_123"
  }
}
```

### 7. Schedule Training
**POST** `/api/sales/onboarding/:id/training/schedule`

**Request Body:**
```json
{
  "trainingType": "adminTraining",
  "scheduledDate": "2024-02-15T10:00:00Z",
  "trainerId": "trainer_id",
  "attendees": 5
}
```

### 8. Complete Training
**POST** `/api/sales/onboarding/:id/training/complete`

**Request Body:**
```json
{
  "trainingType": "adminTraining",
  "attendees": 5,
  "feedback": "Training went well, all questions answered"
}
```

### 9. Add Milestone
**POST** `/api/sales/onboarding/:id/milestones`

**Request Body:**
```json
{
  "name": "Setup Payment Gateway",
  "description": "Configure Razorpay integration",
  "dueDate": "2024-02-20",
  "assignedTo": "tech_specialist_id"
}
```

### 10. Get Onboarding Activities
**GET** `/api/sales/onboarding/:id/activities?limit=50`

### 11. Get Onboarding Dashboard Stats
**GET** `/api/sales/onboarding/dashboard-stats`

---

## Activity Tracking

### 1. Get Recent Activities
**GET** `/api/sales/activities/recent?days=7&limit=100`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "activity_id",
      "entityType": "Lead",
      "entityId": "lead_id",
      "activityType": "Stage Changed",
      "title": "Stage Changed: New → Contacted",
      "description": "Lead stage changed from New to Contacted",
      "performedBy": {
        "_id": "user_id",
        "name": "Sales Person",
        "email": "sales@company.com"
      },
      "performedAt": "2024-01-16T14:20:00Z",
      "changes": [
        {
          "field": "stage",
          "oldValue": "New",
          "newValue": "Contacted"
        }
      ],
      "metadata": {
        "source": "Web",
        "priority": "Medium"
      }
    }
  ]
}
```

### 2. Get User Activities
**GET** `/api/sales/activities/user/:userId?limit=100`

### 3. Get Activities by Type
**GET** `/api/sales/activities/type/:activityType?limit=100`

---

## Reporting

### 1. Comprehensive Sales Report
**GET** `/api/sales/reports/comprehensive`

**Query Parameters:**
- `dateFrom` (string): Start date
- `dateTo` (string): End date
- `assignedTo` (string): Filter by user

**Response:**
```json
{
  "success": true,
  "data": {
    "leads": {
      "total": 150,
      "byStage": [...],
      "byPriority": [...],
      "bySource": [...],
      "totalValue": [{"_id": null, "total": 15000000}]
    },
    "onboarding": {
      "total": 45,
      "byStage": [...],
      "avgProgress": [{"_id": null, "avg": 65.5}],
      "totalValue": [{"_id": null, "total": 12000000}]
    },
    "activities": [
      {"_id": "Call Made", "count": 120},
      {"_id": "Email Sent", "count": 85}
    ],
    "generatedAt": "2024-01-16T15:30:00Z"
  }
}
```

### 2. Performance Report
**GET** `/api/sales/reports/performance`
*Requires admin or sales_manager role*

**Response:**
```json
{
  "success": true,
  "data": {
    "salesPerformance": [
      {
        "_id": "salesperson_id",
        "salesperson": {
          "name": "John Sales",
          "email": "john@company.com"
        },
        "totalLeads": 25,
        "convertedLeads": 8,
        "lostLeads": 3,
        "totalValue": 2000000,
        "avgValue": 80000,
        "conversionRate": 32.0
      }
    ],
    "onboardingPerformance": [
      {
        "_id": "specialist_id",
        "specialist": {
          "name": "Jane Specialist",
          "email": "jane@company.com"
        },
        "totalOnboardings": 12,
        "completedOnboardings": 8,
        "avgProgress": 75.5,
        "totalValue": 3600000
      }
    ],
    "generatedAt": "2024-01-16T15:30:00Z"
  }
}
```

---

## Data Models

### Lead Model
```typescript
interface Lead {
  _id: string;
  leadName: string;
  instituteName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    designation: string;
  };
  contactEmail: string;
  contactPhone: string;
  address: {
    completeAddress: string;
    city: string;
    state: string;
    pinCode: string;
  };
  instituteType: 'school' | 'college' | 'academy' | 'coaching' | 'other';
  stage: 'New' | 'Contacted' | 'Demo Scheduled' | 'Demo Completed' | 'Proposal Sent' | 'Negotiation' | 'KYC Submitted' | 'Converted' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string; // User ID
  leadSource: 'Website' | 'Cold Call' | 'Referral' | 'Social Media' | 'Advertisement' | 'Event' | 'Other';
  estimatedValue: number;
  expectedCloseDate: Date;
  lastActivityDate: Date;
  tags: string[];
  notes: string;
  lostReason?: string;
  convertedDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Onboarding Model
```typescript
interface Onboarding {
  _id: string;
  leadId: string;
  instituteId?: string;
  instituteName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    phone: string;
  };
  stage: 'Documentation' | 'Setup' | 'Training' | 'Testing' | 'Go-Live' | 'Completed' | 'On-Hold';
  overallProgress: number; // 0-100
  startDate: Date;
  expectedCompletionDate: Date;
  actualCompletionDate?: Date;
  assignedTo: string;
  contractValue: number;
  documents: {
    registrationCertificate: DocumentStatus;
    educationalLicense: DocumentStatus;
    panCard: DocumentStatus;
    gstCertificate: DocumentStatus;
    bankDetails: BankDetailsStatus;
    serviceAgreement: AgreementStatus;
  };
  technicalSetup: {
    paymentGatewayIntegration: TechnicalStatus;
    systemIntegration: TechnicalStatus;
    userAccountSetup: UserSetupStatus;
    feeStructureSetup: FeeSetupStatus;
  };
  training: {
    adminTraining: TrainingStatus;
    staffTraining: TrainingStatus;
    parentOrientation: TrainingStatus;
  };
  // ... other fields
}
```

### Activity Model
```typescript
interface Activity {
  _id: string;
  entityType: 'Lead' | 'Onboarding';
  entityId: string;
  activityType: string;
  title: string;
  description: string;
  performedBy: string;
  performedAt: Date;
  changes?: Array<{
    field: string;
    oldValue: any;
    newValue: any;
  }>;
  metadata?: {
    source?: 'Web' | 'Mobile' | 'API' | 'System';
    priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
    // ... other metadata fields
  };
  communication?: CommunicationDetails;
  document?: DocumentDetails;
  milestone?: MilestoneDetails;
  isVisible: boolean;
  isSystemGenerated: boolean;
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **General endpoints**: 100 requests per minute per user
- **Reporting endpoints**: 10 requests per minute per user
- **Bulk operations**: 5 requests per minute per user

---

## Webhooks (Future Enhancement)

The system can be configured to send webhooks for important events:
- Lead stage changes
- Onboarding milestone completions
- Document approvals/rejections
- Training completions

**Webhook Payload Example:**
```json
{
  "event": "lead.stage_changed",
  "data": {
    "leadId": "lead_id",
    "oldStage": "New",
    "newStage": "Contacted",
    "timestamp": "2024-01-16T14:20:00Z"
  }
}
```
