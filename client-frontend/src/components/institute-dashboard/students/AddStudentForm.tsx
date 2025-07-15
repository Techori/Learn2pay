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
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Save,
  Building,
  Lock,
  Users,
} from "lucide-react";

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
}

interface AddStudentFormProps {
  onStudentAdded?: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onStudentAdded }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<StudentFormData>({
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
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateOfBirthChange = (dob: string) => {
    const calculatedAge = calculateAge(dob);
    setFormData(prev => ({
      ...prev,
      dateOfBirth: dob,
      age: calculatedAge
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to your backend
      const response = await fetch('/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          age: formData.age,
          grade: formData.grade,
          section: formData.section,
          rollNumber: formData.rollNumber,
          address: formData.address,
          instituteName: formData.instituteName,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
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
      });

      // Call the callback if provided
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register student. Please try again.",
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
      formData.instituteName
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full m-0 p-0">
      <Card className="w-full border-0 rounded-none bg-gray-800/50">
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-gray-800 dark:text-gray-300 flex items-center space-x-2">
            <User className="h-5 w-5 text-orange-500" />
            <span>Student Registration Form</span>
          </CardTitle>
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
                  className= "border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
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
                <label className="text-sm font-medium text-gray-400">
                  Age
                </label>
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
                  onChange={(e) => updateFormData("parentEmail", e.target.value)}
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
                  onChange={(e) => updateFormData("parentPhone", e.target.value)}
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
                  onChange={(e) => updateFormData("address.completeAddress", e.target.value)}
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
                  onChange={(e) => updateFormData("address.city", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  State *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => updateFormData("address.state", e.target.value)}
                  className="border-gray-900 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  placeholder="Enter state"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  PIN Code *
                </label>
                <Input
                  required
                  type="text"
                  value={formData.address.pinCode}
                  onChange={(e) => updateFormData("address.pinCode", e.target.value)}
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
                  required
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) => updateFormData("instituteName", e.target.value)}
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
                  <span>Registering Student...</span>
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