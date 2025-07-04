import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  ArrowLeft,
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
  X,
} from "lucide-react";
import DashboardHeader from "@/components/shared/DashboardHeader";

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

const AddStudent: React.FC = () => {
  const navigate = useNavigate();
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

  const handleInputChange = (
    field: keyof StudentFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Student Added Successfully!",
      description: `${formData.studentName} has been added to the system.`,
    });

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const stepTitles = [
    "Student Information",
    "Academic Details",
    "Parent/Guardian Info",
    "Fee Structure & EMI",
  ];

  const stepIcons = [User, GraduationCap, Users, CreditCard];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <DashboardHeader dashboardName="Add Student" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <UserPlus className="w-8 h-8 text-orange-500" />
                Add New Student
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Add a new student to your institute
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Bar Background */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-700 -z-10" />
            <div
              className="absolute top-6 left-6 h-0.5 bg-orange-500 -z-10 transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />

            {stepTitles.map((title, index) => {
              const StepIcon = stepIcons[index];
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-orange-500 border-orange-500 text-white"
                        : isCurrent
                        ? "bg-orange-500/20 border-orange-500 text-orange-500"
                        : "bg-gray-800 border-gray-600 text-gray-400"
                    }
                  `}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`
                    text-sm mt-2 font-medium transition-colors duration-300
                    ${isCurrent ? "text-orange-500" : "text-gray-400"}
                  `}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {React.createElement(stepIcons[currentStep - 1], {
                  className: "w-5 h-5 text-orange-500",
                })}
                {stepTitles[currentStep - 1]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Student Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Student Name *
                    </label>
                    <Input
                      value={formData.studentName}
                      onChange={(e) =>
                        handleInputChange("studentName", e.target.value)
                      }
                      placeholder="Enter student's full name"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Student ID *
                    </label>
                    <Input
                      value={formData.studentId}
                      onChange={(e) =>
                        handleInputChange("studentId", e.target.value)
                      }
                      placeholder="Enter unique student ID"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Gender *
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Blood Group
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("bloodGroup", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
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
                      Aadhar Number
                    </label>
                    <Input
                      value={formData.aadharNumber}
                      onChange={(e) =>
                        handleInputChange("aadharNumber", e.target.value)
                      }
                      placeholder="Enter 12-digit Aadhar number"
                      className="bg-gray-700/50 border-gray-600 text-white"
                      maxLength={12}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Class *
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("class", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="lkg">LKG</SelectItem>
                        <SelectItem value="ukg">UKG</SelectItem>
                        <SelectItem value="1">Class 1</SelectItem>
                        <SelectItem value="2">Class 2</SelectItem>
                        <SelectItem value="3">Class 3</SelectItem>
                        <SelectItem value="4">Class 4</SelectItem>
                        <SelectItem value="5">Class 5</SelectItem>
                        <SelectItem value="6">Class 6</SelectItem>
                        <SelectItem value="7">Class 7</SelectItem>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Section *
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("section", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                        <SelectItem value="D">Section D</SelectItem>
                        <SelectItem value="E">Section E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Roll Number *
                    </label>
                    <Input
                      value={formData.rollNumber}
                      onChange={(e) =>
                        handleInputChange("rollNumber", e.target.value)
                      }
                      placeholder="Enter roll number"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Admission Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) =>
                        handleInputChange("admissionDate", e.target.value)
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">
                      Previous School (if any)
                    </label>
                    <Input
                      value={formData.previousSchool}
                      onChange={(e) =>
                        handleInputChange("previousSchool", e.target.value)
                      }
                      placeholder="Enter previous school name"
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Parent/Guardian Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Parent/Guardian Name *
                      </label>
                      <Input
                        value={formData.parentName}
                        onChange={(e) =>
                          handleInputChange("parentName", e.target.value)
                        }
                        placeholder="Enter parent's full name"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Parent Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.parentEmail}
                        onChange={(e) =>
                          handleInputChange("parentEmail", e.target.value)
                        }
                        placeholder="Enter parent's email"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Parent Phone *
                      </label>
                      <Input
                        value={formData.parentPhone}
                        onChange={(e) =>
                          handleInputChange("parentPhone", e.target.value)
                        }
                        placeholder="Enter parent's phone number"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Alternate Contact
                      </label>
                      <Input
                        value={formData.alternateContact}
                        onChange={(e) =>
                          handleInputChange("alternateContact", e.target.value)
                        }
                        placeholder="Enter alternate contact number"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">
                        Parent Occupation
                      </label>
                      <Input
                        value={formData.parentOccupation}
                        onChange={(e) =>
                          handleInputChange("parentOccupation", e.target.value)
                        }
                        placeholder="Enter parent's occupation"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      Address Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-300">
                          Address *
                        </label>
                        <Input
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          placeholder="Enter complete address"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          City *
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="Enter city"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          State *
                        </label>
                        <Input
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          placeholder="Enter state"
                          className="bg-gray-700/50 border-gray-600 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                          PIN Code *
                        </label>
                        <Input
                          value={formData.pincode}
                          onChange={(e) =>
                            handleInputChange("pincode", e.target.value)
                          }
                          placeholder="Enter PIN code"
                          className="bg-gray-700/50 border-gray-600 text-white"
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Fee Structure & EMI */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Admission Fee
                      </label>
                      <Input
                        type="number"
                        value={formData.admissionFee}
                        onChange={(e) =>
                          handleInputChange("admissionFee", e.target.value)
                        }
                        placeholder="Enter admission fee"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Monthly Fee *
                      </label>
                      <Input
                        type="number"
                        value={formData.monthlyFee}
                        onChange={(e) =>
                          handleInputChange("monthlyFee", e.target.value)
                        }
                        placeholder="Enter monthly fee"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Transport Fee
                      </label>
                      <Input
                        type="number"
                        value={formData.transportFee}
                        onChange={(e) =>
                          handleInputChange("transportFee", e.target.value)
                        }
                        placeholder="Enter transport fee"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Exam Fee
                      </label>
                      <Input
                        type="number"
                        value={formData.examFee}
                        onChange={(e) =>
                          handleInputChange("examFee", e.target.value)
                        }
                        placeholder="Enter exam fee"
                        className="bg-gray-700/50 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  {/* EMI Plan Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-orange-500" />
                        EMI Plan (Optional)
                      </h3>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.emiEnabled}
                          onChange={(e) =>
                            handleInputChange("emiEnabled", e.target.checked)
                          }
                          className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-300">
                          Enable EMI Plan
                        </span>
                      </label>
                    </div>

                    {formData.emiEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            EMI Plan Type
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleInputChange("emiPlan", value)
                            }
                          >
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                              <SelectValue placeholder="Select EMI plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3months">3 Months</SelectItem>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="12months">
                                12 Months
                              </SelectItem>
                              <SelectItem value="24months">
                                24 Months
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            EMI Amount
                          </label>
                          <Input
                            type="number"
                            value={formData.emiAmount}
                            onChange={(e) =>
                              handleInputChange("emiAmount", e.target.value)
                            }
                            placeholder="EMI amount"
                            className="bg-gray-700/50 border-gray-600 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                            Tenure (Months)
                          </label>
                          <Input
                            type="number"
                            value={formData.emiTenure}
                            onChange={(e) =>
                              handleInputChange("emiTenure", e.target.value)
                            }
                            placeholder="Tenure in months"
                            className="bg-gray-700/50 border-gray-600 text-white"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Form Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-white disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index + 1 <= currentStep
                          ? "bg-orange-500"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Adding Student...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Add Student
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddStudent;
