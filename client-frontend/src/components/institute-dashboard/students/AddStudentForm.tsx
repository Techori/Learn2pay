import React, { useState } from "react";
import { motion } from "framer-motion";
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
  UserPlus,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  CreditCard,
  Save,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface StudentFormData {
  // Student Information
  studentName: string;
  studentId: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  aadharNumber: string;

  // Academic Information
  class: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  previousSchool: string;

  // Parent/Guardian Information
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentOccupation: string;
  alternateContact: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Fee Information
  admissionFee: string;
  monthlyFee: string;
  transportFee: string;
  examFee: string;

  // EMI Plan (if applicable)
  emiEnabled: boolean;
  emiPlan: string;
  emiAmount: string;
  emiTenure: string;
}

interface AddStudentFormProps {
  onStudentAdded?: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onStudentAdded }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<StudentFormData>({
    studentName: "",
    studentId: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    aadharNumber: "",
    class: "",
    section: "",
    rollNumber: "",
    admissionDate: "",
    previousSchool: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentOccupation: "",
    alternateContact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    admissionFee: "",
    monthlyFee: "",
    transportFee: "",
    examFee: "",
    emiEnabled: false,
    emiPlan: "",
    emiAmount: "",
    emiTenure: "",
  });

  const updateFormData = (
    field: keyof StudentFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Success!",
        description: "Student has been successfully added to the system.",
      });

      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        aadharNumber: "",
        class: "",
        section: "",
        rollNumber: "",
        admissionDate: "",
        previousSchool: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        parentOccupation: "",
        alternateContact: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        admissionFee: "",
        monthlyFee: "",
        transportFee: "",
        examFee: "",
        emiEnabled: false,
        emiPlan: "",
        emiAmount: "",
        emiTenure: "",
      });
      setCurrentStep(1);

      // Call the callback if provided
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.studentName &&
          formData.studentId &&
          formData.dateOfBirth &&
          formData.gender &&
          formData.aadharNumber
        );
      case 2:
        return (
          formData.class &&
          formData.section &&
          formData.rollNumber &&
          formData.admissionDate
        );
      case 3:
        return (
          formData.parentName &&
          formData.parentEmail &&
          formData.parentPhone &&
          formData.address &&
          formData.city &&
          formData.state &&
          formData.pincode
        );
      case 4:
        return formData.admissionFee && formData.monthlyFee;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <User className="h-5 w-5 text-orange-500" />
          <span>Student Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Full Name *
            </label>
            <Input
              type="text"
              placeholder="Enter student's full name"
              value={formData.studentName}
              onChange={(e) => updateFormData("studentName", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Student ID *
            </label>
            <Input
              type="text"
              placeholder="e.g., STU001"
              value={formData.studentId}
              onChange={(e) => updateFormData("studentId", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Date of Birth *
            </label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Gender *
            </label>
            <Select
              value={formData.gender}
              onValueChange={(value) => updateFormData("gender", value)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Blood Group
            </label>
            <Select
              value={formData.bloodGroup}
              onValueChange={(value) => updateFormData("bloodGroup", value)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Aadhar Number *
            </label>
            <Input
              type="text"
              placeholder="XXXX-XXXX-XXXX"
              value={formData.aadharNumber}
              onChange={(e) => updateFormData("aadharNumber", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <GraduationCap className="h-5 w-5 text-orange-500" />
          <span>Academic Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Class *</label>
            <Select
              value={formData.class}
              onValueChange={(value) => updateFormData("class", value)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">1st</SelectItem>
                <SelectItem value="2nd">2nd</SelectItem>
                <SelectItem value="3rd">3rd</SelectItem>
                <SelectItem value="4th">4th</SelectItem>
                <SelectItem value="5th">5th</SelectItem>
                <SelectItem value="6th">6th</SelectItem>
                <SelectItem value="7th">7th</SelectItem>
                <SelectItem value="8th">8th</SelectItem>
                <SelectItem value="9th">9th</SelectItem>
                <SelectItem value="10th">10th</SelectItem>
                <SelectItem value="11th">11th</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Section *
            </label>
            <Select
              value={formData.section}
              onValueChange={(value) => updateFormData("section", value)}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Roll Number *
            </label>
            <Input
              type="text"
              placeholder="Enter roll number"
              value={formData.rollNumber}
              onChange={(e) => updateFormData("rollNumber", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Admission Date *
            </label>
            <Input
              type="date"
              value={formData.admissionDate}
              onChange={(e) => updateFormData("admissionDate", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">
              Previous School
            </label>
            <Input
              type="text"
              placeholder="Enter previous school name (if any)"
              value={formData.previousSchool}
              onChange={(e) => updateFormData("previousSchool", e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Users className="h-5 w-5 text-orange-500" />
          <span>Parent/Guardian & Address Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Parent Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Parent/Guardian Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Parent/Guardian Name *
              </label>
              <Input
                type="text"
                placeholder="Enter parent/guardian name"
                value={formData.parentName}
                onChange={(e) => updateFormData("parentName", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.parentEmail}
                onChange={(e) => updateFormData("parentEmail", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Phone Number *
              </label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={formData.parentPhone}
                onChange={(e) => updateFormData("parentPhone", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Occupation
              </label>
              <Input
                type="text"
                placeholder="Enter occupation"
                value={formData.parentOccupation}
                onChange={(e) =>
                  updateFormData("parentOccupation", e.target.value)
                }
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Alternate Contact
              </label>
              <Input
                type="tel"
                placeholder="Enter alternate contact"
                value={formData.alternateContact}
                onChange={(e) =>
                  updateFormData("alternateContact", e.target.value)
                }
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">
                Address *
              </label>
              <Input
                type="text"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                City *
              </label>
              <Input
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                State *
              </label>
              <Input
                type="text"
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Pincode *
              </label>
              <Input
                type="text"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={(e) => updateFormData("pincode", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-orange-500" />
          <span>Fee Structure & EMI Options</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fee Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Fee Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Admission Fee *
              </label>
              <Input
                type="number"
                placeholder="Enter admission fee"
                value={formData.admissionFee}
                onChange={(e) => updateFormData("admissionFee", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Monthly Fee *
              </label>
              <Input
                type="number"
                placeholder="Enter monthly fee"
                value={formData.monthlyFee}
                onChange={(e) => updateFormData("monthlyFee", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Transport Fee
              </label>
              <Input
                type="number"
                placeholder="Enter transport fee (if applicable)"
                value={formData.transportFee}
                onChange={(e) => updateFormData("transportFee", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Exam Fee
              </label>
              <Input
                type="number"
                placeholder="Enter exam fee (if applicable)"
                value={formData.examFee}
                onChange={(e) => updateFormData("examFee", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* EMI Options */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="emi-enabled"
              checked={formData.emiEnabled}
              onChange={(e) => updateFormData("emiEnabled", e.target.checked)}
              className="w-4 h-4 text-orange-500 bg-gray-900 border-gray-700 rounded focus:ring-orange-500"
            />
            <label
              htmlFor="emi-enabled"
              className="text-lg font-semibold text-white"
            >
              Enable EMI Plan
            </label>
          </div>

          {formData.emiEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  EMI Plan
                </label>
                <Select
                  value={formData.emiPlan}
                  onValueChange={(value) => updateFormData("emiPlan", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select EMI plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly EMI</SelectItem>
                    <SelectItem value="quarterly">Quarterly EMI</SelectItem>
                    <SelectItem value="half-yearly">Half-Yearly EMI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  EMI Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter EMI amount"
                  value={formData.emiAmount}
                  onChange={(e) => updateFormData("emiAmount", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  EMI Tenure (months)
                </label>
                <Input
                  type="number"
                  placeholder="Enter tenure"
                  value={formData.emiTenure}
                  onChange={(e) => updateFormData("emiTenure", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-400">
            {currentStep === 1 && "Student Information"}
            {currentStep === 2 && "Academic Information"}
            {currentStep === 3 && "Parent & Address"}
            {currentStep === 4 && "Fee Structure"}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Steps */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Adding Student...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Add Student
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
