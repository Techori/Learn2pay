import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Save, Building, Users } from "lucide-react";
import { authAPI } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

interface StudentFormData {
  name: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  password: string;
  dateOfBirth: string;
  age: number;
  grade: string;
  section: string;
  rollNumber: string;
  address: {
    completeAddress: string;
    city: string;
    state: string;
    pinCode: string;
  };
  instituteName: string;
  instituteId: string;
  admissionDate: string;
}

interface AddStudentFormProps {
  onStudentAdded?: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onStudentAdded }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const { institute } = useAuth();

  const [formData, setFormData] = useState<StudentFormData>({
    name: "Rahul Kumar",
    parentName: "Suresh Kumar",
    parentEmail: "suresh.kumar@email.com",
    parentPhone: "9876543210",
    password: "student123",
    dateOfBirth: "2010-05-15",
    age: 13,
    grade: "8",
    section: "A",
    rollNumber: "25",
    address: {
      completeAddress: "123 Main Street, Near City Park",
      city: "Gwalior",
      state: "Madhya Pradesh",
      pinCode: "474005",
    },
    instituteName: institute?.name || "Akshat Institute",
    instituteId: institute?._id || "",
    admissionDate: new Date().toISOString().split('T')[0],
  });

  const updateFormData = (field: string, value: string | number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev: StudentFormData) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof StudentFormData] as Record<string, string>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev: StudentFormData) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Generate random sample data for testing
  const generateSampleData = () => {
    const sampleNames = [
      "Priya Sharma", "Arjun Singh", "Neha Patel", "Vikram Verma", 
      "Anjali Gupta", "Rohan Mehta", "Zara Khan", "Aditya Joshi"
    ];
    const sampleParents = [
      "Amit Sharma", "Rajesh Singh", "Sunita Patel", "Vikrant Verma",
      "Rajesh Gupta", "Sanjay Mehta", "Farhan Khan", "Prakash Joshi"
    ];
    const sampleEmails = [
      "amit.sharma@email.com", "rajesh.singh@email.com", "sunita.patel@email.com",
      "vikrant.verma@email.com", "rajesh.gupta@email.com", "sanjay.mehta@email.com",
      "farhan.khan@email.com", "prakash.joshi@email.com"
    ];
    const sampleCities = [
      "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"
    ];
    const sampleStates = [
      "Maharashtra", "Delhi", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Maharashtra", "Gujarat"
    ];
    
    const randomIndex = Math.floor(Math.random() * sampleNames.length);
    const randomGrade = Math.floor(Math.random() * 12) + 1;
    const randomSection = ["A", "B", "C", "D"][Math.floor(Math.random() * 4)];
    const randomRoll = Math.floor(Math.random() * 50) + 1;
    const randomYear = 2005 + Math.floor(Math.random() * 15);
    const randomMonth = Math.floor(Math.random() * 12);
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    const randomDOB = `${randomYear}-${String(randomMonth + 1).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;
    const calculatedAge = calculateAge(randomDOB);
    
    setFormData({
      name: sampleNames[randomIndex],
      parentName: sampleParents[randomIndex],
      parentEmail: sampleEmails[randomIndex],
      parentPhone: `9${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      password: "student123",
      dateOfBirth: randomDOB,
      age: calculatedAge,
      grade: randomGrade.toString(),
      section: randomSection,
      rollNumber: randomRoll.toString(),
      address: {
        completeAddress: `${Math.floor(Math.random() * 999) + 1} ${sampleCities[randomIndex]} Street, Near City Park`,
        city: sampleCities[randomIndex],
        state: sampleStates[randomIndex],
        pinCode: `${Math.floor(Math.random() * 900000) + 100000}`,
      },
      instituteName: institute?.name || "Akshat Institute",
      instituteId: institute?._id || "",
      admissionDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleDateOfBirthChange = (dob: string) => {
    const calculatedAge = calculateAge(dob);
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dob,
      age: calculatedAge,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitAttempt(0);

    try {
      // Here you would typically make an API call to your backend
      const registrationData = {
        name: formData.name,
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
        age: Number(formData.age),
        grade: formData.grade,
        section: formData.section,
        rollNumber: formData.rollNumber,
        address: formData.address,
        instituteName: formData.instituteName,
        instituteId: formData.instituteId,
        admissionDate: formData.admissionDate,
      };

      console.log(
        "Sending registration data:",
        JSON.stringify(registrationData, null, 2)
      );

      // Listen for retry attempts
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        if (args[0] && args[0].includes("Registration attempt")) {
          const attemptMatch = args[0].match(/Registration attempt (\d+)/);
          if (attemptMatch) {
            setSubmitAttempt(parseInt(attemptMatch[1]));
          }
        }
        originalConsoleLog(...args);
      };

      const response = await authAPI.registerStudent(registrationData);

      // Restore original console.log
      console.log = originalConsoleLog;

      console.log("API response:", response);
      console.log("Response type:", typeof response);
      console.log("Response keys:", Object.keys(response || {}));

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Success!",
        description: "Student has been successfully registered.",
      });

      // Reset form
      setFormData({
        name: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        password: "",
        dateOfBirth: "",
        age: 0,
        grade: "",
        section: "",
        rollNumber: "",
        address: {
          completeAddress: "",
          city: "",
          state: "",
          pinCode: "",
        },
        instituteName: "",
        instituteId: "",
        admissionDate: "",
      });

      // Call the callback if provided
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorDescription = "Failed to register student. Please try again.";

      if (error instanceof Error) {
        errorDescription = error.message;

        // Handle specific error types
        if (error.message.includes("Student with this parent email")) {
          errorDescription =
            "A student with this parent email and name already exists in this institute.";
        } else if (error.message.includes("validation")) {
          errorDescription = "Please check your input data and try again.";
        }
      }

      toast({
        title: "Registration Failed",
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.parentName &&
      formData.parentEmail &&
      formData.parentPhone &&
      formData.password &&
      formData.dateOfBirth &&
      formData.age > 0 &&
      formData.grade &&
      formData.section &&
      formData.rollNumber &&
      formData.address.completeAddress &&
      formData.address.city &&
      formData.address.state &&
      formData.address.pinCode &&
      formData.instituteName &&
      formData.admissionDate
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full m-0 p-0">
      <Card className="w-full border-0 rounded-none bg-gray-800/50">
                 <CardHeader className="px-4 md:px-6">
           <div className="flex items-center justify-between">
             <CardTitle className="text-gray-800 dark:text-gray-300 flex items-center space-x-2">
               <User className="h-5 w-5 text-orange-500" />
               <span>Student Registration Form</span>
             </CardTitle>
             <Button
               type="button"
               variant="outline"
               onClick={generateSampleData}
               className="border-gray-700 text-gray-300 hover:bg-gray-800/50 flex items-center space-x-2"
             >
               <User className="h-4 w-4" />
               <span>Generate Sample Data</span>
             </Button>
           </div>
         </CardHeader>
        <CardContent className="space-y-6 px-4 md:px-6">
          {/* Student Information */}
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" />
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Full Name *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Date of Birth *
                </label>
                <Input
                  required
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleDateOfBirthChange(e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Select date of birth"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  readOnly
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Age will be calculated automatically"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Grade *
                </label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => updateFormData("grade", value)}
                >
                  <SelectTrigger className="bg-white text-gray-900 border-gray-700 dark:bg-gray-900 dark:text-white dark:border-gray-700">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        Grade {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Section *
                </label>
                <Select
                  value={formData.section}
                  onValueChange={(value) => updateFormData("section", value)}
                >
                  <SelectTrigger className="bg-white text-gray-900 border border-gray-700 dark:bg-gray-900 dark:text-white dark:border-gray-700">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                    {["A", "B", "C", "D"].map((section) => (
                      <SelectItem key={section} value={section}>
                        Section {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Roll Number *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => updateFormData("rollNumber", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter roll number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Password *
                </label>
                <Input
                  required
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Admission Date *
                </label>
                <Input
                  required
                  type="date"
                  value={formData.admissionDate}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Select Admission Date"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              Parent Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Parent Name *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => updateFormData("parentName", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter parent's name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Parent Email *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) =>
                    updateFormData("parentEmail", e.target.value)
                  }
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter parent's email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Parent Phone *
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) =>
                    updateFormData("parentPhone", e.target.value)
                  }
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter parent's phone number"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="text-sm font-medium text-gray-400">
                  Complete Address *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.address.completeAddress}
                  onChange={(e) =>
                    updateFormData("address.completeAddress", e.target.value)
                  }
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter complete address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  City *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.address.city}
                  onChange={(e) =>
                    updateFormData("address.city", e.target.value)
                  }
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  State *
                </label>
                <Select
                  required
                  value={formData.address.state}
                  onValueChange={(value) => updateFormData("address.state", value)}
                >
                  <SelectTrigger className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                    <SelectItem value="Assam">Assam</SelectItem>
                    <SelectItem value="Bihar">Bihar</SelectItem>
                    <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                    <SelectItem value="Goa">Goa</SelectItem>
                    <SelectItem value="Gujarat">Gujarat</SelectItem>
                    <SelectItem value="Haryana">Haryana</SelectItem>
                    <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                    <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Manipur">Manipur</SelectItem>
                    <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                    <SelectItem value="Mizoram">Mizoram</SelectItem>
                    <SelectItem value="Nagaland">Nagaland</SelectItem>
                    <SelectItem value="Odisha">Odisha</SelectItem>
                    <SelectItem value="Punjab">Punjab</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Sikkim">Sikkim</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="Tripura">Tripura</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>
                    <SelectItem value="Ladakh">Ladakh</SelectItem>
                    <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                    <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                    <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
                    <SelectItem value="Puducherry">Puducherry</SelectItem>
                    <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  PIN Code *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.address.pinCode}
                  onChange={(e) =>
                    updateFormData("address.pinCode", e.target.value)
                  }
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          </div>

          {/* Institute Information */}
          <div className="space-y-4 w-full">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-orange-500" />
              Institute Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Institute Name *
                </label>
                <Input
                  readOnly
                  type="text"
                  value={formData.instituteName}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter institute name"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 w-full">
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white h-11 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  <span>
                    {submitAttempt > 1
                      ? `Retrying... (Attempt ${submitAttempt}/3)`
                      : "Registering Student..."}
                  </span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  <span>Register Student</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddStudentForm;
