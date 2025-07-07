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
import { ArrowLeft, Upload } from "lucide-react";
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

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Prepare data for backend
    const registrationData = {
      institute_name: data.instituteName,
      institute_type: data.instituteType,
      description: data.description,
      contact_person: {
        firstName: data.contactPerson.split(' ')[0] || data.contactPerson,
        lastName: data.contactPerson.split(' ').slice(1).join(' ') || data.contactPerson,
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
        registerationCertificate: true,
        panCard: true,
      },
    };

    try {
      await authAPI.register(registrationData);
      setSuccess("Registration successful! You can now login.");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(`${field} uploaded:`, file.name);
      // Additional processing can be added here (e.g., validation, uploading to a server)
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
              <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-md">
                <p className="text-green-300 text-sm">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
                <p className="text-red-300 text-sm">{error}</p>
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
                                  <SelectItem value="school">School</SelectItem>
                                  <SelectItem value="coaching">
                                    Coaching Center
                                  </SelectItem>
                                  <SelectItem value="gym">
                                    Gym/Fitness Center
                                  </SelectItem>
                                  <SelectItem value="academy">
                                    Academy
                                  </SelectItem>
                                  <SelectItem value="college">
                                    College
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-orange-400">
                    KYC Documents
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload required documents for verification (PDF/JPG format,
                    max 5MB each)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Institute Registration Certificate */}
                    <div className="space-y-2">
                      <Label>Institute Registration Certificate</Label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() =>
                          document.getElementById("institute-upload")?.click()
                        }
                      >
                        <input
                          id="institute-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(
                              e,
                              "Institute Registration Certificate"
                            )
                          }
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                    {/* PAN Card */}
                    <div className="space-y-2">
                      <Label>PAN Card</Label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() =>
                          document.getElementById("pan-upload")?.click()
                        }
                      >
                        <input
                          id="pan-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "PAN Card")}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    rules={{ required: "You must agree to the terms and conditions" }}
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
