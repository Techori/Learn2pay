import XLSX from "xlsx";
import { Response } from "express";

// Function to create Excel template for bulk student registration
export const createExcelTemplate = (res: Response): void => {
  const templateData = [
    {
      "Student Name": "John Doe",
      "Parent Name": "Jane Doe",
      "Parent Email": "jane.doe@example.com",
      "Parent Phone": "1234567890",
      Password: "password123",
      "Date of Birth": "2010-01-15",
      Age: 14,
      Grade: "9th",
      "Roll Number": "2024001",
      "Complete Address": "123 Main Street, Apartment 4B",
      City: "Mumbai",
      State: "Maharashtra",
      "PIN Code": "400001",
      "Institute Name": "ABC High School",
    },
    {
      "Student Name": "Alice Smith",
      "Parent Name": "Bob Smith",
      "Parent Email": "bob.smith@example.com",
      "Parent Phone": "9876543210",
      Password: "secure456",
      "Date of Birth": "2009-05-22",
      Age: 15,
      Grade: "10th",
      "Roll Number": "2024002",
      "Complete Address": "456 Oak Avenue, Floor 2",
      City: "Delhi",
      State: "Delhi",
      "PIN Code": "110001",
      "Institute Name": "XYZ Academy",
    },
  ];

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(templateData);

  // Set column widths for better readability
  const columnWidths = [
    { wch: 15 }, // Student Name
    { wch: 15 }, // Parent Name
    { wch: 25 }, // Parent Email
    { wch: 15 }, // Parent Phone
    { wch: 12 }, // Password
    { wch: 12 }, // Date of Birth
    { wch: 5 }, // Age
    { wch: 8 }, // Grade
    { wch: 12 }, // Roll Number
    { wch: 30 }, // Complete Address
    { wch: 12 }, // City
    { wch: 12 }, // State
    { wch: 10 }, // PIN Code
    { wch: 20 }, // Institute Name
  ];

  worksheet["!cols"] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Generate buffer
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  // Set response headers
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="student_registration_template.xlsx"'
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  // Send buffer
  res.send(buffer);
};

// Function to validate Excel file format
export const validateExcelFormat = (
  buffer: Buffer
): { isValid: boolean; errors: string[] } => {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      return { isValid: false, errors: ["Excel file is empty"] };
    }

    const requiredColumns = [
      "Student Name",
      "Parent Name",
      "Parent Email",
      "Parent Phone",
      "Password",
      ["Date of Birth", "Date of Birth (YYYY-MM-DD)"], // Accept either format
      "Grade",
      "Roll Number",
      "Complete Address",
      "City",
      "State",
      "PIN Code",
      "Institute Name",
    ];

    const firstRow = jsonData[0] as any;
    const actualColumns = Object.keys(firstRow);
    const missingColumns: string[] = [];

    requiredColumns.forEach((col) => {
      if (Array.isArray(col)) {
        // Check if at least one of the alternative column names exists
        const hasAnyColumn = col.some((altCol) =>
          actualColumns.includes(altCol)
        );
        if (!hasAnyColumn) {
          missingColumns.push(col.join(" or "));
        }
      } else {
        // Check if the exact column name exists
        if (!actualColumns.includes(col)) {
          missingColumns.push(col);
        }
      }
    });

    if (missingColumns.length > 0) {
      return {
        isValid: false,
        errors: [`Missing required columns: ${missingColumns.join(", ")}`],
      };
    }

    return { isValid: true, errors: [] };
  } catch (error) {
    return {
      isValid: false,
      errors: [
        `Error reading Excel file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      ],
    };
  }
};
