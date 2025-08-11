import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/Form";
import { authAPI } from "../utils/api";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import RegistrationDocumentUpload from "../components/RegistrationDocumentUpload";
import { useToast } from "../hooks/use-toast";

interface SelectedDocument {
  name: string;
  type: string;
  data: string;
  file: File;
}

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [kycDocuments, setKycDocuments] = useState<{
    registrationCertificate?: SelectedDocument;
    panCard?: SelectedDocument;
  } | null>(null);
  const [optOutKyc, setOptOutKyc] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Show loading if checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2 text-orange-400">
          <div className="w-6 h-6 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
          <span className="text-gray-900 dark:text-orange-400">Loading...</span>
        </div>
      </div>
    );
  }

  const form = useForm({
    defaultValues: {
      instituteName: "",
      instituteType: "",
      description: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      password: "",
      confirmPassword: "",
      totalStudents: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    console.log("🚀 Starting registration process:", {
      instituteName: data.instituteName,
      instituteType: data.instituteType,
      contactEmail: data.email,
      hasKycDocuments: !!(
        kycDocuments?.registrationCertificate && kycDocuments?.panCard
      ),
      optOutKyc,
      timestamp: new Date().toISOString(),
    });

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      const errorMsg = "Passwords do not match";
      setError(errorMsg);
      setIsLoading(false);

      toast({
        title: "❌ Password Mismatch",
        description:
          "The passwords you entered do not match. Please check and try again.",
        variant: "destructive",
      });

      console.warn("⚠️ Password validation failed: passwords do not match");
      return;
    }

    // Prepare data for backend
    const registrationData = {
      instituteName: data.instituteName,
      instituteType: data.instituteType,
      description: data.description,
      contactPerson: {
        firstName: data.contactPerson.split(" ")[0] || data.contactPerson,
        lastName:
          data.contactPerson.split(" ").slice(1).join(" ") ||
          data.contactPerson,
      },
      contactEmail: data.email,
      contactPhone: data.phone,
      website: data.website,
      address: {
        completeAddress: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pincode,
      },
      password: data.password,
      documents: {
        registerationCertificate: false,
        panCard: false,
      },
      totalStudents: data.totalStudents,
    };

    try {
      const registerResponse = await authAPI.register(registrationData);

      // Check if response contains an error
      if (registerResponse.error) {
        // Handle structured error response from backend
        let errorMessage = registerResponse.error;

        if (registerResponse.message) {
          errorMessage = registerResponse.message;
        } else if (
          registerResponse.details &&
          Array.isArray(registerResponse.details)
        ) {
          errorMessage = registerResponse.details.join("\n");
        }

        throw new Error(errorMessage);
      }

      // Log successful registration
      console.log("✅ Registration successful:", {
        instituteId: registerResponse.id,
        instituteName: registrationData.instituteName,
        contactEmail: registrationData.contactEmail,
        timestamp: new Date().toISOString(),
      });

      // If KYC documents are provided and user didn't opt out, start KYC verification
      if (
        kycDocuments &&
        !optOutKyc &&
        kycDocuments.registrationCertificate &&
        kycDocuments.panCard
      ) {
        try {
          // Login first to get authentication for KYC
          const loginResponse = await authAPI.instituteLogin(
            data.email,
            data.password
          );

          if (!loginResponse.error) {
            // Start KYC verification with uploaded documents
            await authAPI.startKycVerification({
              registrationCertificate: kycDocuments.registrationCertificate,
              panCard: kycDocuments.panCard,
            });

            const successMessage =
              "Registration successful! KYC verification has been started. You can now login.";
            setSuccess(successMessage);

            // Show success toast
            toast({
              title: "🎉 Registration Complete!",
              description:
                "Your institute has been registered and KYC verification has started. Redirecting to login...",
              variant: "default",
              className:
                "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
            });

            console.log("✅ KYC verification started automatically");
          } else {
            const successMessage =
              "Registration successful! Please login to complete KYC verification.";
            setSuccess(successMessage);

            // Show success toast
            toast({
              title: "🎉 Registration Complete!",
              description:
                "Your institute has been registered successfully. Please login to complete KYC verification.",
              variant: "default",
              className:
                "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
            });

            console.log("✅ Registration successful, manual KYC required");
          }
        } catch (kycError: any) {
          console.error("❌ KYC verification failed:", kycError);
          const successMessage =
            "Registration successful! Please login to complete KYC verification.";
          setSuccess(successMessage);

          // Show success toast with KYC note
          toast({
            title: "🎉 Registration Complete!",
            description:
              "Your institute has been registered successfully. Please login to complete KYC verification.",
            variant: "default",
            className:
              "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
          });
        }
      } else {
        const successMessage = "Registration successful! You can now login.";
        setSuccess(successMessage);

        // Show success toast
        toast({
          title: "🎉 Welcome to Learn2Pay!",
          description:
            "Your institute has been registered successfully. Redirecting to login page...",
          variant: "default",
          className:
            "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-100",
        });

        console.log("✅ Registration successful, no KYC documents provided");
      }

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      console.error("❌ Registration failed:", {
        error: err,
        timestamp: new Date().toISOString(),
        attemptedData: {
          instituteName: registrationData.instituteName,
          instituteType: registrationData.instituteType,
          contactEmail: registrationData.contactEmail,
        },
      });

      // Provide more specific error messages
      let errorMessage = "Registration failed. Please try again.";

      if (err.message) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (err.error) {
        errorMessage = err.error;
      }

      // Handle specific known error cases
      if (errorMessage.includes("email") || errorMessage.includes("Email")) {
        errorMessage =
          "Email address is already registered. Please use a different email or try logging in.";

        // Show specific error toast
        toast({
          title: "❌ Email Already Exists",
          description:
            "This email is already registered. Please use a different email or try logging in.",
          variant: "destructive",
        });
      } else if (
        errorMessage.includes("validation") ||
        errorMessage.includes("Validation")
      ) {
        // Keep the detailed validation message for better UX
        // Show validation error toast
        toast({
          title: "❌ Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else if (
        errorMessage.includes("network") ||
        errorMessage.includes("Network")
      ) {
        errorMessage =
          "Network error. Please check your connection and try again.";

        // Show network error toast
        toast({
          title: "❌ Network Error",
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        // General error toast
        toast({
          title: "❌ Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border border-orange-500/20 bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-800/50 shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="font-bold">
                <span className="text-[#FF7F1A]">LARN</span>
                <span className="text-gray-900 dark:text-white">2PAY</span>
              </span>
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Register Your Institute
            </CardTitle>
            <CardDescription className="text-gray-300">
              Start your free trial and transform your fee collection process
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/50 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  </div>
                  <div>
                    <p className="text-green-300 text-sm font-medium leading-relaxed">
                      {success}
                    </p>
                    <p className="text-green-400/70 text-xs mt-1">
                      Redirecting to login page in 3 seconds...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/50 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-300 text-sm font-medium leading-relaxed whitespace-pre-line">
                      {error}
                    </p>
                    <p className="text-red-400/70 text-xs mt-1">
                      Please correct the errors and try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Institute Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Institute Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="instituteName"
                        rules={{ required: "Institute Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="instituteName">
                              Institute Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="instituteName"
                                placeholder="e.g., ABC Academy"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="totalStudents"
                        rules={{ required: "Total No. of Students is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="totalStudents">
                              Total No. of Students *
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="totalStudents"
                                type="number"
                                min={1}
                                placeholder="e.g., 500"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="instituteType"
                      rules={{ required: "Please select an institute type" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institute Type *</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500">
                                <SelectValue placeholder="Select type">
                                  {field.value || "Select type"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="School">School</SelectItem>
                                <SelectItem value="Coaching">
                                  Coaching Center
                                </SelectItem>
                                <SelectItem value="Gym">
                                  Gym/Fitness Center
                                </SelectItem>
                                <SelectItem value="Academy">
                                  Academy
                                </SelectItem>
                                <SelectItem value="College">
                                  College
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                
                  </div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="description">
                            Institute Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              placeholder="Brief description of your institute"
                              {...field}
                              rows={3}
                              className="w-full h-32 rounded-lg p-4 bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      rules={{ required: "Contact Person Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="contactPerson">
                            Contact Person Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="contactPerson"
                              placeholder="Principal/Director/Owner name"
                              {...field}
                              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{
                          required: "Email Address is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                placeholder="admin@institute.com"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{ required: "Phone Number is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="phone">
                              Phone Number *
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="website">
                            Website (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="website"
                              type="url"
                              placeholder="https://www.yourinstitute.com"
                              {...field}
                              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Create Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Create Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="password"
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="password">Password *</FormLabel>
                            <FormControl>
                              <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        rules={{ required: "Please confirm your password" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="confirmPassword">
                              Confirm Password *
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    Address Information
                  </h3>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Complete Address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="address">
                            Complete Address *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="address"
                              placeholder="Street address, building name, etc."
                              {...field}
                              rows={2}
                              className="w-full h-32 rounded-lg p-4 bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-blue-500 resize-none"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="city"
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="city">City *</FormLabel>
                            <FormControl>
                              <Input
                                id="city"
                                placeholder="City name"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="state"
                        rules={{ required: "State is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="state">State *</FormLabel>
                            <FormControl>
                              <Input
                                id="state"
                                placeholder="State name"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="pincode"
                        rules={{ required: "Pincode is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="pincode">Pincode *</FormLabel>
                            <FormControl>
                              <Input
                                id="pincode"
                                placeholder="123456"
                                {...field}
                                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* KYC Documents */}
                <RegistrationDocumentUpload
                  onDocumentsChange={setKycDocuments}
                  onOptOutChange={setOptOutKyc}
                />

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    rules={{
                      required: "You must agree to the terms and conditions",
                    }}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="agreeTerms"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Label
                    htmlFor="agreeTerms"
                    className="text-sm leading-5 text-gray-300"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-orange-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-orange-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Registering...</span>
                    </div>
                  ) : (
                    "Register Institute"
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-gray-300 hover:text-orange-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
